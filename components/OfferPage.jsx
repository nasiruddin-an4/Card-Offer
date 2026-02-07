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
  const offers = [
    {
      id: 1,
      title: "Health & Beauty Care",
      description: "Wellness offers to help you look & feel your best.",
      icon: <HeartHandshake className="w-8 h-8 text-emerald-600" />,
      gradient: "from-rose-50 to-white",
      border: "group-hover:border-emerald-200",
      count: "12 Offers",
    },
    {
      id: 2,
      title: "Hotel & Resort",
      description: "Exclusive stays and getaways for your next vacation.",
      icon: <Hotel className="w-8 h-8 text-blue-600" />,
      gradient: "from-rose-50 to-white",
      border: "group-hover:border-blue-200",
      count: "8 Offers",
    },
    {
      id: 3,
      title: "Lifestyle",
      description: "Upgrade your lifestyle with premium shopping deals.",
      icon: <Gift className="w-8 h-8 text-rose-500" />,
      gradient: "from-rose-50 to-white",
      border: "group-hover:border-rose-200",
      count: "15 Offers",
    },
    {
      id: 4,
      title: "Restaurant",
      description: "Savor the flavor with discounts at top eateries.",
      icon: <Utensils className="w-8 h-8 text-orange-500" />,
      gradient: "from-rose-50 to-white",
      border: "group-hover:border-orange-200",
      count: "24 Offers",
    },
    {
      id: 5,
      title: "Travel & Tourism",
      description: "Fly high and explore the world for less.",
      icon: <Plane className="w-8 h-8 text-sky-500" />,
      gradient: "from-rose-50 to-white",
      border: "group-hover:border-sky-200",
      count: "5 Offers",
    },
    {
      id: 6,
      title: "Vehicle & Accessories",
      description: "Everything for your ride, from maintenance to upgrades.",
      icon: <Car className="w-8 h-8 text-slate-700" />,
      gradient: "from-rose-50 to-white",
      border: "group-hover:border-rose-200",
      count: "9 Offers",
    },
  ];

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
