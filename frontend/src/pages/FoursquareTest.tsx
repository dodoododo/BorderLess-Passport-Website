import { useState } from "react";

// --- 1. ĐỊNH NGHĨA TYPESCRIPT CHUẨN CHO FOURSQUARE API ---
interface FsqCategory {
  id: number;
  name: string;
  icon: { prefix: string; suffix: string };
}

interface FsqLocation {
  address?: string;
  cross_street?: string;
  locality?: string;
  postcode?: string;
  region?: string;
  country?: string;
  formatted_address?: string;
}

interface FsqGeocodes {
  main?: { latitude: number; longitude: number };
  roof?: { latitude: number; longitude: number };
}

interface FsqPlace {
  fsq_id: string;
  name: string;
  distance: number;
  timezone?: string;
  categories: FsqCategory[];
  location: FsqLocation;
  geocodes: FsqGeocodes;
}

// --- 2. COMPONENT CHÍNH ---
export default function FoursquareTest() {
  const [near, setNear] = useState("Tokyo, Japan");
  const [query, setQuery] = useState("Tourist Attractions");
  
  // Lưu ý: Foursquare trả về object có chứa mảng 'results'
  const [places, setPlaces] = useState<FsqPlace[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      setError(null);
      setPlaces([]);

      const url = new URL('http://localhost:5000/api/places/search');
      if (near) url.searchParams.append('near', near);
      if (query) url.searchParams.append('query', query);

      const response = await fetch(url.toString());
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Lỗi ${response.status}`);
      }

      // Lưu thẳng mảng results vào state
      setPlaces(result.results || []);
      
    } catch (err: any) {
      console.error("Lỗi API:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Hàm phụ: Format khoảng cách cho đẹp (mét -> km)
  const formatDistance = (meters: number) => {
    return meters >= 1000 ? `${(meters / 1000).toFixed(1)} km` : `${meters} m`;
  };

  // Hàm phụ: Render link icon của Foursquare (size 64px, nền dark)
  const getIconUrl = (icon: { prefix: string; suffix: string }) => {
    return `${icon.prefix}bg_64${icon.suffix}`;
  };

  return (
    <div className="p-6 md:p-10 mt-16 max-w-7xl mx-auto font-sans">
      
      {/* HEADER & FORM TÌM KIẾM */}
      <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700 shadow-xl backdrop-blur-sm mb-8">
        <h2 className="text-3xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
          <span>🌍</span> Khám phá địa điểm (Foursquare API)
        </h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={near}
            onChange={(e) => setNear(e.target.value)}
            placeholder="Khu vực (VD: Tokyo, Japan)..."
            className="flex-1 bg-slate-800 border border-slate-600 text-slate-100 px-4 py-3 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Từ khóa (VD: Coffee, Museum)..."
            className="flex-1 bg-slate-800 border border-slate-600 text-slate-100 px-4 py-3 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          />
          <button 
            onClick={fetchPlaces} 
            disabled={loading}
            className={`px-8 py-3 rounded-lg font-bold text-white transition-all ${
              loading 
                ? "bg-slate-600 cursor-not-allowed" 
                : "bg-emerald-600 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95"
            }`}
          >
            {loading ? "Đang quét radar..." : "Tìm Kiếm"}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400 font-medium">
            🚨 Lỗi: {error}
          </div>
        )}
      </div>

      {/* DANH SÁCH KẾT QUẢ - GRID LAYOUT */}
      {places.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => (
            <div 
              key={place.fsq_id} 
              className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-colors group flex flex-col"
            >
              
              {/* CARD HEADER: Tên & Khoảng cách */}
              <div className="p-5 pb-3 border-b border-slate-700/50">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {place.name}
                  </h3>
                  <span className="shrink-0 bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    📍 {formatDistance(place.distance)}
                  </span>
                </div>
              </div>

              {/* CARD BODY: Phân loại & Địa chỉ */}
              <div className="p-5 flex-1 flex flex-col gap-4">
                
                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                  {place.categories.map((cat) => (
                    <div key={cat.id} className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700">
                      <img 
                        src={getIconUrl(cat.icon)} 
                        alt={cat.name} 
                        className="w-5 h-5 opacity-80"
                      />
                      <span className="text-sm text-slate-300">{cat.name}</span>
                    </div>
                  ))}
                </div>

                {/* Location Details */}
                <div className="space-y-1 mt-auto">
                  <p className="text-sm text-slate-400 flex gap-2">
                    <span className="shrink-0">🏠</span>
                    <span>
                      {place.location.formatted_address || 
                       `${place.location.address || ''} ${place.location.locality || ''}` || 
                       "Chưa cập nhật địa chỉ cụ thể"}
                    </span>
                  </p>
                  
                  {(place.location.region || place.location.country) && (
                    <p className="text-xs text-slate-500 flex gap-2">
                      <span className="shrink-0">🌎</span>
                      <span>
                        {[place.location.region, place.location.country]
                          .filter(Boolean)
                          .join(" - ")}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              {/* CARD FOOTER: Metadata (Tọa độ, Timezone, FSQ ID) */}
              <div className="bg-slate-900/50 p-4 border-t border-slate-700/50 text-xs text-slate-500 grid grid-cols-2 gap-2">
                <div className="col-span-2 flex justify-between">
                  <span className="font-mono text-slate-600 truncate mr-2" title={place.fsq_id || "No ID"}>
                    ID: {place.fsq_id ? place.fsq_id.substring(0, 8) : "N/A"}...
                  </span>
                  {place.timezone && (
                    <span className="flex items-center gap-1">
                      🕒 {place.timezone}
                    </span>
                  )}
                </div>
                
                {place.geocodes?.main && (
                  <div className="col-span-2 mt-2 font-mono bg-slate-950 p-2 rounded text-center text-slate-400">
                    Lat: {place.geocodes.main.latitude.toFixed(4)} | Lng: {place.geocodes.main.longitude.toFixed(4)}
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      ) : (
        !loading && !error && (
          <div className="text-center py-20 text-slate-500">
            <p className="text-xl">Chưa có dữ liệu.</p>
            <p className="mt-2 text-sm">Hãy nhập địa điểm và từ khóa rồi bấm tìm kiếm nhé!</p>
          </div>
        )
      )}
    </div>
  );
}