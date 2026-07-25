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
        className="group relative z-10 flex items-center font-display text-2xl font-extrabold tracking-tighter transition-transform active:scale-95"
      >
        <span className="bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent transition-all group-hover:to-foreground/40">
          BorderLess
        </span>
        <span className="text-blue-500">.</span>
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