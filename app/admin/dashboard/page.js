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
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalOffers: 0,
    activeOffers: 0,
    totalViews: 1240, // Static for now or until tracking implemented
  });

  useEffect(() => {
    // Fetch real stats from API later
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/promotions");
        const data = await res.json();
        setStats((prev) => ({
          ...prev,
          totalOffers: data.length,
          activeOffers: data.length, // Logic for active status can be added
        }));
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    {
      name: "Total Offers",
      value: stats.totalOffers,
      icon: Tag,
      color: "blue",
      trend: "+12% from last month",
    },
    {
      name: "Active Deals",
      value: stats.activeOffers,
      icon: TrendingUp,
      color: "orange",
      trend: "All current campaigns",
    },
    {
      name: "Website Views",
      value: "1,240",
      icon: Eye,
      color: "emerald",
      trend: "+5.4% growth",
    },
  ];

  return (
    <div className="space-y-10 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            System Overview
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Welcome back, here's what's happening today.
          </p>
        </div>
        <Link
          href="/admin/dashboard/promotions/new"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#357ebd] text-white font-bold rounded-2xl shadow-lg shadow-blue-200 hover:shadow-xl hover:bg-[#2c699e] transition-all transform hover:-translate-y-0.5 active:scale-95"
        >
          <Plus size={20} />
          <span>Post New Offer</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card) => (
          <div
            key={card.name}
            className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-6">
              <div
                className={`w-14 h-14 rounded-2xl bg-${card.color}-50 flex items-center justify-center text-${card.color}-600 group-hover:scale-110 transition-transform duration-300`}
              >
                <card.icon size={28} />
              </div>
              <div className="flex items-center gap-1 text-slate-400 font-bold text-xs uppercase tracking-wider">
                <Clock size={14} />
                Realtime
              </div>
            </div>
            <div>
              <p className="text-slate-500 font-semibold mb-1">{card.name}</p>
              <h3 className="text-4xl font-black text-slate-900 mb-4">
                {card.value}
              </h3>
              <div className="flex items-center gap-2 text-emerald-500 text-sm font-bold bg-emerald-50 px-3 py-1.5 rounded-full w-fit">
                <ArrowUpRight size={16} />
                {card.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#357ebd] rounded-full" />
            Recent Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/admin/dashboard/promotions"
              className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#357ebd] hover:bg-white hover:shadow-lg transition-all group"
            >
              <Tag className="text-slate-400 group-hover:text-[#357ebd] mb-4" />
              <p className="font-bold text-slate-900">Manage Offers</p>
              <p className="text-sm text-slate-500 font-medium">
                Edit or delete existing ones
              </p>
            </Link>
            <Link
              href="/admin/dashboard/promotions/new"
              className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-500 hover:bg-white hover:shadow-lg transition-all group"
            >
              <Plus className="text-slate-400 group-hover:text-emerald-500 mb-4" />
              <p className="font-bold text-slate-900">Create New</p>
              <p className="text-sm text-slate-500 font-medium">
                Add a new partner offer
              </p>
            </Link>
          </div>
        </div>

        <div className="bg-[#1e293b] p-8 rounded-[32px] text-white relative overflow-hidden group shadow-2xl shadow-slate-900/20">
          <div className="relative z-10">
            <div className="inline-flex items-center px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border border-white/10">
              System Guard
            </div>
            <h2 className="text-2xl font-bold mb-4">Security Overview</h2>
            <p className="text-slate-400 font-medium mb-8 max-w-sm">
              Your administrative session is encrypted and protected. Remember
              to sign out when finished.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-3xl font-bold italic text-blue-400">
                  SSL
                </span>
                <span className="text-xs uppercase font-black tracking-widest text-slate-500">
                  Active
                </span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-3xl font-bold italic text-emerald-400">
                  JWT
                </span>
                <span className="text-xs uppercase font-black tracking-widest text-slate-500">
                  Secured
                </span>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-125 transition-transform duration-700">
            <TrendingUp size={180} />
          </div>
        </div>
      </div>
    </div>
  );
}
