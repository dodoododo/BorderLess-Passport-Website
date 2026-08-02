import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

export function Header({ theme, setTheme }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  // State để quản lý mở/đóng Dropdown
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();

  // Thêm mảng dropdown vào mục Rank
  const navItems = [
    { path: "/explore", label: "Explore" },
    { 
      path: "/rank", 
      label: "Rank",
      dropdown: [
        { path: "/rank/global", label: "Global Power" },
        { path: "/rank/landpower", label: "Landpower" },
        { path: "/rank/openness", label: "Openness" },
      ]
    },
    { path: "/compare", label: "Compare" },
    { path: "/discover", label: "Discover" },
    { path: "/requirements", label: "Visa Reqs" },
  ];

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) return;
      const currentScrollY = window.scrollY;
      const headerHeight = headerRef.current?.offsetHeight ?? 64;
      setIsVisible(currentScrollY < headerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

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
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      className={`fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between border-b px-6 transition-colors duration-500 md:h-20 md:px-10 rounded-b-4xl border-b-blue-400 border-x-blue-400  ${
        theme === 'dark'
          ? 'bg-[#020617]/50 border-white/5 backdrop-blur-2xl'
          : 'bg-white border-black/5 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.03)]'
      }`}
    >
      {/* Wordmark Logo */}
      <Link 
        to="/explore"
        onClick={() => setIsMobileMenuOpen(false)}
        className="group relative z-10 flex items-center font-display text-2xl font-extrabold tracking-tighter transition-all duration-300 active:scale-95 select-none"
      >
        <div className="relative flex items-center">
          {/* Layer 0: La bàn, Vệt sáng & Máy bay (Nằm đè nhẹ ở góc trái bên dưới chữ) */}
          <svg
            className="absolute -left-3 -bottom-2.5 w-24 h-16 pointer-events-none z-0 overflow-visible"
            viewBox="0 0 120 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Hiệu ứng phát sáng cho vệt tia máy bay */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Gradient dải sáng nối từ la bàn đến máy bay */}
              <linearGradient id="flightTrail" x1="15" y1="45" x2="105" y2="15">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                <stop offset="60%" stopColor="#60a5fa" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#93c5fd" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* 1. Họa tiết La Bàn cổ điển góc trái bên dưới */}
            <g className="text-blue-500/25 transition-all duration-500 group-hover:text-blue-500/40 group-hover:rotate-12 transform-gpu origin-[18px_42px]">
              {/* Vòng tròn la bàn */}
              <circle cx="18" cy="42" r="14" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="18" cy="42" r="10" stroke="currentColor" strokeWidth="0.5" />
              {/* Các mũi tên nhọn la bàn */}
              <path d="M18 24 L21 39 L36 42 L21 45 L18 60 L15 45 L0 42 L15 39 Z" fill="currentColor" />
            </g>

            {/* 2. Vệt sáng (Tia phát ra đại diện chiều đi máy bay) */}
            <path
              d="M 18 42 Q 55 38 100 16"
              stroke="url(#flightTrail)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              filter="url(#glow)"
              className="transition-all duration-500 group-hover:stroke-blue-400"
            />

            {/* 3. Máy bay đang cất cánh bay tới trước chữ Borderless */}
            <g 
              transform="translate(96, 10) rotate(-18)" 
              className="text-blue-500 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
            >
              <path
                d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                fill="currentColor"
                transform="scale(0.55)"
              />
            </g>
          </svg>

          {/* Layer 10: Tên thương hiệu BorderLess */}
          <span className="relative z-10 bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent transition-all group-hover:to-foreground/40">
            BorderLess
          </span>

          {/* Layer 10: Mũi tên / Ghim địa điểm bản đồ (thay thế cho dấu chấm .) */}
          <span className="relative z-10 ml-0.5 text-blue-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-110">
            <svg
              className="w-5 h-5 inline-block fill-current drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </span>
        </div>
      </Link>

      {/* Desktop Navigation */}
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex h-full items-stretch self-stretch">
        {navItems.map((item) => {
          const isActive = location.pathname.includes(item.path);
          const hasDropdown = !!item.dropdown;
          const isDropdownOpen = activeDropdown === item.path;

          return (
            <div
              key={item.path}
              // CHUYỂN CLASS 'group' LÊN THẺ CHA NÀY
              className="group relative flex h-full"
              onMouseEnter={() => hasDropdown && setActiveDropdown(item.path)}
              onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
            >
              {/* Main Nav Link */}
              <Link
                to={item.path}
                onClick={(e) => {
                  if (hasDropdown) {
                    e.preventDefault();
                    setActiveDropdown(isDropdownOpen ? null : item.path);
                  }
                }}

                // Đã xóa class 'group' ở đây
                className={`relative flex items-center justify-center text-center min-w-28 px-5 text-sm font-semibold tracking-tight border-l first:border-l-2 overflow-hidden cursor-pointer ${
                  theme === 'dark' ? 'border-white/5' : 'border-black/10'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active-fill"
                    className="absolute inset-0 z-0 bg-blue-400 border-b-blue-900 border-b-2"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}

                {/* Giữ lại hover dựa trên group-hover (bây giờ group là thẻ div cha) */}
                {!isActive && (
                  <span
                    aria-hidden
                    className={`absolute inset-0 z-0 bg-blue-400 border-b-blue-900 border-2 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isDropdownOpen ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'
                    }`}
                  />
                )}

                {/* Đổi màu chữ theo isDropdownOpen hoặc group-hover */}
                <span
                  className={`relative z-10 flex items-center gap-1 transition-colors duration-500 ${
                    isActive || isDropdownOpen
                      ? 'text-white'
                      : 'text-muted-foreground group-hover:text-white'
                  }`}
                >
                  {item.label}
                  {hasDropdown && (
                    <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  )}
                </span>
              </Link>

              {/* Desktop Dropdown Menu */}
              {hasDropdown && (
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      // Thêm pt-2 để tạo vùng đệm vô hình nối liền Nav với Dropdown, tránh bị đứt hover khi di chuyển chuột nhanh
                      className="absolute left-0 top-full pt-2 w-48"
                    >
                      <div className={`rounded-sm border px-2 pb-2 shadow-2xl ${
                        theme === 'dark' 
                          ? 'bg-[#020617]/90 border-white/10' 
                          : 'bg-white border-black/20'
                      }`}>
                        {item.dropdown!.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            onClick={() => setActiveDropdown(null)}
                            className={`block rounded-sm px-4 py-2 text-sm font-medium mt-2  ${
                              location.pathname === subItem.path
                                ? 'bg-blue-500/10 text-blue-500'
                                : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          )
        })}
      </nav>
      
      {/* Right Side Controls */}
      <div className="flex items-center gap-2 md:gap-3 z-10">
        <button
          onClick={toggleTheme}
          className={`group flex h-9 w-9 items-center justify-center rounded-full border transition-all hover:scale-110 active:scale-95 ${
            theme === 'dark' ? 'border-white/10 bg-white/5 text-gray-300 hover:text-white' : 'border-black/10 bg-black/5 text-gray-600 hover:text-black'
          }`}
          aria-label="Toggle Theme"
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme === "dark" ? 0 : 180 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
          </motion.div>
        </button>

        <button 
          className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/5 text-foreground transition-transform hover:scale-105 active:scale-95 lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-4 right-4 top-20 rounded-2xl border border-border/50 bg-background/95 p-4 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname.includes(item.path);
                const hasDropdown = !!item.dropdown;
                
                return (
                  <div key={item.path} className="flex flex-col gap-1">
                    <Link
                      to={item.path}
                      onClick={(e) => {
                        if (hasDropdown) {
                          e.preventDefault();
                          setActiveDropdown(activeDropdown === item.path ? null : item.path);
                        } else {
                          setIsMobileMenuOpen(false);
                        }
                      }}
                      className={`flex justify-between items-center rounded-xl px-4 py-3 text-left font-semibold transition-all ${
                        isActive && !hasDropdown
                          ? "bg-foreground/10 text-foreground" 
                          : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                      }`}
                    >
                      {item.label}
                      {hasDropdown && (
                        <ChevronDown size={16} className={`transition-transform duration-300 ${activeDropdown === item.path ? 'rotate-180' : ''}`} />
                      )}
                    </Link>

                    {/* Mobile Submenu */}
                    {hasDropdown && activeDropdown === item.path && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col ml-4 border-l border-foreground/10 pl-2 overflow-hidden"
                      >
                        {item.dropdown!.map((sub) => (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}