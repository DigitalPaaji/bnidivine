"use client";

import { useEffect, useState } from "react";
import { API_ENDPOINT, getImageUrl } from "../src/lib/api";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const emptyForm = {
  name: "",
  type: "",
  business: "",
  category: "",
  mobile: "",
  address: "",
  img: "",
  badge: [],
  presentations: "",

  display: {
    roster: true,
    directors: false,
    supporters: false,
    founders: false,
    currentLt: false,
  },

  director: {
    type: "",
    tagline: "",
    description: "",
    image: "",
  },

  leadershipType: "",
  sortOrder: 0,
  isActive: true,
};

const navigationItems = [
  {
    name: "Manage Members",
    href: "/admin/members",
    icon: "👥",
  },
  {
    name: "Add Member",
    href: "/admin/members/add",
    icon: "➕",
  },
  {
    name: "Key Supporter Ambassadors",
    href: "/admin/members/supporters",
    icon: "🌟",
  },
  {
    name: "Founder LT Team",
    href: "/admin/members/founders",
    icon: "🏆",
  },
  {
    name: "Current LT Team",
    href: "/admin/members/current-lt",
    icon: "🎖️",
  },
];

const sections = [
  { key: "roster", label: "Member Roster" },
  { key: "directors", label: "Directors" },
  { key: "supporters", label: "Supporters" },
  { key: "founders", label: "Founders / Previous LT" },
  { key: "currentLt", label: "Current LT" },
];

const badges = ["Gold", "Green", "Crorepati"];

export default function MembersAdmin({ mode = "list", section = "all" }) {
  const pathname = usePathname();
  const router = useRouter();

  const [members, setMembers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(mode === "form");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All Members");
  const [previewUrl, setPreviewUrl] = useState("");

const [token, setToken] = useState(null);

const authHeaders = {
  Authorization: `Bearer ${token}`,
};

const redirectToAuth = () => {
  localStorage.removeItem("bni_admin_token");
  setToken(null);
  router.replace("/admin");
};

const handleLogout = () => {
  redirectToAuth();
};

const fetchMembers = async (authToken = token) => {
  if (!authToken) {
    redirectToAuth();
    return;
  }

  try {
    setLoading(true);

    const response = await fetch(`${API_ENDPOINT}/members/admin/all`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-store",
    });

    if (response.status === 401 || response.status === 403) {
      redirectToAuth();
      return;
    }

    if (!response.ok) {
      throw new Error("Unable to fetch members.");
    }

    const result = await response.json();
    setMembers(result.data || []);
  } catch (error) {
    setMessage(error.message);
  } finally {
    setLoading(false);
  }
};

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image size must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(URL.createObjectURL(file));
    uploadImage(file);
  };

