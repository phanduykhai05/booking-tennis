import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Text, View } from "react-native";
import { WebView } from "react-native-webview";
import type { WebViewMessageEvent } from "react-native-webview";

import {
  defaultZoom,
  focusZoom,
  mapCenter,
  markerColor,
  maxZoom,
  pinHtml,
  tileUrl,
} from "@/components/map/CourtMap/mapPin";
import type { CourtMapMarker } from "@/components/map/CourtMap/types";
import { normalizeText } from "@/lib/format";
import { shadow } from "@/components/ui/theme";

export type OpenStreetMapCanvasHandle = {
  focusVenue: (query: string) => boolean;
  locate: () => void;
};

type OpenStreetMapCanvasProps = {
  geolocationUnavailableMessage: string;
  markers: CourtMapMarker[];
  onMarkerPress: (markerId: string) => void;
  showVenueLayer: boolean;
  unavailableMessage: string;
};

/**
 * Leaflet chạy trong WebView: giữ nguyên nguồn tile OpenStreetMap và kiểu ghim của
 * bản web, đồng thời tránh phải cấu hình khoá API bản đồ gốc cho iOS/Android.
 * Chạm vào ghim gửi message ra ngoài để RN điều hướng sang trang sân.
 */
function buildHtml(markers: CourtMapMarker[], showVenueLayer: boolean) {
  const markerData = markers.map((marker) => ({
    color: markerColor(marker),
    id: marker.id,
    latitude: marker.latitude,
    longitude: marker.longitude,
    name: marker.name,
  }));

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<style>
  html, body, #map { height: 100%; margin: 0; background: #d9f4ea; }
  .pin-label { font: 700 13px system-ui, sans-serif; color: #0b5133; }
  .pin-button { display:inline-block; margin-top:6px; font:600 12px system-ui,sans-serif; color:#fff; background:#008447; padding:6px 12px; border-radius:8px; }
</style>
</head>
<body>
<div id="map"></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
  var send = function (payload) {
    if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify(payload));
  };

  if (!window.L) {
    send({ type: "error" });
  } else {
    var map = L.map("map", { attributionControl: false, zoomControl: false })
      .setView([${mapCenter.latitude}, ${mapCenter.longitude}], ${defaultZoom});

    L.tileLayer("${tileUrl}", { maxZoom: ${maxZoom} }).addTo(map);

    var markers = ${JSON.stringify(markerData)};
    var layers = {};

    if (${showVenueLayer ? "true" : "false"}) {
      markers.forEach(function (marker) {
        var layer = L.marker([marker.latitude, marker.longitude], {
          icon: L.divIcon({ className: "", html: marker.pin, iconAnchor: [15, 38], iconSize: [30, 38] }),
          title: marker.name,
        }).addTo(map);

        layer.on("click", function () {
          send({ id: marker.id, name: marker.name, type: "marker" });
        });

        layers[marker.id] = layer;
      });
    }

    window.focusVenue = function (latitude, longitude) {
      map.setView([latitude, longitude], 15);
    };

    send({ type: "ready" });
  }
</script>
</body>
</html>`;
}

const OpenStreetMapCanvas = forwardRef<OpenStreetMapCanvasHandle, OpenStreetMapCanvasProps>(function OpenStreetMapCanvas(
  { geolocationUnavailableMessage, markers, onMarkerPress, showVenueLayer, unavailableMessage },
  ref,
) {
  const webViewRef = useRef<WebView>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const html = useMemo(() => buildHtml(markers, showVenueLayer), [markers, showVenueLayer]);

  useImperativeHandle(
    ref,
    () => ({
      focusVenue: (query: string) => {
        const needle = normalizeText(query);
        if (!needle) return false;

        const match = markers.find((marker) => normalizeText(marker.name).includes(needle));
        if (!match) return false;

        webViewRef.current?.injectJavaScript(`window.focusVenue(${match.latitude}, ${match.longitude}); true;`);
        return true;
      },
      locate: () => {
        // Vị trí lấy từ chính WebView để không phải xin thêm quyền native ở tầng RN.
        webViewRef.current?.injectJavaScript(`
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              function (position) { window.focusVenue(position.coords.latitude, position.coords.longitude); },
              function () { window.ReactNativeWebView.postMessage(JSON.stringify({ type: "geolocation-error" })); },
              { enableHighAccuracy: true, timeout: 10000 }
            );
          } else {
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: "geolocation-error" }));
          }
          true;
        `);
      },
    }),
    [markers],
  );

  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const payload = JSON.parse(event.nativeEvent.data) as { id?: string; type: string };

      if (payload.type === "marker" && payload.id) onMarkerPress(payload.id);
      if (payload.type === "geolocation-error") setStatusMessage(geolocationUnavailableMessage);
      if (payload.type === "error") setStatusMessage(unavailableMessage);
      if (payload.type === "ready") setStatusMessage("");
    } catch {
      setStatusMessage(unavailableMessage);
    }
  };

  return (
    <View className="absolute inset-0">
      <WebView
        allowsInlineMediaPlayback
        geolocationEnabled
        onError={() => setStatusMessage(unavailableMessage)}
        onMessage={handleMessage}
        originWhitelist={["*"]}
        ref={webViewRef}
        source={{ html }}
        style={{ backgroundColor: "#d9f4ea", flex: 1 }}
      />

      {statusMessage ? (
        <View className="absolute inset-x-6 top-1/2 rounded-2xl bg-white/95 p-4" style={shadow.raised}>
          <Text className="text-center text-[14px] font-medium text-slate-700">{statusMessage}</Text>
        </View>
      ) : null}
    </View>
  );
});

export default OpenStreetMapCanvas;
