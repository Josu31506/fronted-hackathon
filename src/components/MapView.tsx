import { useEffect, useMemo, useRef, useState } from 'react';
import { Listing } from '../types';

declare global {
  interface Window {
    google: any;
  }
}

interface MapViewProps {
  listings: Listing[];
}

type MapStatus = 'idle' | 'missing-key' | 'loading' | 'ready' | 'error';

const MAP_SCRIPT_ID = 'campusroom-google-maps-script';

const loadGoogleMapsScript = (apiKey: string): Promise<void> => {
  if (typeof window === 'undefined') return Promise.reject();

  const existingScript = document.getElementById(MAP_SCRIPT_ID) as HTMLScriptElement | null;
  if (existingScript && window.google?.maps) {
    return Promise.resolve();
  }

  if (existingScript && !window.google?.maps) {
    return new Promise((resolve, reject) => {
      existingScript.addEventListener('load', () => resolve());
      existingScript.addEventListener('error', () => reject());
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.id = MAP_SCRIPT_ID;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.body.appendChild(script);
  });
};

export const MapView = ({ listings }: MapViewProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [mapStatus, setMapStatus] = useState<MapStatus>('idle');

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

  const center = useMemo(() => {
    if (listings.length === 0) {
      return { lat: -12.0635, lng: -77.0785 };
    }

    const avgLat = listings.reduce((sum, item) => sum + item.latitude, 0) / listings.length;
    const avgLng = listings.reduce((sum, item) => sum + item.longitude, 0) / listings.length;
    return { lat: avgLat, lng: avgLng };
  }, [listings]);

  useEffect(() => {
    if (!apiKey) {
      setMapStatus('missing-key');
      return;
    }

    setMapStatus('loading');

    loadGoogleMapsScript(apiKey)
      .then(() => setMapStatus('ready'))
      .catch(() => setMapStatus('error'));
  }, [apiKey]);

  useEffect(() => {
    if (mapStatus !== 'ready' || !mapContainerRef.current || !window.google?.maps || mapInstanceRef.current) return;

    mapInstanceRef.current = new window.google.maps.Map(mapContainerRef.current, {
      center,
      zoom: 15,
      disableDefaultUI: true,
      styles: [
        { elementType: 'geometry', stylers: [{ color: '#F7FAFC' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#1E293B' }] },
        { featureType: 'poi', stylers: [{ visibility: 'off' }] },
        { featureType: 'transit', stylers: [{ visibility: 'off' }] },
        { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#E2E8F0' }] },
        { featureType: 'road', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
      ],
    });
  }, [center, mapStatus]);

  useEffect(() => {
    if (mapInstanceRef.current && window.google?.maps) {
      mapInstanceRef.current.setCenter(center);
    }
  }, [center]);

  useEffect(() => {
    if (!mapInstanceRef.current || !window.google?.maps) return;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    listings.forEach((listing) => {
      const marker = new window.google.maps.Marker({
        position: { lat: listing.latitude, lng: listing.longitude },
        map: mapInstanceRef.current,
        title: listing.title,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div style="font-size: 14px; color: #1E293B;"><strong>${listing.title}</strong><br/>S/ ${listing.price} · ${listing.address}</div>`,
      });

      marker.addListener('click', () => {
        infoWindow.open({ anchor: marker, map: mapInstanceRef.current });
      });

      markersRef.current.push(marker);
    });

    if (listings.length > 0 && window.google?.maps) {
      const bounds = new window.google.maps.LatLngBounds();
      listings.forEach((listing) => bounds.extend({ lat: listing.latitude, lng: listing.longitude }));
      mapInstanceRef.current.fitBounds(bounds, 48);
    }
  }, [listings]);

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
      <div className="relative h-[360px] w-full">
        {mapStatus === 'ready' && <div ref={mapContainerRef} className="h-full w-full" />}

        {(mapStatus === 'loading' || mapStatus === 'idle') && (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 via-white to-secondary/20">
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow">
              <span className="h-3 w-3 animate-ping rounded-full bg-primary" />
              <p className="text-sm font-medium text-slate-700">Cargando Google Maps…</p>
            </div>
          </div>
        )}

        {(mapStatus === 'missing-key' || mapStatus === 'error') && (
          <div className="flex h-full flex-col items-center justify-center gap-2 bg-slate-50 px-6 text-center text-slate-700">
            <p className="text-sm font-semibold">Conecta tu API Key de Google Maps para visualizar el mapa.</p>
            <p className="text-xs text-slate-500">
              Añade la variable <span className="font-mono">VITE_GOOGLE_MAPS_API_KEY</span> en un archivo <span className="font-mono">.env</span> y
              reinicia el servidor.
            </p>
          </div>
        )}

        {listings.length === 0 && mapStatus === 'ready' && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/70 text-sm text-slate-600">
            Añade avisos para visualizar marcadores en el mapa.
          </div>
        )}
      </div>
      <div className="border-t bg-slate-50 px-4 py-3 text-xs text-slate-600">
        Integración lista para Google Maps JS API. Usa tu clave en <span className="font-mono">VITE_GOOGLE_MAPS_API_KEY</span> para cargar el mapa
        real. Marcadores y ventanas de información muestran los avisos mock.
      </div>
    </div>
  );
};
