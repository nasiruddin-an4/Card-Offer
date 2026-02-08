"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HeartHandshake,
  Hotel,
  Gift,
  Utensils,
  Plane,
  Car,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const OfferPage = () => {
  const [categories, setCategories] = React.useState([]);
  const [promotions, setPromotions] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, promoRes] = await Promise.all([
          fetch("/api/categories", { cache: "no-store" }),
          fetch("/api/promotions", { cache: "no-store" }),
        ]);
        const catData = await catRes.json();
        const promoData = await promoRes.json();
        setCategories(catData);
        setPromotions(promoData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-slate-50 py-24 px-6 md:px-12 min-h-[600px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-100 border-t-[#357ebd] rounded-full animate-spin" />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
            Loading Categories...
          </p>
        </div>
      </div>
    );
  }

  const offers = categories.map((cat, index) => {
    const count = promotions.filter((p) => p.category === cat.name).length;
    return {
      id: cat._id,
      title: cat.name,
      description:
        cat.description || "Explore exclusive offers in this category.",
      gradient: "from-white to-slate-50",
      border: "group-hover:border-blue-200",
      image: cat.image,
      count: `${count} ${count === 1 ? "Offer" : "Offers"}`,
    };
  });

  return (
    <div className="bg-slate-50 py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            <Sparkles size={14} />
            <span>Browse by Category</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-bright-orange mb-4 font-sans tracking-tight">
            Discover Exclusive Deals
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            From luxury stays to daily dining, find the best offers curated just
            for you. Explore our categories to start saving.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <Link
              href={`/promotions?category=${encodeURIComponent(offer.title)}`}
              key={offer.id}
              className="block group h-full"
            >
              <div
                className={`
                  relative overflow-hidden h-full rounded-md bg-white
                  border border-white/50 shadow hover:shadow-lg hover:shadow-slate-200/50
                  transition-all duration-300 hover:-translate-y-1 flex flex-col group
                  ${offer.border}
                `}
              >
                {/* Image Section */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100 flex items-center justify-center">
                  {offer.image ? (
                    <>
                      <Image
                        src={offer.image}
                        alt={offer.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-80" />
                    </>
                  ) : (
                    <Sparkles className="text-slate-300 w-12 h-12" />
                  )}

                  {/* Overlay: Count Only */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-white border border-white/20 shadow-sm uppercase tracking-wider">
                      {offer.count}
                    </span>
                  </div>
                </div>

                <div className={`flex flex-col flex-1 p-6 bg-white`}>
                  {/* Text Content */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 font-sans">
                      {offer.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                      {offer.description}
                    </p>
                  </div>

                  {/* Footer / Browse Link */}
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-[#357ebd] transition-colors">
                    Explore Category
                    <ArrowRight
                      size={14}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferPage;
