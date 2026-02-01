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

const promotions = [
  {
    id: 1,
    title: "Buy One Get One Buffet",
    description: "Enjoy B1G1 free buffet deals with StanChart credit card",
    image:
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=800&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1554306274-fbf3872509b1?q=80&w=100&auto=format&fit=crop", // Placeholder logo
    tnc: [
      "Offer valid only for dine-in.",
      "Prior reservation recommended.",
      "Cannot be combined with other offers.",
    ],
    applicability: "Standard Chartered Credit Card Holders",
    website: "www.example-restaurant.com",
    hotline: "+880 1234 567890",
  },
  {
    id: 2,
    title: "Pedal your way with a brand new ride.",
    description:
      "Avail 0% InstaBuys on new bicycles from CycleLife Exclusive and Duranta Bicycle.",
    image:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1623519967208-a53272e5057b?q=80&w=100&auto=format&fit=crop",
    tnc: [
      "Minimum purchase value 10,000 BDT.",
      "0% interest for up to 6 months.",
    ],
    applicability: "All Credit Card Holders",
    website: "www.cyclelife.com",
    hotline: "+880 1711 223344",
  },
  {
    id: 3,
    title: "Dazzle everyone around you.",
    description:
      "Buy your desired jewellery from top brands and pay in up to 24 equal monthly instalments at 0% interest.",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1616618147690-e5bea43c8f37?q=80&w=100&auto=format&fit=crop",
    tnc: ["Valid on diamond jewellery only.", "Processing fee may apply."],
    applicability: "Prime Bank Credit Cards",
    website: "www.sparkle-gems.com",
    hotline: "+880 1999 888777",
  },
  {
    id: 4,
    title: "Give your home a fresh makeover.",
    description:
      "Decorate your home with trendy furniture items. Buy from renowned brands and pay in up to 24 months equal monthly instalments.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=100&auto=format&fit=crop",
    tnc: ["Delivery charges applicable.", "Installation included."],
    applicability: "Dutch-Bangla Bank Cards",
    website: "www.home-decor.com",
    hotline: "+880 1555 666777",
  },
  {
    id: 5,
    title: "Buy from the comfort of your home.",
    description:
      "Purchase brand new electronics & home appliances online and pay in up to 24 months equal monthly instalments at 0% interest.",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1594412258909-3286dc757341?q=80&w=100&auto=format&fit=crop",
    tnc: ["Manufacturer warranty applies.", "No returns on opened items."],
    applicability: "City Bank American Express",
    website: "www.tech-shop.com.bd",
    hotline: "+880 1888 999000",
  },
  {
    id: 6,
    title: "Transform your closet",
    description:
      "Shop the latest fashion trends and upgrade your wardrobe with exclusive discounts.",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=100&auto=format&fit=crop",
    tnc: ["Discount on selected items only.", "VAT excluded."],
    applicability: "BRAC Bank Card Holders",
    website: "www.fashion-hub.com",
    hotline: "+880 1666 555444",
  },
  {
    id: 7,
    title: "Let every flavor tell a story",
    description:
      "Experience culinary delights at top-rated restaurants with special offers.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=100&auto=format&fit=crop",
    tnc: ["Valid for dinner only.", "Max discount 2000 BDT."],
    applicability: "EBL Visa & Mastercard",
    website: "www.foodie-paradise.com",
    hotline: "+880 1333 444555",
  },
];

const LatestPromotions = () => {
  const [selectedPromo, setSelectedPromo] = useState(null);
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "All Promotions";

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
                Latest <span className="text-blue-600">{category}</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Explore exclusive deals and offers curated just for you. From
                dining to travel, find everything you need to upgrade your
                lifestyle.
              </p>
            </div>

            <div className="hidden md:block">
              <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold border border-blue-100">
                {promotions.length} Active Offers
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8">
          {promotions.map((promo) => (
            <div
              onClick={() => setSelectedPromo(promo)}
              key={promo.id}
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

        {selectedPromo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setSelectedPromo(null)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPromo(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 transition-colors z-20 shadow-sm"
              >
                <X size={24} />
              </button>

              {/* Left Side: Hero Image */}
              <div className="w-full md:w-2/5 relative h-48 md:h-auto">
                <Image
                  src={selectedPromo.image}
                  alt={selectedPromo.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />

                {/* Logo Overlay */}
                <div className="absolute -bottom-8 left-8 md:bottom-auto md:top-8 md:left-8 w-20 h-20 rounded-xl border-4 border-white shadow-lg overflow-hidden bg-white z-10">
                  <Image
                    src={selectedPromo.logo}
                    alt="Brand Logo"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Right Side: Content */}
              <div className="w-full md:w-3/5 p-8 pt-12 md:pl-10 md:pt-10 overflow-y-auto bg-white">
                <div className="mb-6">
                  {/* Brand Name could go here if available */}
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                    {selectedPromo.title}
                  </h3>
                </div>

                <div className="space-y-6">
                  {/* Offer Details */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                      <Store className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-1">
                        Offer Details
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {selectedPromo.description}
                      </p>
                    </div>
                  </div>

                  {/* Applicability */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-1">
                        Applicability
                      </h4>
                      <p className="text-gray-600 font-medium">
                        {selectedPromo.applicability}
                      </p>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-1">
                        Terms & Conditions
                      </h4>
                      <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 marker:text-gray-400">
                        {selectedPromo.tnc.map((term, index) => (
                          <li key={index}>{term}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`http://${selectedPromo.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                  >
                    <Globe size={18} />
                    Visit Website
                  </a>
                  <a
                    href={`tel:${selectedPromo.hotline}`}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors"
                  >
                    <Phone size={18} />
                    {selectedPromo.hotline}
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
