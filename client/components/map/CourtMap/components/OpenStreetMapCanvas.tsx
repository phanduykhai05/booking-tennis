"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

import type { CourtMapMarker } from "@/components/map/CourtMap/types";

type LeafletMap = {
  remove: () => void;
  setView: (coordinates: [number, number], zoom: number) => LeafletMap;
};

type LeafletLayer = {
  addTo: (map: LeafletMap) => LeafletLayer;
};

type LeafletApi = {
  divIcon: (options: { className: string; html: string; iconAnchor: [number, number]; iconSize: [number, number] }) => unknown;
  map: (element: HTMLElement, options: { attributionControl: boolean; zoomControl: boolean }) => LeafletMap;
  marker: (coordinates: [number, number], options: { icon: unknown; title: string }) => LeafletLayer;
  tileLayer: (url: string, options: { maxZoom: number }) => LeafletLayer;
};

declare global {
  interface Window {
    L?: LeafletApi;
  }
}

export type OpenStreetMapCanvasHandle = {
  locate: () => void;
};

type OpenStreetMapCanvasProps = {
  geolocationUnavailableMessage: string;
  markers: CourtMapMarker[];
  showVenueLayer: boolean;
  unavailableMessage: string;
};

const leafletScriptId = "leaflet-library";
const leafletStyleId = "leaflet-styles";
const mapCenter: [number, number] = [10.7769, 106.7009];

const sportColors: Record<CourtMapMarker["sport"], string> = {
  athletics: "#e11d48",
  badminton: "#0f9b58",
  basketball: "#d97706",
  football: "#16a34a",
  pickleball: "#2563eb",
  swimming: "#0891b2",
  tableTennis: "#db2777",
  taekwondo: "#4f46e5",
  tennis: "#ea580c",
  volleyball: "#7c3aed",
};

function getMarkerHtml(marker: CourtMapMarker) {
  const color = marker.isFeatured ? "#e11d48" : sportColors[marker.sport];
  return `<span style="display:flex;align-items:center;justify-content:center;width:30px;height:38px;filter:drop-shadow(0 2px 2px rgba(15,23,42,.28))"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="38" viewBox="0 0 30 38"><path fill="${color}" stroke="#fff" stroke-width="1.4" d="M15 1C7.3 1 1 7.3 1 15c0 10.2 12.2 20.9 13.2 21.7.5.4 1.1.4 1.6 0C16.8 35.9 29 25.2 29 15 29 7.3 22.7 1 15 1Z"/><circle cx="15" cy="14.7" r="8.1" fill="#fff"/><path fill="${color}" d="M10.6 9.3h8.8V11h-8.8zm0 3.2h8.8v1.7h-8.8zm0 3.2h5.6v1.7h-5.6z"/></svg></span>`;
}

function loadLeaflet() {
  if (window.L) return Promise.resolve(window.L);

  if (!document.getElementById(leafletStyleId)) {
    const stylesheet = document.createElement("link");
    stylesheet.id = leafletStyleId;
    stylesheet.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    stylesheet.rel = "stylesheet";
    document.head.append(stylesheet);
  }

  const existingScript = document.getElementById(leafletScriptId) as HTMLScriptElement | null;
  if (existingScript) {
    return new Promise<LeafletApi>((resolve, reject) => {
      existingScript.addEventListener("load", () => window.L ? resolve(window.L) : reject(new Error("Leaflet không khả dụng.")), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Không thể tải Leaflet.")), { once: true });
    });
  }

  return new Promise<LeafletApi>((resolve, reject) => {
    const script = document.createElement("script");
    script.id = leafletScriptId;
    script.async = true;
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => window.L ? resolve(window.L) : reject(new Error("Leaflet không khả dụng."));
    script.onerror = () => reject(new Error("Không thể tải Leaflet."));
    document.head.append(script);
  });
}

const OpenStreetMapCanvas = forwardRef<OpenStreetMapCanvasHandle, OpenStreetMapCanvasProps>(function OpenStreetMapCanvas({ geolocationUnavailableMessage, markers, showVenueLayer, unavailableMessage }, ref) {
  const mapElementRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  useImperativeHandle(ref, () => ({
    locate: () => {
      if (!navigator.geolocation || !mapRef.current) {
        setStatusMessage(geolocationUnavailableMessage);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          mapRef.current?.setView([coords.latitude, coords.longitude], 15);
          setStatusMessage("");
        },
        () => setStatusMessage(geolocationUnavailableMessage),
        { enableHighAccuracy: true, timeout: 10000 },
      );
    },
  }), [geolocationUnavailableMessage]);

  useEffect(() => {
    if (!mapElementRef.current) return;

    let isMounted = true;
    let map: LeafletMap | null = null;

    loadLeaflet()
      .then((leaflet) => {
        if (!isMounted || !mapElementRef.current) return;

        const mapInstance = leaflet.map(mapElementRef.current, {
          attributionControl: false,
          zoomControl: false,
        }).setView(mapCenter, 12);
        map = mapInstance;
        mapRef.current = mapInstance;

        leaflet.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(mapInstance);
        if (showVenueLayer) {
          markers.forEach((marker) => {
            leaflet.marker([marker.latitude, marker.longitude], {
              icon: leaflet.divIcon({
                className: "",
                html: getMarkerHtml(marker),
                iconAnchor: [15, 38],
                iconSize: [30, 38],
              }),
              title: `Sân ${marker.sport}`,
            }).addTo(mapInstance);
          });
        }
      })
      .catch(() => {
        if (isMounted) setStatusMessage(unavailableMessage);
      });

    return () => {
      isMounted = false;
      map?.remove();
      mapRef.current = null;
    };
  }, [markers, showVenueLayer, unavailableMessage]);

  return (
    <div className="absolute inset-0">
      <div className="size-full" ref={mapElementRef} />
      {statusMessage && <p className="absolute inset-x-6 top-1/2 -translate-y-1/2 rounded-2xl bg-white/95 p-4 text-center text-sm font-medium text-slate-700 shadow-[0_4px_20px_rgba(15,23,42,0.18)]">{statusMessage}</p>}
    </div>
  );
});

export default OpenStreetMapCanvas;
