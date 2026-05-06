"use client";

import { useEffect, useState } from "react";
import Header from "./compo/Header";
import MembersData from "./compo/member.json";

// Filter categories for navigation - unique and sorted
const getAllCategories = () => {
  const categories = MembersData.map((member) => member.category);
  const uniqueCategories = [...new Set(categories)];
  return uniqueCategories.sort((a, b) => a.localeCompare(b));
};

export default function Home() {
  const [category, setCategory] = useState("All");
  const [filteredMembers, setFilteredMembers] = useState(MembersData);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Get categories for filter buttons
  const categories = getAllCategories();

  // Filter by category
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      if (category === "All") {
        setFilteredMembers(MembersData);
      } else {
        const filterData = MembersData.filter((item) => item.category === category);
        setFilteredMembers(filterData);
      }
      setIsLoading(false);
    }, 100);
  }, [category]);

  // Filter by search
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      if (!search.trim()) {
        if (category === "All") {
          setFilteredMembers(MembersData);
        } else {
          const filterData = MembersData.filter((item) => item.category === category);
          setFilteredMembers(filterData);
        }
      } else {
        const filtered = MembersData.filter((member) => {
          const query = search.toLowerCase().trim();
          return (
            (category === "All" || member.category === category) &&
            (member.name?.toLowerCase().includes(query) ||
              member.business?.toLowerCase().includes(query) ||
              member.category?.toLowerCase().includes(query) ||
              member.mobile?.includes(query))
          );
        });
        setFilteredMembers(filtered);
      }
      setIsLoading(false);
    }, 150);
  }, [search, category]);

  return (
    <div className="min-h-screen bg-white">
      <Header
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
        categories={categories}
      />

      <main className="container mx-auto px-4 py-8 md:py-10">
        {/* Stats Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Total:</span>
            <span className="text-xl font-bold text-gray-900">{filteredMembers.length}</span>
            <span className="text-sm text-gray-500">members</span>
          </div>
          {category !== "All" && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Filter:</span>
              <span className="rounded bg-gray-200 px-2 py-0.5 text-sm text-gray-800">{category}</span>
              <button
                onClick={() => setCategory("All")}
                className="text-gray-400 hover:text-red-600 text-sm"
              >
                ✕
              </button>
            </div>
          )}
          {search && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Search:</span>
              <span className="rounded bg-gray-200 px-2 py-0.5 text-sm text-gray-800">"{search}"</span>
              <button
                onClick={() => setSearch("")}
                className="text-gray-400 hover:text-red-600 text-sm"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-red-600"></div>
          </div>
        ) : filteredMembers.length === 0 ? (
          /* Empty State */
          <div className="rounded-lg border border-gray-200 bg-gray-50 py-16 text-center">
            <div className="mb-3 text-4xl text-gray-400">👥</div>
            <p className="text-lg font-medium text-gray-700">No members found</p>
            <p className="mt-1 text-sm text-gray-500">Try changing your filter or search</p>
            <button
              onClick={() => {
                setCategory("All");
                setSearch("");
              }}
              className="mt-4 rounded-md bg-gray-900 px-4 py-1.5 text-sm text-white hover:bg-red-700 transition"
            >
              Clear filters
            </button>
          </div>
        ) : (
          /* Member Grid */
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...filteredMembers]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((member) => (
                <div
                  key={member.id}
                  className="rounded-lg border border-gray-200 bg-white p-4 transition hover:shadow-md"
                >
                  {/* Header */}
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-800 text-lg font-bold text-white">
                      {member.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-base font-bold text-gray-900">
                        {member.name}
                      </h2>
                      <p className="text-xs text-gray-500 truncate">
                        {member.business}
                      </p>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="mt-3">
                    <span className="inline-block rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                      {member.category}
                    </span>
                  </div>

                  {/* Contact */}
                  <div className="mt-3 space-y-2 border-t border-gray-100 pt-3">
                    <div className="flex items-center text-sm">
                      <span className="w-7 text-gray-500">📞</span>
                      <a href={`tel:${member.mobile}`} className="text-gray-700 hover:text-blue-700">
                        +91 {member.mobile}
                      </a>
                    </div>
                    <div className="flex text-sm">
                      <span className="w-7 text-gray-500">📍</span>
                      <span className="text-xs text-gray-500 line-clamp-2">
                        {member.address}
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="mt-4 flex gap-2">
                    <a
                      href={`tel:${member.mobile}`}
                      className="flex-1 rounded-md bg-gray-800 py-1.5 text-center text-sm font-medium text-white hover:bg-blue-700 transition"
                    >
                      Call
                    </a>
                    <a
                      href={`https://wa.me/91${member.mobile}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-md border border-gray-300 py-1.5 text-center text-sm font-medium text-gray-700 hover:border-green-500 hover:text-green-600 transition"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Footer count */}
        {!isLoading && filteredMembers.length > 0 && (
          <div className="mt-8 text-center text-xs text-gray-400">
            {filteredMembers.length} member{filteredMembers.length !== 1 ? "s" : ""}
          </div>
        )}
      </main>
    </div>
  );
}