useEffect(() => {
  const savedToken = localStorage.getItem("bni_admin_token");

  if (!savedToken) {
    router.replace("/admin");
    return;
  }

  setToken(savedToken);
  fetchMembers(savedToken);
}, []);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateNested = (parent, key, value) => {
    setForm((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [key]: value,
      },
    }));
  };

  const toggleBadge = (badge) => {
    setForm((prev) => ({
      ...prev,
      badge: prev.badge.includes(badge)
        ? prev.badge.filter((item) => item !== badge)
        : [...prev.badge, badge],
    }));
  };

  const uploadImage = async (file) => {
    if (!file) return;

    // Require member name before uploading
    if (!form.name.trim()) {
      setMessage("Please enter Full Name before uploading the image.");
      return;
    }

    try {
      setUploading(true);
      setMessage("");

      const body = new FormData();

      // Send name first, then image
      body.append("fullName", form.name.trim());
      body.append("image", file);

      const response = await fetch(`${API_ENDPOINT}/upload`, {
        method: "POST",
        headers: authHeaders,
        body,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Image upload failed");
      }

      updateField("img", result.image);

      setMessage("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      setMessage(error.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setPreviewUrl("");
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (member) => {
    setForm({
      ...emptyForm,
      ...member,

      badge: member.badge || [],

      display: {
        ...emptyForm.display,
        ...member.display,
      },

      director: {
        ...emptyForm.director,
        ...member.director,
      },
    });

    setEditingId(member._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setMessage("Member name is required");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        editingId
          ? `${API_ENDPOINT}/members/${editingId}`
          : `${API_ENDPOINT}/members`,
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            ...authHeaders,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to save member");
      }

      setMessage(
        editingId ? "Member updated successfully" : "Member added successfully",
      );

      resetForm();
      if (mode === "form") {
        router.push("/admin/members");
        return;
      }

      await fetchMembers();
      // await fetchMembers();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) {
      return;
    }

    try {
      const response = await fetch(`${API_ENDPOINT}/members/${id}`, {
        method: "DELETE",
        headers: authHeaders,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Delete failed");
      }

      setMessage("Member deleted successfully");
      fetchMembers();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const filteredMembers = members.filter((member) => {
    const matchesSearch = [
      member.name,
      member.business,
      member.category,
      member.mobile,
    ].some((value) => value?.toLowerCase().includes(search.toLowerCase()));

    const matchesSection =
      section === "all" || member.display?.[section] === true;

    if (activeTab === "Active") {
      return matchesSearch && matchesSection && member.isActive;
    }

    if (activeTab === "Inactive") {
      return matchesSearch && matchesSection && !member.isActive;
    }

    return matchesSearch && matchesSection;
  });

  const pageTitles = {
    all: "Member Management",
    supporters: "Key Supporter Ambassadors",
    founders: "Founder LT Team",
    currentLt: "Current LT Team",
  };

  const pageDescriptions = {
    all: "Manage all chapter members and their website visibility.",
    supporters: "Manage key supporter ambassadors of the chapter.",
    founders: "Manage founders and previous leadership team members.",
    currentLt: "Manage the current leadership team.",
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] font-sans antialiased text-slate-800 flex justify-center">
      {/* Main Container Wrapper matching reference dashboard layout card */}
      <div className="w-full bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col lg:flex-row">
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-full lg:w-64 bg-white border-r border-slate-100 p-6 flex flex-col justify-between shrink-0">
          <div>
            {/* Logo area */}
            {/* Logo & Title */}
            <div
              className={
                "items-start gap-1.5 transition-opacity duration-300 flex opacity-100"
              }
            >
              <div>
                <img
                  src="/logo.webp"
                  alt="Logo"
                  className="h-6 lg:h-6.5 object-contain cursor-pointer drop-shadow-sm"
                />
                <h1 className="font-semibold text-center text-sm lg:text-base   text-gray-900 tracking-wider">
                  PATIALA
                </h1>
              </div>
              <div className="cursor-pointer">
                <h1 className="font-extrabold text-xl lg:text-2xl border-l-2 pl-1 leading-tight text-gray-900 tracking-tight ">
                  DIVINE
                </h1>
                {/* <p className="text-xs font-medium text-gray-500">Patiala Chapter</p> */}
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1 mt-12">
              {navigationItems.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                      active
                        ? "bg-red-50 text-red-600 shadow-sm shadow-red-500/5"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer status */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs font-bold text-slate-700">
                  Chapter Live
                </span>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">
                v2.4
              </span>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#FAFAFC]">
          {/* TOP HEADER */}
          <header className="bg-white border-b border-slate-100 px-6 lg:px-10 py-5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30">
            {/* Search Input in Header */}
            <div className="relative w-full sm:w-80">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                🔍
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search members, business, category..."
                className="w-full h-11 bg-slate-50 border border-slate-200/70 rounded-2xl pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:bg-white transition-all shadow-sm"
              />
            </div>

            {/* Header Right Actions & Profile */}
            <div className="flex items-center gap-4 ml-auto">
              <button className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition relative">
                🔔
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500"></span>
              </button>

    <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
  <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-red-500 to-amber-500 text-white font-bold flex items-center justify-center shadow-md shadow-red-500/20 text-sm">
    AD
  </div>

  <div className="hidden sm:block text-left">
    <p className="text-xs font-bold text-slate-900 leading-tight">
      Admin User
    </p>
    <p className="text-[11px] text-slate-400 font-medium">
      BNI Divine Patiala
    </p>
  </div>

  <button
    onClick={handleLogout}
    className="ml-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-600 border border-red-100 text-xs font-bold hover:bg-red-600 hover:text-white transition-all"
  >
    Logout
  </button>
</div>
            </div>
          </header>

          {/* PAGE INNER CONTAINER */}
          <div className="p-6 lg:p-10 space-y-8 flex-1">
            {/* PAGE TITLE & CTA */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl lg:text-3xl font- text-slate-900 tracking-tight">
                  {mode === "form" ? "Add New Member" : pageTitles[section]}
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  {mode === "form"
                    ? "Register a new member in the chapter directory."
                    : pageDescriptions[section]}
                </p>
              </div>

              <Link
                href="/admin/members/add"
                className="h-12 px-6 rounded-2xl bg-red-600 text-white font-bold text-sm shadow-lg shadow-red-600/25 hover:bg-red-700 active:scale-95 transition-all flex items-center gap-2"
              >
                <span className="text-lg leading-none">+</span>
                Add New Member
              </Link>
              {/* <button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="h-12 px-6 rounded-2xl bg-red-600 text-white font-bold text-sm shadow-lg shadow-red-600/25 hover:bg-red-700 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span className="text-lg leading-none">+</span> Add New Member
              </button> */}
            </div>

            {/* NOTIFICATION MESSAGE ALERT */}
            {message && (
              <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800 shadow-sm flex items-center justify-between">
                <span className="font-medium">{message}</span>
                <button
                  onClick={() => setMessage("")}
                  className="font-bold text-amber-900 hover:text-red-600 px-2 py-1 text-base"
                >
                  ✕
                </button>
              </div>
            )}

            {/* MEMBER FORM MODAL / COLLAPSIBLE PANEL */}
            {(mode === "form" || showForm) && (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 lg:p-8 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {editingId
                        ? "Edit Member Details"
                        : "Register New Chapter Member"}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Fill in professional details and configure website section
                      assignments.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-500 font-bold flex items-center justify-center transition"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* BASIC INFORMATION */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                      1. Basic Information
                    </h4>
                    <div className="grid gap-5 md:grid-cols-2">
                      {[
                        ["name", "Full Name", "e.g. John Doe"],
                        ["business", "Business Name", "e.g. Acme Corp"],
                        ["category", "Business Category", "e.g. IT & Software"],
                        ["mobile", "Mobile Number", "e.g. +91 98765 43210"],
                      ].map(([key, label, placeholder]) => (
                        <div key={key} className="space-y-1.5">
                          <label className="block text-xs font-bold text-slate-700">
                            {label}
                          </label>
                          <input
                            value={form[key] || ""}
                            onChange={(e) => updateField(key, e.target.value)}
                            placeholder={placeholder}
                            className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/10 outline-none transition-all"
                          />
                        </div>
                      ))}

                     {/* MEMBER TYPE */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700">
                          Member Type
                        </label>
                        <input
                          value={form.type || ""}
                          onChange={(e) =>
                            updateField("type", e.target.value)
                          }
                          placeholder="e.g. Founder, Member, President"
                          className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/10 outline-none transition-all"
                        />
                      </div>

                      <div className="md:col-span-2 space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700">
                          Business Address
                        </label>
                        <textarea
                          rows={2}
                          value={form.address}
                          onChange={(e) =>
                            updateField("address", e.target.value)
                          }
                          placeholder="Full street address..."
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/10 outline-none transition-all resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* IMAGE UPLOAD */}
                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                      2. Profile Photograph
                    </h4>
                    <div className="flex flex-wrap items-center gap-6">
                      {(previewUrl || form.img) && (
                        <div className="relative group">
                          <img
                            src={previewUrl || getImageUrl(form.img)}
                            alt="Member preview"
                            className="h-20 w-20 rounded-2xl object-cover border-2 border-slate-200 shadow-md"
                            onError={() => {
                              console.error("Unable to load member image");
                            }}
                          />
                        </div>
                      )}
                      <label className="flex-1 min-h-[90px] border-2 border-dashed border-slate-200 hover:border-red-500 rounded-2xl bg-slate-50/50 hover:bg-red-50/20 flex flex-col items-center justify-center cursor-pointer transition p-4 text-center">
                        <span className="text-sm font-semibold text-slate-700">
                          {uploading
                            ? "Uploading image..."
                            : "📁 Click to upload member photo"}
                        </span>
                        <span className="text-xs text-slate-400 mt-1">
                          JPG, PNG or WEBP (Max 5 MB)
                        </span>
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          className="hidden"
                          onChange={handleImageChange}
                          disabled={uploading}
                        />
                      </label>
                    </div>
                  </div>

                  {/* BADGES */}
                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                      3. Member Badges & Status
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      {badges.map((badge) => (
                        <label
                          key={badge}
                          className={`flex items-center gap-3 px-5 py-3 rounded-2xl border text-sm font-semibold cursor-pointer transition-all ${
                            form.badge.includes(badge)
                              ? "bg-amber-50 border-amber-300 text-amber-900 shadow-sm"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={form.badge.includes(badge)}
                            onChange={() => toggleBadge(badge)}
                            className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                          />
                          🏆 {badge} Member
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* PRESENTATION / VIDEO */}
                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                      4. Profile Video Presentation
                    </h4>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        YouTube Embed URL
                      </label>
                      <input
                        value={form.presentations}
                        onChange={(e) =>
                          updateField("presentations", e.target.value)
                        }
                        placeholder="https://www.youtube.com/embed/VIDEO_ID"
                        className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/10 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* DISPLAY SETTINGS */}
                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      5. Website Section Visibility
                    </h4>
                    <p className="text-xs text-slate-400 mb-4">
                      Select all the website sections where this member record
                      should appear.
                    </p>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {sections.map((section) => (
                        <label
                          key={section.key}
                          className={`flex items-center gap-3 p-4 rounded-2xl border text-sm font-semibold cursor-pointer transition-all ${
                            form.display[section.key]
                              ? "bg-red-50/60 border-red-200 text-red-900 shadow-sm"
                              : "bg-slate-50/50 border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={form.display[section.key]}
                            onChange={(e) =>
                              updateNested(
                                "display",
                                section.key,
                                e.target.checked,
                              )
                            }
                            className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                          />
                          {section.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* DIRECTOR DETAILS */}
                  {form.display.directors && (
                    <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-6 space-y-4">
                      <h4 className="font-bold text-blue-900 text-sm flex items-center gap-2">
                        <span>⭐</span> Director Profile Information
                      </h4>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-blue-900">
                            Director Type
                          </label>
                          <input
                            value={form.director.type}
                            onChange={(e) =>
                              updateNested("director", "type", e.target.value)
                            }
                            placeholder="Executive Director"
                            className="w-full h-11 rounded-xl border border-blue-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-blue-500"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-blue-900">
                            Director Image Path / URL
                          </label>
                          <input
                            value={form.director.image}
                            onChange={(e) =>
                              updateNested("director", "image", e.target.value)
                            }
                            placeholder="shivani.png or URL"
                            className="w-full h-11 rounded-xl border border-blue-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-blue-500"
                          />
                        </div>
                        <div className="md:col-span-2 space-y-1.5">
                          <label className="block text-xs font-bold text-blue-900">
                            Tagline
                          </label>
                          <input
                            value={form.director.tagline}
                            onChange={(e) =>
                              updateNested(
                                "director",
                                "tagline",
                                e.target.value,
                              )
                            }
                            placeholder="BUILDING STRONG ROOTS. DRIVING GROWTH."
                            className="w-full h-11 rounded-xl border border-blue-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-blue-500"
                          />
                        </div>
                        <div className="md:col-span-2 space-y-1.5">
                          <label className="block text-xs font-bold text-blue-900">
                            Description
                          </label>
                          <textarea
                            rows={3}
                            value={form.director.description}
                            onChange={(e) =>
                              updateNested(
                                "director",
                                "description",
                                e.target.value,
                              )
                            }
                            placeholder="Leadership details..."
                            className="w-full rounded-xl border border-blue-200 bg-white p-4 text-sm text-slate-900 outline-none focus:border-blue-500 resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* LEADERSHIP DESIGNATION */}
                  {(form.display.founders || form.display.currentLt) && (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-6 space-y-3">
                      <h4 className="font-bold text-amber-900 text-sm flex items-center gap-2">
                        <span>🎖️</span> Leadership Designation
                      </h4>
                      <select
                        value={form.leadershipType}
                        onChange={(e) =>
                          updateField("leadershipType", e.target.value)
                        }
                        className="w-full h-12 rounded-xl border border-amber-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-amber-500 font-medium"
                      >
                        <option value="">Select leadership designation</option>
                        <option value="PRESIDENT">President</option>
                        <option value="VICE PRESIDENT">Vice President</option>
                        <option value="SECRETARY">Secretary</option>
                        <option value="TREASURER">Treasurer</option>
                        <option value="JOINT SECRETARY">Joint Secretary</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                  )}

                  {/* PUBLISHING SETTINGS */}
                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                      6. Publishing Control
                    </h4>
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700">
                          Display Order
                        </label>
                        <input
                          type="number"
                          value={form.sortOrder}
                          onChange={(e) =>
                            updateField("sortOrder", Number(e.target.value))
                          }
                          className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-900 outline-none focus:border-red-500"
                        />
                      </div>

                      <div className="flex items-center pt-5">
                        <label className="flex items-center gap-3 cursor-pointer p-3 bg-slate-50 rounded-2xl border border-slate-200 w-full">
                          <input
                            type="checkbox"
                            checked={form.isActive}
                            onChange={(e) =>
                              updateField("isActive", e.target.checked)
                            }
                            className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                          />
                          <span className="text-sm font-semibold text-slate-800">
                            Active – Show on website
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* FORM BUTTONS */}
                  <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                    <button
                      type="submit"
                      disabled={loading || uploading}
                      className="h-12 px-8 rounded-2xl bg-red-600 font-bold text-sm text-white shadow-lg shadow-red-600/25 hover:bg-red-700 transition disabled:opacity-50 cursor-pointer"
                    >
                      {loading
                        ? "Saving..."
                        : editingId
                          ? "Update Member"
                          : "Save Member"}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="h-12 px-8 rounded-2xl border border-slate-200 font-semibold text-sm text-slate-600 hover:bg-slate-100 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* MEMBERS LIST TABLE SECTION */}
            {mode !== "form" && (
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
                {/* TABLE HEADER TABS & COUNTS */}
                <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                    {["All Members", "Active", "Inactive"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          activeTab === tab
                            ? "bg-slate-900 text-white shadow-sm"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {tab}{" "}
                        {tab === "All Members" ? `(${members.length})` : ""}
                      </button>
                    ))}
                  </div>

                  <div className="text-xs font-semibold text-slate-400">
                    Showing {filteredMembers.length} records
                  </div>
                </div>

                {/* TABLE DATA */}
                {loading && members.length === 0 ? (
                  <div className="py-20 text-center text-slate-400 font-medium">
                    Loading members directory...
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px] text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/70 text-xs font-bold text-slate-400 uppercase tracking-wider">
                          <th className="py-4 px-6">Member Details</th>
                          <th className="py-4 px-6">Business & Category</th>
                          <th className="py-4 px-6">Assigned Sections</th>
                          <th className="py-4 px-6">Status</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-100">
                        {filteredMembers.map((member) => (
                          <tr
                            key={member._id}
                            className="hover:bg-slate-50/60 transition-colors"
                          >
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3.5">
                                {member.img ? (
                                  <img
                                    src={getImageUrl(member.img)}
                                    alt=""
                                    className="h-11 w-11 rounded-2xl object-cover border border-slate-200 shadow-sm shrink-0"
                                  />
                                ) : (
                                  <div className="h-11 w-11 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-400 shrink-0">
                                    {member.name?.charAt(0) || "M"}
                                  </div>
                                )}
                                <div>
                                  <p className="font-bold text-slate-900 leading-snug">
                                    {member.name}
                                  </p>
                                  <p className="text-xs text-slate-400 font-medium">
                                    {member.mobile || "No mobile"}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="py-4 px-6">
                              <p className="font-semibold text-slate-800">
                                {member.business || "—"}
                              </p>
                              <p className="text-xs text-slate-400 font-medium">
                                {member.category || "General"}
                              </p>
                            </td>

                            <td className="py-4 px-6">
                              <div className="flex max-w-xs flex-wrap gap-1.5">
                                {sections
                                  .filter(
                                    (section) => member.display?.[section.key],
                                  )
                                  .map((section) => (
                                    <span
                                      key={section.key}
                                      className="rounded-lg bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-700 border border-red-100"
                                    >
                                      {section.label}
                                    </span>
                                  ))}
                              </div>
                            </td>

                            <td className="py-4 px-6">
                              <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                                  member.isActive
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                                    : "bg-rose-50 text-rose-700 border border-rose-200/60"
                                }`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${member.isActive ? "bg-emerald-500" : "bg-rose-500"}`}
                                ></span>
                                {member.isActive ? "Active" : "Inactive"}
                              </span>
                            </td>

                            <td className="py-4 px-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleEdit(member)}
                                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(member._id)}
                                  className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs transition"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {filteredMembers.length === 0 && (
                      <div className="py-16 text-center text-slate-400 font-medium">
                        No members found matching your search criteria.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
