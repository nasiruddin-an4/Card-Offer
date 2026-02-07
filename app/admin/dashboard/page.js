"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Tag,
  Eye,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Plus,
  ArrowRight,
  ShieldCheck,
  Calendar,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalOffers: 0,
    activeOffers: 0,
    totalViews: 4892,
  });
  const [recentPromos, setRecentPromos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("/api/promotions");
        const data = await res.json();
        setStats((prev) => ({
          ...prev,
          totalOffers: data.length,
          activeOffers: data.length,
        }));
        setRecentPromos(data.slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const cards = [
    {
      name: "Life-time Offers",
      value: stats.totalOffers,
      icon: Tag,
      color: "from-blue-500 to-indigo-600",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
      trend: "+4 new this week",
    },
    {
      name: "Active Deals",
      value: stats.activeOffers,
      icon: TrendingUp,
      color: "from-orange-400 to-pink-500",
      lightColor: "bg-orange-50",
      textColor: "text-orange-600",
      trend: "Performing 12% better",
    },
    {
      name: "Total Reach",
      value: stats.totalViews.toLocaleString(),
      icon: Eye,
      color: "from-emerald-400 to-teal-600",
      lightColor: "bg-emerald-50",
      textColor: "text-emerald-600",
      trend: "+24.5% conversion",
    },
  ];

  return (
    <div className="space-y-12 animate-fade-in-up">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight flex items-center gap-4">
            Dashboard
          </h1>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <div
            key={card.name}
            style={{ animationDelay: `${idx * 100}ms` }}
            className="bg-white p-8 rounded-md border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 group relative overflow-hidden animate-fade-in-up"
          >
            <div
              className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-full -mr-10 -mt-10`}
            />

            <div className="flex items-center justify-between mb-8">
              <div
                className={`w-14 h-14 rounded-2xl ${card.lightColor} ${card.textColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-sm`}
              >
                <card.icon size={26} />
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 font-black text-[10px] uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Live
              </div>
            </div>

            <div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px] mb-1">
                {card.name}
              </p>
              <h3 className="text-4xl font-bold text-slate-900 mb-4">
                {isLoading ? "..." : card.value}
              </h3>
              <div
                className={`flex items-center gap-1.5 text-slate-500 text-[13px] font-bold`}
              >
                <ArrowUpRight size={16} />
                {card.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Recent Activity Table */}
        <div className="lg:col-span-3 bg-white p-10 rounded-md border border-slate-100">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
              <div className="w-2 h-8 bg-[#357ebd] rounded-full" />
              Latest Promotions
            </h2>
            <Link
              href="/admin/dashboard/promotions"
              className="text-sm font-bold text-[#357ebd] hover:underline flex items-center gap-1 group"
            >
              See all{" "}
              <ChevronRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          <div className="space-y-6">
            {isLoading ? (
              [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-20 bg-slate-50 rounded-md animate-pulse"
                />
              ))
            ) : recentPromos.length > 0 ? (
              recentPromos.map((promo) => (
                <div
                  key={promo._id}
                  className="flex items-center justify-between p-5 bg-slate-50/50 rounded-md border border-transparent hover:border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-5">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden border-2 border-slate-200 bg-white">
                      <Image
                        src={promo.logo || promo.image}
                        alt={promo.partner}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 line-clamp-1">
                        {promo.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                          {promo.partner}
                        </span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span className="text-xs font-medium text-slate-400 italic">
                          2 hours ago
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/admin/dashboard/promotions/edit/${promo._id}`}
                    className="p-3 text-slate-400 hover:text-[#357ebd] hover:bg-blue-50 rounded-xl transition-all"
                  >
                    <ArrowRight size={20} />
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200">
                <p className="font-bold text-slate-400">No promotions found.</p>
                <Link
                  href="/admin/dashboard/promotions"
                  className="text-[#357ebd] font-black text-sm uppercase mt-4 block"
                >
                  Click to add
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* System & Security Group */}
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-[#1e293b] p-10 rounded-md text-white relative overflow-hidden group shadow-slate-900/40 min-h-[340px] flex flex-col justify-between">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-white/10 backdrop-blur-xl rounded-xl border border-white/10">
                  <ShieldCheck className="text-blue-400" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Security Center</h3>
                  <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">
                    Node Cluster: HK-4
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4 leading-tight">
                Admin Session is{" "}
                <span className="text-emerald-400">Secure</span>
              </h2>
              <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">
                Your portal uses military-grade encryption for all database
                transactions and image assets.
              </p>
            </div>

            <div className="flex items-center gap-10 relative z-10">
              <div className="flex flex-col">
                <span className="text-2xl font-bold italic text-blue-400">
                  TLS 1.3
                </span>
                <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">
                  Transport
                </span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold italic text-emerald-400">
                  AES-256
                </span>
                <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">
                  Storage
                </span>
              </div>
            </div>

            <div className="absolute top-0 right-0 p-10 opacity-3 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
              <TrendingUp size={240} />
            </div>
          </div>

          <div className="bg-[#357ebd] p-10 rounded-md text-white flex items-center justify-between group cursor-pointer hover:bg-[#2c699e] transition-colors overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-xl font-black mb-1">Visit Website</h3>
              <p className="text-blue-100 text-sm font-medium">
                Check the live view of your site
              </p>
            </div>
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center relative z-10 group-hover:bg-white group-hover:text-[#357ebd] transition-all">
              <ArrowUpRight size={28} />
            </div>
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </div>
  );
}
