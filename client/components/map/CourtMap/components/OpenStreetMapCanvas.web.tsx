import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Text, View } from "react-native";

import {
  defaultZoom,
  focusZoom,
  mapCenter,
  markerColor,
  maxZoom,
  pinHtml,
  tileSubdomains,
  tileUrl,
} from "@/components/map/CourtMap/mapPin";
import type { CourtMapMarker } from "@/components/map/CourtMap/types";
import { shadow } from "@/components/ui/theme";
import { normalizeText } from "@/lib/format";

export type OpenStreetMapCanvasHandle = {
  focusVenue: (query: string) => boolean;
  locate: () => void;
};

type OpenStreetMapCanvasProps = {
  geolocationUnavailableMessage: string;
  markers: CourtMapMarker[];
  onMarkerPress: (markerId: string) => void;
  showVenueLayer: boolean;
  tileErrorMessage: string;
  unavailableMessage: string;
};

/**
 * Bản web của lưới bản đồ.
 *
 * `react-native-webview` không hỗ trợ platform web — nó render ra dòng chữ đỏ
 * "does not support this platform" thay vì bản đồ. Trên web ta đã có sẵn DOM thật,
 * nên chạy thẳng Leaflet trên đó, dùng đúng nguồn tile và kiểu ghim của bản native.
 *
 * Leaflet nạp từ CDN lúc chạy thay vì gói vào bundle: giống hệt cách bản native đang
 * làm bên trong WebView, và tránh phải cấu hình Metro để nuốt file CSS của thư viện.
 */

const leafletVersion = "1.9.4";
const leafletCssUrl = `https://unpkg.com/leaflet@${leafletVersion}/dist/leaflet.css`;
const leafletJsUrl = `https://unpkg.com/leaflet@${leafletVersion}/dist/leaflet.js`;

type LeafletMap = {
  invalidateSize: () => void;
  remove: () => void;
  setView: (center: [number, number], zoom: number) => void;
};

type LeafletMarker = { on: (event: string, handler: () => void) => void; remove: () => void };

type LeafletTileLayer = {
  addTo: (map: LeafletMap) => LeafletTileLayer;
  on: (event: string, handler: () => void) => LeafletTileLayer;
};

type Leaflet = {
  divIcon: (options: Record<string, unknown>) => unknown;
  map: (element: HTMLElement, options: Record<string, unknown>) => LeafletMap;
  marker: (position: [number, number], options: Record<string, unknown>) => { addTo: (map: LeafletMap) => LeafletMarker };
  tileLayer: (url: string, options: Record<string, unknown>) => LeafletTileLayer;
};

/** Nạp một lần cho cả vòng đời trang, kể cả khi người dùng rời trang bản đồ rồi quay lại. */
let leafletLoader: Promise<Leaflet> | null = null;

