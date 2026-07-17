import { useState, useMemo, useRef, useEffect } from 'react';
import { usePassportData } from '../hooks/usePassportData';
import "flag-icons/css/flag-icons.min.css";

const getStatusColor = (status: string) => {
  switch (status) {
    case 'visa-free': return 'bg-green-100 text-green-800 border-green-200';
    case 'visa-required': return 'bg-red-100 text-red-800 border-red-200';
    case 'visa-on-arrival': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'e-visa': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'eta': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'no-admission': return 'bg-gray-800 text-white border-black';
    case 'home': return 'bg-indigo-100 text-indigo-800 border-indigo-300';
    case 'unknown': return 'bg-gray-100 text-gray-500 border-gray-300 border-dashed';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const STATUS_LABELS: Record<string, string> = {
  'visa-free': 'Miễn visa',
  'visa-required': 'Cần visa',
  'visa-on-arrival': 'Visa tại cửa khẩu',
  'e-visa': 'E-visa',
  'eta': 'ETA',
  'no-admission': 'Không được nhập cảnh',
  'home': 'Quốc gia của bạn',
  'unknown': 'Không có dữ liệu',
};

// Toàn bộ mã ISO 3166-1 alpha-2 (dùng để render dropdown chọn quốc gia)
const ALL_COUNTRY_CODES = [
  'AF','AL','DZ','AD','AO','AG','AR','AM','AU','AT','AZ','BS','BH','BD','BB','BY','BE','BZ','BJ',
  'BT','BO','BA','BW','BR','BN','BG','BF','BI','KH','CM','CA','CV','CF','TD','CL','CN','CO','KM',
  'CG','CD','CR','CI','HR','CU','CY','CZ','DK','DJ','DM','DO','EC','EG','SV','GQ','ER','EE','SZ',
  'ET','FJ','FI','FR','GA','GM','GE','DE','GH','GR','GD','GT','GN','GW','GY','HT','HN','HK','HU',
  'IS','IN','ID','IR','IQ','IE','IL','IT','JM','JP','JO','KZ','KE','KI','XK','KW','KG','LA','LV',
  'LB','LS','LR','LY','LI','LT','LU','MO','MG','MW','MY','MV','ML','MT','MH','MR','MU','MX','FM',
  'MD','MC','MN','ME','MA','MZ','MM','NA','NR','NP','NL','NZ','NI','NE','NG','KP','MK','NO','OM',
  'PK','PW','PS','PA','PG','PY','PE','PH','PL','PT','QA','RO','RU','RW','KN','LC','WS','SM','ST',
  'SA','SN','RS','SC','SL','SG','SK','SI','SB','SO','ZA','KR','SS','ES','LK','VC','SD','SR','SE',
  'CH','SY','TW','TJ','TZ','TH','TL','TG','TO','TT','TN','TM','TV','TR','UG','UA','AE','GB','US',
  'UY','UZ','VU','VA','VE','VN','YE','ZM','ZW',
];

const regionNamesVi = new Intl.DisplayNames(['vi'], { type: 'region' });

const getCountryName = (iso: string): string => {
  try {
    return regionNamesVi.of(iso.toUpperCase()) ?? iso;
  } catch {
    return iso;
  }
};

// Danh sách quốc gia đã sắp xếp theo bảng chữ cái (tên tiếng Việt), dùng chung cho dropdown
const SORTED_COUNTRIES = ALL_COUNTRY_CODES
  .map((code) => ({ code, name: getCountryName(code) }))
  .sort((a, b) => a.name.localeCompare(b.name, 'vi'));

const normalizeStatus = (status: unknown): string => {
  if (status === null || status === undefined) return 'unknown';

  if (typeof status === 'number') {
    if (status === -1) return 'home';
    return status < 0 ? 'unknown' : 'visa-free';
  }

  const raw = String(status).trim();

  if (/^-?\d+$/.test(raw)) {
    const num = parseInt(raw, 10);
    if (num === -1) return 'home';
    return num < 0 ? 'unknown' : 'visa-free';
  }

  const key = raw.toLowerCase().replace(/[\s_]+/g, '-');

  const KNOWN = new Set([
    'visa-free',
    'visa-required',
    'visa-on-arrival',
    'e-visa',
    'eta',
    'no-admission',
  ]);

  return KNOWN.has(key) ? key : 'unknown';
};

const getStayDays = (status: unknown): number | null => {
  const raw = String(status).trim();
  if (/^\d+$/.test(raw)) return parseInt(raw, 10);
  return null;
};

// ==== Dropdown chọn quốc gia (kèm cờ, có ô tìm kiếm, sắp theo a-z) ====
function CountrySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (iso: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = useMemo(() => {
    if (!query) return SORTED_COUNTRIES;
    return SORTED_COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.code.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const selected = SORTED_COUNTRIES.find((c) => c.code === value);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-lg">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl bg-white hover:border-blue-300 transition-colors"
      >
        {selected && (
          <span className={`fi fi-${selected.code.toLowerCase()} rounded-sm shadow-sm text-2xl`} />
        )}
        <span className="font-bold text-gray-800 flex-1 text-left">
          {selected ? selected.name : 'Chọn quốc gia của bạn'}
        </span>
        <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-full bg-white border-2 border-gray-200 rounded-xl shadow-xl overflow-hidden">
          <input
            autoFocus
            type="text"
            placeholder="Tìm quốc gia..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 border-b border-gray-200 text-sm focus:outline-none"
          />
          <div className="max-h-72 overflow-y-auto">
            {filtered.length === 0 && (
              <p className="px-4 py-3 text-sm text-gray-400">Không tìm thấy quốc gia</p>
            )}
            {filtered.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  onChange(c.code);
                  setIsOpen(false);
                  setQuery('');
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-blue-50 transition-colors ${
                  c.code === value ? 'bg-blue-50 font-bold' : ''
                }`}
              >
                <span className={`fi fi-${c.code.toLowerCase()} rounded-sm shadow-sm text-xl`} />
                <span className="text-base font-semibold uppercase tracking-wider text-gray-700 shadow-inner">{c.name}</span>
                <span className="text-[10px] text-gray-400 font-mono">{c.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function PassportExplorer({ iso: initialIso }: { iso: string }) {
  const [iso, setIso] = useState(initialIso);
  const { data, loading, error } = usePassportData(iso);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const stats = useMemo(() => {
    if (!data?.destinations) return [];
    const counts: Record<string, number> = {};
    Object.values(data.destinations).forEach((val) => {
      const status = normalizeStatus(val);
      if (status === 'home') return;
      counts[status] = (counts[status] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [data]);

  const allEntries = useMemo(() => {
    if (!data?.destinations) return [];
    return Object.entries(data.destinations)
      .filter(([, val]) => normalizeStatus(val) !== 'home')
      .sort(([a], [b]) => getCountryName(a).localeCompare(getCountryName(b), 'vi'));
  }, [data]);

  const filteredDestinations = allEntries.filter(([code, val]) => {
    const matchesType = !selectedType || normalizeStatus(val) === selectedType;
    const matchesSearch =
      !search || getCountryName(code).toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto ">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <h2 className="text-3xl font-extrabold text-gray-800 whitespace-nowrap">
          Passport:
        </h2>
        <CountrySelect value={iso} onChange={setIso} />
      </div>

      {loading && <div className="text-center p-10">Đang tải...</div>}
      {error && <div className="text-red-500">Lỗi: {error}</div>}

      {!loading && !error && data && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {stats.map(([type, count]) => (
              <button
                key={type}
                onClick={() => setSelectedType(selectedType === type ? null : type)}
                className={`p-5 rounded-2xl border-2 transition-all hover:scale-105 ${getStatusColor(type)} ${
                  selectedType === type ? 'ring-4 ring-offset-2 ring-blue-300' : ''
                }`}
              >
                <p className="text-xs font-bold uppercase">{STATUS_LABELS[type] ?? type}</p>
                <p className="text-4xl font-black">{count}</p>
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Tìm điểm đến..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-6 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {filteredDestinations.map(([country, status]) => {
              const normalized = normalizeStatus(status);
              const days = getStayDays(status);
              return (
                <div
                  key={country}
                  className={`px-3 py-2 rounded-lg border text-sm flex flex-col ${getStatusColor(normalized)}`}
                >
                  <span className={`fi fi-${country.toLowerCase()} rounded-sm shadow-sm text-3xl`} />
                  <span className="font-bold truncate">{getCountryName(country)}</span>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[10px] opacity-60 font-mono">{country}</span>
                    <span className="text-[10px] opacity-70 font-mono font-bold bg-white/50 px-1 rounded">
                      {days !== null ? `${days} ngày` : STATUS_LABELS[normalized] ?? String(status)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}