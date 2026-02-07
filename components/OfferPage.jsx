"use client";

import React from "react";
import Link from "next/link";
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
          fetch("/api/categories"),
          fetch("/api/promotions"),
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

  const getIcon = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("health") || lowerTitle.includes("beauty"))
      return <HeartHandshake className="w-8 h-8 text-emerald-600" />;
    if (lowerTitle.includes("hotel") || lowerTitle.includes("resort"))
      return <Hotel className="w-8 h-8 text-blue-600" />;
    if (lowerTitle.includes("lifestyle"))
      return <Gift className="w-8 h-8 text-rose-500" />;
    if (lowerTitle.includes("restaurant") || lowerTitle.includes("food"))
      return <Utensils className="w-8 h-8 text-orange-500" />;
    if (lowerTitle.includes("travel") || lowerTitle.includes("tourism"))
      return <Plane className="w-8 h-8 text-sky-500" />;
    if (lowerTitle.includes("vehicle") || lowerTitle.includes("car"))
      return <Car className="w-8 h-8 text-slate-700" />;
    return <Sparkles className="w-8 h-8 text-[#357ebd]" />;
  };

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
      icon: getIcon(cat.name),
      gradient: "from-white to-slate-50",
      border: "group-hover:border-blue-200",
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
          <h2 className="text-3xl md:text-5xl font-bold text-brand-bright-orange mb-6 font-sans tracking-tight">
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
                  relative overflow-hidden h-full rounded-2xl bg-gradient-to-br ${offer.gradient} 
                  p-6 border border-white/50 shadow hover:shadow-sm hover:shadow-slate-200/50 
                  transition-all duration-300 hover:-translate-y-1 ${offer.border} border-t border-l
                `}
              >
                <div className="flex flex-col h-full rounded-xl p-4">
                  {/* Icon & Count Row */}
                  <div className="flex justify-between items-start mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      {offer.icon}
                    </div>
                    <span className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-slate-500 border border-slate-100">
                      {offer.count}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900 mb-4 font-sans">
                      {offer.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {offer.description}
                    </p>
                  </div>

                  {/* Footer / Browse Link */}
                  <div className="mt-auto pt-4 border-t border-slate-200/50 flex items-center text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                    Browse Offers
                    <ArrowRight
                      size={16}
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