function loadLeaflet(): Promise<Leaflet> {
  // Expo web dựng trang tĩnh trên Node trước khi gửi xuống trình duyệt, lúc đó chưa có DOM.
  if (typeof window === "undefined" || typeof document === "undefined") {
    return Promise.reject(new Error("Chưa có DOM"));
  }

  const existing = (window as unknown as { L?: Leaflet }).L;
  if (existing) return Promise.resolve(existing);
  if (leafletLoader) return leafletLoader;

  leafletLoader = new Promise<Leaflet>((resolve, reject) => {
    if (!document.querySelector(`link[data-leaflet="${leafletVersion}"]`)) {
      const link = document.createElement("link");
      link.dataset.leaflet = leafletVersion;
      link.href = leafletCssUrl;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = leafletJsUrl;
    script.onload = () => {
      const loaded = (window as unknown as { L?: Leaflet }).L;
      if (loaded) resolve(loaded);
      else reject(new Error("Thiếu thư viện bản đồ"));
    };
    script.onerror = () => {
      // Cho phép thử lại ở lần mount sau thay vì kẹt mãi ở promise hỏng.
      leafletLoader = null;
      reject(new Error("Không tải được thư viện bản đồ"));
    };

    document.head.appendChild(script);
  });

  return leafletLoader;
}

const OpenStreetMapCanvas = forwardRef<OpenStreetMapCanvasHandle, OpenStreetMapCanvasProps>(
  function OpenStreetMapCanvas(
    {
      geolocationUnavailableMessage,
      markers,
      onMarkerPress,
      showVenueLayer,
      tileErrorMessage,
      unavailableMessage,
    },
    ref,
  ) {
    const containerRef = useRef<View>(null);
    const mapRef = useRef<LeafletMap | null>(null);
    const leafletRef = useRef<Leaflet | null>(null);
    const markerLayersRef = useRef<LeafletMarker[]>([]);
    /** Đọc trong callback của Leaflet nên phải qua ref, tránh đóng gói giá trị cũ. */
    const onMarkerPressRef = useRef(onMarkerPress);
    const [statusMessage, setStatusMessage] = useState("");
    const [isReady, setIsReady] = useState(false);

    onMarkerPressRef.current = onMarkerPress;

    // setState nằm trong callback của promise để effect không cập nhật state ngay trong thân hàm.
    useEffect(() => {
      let isActive = true;

      loadLeaflet()
        .then((leaflet) => {
          const element = containerRef.current as unknown as HTMLElement | null;
          if (!isActive || !element || mapRef.current) return;

          const map = leaflet.map(element, { attributionControl: false, zoomControl: false });
          map.setView([mapCenter.latitude, mapCenter.longitude], defaultZoom);

          // Tile hỏng thì trước đây chỉ còn ghim trên nền trống mà không báo gì;
          // giờ nói rõ để người dùng biết là do mạng chứ không phải app chết.
          leaflet
            .tileLayer(tileUrl, { maxZoom, subdomains: tileSubdomains })
            .on("tileerror", () => {
              if (isActive) setStatusMessage(tileErrorMessage);
            })
            .on("load", () => {
              if (isActive) setStatusMessage("");
            })
            .addTo(map);

          // Leaflet đo khung lúc khởi tạo; layout của RN Web xong sau nên phải đo lại.
          map.invalidateSize();

          leafletRef.current = leaflet;
          mapRef.current = map;
          setIsReady(true);
          setStatusMessage("");
        })
        .catch(() => {
          if (isActive) setStatusMessage(unavailableMessage);
        });

      return () => {
        isActive = false;
      };
    }, [tileErrorMessage, unavailableMessage]);

    // Dọn bản đồ khi rời trang, nếu không Leaflet giữ lại DOM cũ và lần sau khởi tạo lỗi.
    useEffect(
      () => () => {
        markerLayersRef.current.forEach((layer) => layer.remove());
        markerLayersRef.current = [];
        mapRef.current?.remove();
        mapRef.current = null;
        leafletRef.current = null;
      },
      [],
    );

    // Vẽ lại ghim mỗi khi danh sách lọc đổi hoặc người dùng tắt/bật lớp sân.
    useEffect(() => {
      const leaflet = leafletRef.current;
      const map = mapRef.current;
      if (!isReady || !leaflet || !map) return;

      markerLayersRef.current.forEach((layer) => layer.remove());
      markerLayersRef.current = [];

      if (!showVenueLayer) return;

      markerLayersRef.current = markers.map((marker) => {
        const layer = leaflet
          .marker([marker.latitude, marker.longitude], {
            icon: leaflet.divIcon({
              className: "",
              html: pinHtml(markerColor(marker)),
              iconAnchor: [15, 38],
              iconSize: [30, 38],
            }),
            title: marker.name,
          })
          .addTo(map);

        layer.on("click", () => onMarkerPressRef.current(marker.id));
        return layer;
      });
    }, [isReady, markers, showVenueLayer]);

    useImperativeHandle(
      ref,
      () => ({
        focusVenue: (query: string) => {
          const needle = normalizeText(query);
          if (!needle || !mapRef.current) return false;

          const match = markers.find((marker) => normalizeText(marker.name).includes(needle));
          if (!match) return false;

          mapRef.current.setView([match.latitude, match.longitude], focusZoom);
          return true;
        },
        locate: () => {
          if (typeof navigator === "undefined" || !navigator.geolocation) {
            setStatusMessage(geolocationUnavailableMessage);
            return;
          }

          navigator.geolocation.getCurrentPosition(
            (position) => {
              mapRef.current?.setView([position.coords.latitude, position.coords.longitude], focusZoom);
              setStatusMessage("");
            },
            () => setStatusMessage(geolocationUnavailableMessage),
            { enableHighAccuracy: true, timeout: 10000 },
          );
        },
      }),
      [geolocationUnavailableMessage, markers],
    );

    return (
      <View className="absolute inset-0">
        <View ref={containerRef} style={{ backgroundColor: "#d9f4ea", flex: 1 }} />

        {statusMessage ? (
          <View className="absolute inset-x-6 top-1/2 rounded-2xl bg-white/95 p-4" style={shadow.raised}>
            <Text className="text-center text-[14px] font-medium text-slate-700">{statusMessage}</Text>
          </View>
        ) : null}
      </View>
    );
  },
);

export default OpenStreetMapCanvas;
