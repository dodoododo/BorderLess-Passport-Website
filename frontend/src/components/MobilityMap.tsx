import { memo, useMemo, useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import type { RankingData } from "../types/ranking.type";

interface MobilityMapProps {
  rankings: RankingData[];
  theme?: "dark" | "light";
}

const FALLBACK_ISO: Record<string, string> = {
  "France": "fr",
  "Norway": "no",
  "Somaliland": "so",
  "Kosovo": "xk",
  "Northern Cyprus": "cy",
  "Western Sahara": "ma",
};

const MobilityMapComponent = ({ rankings, theme }: MobilityMapProps) => {
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/data/countries.geojson")
      .then((res) => res.json())
      .then((geo) => {
        if (cancelled) return;
        if (!echarts.getMap("world")) {
          echarts.registerMap("world", geo);
        }
        setGeoData(geo);
      })
      .catch((err) => console.error("Error loading world geojson:", err));

    return () => {
      cancelled = true;
    };
  }, []);

  const option = useMemo(() => {
    if (!geoData) return null;
    const isDark = theme === "dark";

    // Tìm điểm cao nhất để set Max cho thanh màu tự động
    const maxScore = rankings.length > 0 ? Math.max(...rankings.map(r => r.globalScore)) : 200;

    return {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "item",
        backgroundColor: isDark ? "rgba(24, 24, 27, 0.9)" : "rgba(255, 255, 255, 0.9)",
        borderColor: isDark ? "#3f3f46" : "#e2e8f0",
        borderWidth: 1,
        textStyle: {
          color: isDark ? "#fafafa" : "#bdc1c9",
          fontSize: 13,
        },
        formatter: (params: any) => {
          const { name, value, data } = params;
          if (!data || value === undefined || isNaN(value)) {
            return `<b>${name || "Unknown"}</b><br/>No data available`;
          }
          return `
            <div style="display:flex; flex-direction:column; gap:4px; padding:2px;">
              <div style="font-weight:700; font-size:14px;">${name}</div>
              <div style="display:flex; justify-content:space-between; gap:12px;">
                <span style="opacity:0.7">Global Rank:</span>
                <span style="font-weight:bold; color:#10b981;">#${data.rank}</span>
              </div>
              <div style="display:flex; justify-content:space-between; gap:12px;">
                <span style="opacity:0.7">Mobility Score:</span>
                <span style="font-weight:bold; color:#10b981;">${value}</span>
              </div>
            </div>
          `;
        },
      },
      // Thang màu góc dưới bên trái
      visualMap: {
        left: "1%",
        bottom: "10%",
        min: 0,
        max: maxScore,
        text: ["High Mobility", "Low Mobility"],
        textStyle: { color: isDark ? "#02193b" : "#02193b", fontSize: 11 },
        calculable: true,
        inRange: {
          // Gradient từ Xám đậm (mobility thấp) -> Xanh lá cây sáng (mobility cao)
          color: isDark 
            ? ["#000000", "#70c96b"] // Đen sâu -> Xám vừa -> Xanh Emerald
            : ["#e2e8f0", "#94a3b8", "#059669"],
        },
      },
      series: [
        {
          type: "map",
          map: "world",
          roam: true,
          scaleLimit: { min: 1, max: 8 },
          top: "5%",
          bottom: "1%",
          left: "1%",
          right: "1%",
          itemStyle: {
            // Đường biên giới tương phản mạnh
            borderColor: isDark ? "#000000" : "#ffffff",
            borderWidth: 0.8,
            areaColor: isDark ? "#18181b" : "#f1f5f9", // Màu fallback
          },
          emphasis: {
            label: { show: false },
            itemStyle: {
              borderColor: isDark ? "#ffffff" : "#000000",
              borderWidth: 1.5,
              areaColor: "#3b82f6", // Màu xanh dương khi hover
            },
          },
          data: geoData.features.map((feature: any) => {
            const prop = feature.properties || {};
            const countryName = prop.name || "";
            
            let rawIso = (prop["ISO3166-1-Alpha-2"] || prop.iso_a2 || prop.id || "").toLowerCase();
            if (rawIso === "-99" || rawIso === "") {
              rawIso = FALLBACK_ISO[countryName] || rawIso;
            }

            const ranking = rankings.find(r => r.iso.toLowerCase() === rawIso);

            return {
              name: countryName,
              value: ranking ? ranking.globalScore : NaN, // ECharts dùng field `value` cho visualMap
              rank: ranking ? ranking.rank : "-",
              iso: rawIso,
            };
          }),
        },
      ],
    };
  }, [geoData, rankings, theme]);

  if (!option) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-sm opacity-60 animate-pulse">Loading world map…</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
      <ReactECharts
        option={option}
        style={{ width: "100%", height: "100%" }}
        opts={{ renderer: "canvas" }}
      />
    </div>
  );
};

export const MobilityMap = memo(MobilityMapComponent);