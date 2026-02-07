"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  MoreHorizontal,
  Loader2,
  Tag,
} from "lucide-react";

export default function PromotionsListPage() {
  const [promotions, setPromotions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const res = await fetch("/api/promotions");
      const data = await res.json();
      setPromotions(data);
    } catch (err) {
      console.error("Failed to fetch promotions", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      !confirm(
        "Are you sure you want to delete this offer? This action cannot be undone.",
      )
    )
      return;

    try {
      const res = await fetch(`/api/promotions/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPromotions(promotions.filter((p) => p._id !== id));
      }
    } catch (err) {
      alert("Failed to delete promotion");
    }
  };

  const filteredPromotions = promotions.filter(
    (promo) =>
      promo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promo.partner?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Manage Promotions
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Total {promotions.length} offers currently listed.
          </p>
        </div>
        <Link
          href="/admin/dashboard/promotions/new"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#357ebd] text-white font-bold rounded-2xl shadow-lg shadow-blue-200 hover:shadow-xl hover:bg-[#2c699e] transition-all transform hover:-translate-y-0.5 active:scale-95"
        >
          <Plus size={20} />
          <span>New Promotion</span>
        </Link>
      </div>

      {/* Control Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#357ebd] transition-colors"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by title or partner name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#357ebd]/10 focus:border-[#357ebd] focus:bg-white transition-all font-medium"
          />
        </div>
      </div>

      {/* Promotions Table */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-slate-50">
              <th className="px-8 py-6 font-black text-xs uppercase tracking-widest text-slate-400">
                Offer Detail
              </th>
              <th className="px-8 py-6 font-black text-xs uppercase tracking-widest text-slate-400">
                Partner
              </th>
              <th className="px-8 py-6 font-black text-xs uppercase tracking-widest text-slate-400">
                Status
              </th>
              <th className="px-8 py-6 font-black text-xs uppercase tracking-widest text-slate-400 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {isLoading ? (
              <tr>
                <td colSpan="4" className="py-20 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2
                      className="animate-spin text-[#357ebd]"
                      size={40}
                    />
                    <p className="text-slate-500 font-bold tracking-tight">
                      Fetching promotions...
                    </p>
                  </div>
                </td>
              </tr>
            ) : filteredPromotions.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="py-20 text-center text-slate-500 font-bold"
                >
                  No promotions found matching your criteria.
                </td>
              </tr>
            ) : (
              filteredPromotions.map((promo) => (
                <tr
                  key={promo._id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-5">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-slate-100 shadow-sm shrink-0">
                        <Image
                          src={promo.image}
                          alt={promo.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="max-w-xs md:max-w-md">
                        <p className="font-bold text-slate-900 leading-tight mb-1 truncate">
                          {promo.title}
                        </p>
                        <p className="text-sm text-slate-500 font-medium truncate">
                          {promo.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 relative overflow-hidden shrink-0 border border-white">
                        <Image
                          src={promo.logo}
                          alt="Logo"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-bold text-slate-700">
                        {promo.partner}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                      Active
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      <Link
                        href={`/admin/dashboard/promotions/edit/${promo._id}`}
                        className="p-2.5 bg-white text-slate-600 hover:text-blue-600 hover:bg-blue-50 border border-slate-100 rounded-xl shadow-sm transition-all"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(promo._id)}
                        className="p-2.5 bg-white text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-100 rounded-xl shadow-sm transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
