"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Loader2,
  Tag,
  X,
  Save,
  Grid,
  Filter,
  Image as ImageIcon,
  Upload,
} from "lucide-react";
import Swal from "sweetalert2";
import Image from "next/image";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [previews, setPreviews] = useState({ image: null });
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description || "",
        image: category.image || "",
      });
      setPreviews({
        image: category.image || null,
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", description: "", image: "" });
      setPreviews({ image: null });
    }
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show local preview immediately
    setPreviews({ image: URL.createObjectURL(file) });

    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadData,
      });

      if (!res.ok) {
        throw new Error("Upload response not OK");
      }

      const data = await res.json();
      if (data.url) {
        setFormData((prev) => ({ ...prev, image: data.url }));
      } else {
        throw new Error("No URL returned from upload");
      }
    } catch (err) {
      console.error("Upload failed", err);
      // Revert preview on failure
      setPreviews((prev) => ({
        ...prev,
        image: editingCategory?.image || null,
      }));

      Swal.fire({
        title: "Upload Failed",
        text: "Could not upload image. Please try again or check file type.",
        icon: "error",
        confirmButtonColor: "#357ebd",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const url = editingCategory
        ? `/api/categories/${editingCategory._id}`
        : "/api/categories";
      const method = editingCategory ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchCategories();
        Swal.fire({
          title: "Success!",
          text: `Category ${editingCategory ? "updated" : "created"} successfully.`,
          icon: "success",
          confirmButtonColor: "#357ebd",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Failed to save category",
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
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#357ebd",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCategories(categories.filter((c) => c._id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Category has been deleted.",
          icon: "success",
          confirmButtonColor: "#357ebd",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete category",
        icon: "error",
        confirmButtonColor: "#357ebd",
      });
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <div className="relative min-h-[85vh] space-y-8 p-1 animate-fade-in-up">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Categories
            </h1>
            <p className="text-slate-500 font-medium mt-1 flex items-center gap-2 text-sm">
              <Tag size={16} className="text-[#357ebd]" />
              Manage your offer classifications
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative w-full sm:w-64 group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#357ebd] transition-colors">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-[#357ebd]/20 text-slate-700 placeholder:text-slate-400 font-medium transition-all outline-none"
              />
            </div>

            <button
              onClick={() => handleOpenModal()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#357ebd] text-white font-bold rounded-md cursor-pointer hover:bg-[#2c699e] transition-all transform hover:-translate-y-1 active:scale-95 shadow-blue-200/50"
            >
              <Plus size={20} />
              <span>New Category</span>
            </button>
          </div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full py-32 text-center">
              <Loader2 className="w-10 h-10 text-[#357ebd] animate-spin mx-auto mb-4" />
              <p className="text-slate-400 font-bold tracking-widest text-xs uppercase">
                Loading Categories...
              </p>
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="col-span-full py-24 text-center bg-white rounded-2xl border border-dashed border-slate-200">
              <div className="max-w-xs mx-auto space-y-4">
                <div className="w-12 h-12 rounded-lg bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                  <Grid size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {searchTerm ? "No matches found" : "No categories yet"}
                </h3>
                <p className="text-slate-500 text-sm font-medium">
                  {searchTerm
                    ? "Try a different search term."
                    : "Create your first category to get started."}
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="text-[#357ebd] font-bold text-sm hover:underline"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <div
                key={category._id}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 group relative overflow-hidden flex flex-col h-full"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-50/50 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 ease-out" />

                <div className="relative flex-1">
                  <div className="w-12 h-12 bg-blue-50 text-[#357ebd] rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm overflow-hidden relative">
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Tag size={22} />
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 truncate pr-4">
                    {category.name}
                  </h3>

                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 min-h-[2.5em]">
                    {category.description || (
                      <span className="text-slate-300 italic">
                        No description provided.
                      </span>
                    )}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-4 gap-3 relative z-10">
                  <span className="text-xs font-bold text-slate-300 tracking-wider uppercase">
                    Action
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenModal(category)}
                      className="p-2 text-slate-400 hover:text-[#357ebd] hover:bg-blue-50 rounded-lg transition-all"
                      title="Edit Category"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete Category"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Full Screen Modal Overlay - FIXED positioning to cover everything */}
      {isModalOpen && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/10 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {editingCategory ? "Update Category" : "New Category"}
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  {editingCategory
                    ? "Make changes to your category details."
                    : "Add a new category for your offers."}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#357ebd] transition-colors">
                      <Tag size={18} />
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#357ebd] focus:bg-white transition-all font-semibold text-slate-900 placeholder:text-slate-400"
                      placeholder="e.g. Wellness & Spa"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                    Cover Image
                  </label>

                  <div className="rounded-xl border-2 border-dashed border-slate-200 p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 hover:border-[#357ebd] transition-all group relative overflow-hidden">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        handleFileUpload(e);
                        e.target.value = "";
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />

                    {previews.image ? (
                      <div className="relative w-full h-48 rounded-lg overflow-hidden group/preview">
                        <Image
                          src={previews.image}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity z-20 pointer-events-none">
                          <span className="text-white font-bold text-sm flex items-center gap-2 mb-3">
                            <Upload size={16} /> Change Image
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setFormData({ ...formData, image: "" });
                            setPreviews({ ...previews, image: null });
                          }}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all z-30 opacity-0 group-hover/preview:opacity-100 shadow-md pointer-events-auto"
                          title="Remove Image"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="py-8">
                        <div className="w-16 h-16 bg-blue-50 text-[#357ebd] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                          <ImageIcon size={28} />
                        </div>
                        <h4 className="text-slate-900 font-bold mb-1">
                          Click to Upload
                        </h4>
                        <p className="text-xs text-slate-400">
                          JPG, PNG, WEBP or GIF (max. 5MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                    Brief Description
                  </label>
                  <textarea
                    rows="4"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#357ebd] focus:bg-white transition-all font-medium text-slate-700 placeholder:text-slate-400 resize-none"
                    placeholder="Describe what offers belong in this category..."
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="w-full inline-flex items-center justify-center gap-2 py-4 bg-[#357ebd] text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-[#2c699e] hover:shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSaving ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <Save size={20} />
                    )}
                    <span>
                      {editingCategory ? "Save Changes" : "Create Category"}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
