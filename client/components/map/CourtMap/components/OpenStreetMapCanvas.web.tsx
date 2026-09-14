import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Text, View } from "react-native";

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

type MapMessage = {
  id?: string;
  type: "error" | "geolocation-error" | "marker" | "ready";
};

const mapCenter = { latitude: 21.0285, longitude: 105.81 };

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

function buildHtml(markers: CourtMapMarker[], showVenueLayer: boolean) {
  const markerData = markers.map((marker) => ({
    color: marker.isFeatured ? "#e11d48" : sportColors[marker.sport],
    id: marker.id,
    latitude: marker.latitude,
    longitude: marker.longitude,
    name: marker.name,
  }));

  return `<!doctype html>
<html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<style>html,body,#map{height:100%;margin:0;background:#d9f4ea}</style></head><body><div id="map"></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script><script>
var send=function(payload){window.parent.postMessage(payload,"*")};
if(!window.L){send({type:"error"})}else{
 var map=L.map("map",{attributionControl:false,zoomControl:false}).setView([${mapCenter.latitude},${mapCenter.longitude}],12);
 L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19}).addTo(map);
 var markers=${JSON.stringify(markerData)};
 var pinHtml=function(color){return '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="38" viewBox="0 0 30 38"><path fill="'+color+'" stroke="#fff" stroke-width="1.4" d="M15 1C7.3 1 1 7.3 1 15c0 10.2 12.2 20.9 13.2 21.7.5.4 1.1.4 1.6 0C16.8 35.9 29 25.2 29 15 29 7.3 22.7 1 15 1Z"/><circle cx="15" cy="14.7" r="8.1" fill="#fff"/></svg>'};
 if(${showVenueLayer ? "true" : "false"}){markers.forEach(function(marker){var layer=L.marker([marker.latitude,marker.longitude],{icon:L.divIcon({className:"",html:pinHtml(marker.color),iconAnchor:[15,38],iconSize:[30,38]})}).addTo(map);layer.on("click",function(){send({id:marker.id,type:"marker"})})})}
 window.addEventListener("message",function(event){if(event.data.type==="focus")map.setView([event.data.latitude,event.data.longitude],15);if(event.data.type==="locate"){if(!navigator.geolocation){send({type:"geolocation-error"});return}navigator.geolocation.getCurrentPosition(function(position){map.setView([position.coords.latitude,position.coords.longitude],15)},function(){send({type:"geolocation-error"})},{enableHighAccuracy:true,timeout:10000})}});
 send({type:"ready"});
}</script></body></html>`;
}

const OpenStreetMapCanvas = forwardRef<OpenStreetMapCanvasHandle, OpenStreetMapCanvasProps>(function OpenStreetMapCanvas(
  { geolocationUnavailableMessage, markers, onMarkerPress, showVenueLayer, unavailableMessage },
  ref,
) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const html = useMemo(() => buildHtml(markers, showVenueLayer), [markers, showVenueLayer]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent<MapMessage>) => {
      if (event.source !== frameRef.current?.contentWindow) return;

      if (event.data.type === "marker" && event.data.id) onMarkerPress(event.data.id);
      if (event.data.type === "geolocation-error") setStatusMessage(geolocationUnavailableMessage);
      if (event.data.type === "error") setStatusMessage(unavailableMessage);
      if (event.data.type === "ready") setStatusMessage("");
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [geolocationUnavailableMessage, onMarkerPress, unavailableMessage]);

  useImperativeHandle(
    ref,
    () => ({
      focusVenue: (query: string) => {
        const needle = normalizeText(query);
        const match = markers.find((marker) => normalizeText(marker.name).includes(needle));
        if (!needle || !match) return false;

        frameRef.current?.contentWindow?.postMessage({ latitude: match.latitude, longitude: match.longitude, type: "focus" }, "*");
        return true;
      },
      locate: () => frameRef.current?.contentWindow?.postMessage({ type: "locate" }, "*"),
    }),
    [markers],
  );

  return (
    <View className="absolute inset-0">
      <iframe ref={frameRef} srcDoc={html} style={{ border: 0, display: "block", height: "100%", width: "100%" }} title="OpenStreetMap" />
      {statusMessage ? (
        <View className="absolute inset-x-6 top-1/2 rounded-2xl bg-white/95 p-4" style={shadow.raised}>
          <Text className="text-center text-[14px] font-medium text-slate-700">{statusMessage}</Text>
        </View>
      ) : null}
    </View>
  );
});

export default OpenStreetMapCanvas;
