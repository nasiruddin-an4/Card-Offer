"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  Save,
  Loader2,
  Plus,
  X,
  Image as ImageIcon,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function NewPromotionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    partner: "",
    location: "",
    applicability: "",
    website: "",
    hotline: "",
    image: "",
    logo: "",
    tnc: [""],
  });

  const [previews, setPreviews] = useState({ image: null, logo: null });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTncChange = (index, value) => {
    const newTnc = [...formData.tnc];
    newTnc[index] = value;
    setFormData((prev) => ({ ...prev, tnc: newTnc }));
  };

  const addTnc = () => {
    setFormData((prev) => ({ ...prev, tnc: [...prev.tnc, ""] }));
  };

  const removeTnc = (index) => {
    if (formData.tnc.length > 1) {
      setFormData((prev) => ({
        ...prev,
        tnc: prev.tnc.filter((_, i) => i !== index),
      }));
    }
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // Local preview
    setPreviews((prev) => ({ ...prev, [type]: URL.createObjectURL(file) }));

    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadData,
      });
      const data = await res.json();
      if (data.url) {
        setFormData((prev) => ({ ...prev, [type]: data.url }));
      }
    } catch (err) {
      alert("Upload failed, please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/promotions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/dashboard/promotions");
        router.refresh();
      }
    } catch (err) {
      alert("Failed to save promotion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/dashboard/promotions"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-colors group"
        >
          <div className="p-2 bg-white border border-slate-100 rounded-xl group-hover:bg-slate-50 transition-all">
            <ArrowLeft size={18} />
          </div>
          <span>Back to List</span>
        </Link>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#357ebd] text-white font-bold rounded-2xl shadow-lg shadow-blue-100 hover:bg-[#2c699e] transition-all disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Save size={20} />
          )}
          <span>Publish Promotion</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Info Card */}
          <div className="bg-white p-8 md:p-10 rounded-[40px] border border-slate-100 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-[#357ebd] rounded-xl">
                <Plus size={20} />
              </div>
              Offer Details
            </h2>

            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">
                  Promotion Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#357ebd] focus:bg-white transition-all font-medium text-lg placeholder:text-slate-300"
                  placeholder="e.g. Buy One Get One Buffet"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#357ebd] focus:bg-white transition-all font-medium placeholder:text-slate-300"
                  placeholder="Describe the offer in detail..."
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">
                    Partner Name
                  </label>
                  <input
                    type="text"
                    name="partner"
                    value={formData.partner}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#357ebd] transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">
                    Location / Area
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#357ebd] transition-all font-medium"
                    placeholder="e.g. Banani, Dhaka"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-white p-8 md:p-10 rounded-[40px] border border-slate-100 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <CheckCircle2 size={20} />
              </div>
              Applicability & Contact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">
                  Eligibility
                </label>
                <input
                  type="text"
                  name="applicability"
                  value={formData.applicability}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 transition-all font-medium"
                  placeholder="e.g. All Card Holders"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">
                  Website URL
                </label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 transition-all font-medium"
                  placeholder="www.partner.com"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">
                  Hotline / Support
                </label>
                <input
                  type="text"
                  name="hotline"
                  value={formData.hotline}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 transition-all font-medium"
                />
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="bg-white p-8 md:p-10 rounded-[40px] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
                  <Plus size={20} />
                </div>
                Fine Print / T&C
              </h2>
              <button
                type="button"
                onClick={addTnc}
                className="text-sm font-bold text-[#357ebd] px-4 py-2 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
              >
                + Add Rule
              </button>
            </div>
            <div className="space-y-4">
              {formData.tnc.map((term, index) => (
                <div key={index} className="flex gap-3 animate-slide-in">
                  <input
                    type="text"
                    value={term}
                    onChange={(e) => handleTncChange(index, e.target.value)}
                    className="flex-1 px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#357ebd] transition-all font-medium"
                    placeholder={`Rule #${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeTnc(index)}
                    className="p-4 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Media Uploads Column */}
        <div className="space-y-8">
          {/* Banner Image */}
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">
              Promotion Image
            </h3>
            <div
              className={`
              relative aspect-video rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 overflow-hidden group
              ${!previews.image ? "flex items-center justify-center" : ""}
            `}
            >
              {previews.image || formData.image ? (
                <>
                  <Image
                    src={previews.image || formData.image}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="p-3 bg-white rounded-xl cursor-pointer hover:scale-110 transition-transform">
                      <Upload className="text-[#357ebd]" size={20} />
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, "image")}
                        accept="image/*"
                      />
                    </label>
                  </div>
                </>
              ) : (
                <label className="flex flex-col items-center gap-3 cursor-pointer group-hover:scale-105 transition-transform">
                  <div className="p-4 bg-white rounded-2xl shadow-sm text-slate-400">
                    <ImageIcon size={32} />
                  </div>
                  <span className="text-sm font-bold text-slate-500">
                    Upload Banner
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "image")}
                    accept="image/*"
                  />
                </label>
              )}
            </div>
            <p className="text-[10px] text-slate-400 font-bold mt-4 uppercase tracking-wider text-center">
              800x450 Recommended
            </p>
          </div>

          {/* Partner Logo */}
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">
              Partner Logo
            </h3>
            <div
              className={`
              relative w-32 h-32 mx-auto rounded-[32px] border-2 border-dashed border-slate-200 bg-slate-50 overflow-hidden group
              ${!previews.logo ? "flex items-center justify-center" : ""}
            `}
            >
              {previews.logo || formData.logo ? (
                <>
                  <Image
                    src={previews.logo || formData.logo}
                    alt="Logo Preview"
                    fill
                    className="object-contain p-4"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="p-2 bg-white rounded-lg cursor-pointer hover:scale-110 transition-transform">
                      <Upload className="text-[#357ebd]" size={16} />
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, "logo")}
                        accept="image/*"
                      />
                    </label>
                  </div>
                </>
              ) : (
                <label className="flex flex-col items-center gap-2 cursor-pointer group-hover:scale-105 transition-transform text-center p-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm text-slate-400">
                    <ImageIcon size={24} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Logo
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "logo")}
                    accept="image/*"
                  />
                </label>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
