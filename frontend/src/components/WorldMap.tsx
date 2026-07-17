import { useEffect, useRef, useState, useCallback } from 'react';
import maplibregl, { Map as MLMap } from 'maplibre-gl';
import { MapboxOverlay } from '@deck.gl/mapbox';
import { GeoJsonLayer, ArcLayer } from '@deck.gl/layers';
import * as topojson from 'topojson-client';
import type { Feature, FeatureCollection } from 'geojson';
import type { MapMode, WorldMapProps } from '../types/types';

const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY as string;

// Style URL cho từng chế độ hiển thị. MapTiler cung cấp sẵn các style này.
const STYLE_URLS: Record<Exclude<MapMode, 'flat'>, string> = {
  globe: `https://api.maptiler.com/maps/darkmatter/style.json?key=${MAPTILER_KEY}`,
  satellite: `https://api.maptiler.com/maps/satellite/style.json?key=${MAPTILER_KEY}`,
  streets: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`,
};

// 'flat' dùng chung style dark với 'globe', chỉ khác projection
const styleForMode = (mode: MapMode) =>
  mode === 'flat' ? STYLE_URLS.globe : STYLE_URLS[mode];

const MODE_LABELS: Record<MapMode, string> = {
  globe: '🌐 3D Cầu',
  flat: '🗺️ 2D Phẳng',
  satellite: '🛰️ Vệ tinh',
  streets: '🏙️ Thông thường',
};

export function WorldMap({
  countryColors = {},
  flights = [],
  initialCenter = [105.8, 21.0], // Hà Nội mặc định
  initialZoom = 2,
  initialMode = 'globe',
  onCountryClick,
  height = '600px', // dùng giá trị cố định thay vì '100%' — tránh bị 0px khi div cha không set height
}: WorldMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MLMap | null>(null);
  const overlayRef = useRef<MapboxOverlay | null>(null);
  const countriesRef = useRef<FeatureCollection | null>(null);

  const [mode, setMode] = useState<MapMode>(initialMode);
  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Xây layer deck.gl (tô quốc gia + arc bay) từ state hiện tại
  const buildLayers = useCallback(() => {
    const layers = [];

    if (countriesRef.current) {
      layers.push(
        new GeoJsonLayer({
          id: 'countries-fill',
          data: countriesRef.current,
          filled: true,
          stroked: true,
          getFillColor: (f: Feature) => {
            const iso3 = f.properties?.iso_a3 ?? f.properties?.ISO_A3;
            return countryColors[iso3] ?? [80, 80, 80, 20];
          },
          getLineColor: [255, 255, 255, 60],
          lineWidthMinPixels: 0.5,
          pickable: true,
          autoHighlight: true,
          highlightColor: [255, 255, 255, 80],
          onClick: (info: any) => {
            const iso3 = info?.object?.properties?.iso_a3 ?? info?.object?.properties?.ISO_A3;
            if (iso3 && onCountryClick) onCountryClick(iso3);
          },
        })
      );
    }

    if (flights.length > 0) {
      layers.push(
        new ArcLayer({
          id: 'flight-arcs',
          data: flights,
          getSourcePosition: (d: (typeof flights)[number]) => d.from,
          getTargetPosition: (d: (typeof flights)[number]) => d.to,
          getSourceColor: (d: (typeof flights)[number]) => [...(d.color ?? [59, 130, 246]), 200],
          getTargetColor: (d: (typeof flights)[number]) => [...(d.color ?? [59, 130, 246]), 200],
          getWidth: 2,
          getHeight: 0.4, // độ cong của cung — tăng lên nếu muốn cong nhiều hơn
          greatCircle: true, // vẽ theo đường cong địa cầu thay vì đường thẳng
        })
      );
    }

    return layers;
  }, [countryColors, flights, onCountryClick]);

  // Khởi tạo map — chỉ chạy 1 lần
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    if (!MAPTILER_KEY) {
      const msg = 'Thiếu VITE_MAPTILER_KEY trong file .env (đặt ở thư mục frontend, restart lại dev server sau khi thêm)';
      console.error(msg);
      setLoadError(msg);
      return; // dừng lại, không gọi map với key rỗng
    }

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: styleForMode(initialMode),
      center: initialCenter,
      zoom: initialZoom,
      pitch: initialMode === 'globe' ? 20 : 0,
      maxPitch: 85,
      attributionControl: {
        compact: true
      },
    });

    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');

    map.on('style.load', () => {
      map.setProjection({ type: initialMode === 'flat' ? 'mercator' : 'globe' });
    });

    map.on('error', (e) => {
      console.error('MapLibre error:', e.error);
      setLoadError(e.error?.message ?? 'Lỗi không xác định khi tải bản đồ (kiểm tra API key / mạng)');
    });

    map.on('load', async () => {
      try {
        // Tải ranh giới quốc gia (world-atlas 110m, đủ mượt cho cấp độ quốc gia)
        const res = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
        if (!res.ok) throw new Error(`Không tải được dữ liệu ranh giới (HTTP ${res.status})`);
        const topo = await res.json();
        const geo = topojson.feature(topo, topo.objects.countries) as unknown as FeatureCollection;
        countriesRef.current = geo;

        const overlay = new MapboxOverlay({ layers: buildLayers() });
        map.addControl(overlay as any);
        overlayRef.current = overlay;

        setReady(true);
      } catch (err) {
        console.error('Lỗi khi khởi tạo layer quốc gia:', err);
        setLoadError(err instanceof Error ? err.message : 'Lỗi khi tải dữ liệu bản đồ');
      }
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cập nhật layer khi countryColors/flights đổi
  useEffect(() => {
    if (ready && overlayRef.current) {
      overlayRef.current.setProps({ layers: buildLayers() });
    }
  }, [ready, buildLayers]);

  // Đổi style/projection khi user chọn mode khác
  const handleModeChange = useCallback((newMode: MapMode) => {
    const map = mapRef.current;
    if (!map || newMode === mode) return; // tránh xử lý thừa khi click lại mode đang chọn

    setMode(newMode);
    map.setStyle(styleForMode(newMode));

    map.once('style.load', () => {
      map.setProjection({ type: newMode === 'flat' ? 'mercator' : 'globe' });
      map.setPitch(newMode === 'globe' ? 20 : 0);
      // KHÔNG add lại overlay ở đây: MapboxOverlay là 1 control độc lập, không
      // nằm trong style — setStyle() không hề gỡ nó đi, nên add lại sẽ tạo ra
      // canvas overlay THỨ HAI chồng lên canvas cũ (đây chính là bug "chồng lớp").
      // Layer bên trong overlay (màu quốc gia, đường bay) vẫn còn nguyên, không cần vẽ lại.
    });
  }, [mode]);

  return (
    <div
      className="isolate overflow-hidden rounded-2xl border border-white/10"
      style={{ position: 'relative', width: '100%', height, zIndex: 0 }}
    >
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

      <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2 bg-black/60 backdrop-blur-sm p-2 rounded-xl">
        {(['globe', 'flat', 'satellite', 'streets'] as MapMode[]).map((m) => (
          <button
            key={m}
            onClick={() => handleModeChange(m)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
              mode === m
                ? 'bg-blue-500 text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            {MODE_LABELS[m]}
          </button>
        ))}
      </div>

      {!ready && !loadError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm z-20">
          Đang tải bản đồ...
        </div>
      )}

      {loadError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-red-300 text-sm z-20 p-6 text-center">
          ⚠️ {loadError}
        </div>
      )}
    </div>
  );
}