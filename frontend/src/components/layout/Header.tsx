import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react"; // Import icon

export function Header({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Logic Theme (Dark/Light)
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Logic ẩn/hiện khi scroll
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  const navItems = [
    { id: "explorer", label: "Explorer" },
    { id: "sync", label: "Sync" },
    { id: "rank", label: "Global Rank" },
    { id: "requirements", label: "Visa Reqs" },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false); 
  };

  // 1. Theo dõi thay đổi Theme và cập nhật vào thẻ <html>
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Đảo theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // 2. Theo dõi cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (isMobileMenuOpen) return;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  // 3. Click ra ngoài để đóng menu mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.header 
      ref={headerRef} 
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : "-100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between border-b border-border/40 bg-background/60 px-6 backdrop-blur-md md:h-20 md:px-10"
    >
      {/* Wordmark Logo */}
      <button 
        onClick={() => handleTabClick("explorer")} 
        className="font-display md:text-2xl text-2xl font-bold tracking-tight text-foreground hover:text-foreground/80 z-10 transition-colors"
      >
        BorderLess<span className="text-primary">.</span>
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden items-center gap-8 lg:flex">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            className={`label-mono relative py-2 transition-colors duration-300 ${
              activeTab === item.id
                ? "text-foreground font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.label}
            {activeTab === item.id && (
              <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-primary" />
            )}
          </button>
        ))}
      </nav>
      
      {/* Right Side Controls */}
      <div className="flex items-center gap-2 md:gap-4 z-10">
        
        {/* Nút Đổi Theme */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border border-border/50 bg-white/[0.03] text-foreground hover:bg-white/[0.08] transition-colors"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Nút System Online */}
        <button className="hidden md:flex label-mono h-8 items-center gap-2 rounded-full border border-border/50 bg-white/[0.03] px-4 hover:bg-white/[0.08] transition-colors">
          <span className="w-2 h-2 rounded-full bg-visa-free animate-pulse" />
          SYSTEM ONLINE
        </button>

        {/* Mobile Menu Toggle */}
        <button 
          className="text-foreground lg:hidden p-2 rounded-md hover:bg-white/[0.05]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full w-full border-b border-border/40 bg-background/95 backdrop-blur-xl px-6 py-6 shadow-2xl lg:hidden"
          >
            <nav className="flex flex-col gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`label-mono text-left transition-colors duration-300 ${
                    activeTab === item.id ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}