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
  Filter,
  ArrowRight,
  ArrowUpDown,
  Calendar,
  Eye,
  Upload,
  Save,
  X,
  Image as ImageIcon,
  CheckCircle2,
  Globe,
  Phone,
  Store,
  FileText,
  Bookmark,
  Zap,
} from "lucide-react";
import Swal from "sweetalert2";

export default function PromotionsListPage() {
  // List State
  const [promotions, setPromotions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    partner: "",
    category: "",
    location: "",
    applicability: "",
    website: "",
    hotline: "",
    image: "",
    logo: "",
    tnc: [""],
  });
  const [previews, setPreviews] = useState({ image: null, logo: null });

  useEffect(() => {
    fetchPromotions();
    fetchCategories();
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

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const handleOpenModal = (promo = null) => {
    if (promo) {
      setEditingId(promo._id);
      setFormData({
        title: promo.title || "",
        description: promo.description || "",
        partner: promo.partner || "",
        category: promo.category || "",
        location: promo.location || "",
        applicability: promo.applicability || "",
        website: promo.website || "",
        hotline: promo.hotline || "",
        image: typeof promo.image === "string" ? promo.image : "",
        logo: typeof promo.logo === "string" ? promo.logo : "",
        tnc: promo.tnc && promo.tnc.length > 0 ? promo.tnc : [""],
      });
      setPreviews({
        image: typeof promo.image === "string" ? promo.image : null,
        logo: typeof promo.logo === "string" ? promo.logo : null,
      });
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        description: "",
        partner: "",
        category: "",
        location: "",
        applicability: "",
        website: "",
        hotline: "",
        image: "",
        logo: "",
        tnc: [""],
      });
      setPreviews({ image: null, logo: null });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Form Handlers
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
      Swal.fire({
        title: "Upload Failed",
        text: "Please try again later.",
        icon: "error",
        confirmButtonColor: "#357ebd",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation

    setIsSaving(true);

    try {
      const url = editingId
        ? `/api/promotions/${editingId}`
        : "/api/promotions";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchPromotions(); // Refresh list
        await Swal.fire({
          title: editingId ? "Updated!" : "Deployed!",
          text: `Promotion has been ${editingId ? "updated" : "created"} successfully.`,
          icon: "success",
          confirmButtonColor: "#357ebd",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Failed to save promotion",
        icon: "error",
        confirmButtonColor: "#357ebd",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this! This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#357ebd",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/promotions/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPromotions(promotions.filter((p) => p._id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Promotion has been deleted.",
          icon: "success",
          confirmButtonColor: "#357ebd",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete promotion",
        icon: "error",
        confirmButtonColor: "#357ebd",
      });
    }
  };

  const filteredPromotions = promotions.filter(
    (promo) =>
      promo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promo.partner?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <div className="space-y-12 animate-fade-in-up md:p-1">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-wide">
              Promotions Gallery
            </h1>
            <p className="text-slate-500 font-medium mt-2 flex items-center gap-2">
              <Tag size={18} className="text-blue-500" />
              Managing{" "}
              <span className="text-slate-900 font-black">
                {promotions.length}
              </span>{" "}
              active campaigns across the network.
            </p>
          </div>
          <button
            onClick={() => handleOpenModal(null)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#357ebd] text-white font-bold rounded-md cursor-pointer hover:bg-[#2c699e] transition-all transform hover:-translate-y-1 active:scale-95 shadow-blue-200/50"
          >
            <Plus
              size={22}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
            <span>Post New Offer</span>
          </button>
        </div>

        {/* Control Bar */}
        <div className="bg-white p-6 rounded-md border border-slate-100 flex flex-col md:flex-row gap-6 items-center">
          <div className="relative flex-1 group w-full">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#357ebd] transition-colors"
              size={22}
            />
            <input
              type="text"
              placeholder="Search campaign name, partner or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#357ebd] focus:bg-white transition-all font-bold text-slate-700 placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-slate-50 text-slate-600 font-bold rounded-md border border-slate-100 hover:bg-slate-100 transition-all">
              <Filter size={18} />
              Filters
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-slate-50 text-slate-600 font-bold rounded-md border border-slate-100 hover:bg-slate-100 transition-all">
              <ArrowUpDown size={18} />
              Sort
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-md border border-slate-100 shadow-sm overflow-hidden border-separate">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-10 py-6 font-bold text-[11px] uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100">
                    Main Campaign Info
                  </th>
                  <th className="px-10 py-6 font-bold text-[11px] uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100">
                    Partner Brand
                  </th>
                  <th className="px-10 py-6 font-bold text-[11px] uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100">
                    Deployment
                  </th>
                  <th className="px-10 py-6 font-bold text-[11px] uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 text-right">
                    System Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {isLoading ? (
                  <tr>
                    <td colSpan="4" className="py-32 text-center">
                      <div className="flex flex-col items-center gap-6">
                        <div className="relative">
                          <div className="w-16 h-16 border-4 border-blue-50 rounded-full" />
                          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-[#357ebd] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
                        </div>
                        <p className="text-slate-500 font-bold tracking-widest text-xs uppercase">
                          Syncing with Cloud...
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : filteredPromotions.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-32 text-center">
                      <div className="max-w-xs mx-auto space-y-4">
                        <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto text-slate-300">
                          <Search size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">
                          No matches found
                        </h3>
                        <p className="text-slate-500 font-medium">
                          We couldn&apos;t find any promotions matching your
                          search criteria.
                        </p>
                        <button
                          onClick={() => setSearchQuery("")}
                          className="text-[#357ebd] font-bold uppercase text-xs tracking-widest"
                        >
                          Clear Search
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredPromotions.map((promo, idx) => (
                    <tr
                      key={promo._id}
                      style={{ animationDelay: `${idx * 50}ms` }}
                      className="hover:bg-slate-50/70 transition-all duration-300 group animate-fade-in-up"
                    >
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-6">
                          <div className="relative w-20 h-20 rounded-md overflow-hidden border-2 border-slate-100 shadow-sm shrink-0 group-hover:shadow-xl transition-shadow duration-500">
                            {promo.image && promo.image.length > 0 ? (
                              <Image
                                src={promo.image}
                                alt={promo.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                            ) : (
                              <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                <ImageIcon
                                  size={20}
                                  className="text-slate-300"
                                />
                              </div>
                            )}
                          </div>
                          <div className="max-w-md">
                            <p className="font-bold text-slate-900 leading-tight mb-1.5 text-lg group-hover:text-[#357ebd] transition-colors">
                              {promo.title}
                            </p>
                            <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                              <span className="flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-lg">
                                <Eye size={12} /> Live Preview
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Calendar size={12} /> Posted Feb 2026
                              </span>
                              {promo.category && (
                                <span className="flex items-center gap-1.5 text-blue-500 font-bold">
                                  <Tag size={12} /> {promo.category}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-md bg-white p-2 shadow-sm border border-slate-100 flex items-center justify-center group-hover:rotate-6 transition-transform">
                            <div className="relative w-full h-full">
                              {promo.logo && promo.logo.length > 0 ? (
                                <Image
                                  src={promo.logo}
                                  alt="Logo"
                                  fill
                                  className="object-contain"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Store size={16} className="text-slate-300" />
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <span className="font-bold text-slate-800 tracking-tight block uppercase text-xs">
                              {promo.partner}
                            </span>
                            <span className="text-[11px] font-bold text-slate-400">
                              Trusted Partner
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-2xl text-[11px] font-bold uppercase tracking-[0.15em] border border-emerald-100 shadow-sm shadow-emerald-50">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                          Active Deal
                        </span>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                          <button
                            onClick={() => handleOpenModal(promo)}
                            className="flex items-center gap-2 pl-4 pr-5 py-3 bg-white text-slate-700 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 rounded-md shadow-sm transition-all font-bold cursor-pointer"
                          >
                            <Edit2 size={16} />
                            <span className="text-xs uppercase tracking-widest">
                              Edit
                            </span>
                          </button>
                          <button
                            onClick={() => handleDelete(promo._id)}
                            className="p-3 bg-white text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-200 rounded-md shadow-sm transition-all cursor-pointer"
                            title="Delete Permanently"
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

          {/* Pagination/Status Footer */}
          <div className="px-10 py-6 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              Showing {filteredPromotions.length} results
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-300 font-black text-xs disabled:opacity-50"
              >
                Prev
              </button>
              <button
                disabled
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-300 font-black text-xs disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/10 backdrop-blur-sm animate-fade-in"
            onClick={handleCloseModal}
          />

          <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in flex flex-col max-h-[90vh]">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col h-full overflow-hidden"
            >
              {/* Modal Header */}
              <div className="px-10 py-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 text-[#357ebd] rounded-2xl">
                    <Store size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {editingId ? "Edit Promotion" : "Assemble New Offer"}
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">
                      {editingId
                        ? "Update details for this campaign."
                        : "Create and deploy a new marketing campaign."}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex items-center justify-center gap-3 px-8 py-3 bg-[#357ebd] text-white font-bold rounded-xl shadow-lg shadow-blue-200/50 hover:bg-[#2c699e] transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:translate-y-0 cursor-pointer"
                  >
                    {isSaving ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <Save size={20} />
                    )}
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Body - Scrollable */}
              <div className="p-10 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  {/* Left Column (Inputs) */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* Core Details */}
                    <div className="space-y-6">
                      <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                        Campaign Details
                      </h3>

                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                          Headline Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#357ebd] transition-all font-bold text-lg text-slate-900 placeholder:text-slate-300"
                          placeholder="e.g. Summer Buffet Special"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                          Description
                        </label>
                        <textarea
                          name="description"
                          rows="4"
                          value={formData.description}
                          onChange={handleInputChange}
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#357ebd] transition-all font-medium text-slate-700 placeholder:text-slate-300 resize-none"
                          placeholder="Describe the offer details..."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                            Partner Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="partner"
                            value={formData.partner}
                            onChange={handleInputChange}
                            required
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#357ebd] transition-all font-bold text-slate-700 placeholder:text-slate-300"
                            placeholder="e.g. Pizza Hut"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                            Category
                          </label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#357ebd] transition-all font-bold text-slate-700"
                          >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                              <option key={cat._id} value={cat.name}>
                                {cat.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Rules & Contact */}
                    <div className="space-y-6 pt-4">
                      <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                        Rules & Contact
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                            Target Audience
                          </label>
                          <input
                            type="text"
                            name="applicability"
                            value={formData.applicability}
                            onChange={handleInputChange}
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#357ebd] transition-all font-bold text-slate-700 placeholder:text-slate-300"
                            placeholder="e.g. Gold Members"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                            Location
                          </label>
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#357ebd] transition-all font-bold text-slate-700 placeholder:text-slate-300"
                            placeholder="e.g. Dhaka"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                            Website
                          </label>
                          <input
                            type="text"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#357ebd] transition-all font-bold text-slate-700 placeholder:text-slate-300"
                            placeholder="https://..."
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                            Hotline
                          </label>
                          <input
                            type="text"
                            name="hotline"
                            value={formData.hotline}
                            onChange={handleInputChange}
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#357ebd] transition-all font-bold text-slate-700 placeholder:text-slate-300"
                            placeholder="+880..."
                          />
                        </div>
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="space-y-6 pt-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">
                          Terms & Conditions
                        </h3>
                        <button
                          type="button"
                          onClick={addTnc}
                          className="text-xs font-bold text-[#357ebd] hover:underline uppercase tracking-wide cursor-pointer"
                        >
                          + Add Term
                        </button>
                      </div>
                      <div className="space-y-3">
                        {formData.tnc.map((term, index) => (
                          <div key={index} className="flex gap-2">
                            <div className="w-8 h-12 flex items-center justify-center text-slate-300 font-bold text-sm select-none">
                              {index + 1}.
                            </div>
                            <input
                              type="text"
                              value={term}
                              onChange={(e) =>
                                handleTncChange(index, e.target.value)
                              }
                              className="flex-1 px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#357ebd] transition-all font-medium text-slate-700 placeholder:text-slate-300"
                              placeholder="Enter term..."
                            />
                            <button
                              type="button"
                              onClick={() => removeTnc(index)}
                              className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column (Images) */}
                  <div className="space-y-8">
                    <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl">
                      <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <ImageIcon size={20} className="text-[#357ebd]" />
                        Visual Assets
                      </h3>

                      {/* Banner */}
                      <div className="space-y-4 mb-8">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          Hero Image <span className="text-red-500">*</span>
                        </label>
                        <div className="relative aspect-video bg-slate-800 rounded-2xl border-2 border-dashed border-slate-700 overflow-hidden group hover:border-[#357ebd] transition-colors">
                          {(previews.image &&
                            typeof previews.image === "string") ||
                          (formData.image &&
                            typeof formData.image === "string") ? (
                            <>
                              <Image
                                src={
                                  previews.image ||
                                  formData.image ||
                                  "/placeholder.svg"
                                }
                                alt="Banner"
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <label className="p-3 bg-white/20 backdrop-blur rounded-xl cursor-pointer hover:bg-white/30 transition-all">
                                  <Upload size={20} />
                                  <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) =>
                                      handleFileUpload(e, "image")
                                    }
                                    accept="image/*"
                                  />
                                </label>
                              </div>
                            </>
                          ) : (
                            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                              <Upload
                                size={24}
                                className="text-slate-500 mb-2 group-hover:text-white transition-colors"
                              />
                              <span className="text-[10px] font-bold text-slate-500 uppercase group-hover:text-white transition-colors">
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
                      </div>

                      {/* Logo */}
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          Partner Logo
                        </label>
                        <div className="relative w-32 h-32 mx-auto bg-slate-800 rounded-full border-2 border-dashed border-slate-700 overflow-hidden group hover:border-[#357ebd] transition-colors">
                          {(previews.logo &&
                            typeof previews.logo === "string") ||
                          (formData.logo &&
                            typeof formData.logo === "string") ? (
                            <>
                              <Image
                                src={
                                  previews.logo ||
                                  formData.logo ||
                                  "/placeholder.svg"
                                }
                                alt="Logo"
                                fill
                                className="object-contain p-4"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <label className="p-3 bg-white/20 backdrop-blur rounded-full cursor-pointer hover:bg-white/30 transition-all">
                                  <Upload size={20} />
                                  <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) =>
                                      handleFileUpload(e, "logo")
                                    }
                                    accept="image/*"
                                  />
                                </label>
                              </div>
                            </>
                          ) : (
                            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                              <ImageIcon
                                size={24}
                                className="text-slate-500 mb-1 group-hover:text-white transition-colors"
                              />
                              <span className="text-[9px] font-bold text-slate-500 uppercase group-hover:text-white transition-colors">
                                Upload Logo
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

                    <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                      <h4 className="flex items-center gap-2 text-sm font-bold text-[#357ebd] uppercase tracking-wide mb-4">
                        <Zap size={16} fill="currentColor" /> Quick Tips
                      </h4>
                      <ul className="space-y-3">
                        <li className="text-xs font-medium text-slate-600 flex gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-300 mt-1.5 shrink-0" />
                          Use high-res images for best results.
                        </li>
                        <li className="text-xs font-medium text-slate-600 flex gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-300 mt-1.5 shrink-0" />
                          Ensure partner logo has transparent background.
                        </li>
                        <li className="text-xs font-medium text-slate-600 flex gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-300 mt-1.5 shrink-0" />
                          Double-check T&Cs for clarity.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
