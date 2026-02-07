"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  X,
  Phone,
  Globe,
  FileText,
  CheckCircle,
  Store,
} from "lucide-react";

import { useSearchParams } from "next/navigation";

const LatestPromotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPromo, setSelectedPromo] = useState(null);
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "All Promotions";

  React.useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const res = await fetch("/api/promotions");
        const data = await res.json();
        setPromotions(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch promotions:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPromotions();
  }, []);

  return (
    <div className="bg-slate-50 py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm text-gray-500 mb-6 font-medium">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-gray-900 font-semibold">{category}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight font-sans">
                Latest{" "}
                <span className="text-brand-bright-orange">{category}</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Explore exclusive deals and offers curated just for you. From
                dining to travel, find everything you need to upgrade your
                lifestyle.
              </p>
            </div>

            <div className="hidden md:block">
              <div className="px-4 py-2 bg-blue-50 text-brand-bright-orange rounded-full text-sm font-semibold border border-blue-100">
                {promotions.length} Active Offers
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-white rounded-sm h-[400px] animate-pulse border border-gray-100"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8">
            {promotions.map((promo) => (
              <div
                onClick={() => setSelectedPromo(promo)}
                key={promo._id}
                className="block h-full group"
              >
                <div className="bg-white cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col h-full rounded-sm overflow-hidden border-none shadow-sm">
                  <div className="relative w-full h-56 overflow-hidden">
                    <Image
                      src={promo.image}
                      alt={promo.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 flex flex-col grow">
                    <h3 className="font-medium text-gray-900 text-base mb-3 leading-tight">
                      {promo.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-4 mb-4">
                      {promo.description}
                    </p>

                    {/* Simple More Button */}
                    <div className="mt-auto pt-2 flex items-center text-gray-400 group-hover:text-gray-600 transition-all duration-300 text-sm font-normal opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0">
                      More
                      <ArrowRight
                        size={14}
                        className="ml-1 transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedPromo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-8 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setSelectedPromo(null)}
          >
            <div
              className="bg-white md:rounded-[32px] shadow-2xl max-w-5xl w-full h-full md:h-auto md:max-h-[85vh] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row relative animate-scale-in border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Header Bar (Matches reference image) */}
              <div className="md:hidden bg-[#357ebd] px-4 py-3 flex justify-between items-center text-white shrink-0 sticky top-0 z-20 shadow-sm">
                <span className="font-bold uppercase text-sm tracking-widest whitespace-nowrap overflow-hidden text-ellipsis mr-4">
                  {selectedPromo.partner || "Promotion Details"}
                </span>
                <button
                  onClick={() => setSelectedPromo(null)}
                  className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Close Button - Desktop Only */}
              <button
                onClick={() => setSelectedPromo(null)}
                className="hidden md:flex absolute top-6 right-6 p-2.5 rounded-full bg-white/90 hover:bg-brand-red hover:text-white text-gray-800 transition-all duration-300 z-50 shadow-md hover:rotate-90 cursor-pointer"
              >
                <X size={20} />
              </button>

              {/* Left Side: Visual Showcase (40% desktop, full image block mobile) */}
              <div className="w-full md:w-5/12 relative h-auto md:h-auto overflow-hidden bg-gray-50 flex flex-col shrink-0">
                <div className="relative md:aspect-auto md:h-full p-0 md:p-0">
                  {/* Mobile Logo Showcase (Full-width brand focus) */}
                  <div className="md:hidden w-full bg-white py-4">
                    <div className="relative w-full h-32 px-4">
                      <Image
                        src={selectedPromo.logo}
                        alt="Brand Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="mt-4 px-6 text-center">
                      <h3 className="text-2xl font-bold text-gray-900 leading-tight tracking-tight">
                        {selectedPromo.title}
                      </h3>
                    </div>
                  </div>
                  {/* Desktop Full Image */}
                  <div className="hidden md:block absolute inset-0">
                    <Image
                      src={selectedPromo.image}
                      alt={selectedPromo.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                </div>

                {/* Desktop Identity Overlay (Hidden Mobile) */}
                <div className="hidden md:flex absolute top-8 left-8 items-center gap-3 z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white p-1.5 shadow-xl border border-gray-100/50">
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                      <Image
                        src={selectedPromo.logo}
                        alt="Brand Logo"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Desktop Text Overlay (Hidden Mobile) */}
                <div className="hidden md:block absolute bottom-8 left-8 right-8 text-white z-10 transition-all">
                  <div className="inline-flex items-center px-3 py-1 bg-brand-bright-orange/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 border border-white/20">
                    Active Promotion
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold leading-tight drop-shadow-md">
                    {selectedPromo.title}
                  </h3>
                </div>
              </div>

              {/* Right Side: Detailed Content */}
              <div className="w-full md:w-7/12 flex flex-col bg-white md:overflow-hidden md:h-full">
                <div className="flex-1 md:overflow-y-auto custom-scrollbar px-6 py-0 md:py-6">
                  <div className="max-w-xl mx-auto md:mx-0">
                    {/* Mobile Portal Style Layout */}
                    <div className="md:hidden space-y-0 text-[15px] border-t border-gray-100">
                      <div className="py-2.5 border-b border-gray-50 flex gap-1">
                        <span className="font-bold text-gray-700 whitespace-nowrap">
                          Partner Name :
                        </span>
                        <span className="text-gray-600">
                          {selectedPromo.partner || "Not Specified"}
                        </span>
                      </div>

                      <div className="py-4 border-b border-gray-50">
                        <h4 className="font-bold text-gray-700 mb-2">
                          Offer Details
                        </h4>
                        <p className="text-gray-600 leading-relaxed mb-3">
                          {selectedPromo.description}
                        </p>
                        <ul className="space-y-1.5">
                          {selectedPromo.tnc.map((term, index) => (
                            <li
                              key={index}
                              className="text-gray-500 text-sm flex gap-2"
                            >
                              <span className="font-medium text-gray-400">
                                •
                              </span>
                              <span>{term}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="py-4 border-b border-gray-50">
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-gray-700">
                            Applicability :
                          </span>
                          <p className="text-gray-600 leading-relaxed">
                            {selectedPromo.applicability}
                          </p>
                        </div>
                      </div>

                      <div className="py-4 border-b border-gray-100 flex items-start gap-2">
                        <Store
                          size={20}
                          className="text-gray-500 shrink-0 mt-0.5"
                        />
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-gray-700">
                            Location / Address :
                          </span>
                          <span className="text-gray-600 leading-relaxed">
                            {selectedPromo.location ||
                              "Available at all partner outlets."}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Premium Layout */}
                    <div className="hidden md:block space-y-10">
                      {/* Description Section */}
                      <section className="group">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-brand-bright-orange group-hover:scale-110 transition-transform duration-300">
                            <Store size={18} />
                          </div>
                          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                            About Offer
                          </h4>
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed font-medium">
                          {selectedPromo.description}
                        </p>
                      </section>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {/* Applicability Section */}
                        <section className="group">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300">
                              <CheckCircle size={18} />
                            </div>
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                              Eligibility
                            </h4>
                          </div>
                          <p className="text-gray-800 font-bold text-sm bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm border-l-4 border-l-blue-500">
                            {selectedPromo.applicability}
                          </p>
                        </section>

                        {/* Contact Info Quick View */}
                        <section className="group">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform duration-300">
                              <Phone size={18} />
                            </div>
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                              Hotline
                            </h4>
                          </div>
                          <p className="text-gray-800 font-bold text-lg p-2.5">
                            {selectedPromo.hotline}
                          </p>
                        </section>
                      </div>

                      {/* Terms Section */}
                      <section className="group">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red group-hover:scale-110 transition-transform duration-300">
                            <FileText size={18} />
                          </div>
                          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                            Fine Print
                          </h4>
                        </div>
                        <ul className="grid grid-cols-1 gap-2">
                          {selectedPromo.tnc.map((term, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-3 text-sm text-gray-500 bg-slate-50/50 p-3 rounded-xl border border-transparent hover:border-slate-200 hover:bg-white transition-all duration-200"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                              <span className="leading-relaxed">{term}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    </div>
                  </div>
                </div>

                {/* Sticky Action Footer */}
                <div className="p-6 md:p-8 bg-slate-50/80 backdrop-blur-md border-t border-gray-100 flex flex-col sm:flex-row gap-3 md:gap-4 shrink-0">
                  <a
                    href={`http://${selectedPromo.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-brand-dark-gray text-white font-bold rounded-md transition-all duration-300 hover:bg-black shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 group"
                  >
                    <Globe
                      size={20}
                      className="group-hover:rotate-12 transition-transform"
                    />
                    <span className="tracking-wide">Claim Offer Now</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestPromotions;
