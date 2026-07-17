import { useState } from "react";
import { Header } from "./components/layout/Header";
import { PassportExplorer } from "./components/PassportExplorer";
import 'maplibre-gl/dist/maplibre-gl.css';
import { WorldMap } from './components/WorldMap';

const flights = [
  { from: [105.8, 21.0] as [number, number], to: [139.7, 35.7] as [number, number], color: [59, 130, 246] as [number, number, number] }, // Hà Nội → Tokyo
  { from: [105.8, 21.0] as [number, number], to: [-0.12, 51.5] as [number, number], color: [34, 197, 94] as [number, number, number] },  // Hà Nội → London
];

const countryColors: Record<string, [number, number, number, number]> = {
  JPN: [34, 197, 94, 160],  // xanh = visa-free
  GBR: [239, 68, 68, 160],  // đỏ = cần visa
  USA: [234, 179, 8, 160],  // vàng = e-visa
};

function App() {
  const [activeTab, setActiveTab] = useState("explorer");
  const [selectedPassport] = useState("VN");

  return (
    // z-0 + isolate ở đây đảm bảo mọi nội dung trong <main> luôn nằm DƯỚI Header (Header tự lo z-index của nó)
    <div className="min-h-screen bg-background text-foreground font-sans relative isolate z-0">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* max-w giới hạn chiều rộng để map/grid không bị full-bleed tràn lề, khác với trước đây "max-w-full" */}
      <main className="pt-32 px-6 max-w-6xl mx-auto pb-20">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight mb-4">
            Khám Phá Sức Mạnh Hộ Chiếu
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kiểm tra yêu cầu visa, đồng bộ nhiều hộ chiếu và xếp hạng quyền lực di chuyển toàn cầu của bạn.
          </p>
        </div>

        {/* Mỗi block cách nhau bằng flex-col + gap, thay vì nhét chung 1 div text-center */}
        <div className="flex flex-col gap-10">
          <section>
            <PassportExplorer iso={selectedPassport} />
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-left">Bản đồ điểm đến</h2>
            <WorldMap
              countryColors={countryColors}
              flights={flights}
              height="600px"
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;