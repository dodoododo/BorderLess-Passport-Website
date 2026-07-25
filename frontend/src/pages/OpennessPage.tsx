import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Unlock, ArrowRight, Globe, Users } from "lucide-react";

// Dữ liệu mẫu: Các quốc gia mở cửa nhất (cho phép gần như toàn bộ ~198 quốc tịch nhập cảnh dễ dàng)
const MOCK_OPENNESS = [
  { rank: 1, country: "Maldives", code: "MV", score: 198, allowedFree: 198, allowedVoa: 0, region: "Asia" },
  { rank: 1, country: "Seychelles", code: "SC", score: 198, allowedFree: 198, allowedVoa: 0, region: "Africa" },
  { rank: 3, country: "Cambodia", code: "KH", score: 195, allowedFree: 10, allowedVoa: 185, region: "Asia" },
  { rank: 4, country: "Sri Lanka", code: "LK", score: 192, allowedFree: 5, allowedVoa: 187, region: "Asia" },
  { rank: 5, country: "Rwanda", code: "RW", score: 189, allowedFree: 25, allowedVoa: 164, region: "Africa" },
  { rank: 80, country: "Vietnam", code: "VN", score: 25, allowedFree: 25, allowedVoa: 0, region: "Asia" },
  { rank: 198, country: "North Korea", code: "KP", score: 0, allowedFree: 0, allowedVoa: 0, region: "Asia" },
];

const CATEGORIES = ["All", "Top Welcoming", "Restrictive", "Asia", "Africa"];

export function Openness() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Logic filter giả lập (Bác có thể tinh chỉnh lại logic này khi nối API)
  const filteredRankings = MOCK_OPENNESS.filter((item) => {
    const matchesSearch = item.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesCategory = true;
    if (activeCategory === "Top Welcoming") matchesCategory = item.score > 150;
    if (activeCategory === "Restrictive") matchesCategory = item.score < 50;
    if (activeCategory === "Asia" || activeCategory === "Africa") matchesCategory = item.region === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6 md:px-10 font-sans">
      
      {/* 1. Header (Editorial Style - Violet Theme) */}
      <div className="max-w-5xl mx-auto mb-12">
        <h3 
          className="text-xs font-bold uppercase tracking-[0.3em] text-violet-500 mb-4 flex items-center gap-2"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          <Unlock className="w-4 h-4" />
          Index / Openness
        </h3>
        
        <h1 
          className="text-[40px] md:text-[56px] leading-[1.1] tracking-[-0.03em] text-foreground mb-6"
          style={{ fontFamily: "'Fraunces', 'Times New Roman', serif", fontWeight: 700 }}
        >
          The world's most <span className="italic text-violet-500 relative inline-block">
            welcoming
            <span className="absolute bottom-1 left-0 w-full h-[2px] bg-violet-500/30" />
          </span> borders.
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Đo lường mức độ hiếu khách của một quốc gia dựa trên số lượng quốc tịch được phép nhập cảnh mà không cần visa truyền thống. Đảo quốc và các quốc gia phụ thuộc du lịch thường thống trị bảng xếp hạng này.
        </p>
      </div>

      {/* 2. Thanh Công cụ (Search & Filter) */}
      <div className="max-w-5xl mx-auto mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-foreground/[0.03] border border-border/50 rounded-none focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-foreground font-medium placeholder:text-muted-foreground"
          />
        </div>
        
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
          <Globe className="w-4 h-4 text-muted-foreground mr-2 hidden md:block" />
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border ${
                activeCategory === category
                  ? "border-violet-500 bg-violet-500/10 text-violet-500"
                  : "border-border/50 bg-foreground/[0.02] text-muted-foreground hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Bảng Xếp Hạng (Block List) */}
      <div className="max-w-5xl mx-auto">
        {/* Tiêu đề cột (Desktop) */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border/50 mb-4">
          <div className="col-span-1">Rank</div>
          <div className="col-span-4">Destination</div>
          <div className="col-span-3">Region</div>
          <div className="col-span-2 text-center">Openness Score</div>
          <div className="col-span-2 text-right">Allowed Visitors</div>
        </div>

        {/* Danh sách */}
        <div className="flex flex-col gap-3">
          {filteredRankings.map((item, index) => (
            <motion.div 
              key={item.code}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 md:px-6 md:py-4 bg-foreground/[0.02] border border-border/50 hover:bg-foreground/[0.04] hover:border-violet-500/30 transition-all cursor-pointer"
            >
              {/* Cột Rank */}
              <div className="col-span-1 flex items-center justify-between md:justify-start">
                <span className="text-lg font-mono font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                  #{String(item.rank).padStart(2, '0')}
                </span>
                <span className="md:hidden font-bold text-lg">{item.country}</span>
              </div>

              {/* Cột Tên Quốc gia */}
              <div className="hidden md:flex col-span-4 items-center gap-4">
                <div className="w-8 h-6 bg-foreground/10 flex items-center justify-center text-[10px] font-mono border border-foreground/10">
                  {item.code}
                </div>
                <span className="text-lg font-semibold text-foreground">
                  {item.country}
                </span>
              </div>

              {/* Cột Khu vực (Region) */}
              <div className="col-span-12 md:col-span-3 flex flex-col py-2 md:py-0 border-y border-border/50 md:border-none my-2 md:my-0">
                <span className="md:hidden text-xs font-bold text-muted-foreground uppercase mb-1">Region</span>
                <span className="text-sm font-semibold text-foreground">{item.region}</span>
              </div>

              {/* Cột Openness Score */}
              <div className="col-span-6 md:col-span-2 flex flex-col md:items-center justify-center">
                <span className="md:hidden text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Score</span>
                <span className="text-2xl font-black text-violet-500 tracking-tight">
                  {item.score}
                </span>
              </div>

              {/* Cột Allowed Nationalities & Breakdown */}
              <div className="col-span-6 md:col-span-2 flex justify-end md:justify-between items-center gap-4">
                <div className="flex flex-col items-end text-sm">
                  <div className="flex items-center gap-1.5 text-foreground font-semibold">
                    <Users className="w-3.5 h-3.5 text-muted-foreground" />
                    {item.score} <span className="text-[10px] text-muted-foreground font-normal uppercase">Natl.</span>
                  </div>
                  {/* Breakdown nhỏ thể hiện bao nhiêu là Free, bao nhiêu là VOA */}
                  <span className="text-[10px] text-muted-foreground mt-0.5">
                    {item.allowedFree} Free • {item.allowedVoa} VOA
                  </span>
                </div>
                
                <div className="hidden md:flex w-8 h-8 bg-foreground/5 items-center justify-center group-hover:bg-violet-500 group-hover:text-white transition-colors border border-border/50 group-hover:border-transparent">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}