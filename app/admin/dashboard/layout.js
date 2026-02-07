"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Tag,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Briefcase,
  User,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  };

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    {
      name: "Categories",
      icon: Briefcase,
      path: "/admin/dashboard/categories",
    },
    { name: "Manage Offers", icon: Tag, path: "/admin/dashboard/promotions" },
  ];

  // Derive active page title
  const getActiveTitle = () => {
    const activeItem = navItems.find(
      (item) =>
        pathname === item.path ||
        (item.path !== "/admin/dashboard" && pathname.startsWith(item.path)),
    );
    if (!activeItem) return "Administration";

    // Add context if it's a nested path
    if (pathname.includes("/new")) return `${activeItem.name} / New`;
    if (pathname.includes("/edit")) return `${activeItem.name} / Edit`;
    return activeItem.name;
  };

  const activeTitle = getActiveTitle();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-md"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Fixed Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 w-72 bg-slate-800 border-r border-slate-200 z-50 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header - Fixed height matching topbar */}
          <div className="h-[80px] px-8 border-b border-slate-100 flex items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-[#357ebd] flex items-center justify-center text-white">
                <Briefcase size={22} />
              </div>
              <div>
                <h2 className="font-bold text-slate-50 leading-tight tracking-tight">
                  Betopia
                </h2>
                <p className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-50">
                  Admin Panel
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2 overflow-y-auto custom-scrollbar">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-md font-semibold transition-all duration-200
                  ${
                    pathname === item.path ||
                    (item.path !== "/admin/dashboard" &&
                      pathname.startsWith(item.path))
                      ? "bg-[#357ebd] text-white"
                      : "text-slate-50 hover:bg-slate-50 hover:text-slate-700"
                  }
                `}
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area (Adjusted for fixed sidebar) */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-72">
        {/* Top Header - Fixed height matching sidebar header */}
        <header className="h-[80px] bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center">
            <button
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-lg mr-4"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>

            {/* Active Path Label */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block w-1.5 h-6 bg-slate-200 rounded-full" />
              <h3 className="text-md font-bold text-slate-800 uppercase tracking-widest animate-slide-in-right">
                {activeTitle}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            {/* Visit Website Button */}
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-slate-600 hover:text-[#357ebd] hover:bg-blue-50 rounded-xl transition-all font-bold border border-transparent hover:border-blue-100"
            >
              <ExternalLink size={18} />
              <span className="text-sm">Visit Site</span>
            </Link>

            <div className="w-px h-8 bg-slate-100 hidden sm:block mx-2" />

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center text-slate-600 font-bold overflow-hidden relative">
                  <Image
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                    alt="Admin"
                    fill
                    className="object-cover"
                  />
                </div>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform duration-200 mr-1 ${isProfileOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-scale-in py-2">
                  <div className="px-5 py-4 border-b border-slate-50">
                    <p className="text-sm font-bold text-slate-900 leading-none">
                      Administrator
                    </p>
                    <p className="text-xs font-semibold text-slate-400 mt-1.5">
                      admin@betopia.com
                    </p>
                  </div>

                  <div className="p-2">
                    <Link
                      href="/"
                      target="_blank"
                      className="sm:hidden flex items-center gap-3 px-4 py-3 text-slate-600 font-semibold hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span>Visit Website</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-500 font-semibold hover:bg-red-50 rounded-xl transition-all"
                    >
                      <LogOut size={18} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 lg:p-12 custom-scrollbar">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
