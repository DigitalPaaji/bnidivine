// "use client";

// import { useEffect, useState } from "react";
// import Header from "./compo/Header";
// import MembersData from "./compo/member.json";

// const getAllCategories = () => {
//   const categories = MembersData.map((member) => member.category);
//   const uniqueCategories = [...new Set(categories)];
//   return uniqueCategories.sort((a, b) => a.localeCompare(b));
// };

// export default function Home() {
//   const [category, setCategory] = useState("All");
//   const [filteredMembers, setFilteredMembers] = useState(MembersData);
//   const [search, setSearch] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const categories = getAllCategories();

//   useEffect(() => {
//     setIsLoading(true);
//     const timer = setTimeout(() => {
//       let data = MembersData;
      
//       // Filter Logic
//       if (category !== "All") {
//         data = data.filter((m) => m.category === category);
//       }
      
//       if (search.trim()) {
//         const query = search.toLowerCase().trim();
//         data = data.filter((m) => 
//           m.name?.toLowerCase().includes(query) ||
//           m.business?.toLowerCase().includes(query) ||
//           m.mobile?.includes(query)
//         );
//       }

//       setFilteredMembers(data.sort((a, b) => a.name.localeCompare(b.name)));
//       setIsLoading(false);
//     }, 150);
//     return () => clearTimeout(timer);
//   }, [search, category]);

//   return (
//     <div className="min-h-screen bg-[#F8FAFC]"> {/* Soft off-white background */}
//       <Header
//         category={category}
//         setCategory={setCategory}
//         search={search}
//         setSearch={setSearch}
//         categories={categories}
//       />

//       <main className="container mx-auto px-4 py-8">
        
//         {/* Stats & Feedback Bar */}
//         <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
//           {/* <div>
//             <h1 className="text-2xl font-bold text-gray-900">Directory</h1>
//             <p className="text-sm text-gray-500">Showing {filteredMembers.length} active members</p>
//           </div> */}
//           {/* Active Filter Badges */}
//           <div className="hidden sm:flex gap-2">
//              {category !== "All" && (
//                 <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
//                   {category}
//                   <button onClick={() => setCategory("All")} className="hover:text-blue-900">✕</button>
//                 </span>
//              )}
//           </div>
//         </div>

//         {isLoading ? (
//           <div className="flex justify-center py-20">
//             <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
//           </div>
//         ) : filteredMembers.length === 0 ? (
//           <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white py-20 text-center">
//             <p className="text-gray-500">No results found for your criteria.</p>
//             <button onClick={() => {setCategory("All"); setSearch("");}} className="mt-4 text-blue-600 font-semibold underline">Clear all filters</button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {filteredMembers.map((member) => (
//               <div
//                 key={member.id}
//                 className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:ring-1 hover:ring-blue-500/20"
//               >
//                 <div>
//                   {/* Header: Avatar & Info */}
//                   <div className="flex items-start gap-4">
//                     <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-purple-50 text-xl font-bold text-blue-800 ring-4 ring-purple-50/50">
//                       {member.name?.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="text-lg font-bold leading-tight text-gray-900 group-hover:text-blue-600 transition-colors">
//                         {member.name}
//                       </h3>
//                       <p className="text-sm font-medium text-gray-600">{member.business}</p>
//                       <span className="mt-2 inline-block rounded-md bg-gray-100 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-gray-500">
//                         {member.category}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Contact Details */}
//                   <div className="mt-6 space-y-3">
//                     <div className="flex items-center gap-3 text-gray-600">
//                       <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                       </svg>
//                       <span className="text-sm font-medium">+91 {member.mobile}</span>
//                     </div>
//                     <div className="flex items-start gap-3 text-gray-600">
//                       <svg className="h-4 w-4 mt-0.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
//                       </svg>
//                       <span className="text-sm truncate">{member.email || 'No email provided'}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* WhatsApp Action Button */}
//                 <div className="mt-6 border-t border-gray-100 pt-4 flex items-center justify-end">
//                   <a
//                     href={`https://wa.me/91${member.mobile}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50/50 px-4 py-2 text-sm font-bold text-emerald-700 transition-all hover:bg-emerald-600 hover:text-white"
//                   >
//                     <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
//                     </svg>
//                     WhatsApp
//                   </a>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }



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

// Deterministic color generator based on name
const getMemberColor = (name = "User") => {
  const colors = [
    { bg: "bg-blue-50", text: "text-blue-700", ring: "ring-blue-700/20" },
    { bg: "bg-purple-50", text: "text-purple-700", ring: "ring-purple-700/20" },
    { bg: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-700/20" },
    { bg: "bg-rose-50", text: "text-rose-700", ring: "ring-rose-700/20" },
    { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-700/20" },
    { bg: "bg-indigo-50", text: "text-indigo-700", ring: "ring-indigo-700/20" },
    { bg: "bg-cyan-50", text: "text-cyan-700", ring: "ring-cyan-700/20" },
  ];
  const charCodeSum = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[charCodeSum % colors.length];
};

export default function Home() {
  const [category, setCategory] = useState("All");
  const [filteredMembers, setFilteredMembers] = useState(MembersData);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const categories = getAllCategories();

  // Unified Filter Effect
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let data = MembersData;

      if (category !== "All") {
        data = data.filter((m) => m.category === category);
      }

      if (search.trim()) {
        const query = search.toLowerCase().trim();
        data = data.filter((m) =>
          m.name?.toLowerCase().includes(query) ||
          m.business?.toLowerCase().includes(query) ||
          m.mobile?.includes(query)
        );
      }

      setFilteredMembers(data.sort((a, b) => a.name.localeCompare(b.name)));
      setIsLoading(false);
    }, 150);
    return () => clearTimeout(timer);
  }, [search, category]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
        categories={categories}
      />

      <main className="container mx-auto px-4 py-8">
        
        {/* Improved Stats & Header Section */}
        <div className=" flex flex-col md:flex-row md:items-end justify-between gap-4 ">
          {/* <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Business Directory
            </h1>
            <p className="mt-1 text-gray-500">
              Showing <span className="font-bold text-gray-900">{filteredMembers.length}</span> verified members
            </p>
          </div> */}

          <div className="flex flex-wrap gap-2 ">
            {category !== "All" && (
              <span className="mb-10 inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 ring-1 ring-blue-700/10">
                Category: {category}
                <button onClick={() => setCategory("All")} className="ml-1 hover:text-blue-900">✕</button>
              </span>
            )}
            {search && (
              <span className="mb-10 inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700 ring-1 ring-gray-900/10">
                Search: {search}
                <button onClick={() => setSearch("")} className="ml-1 hover:text-gray-900">✕</button>
              </span>         
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white py-20 text-center">
            <p className="text-lg font-medium text-gray-500">No members found matching your criteria.</p>
            <button 
              onClick={() => { setCategory("All"); setSearch(""); }} 
              className="mt-4 font-bold text-blue-600 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredMembers.map((member) => {
              const colorStyles = getMemberColor(member.name);
              const initials = member.name
                ?.split(' ')
                .map(n => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase();

              return (
                <div
                  key={member.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:ring-1 hover:ring-blue-500/20"
                >
                  <div>
                    {/* Header: Dynamic Avatar & Info */}
                    <div className="flex items-start gap-4">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-md font-semibold ring-2 ${colorStyles.bg} ${colorStyles.text} ${colorStyles.ring}`}>
                        {initials}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <h3 className="truncate text-lg font-bold leading-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                          {member.name}
                        </h3>
                        <p className="truncate text-sm font-medium text-gray-500">{member.business}</p>
                        <span className={`mt-2 inline-block rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${colorStyles.bg} ${colorStyles.text}`}>
                          {member.category}
                        </span>
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div className="mt-6 space-y-3">
                      <div className="flex items-center gap-3 text-gray-600">
                        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a href={`tel:${member.mobile}`} className="text-sm font-semibold hover:text-blue-600 tracking-tight">
                          +91 {member.mobile}
                        </a>
                      </div>
                      {/* <div className="flex items-start gap-3 text-gray-600">
                        <svg className="h-4 w-4 mt-0.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <span className="truncate text-sm">{member.email || 'No email provided'}</span>
                      </div> */}
                    </div>
                  </div>

                  {/* Action Section */}
                  <div className="mt-6 border-t border-gray-100 pt-4 flex items-center justify-between">
                    <a 
                      href={`tel:${member.mobile}`}
                      className="text-xs font-bold text-gray-400 hover:text-blue-600 uppercase tracking-tighter"
                    >
                      Call Now
                    </a>
                    <a
                      href={`https://wa.me/91${member.mobile}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50/50 px-4 py-2 text-sm font-bold text-emerald-700 transition-all hover:bg-emerald-600 hover:text-white"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}


// "use client";

// import { useEffect, useState } from "react";
// import Header from "./compo/Header";
// import MembersData from "./compo/member.json";

// // Filter categories for navigation - unique and sorted
// const getAllCategories = () => {
//   const categories = MembersData.map((member) => member.category);
//   const uniqueCategories = [...new Set(categories)];
//   return uniqueCategories.sort((a, b) => a.localeCompare(b));
// };

// export default function Home() {
//   const [category, setCategory] = useState("All");
//   const [filteredMembers, setFilteredMembers] = useState(MembersData);
//   const [search, setSearch] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   // Get categories for filter buttons
//   const categories = getAllCategories();

//   // Filter by category
//   useEffect(() => {
//     setIsLoading(true);
//     setTimeout(() => {
//       if (category === "All") {
//         setFilteredMembers(MembersData);
//       } else {
//         const filterData = MembersData.filter((item) => item.category === category);
//         setFilteredMembers(filterData);
//       }
//       setIsLoading(false);
//     }, 100);
//   }, [category]);

//   // Filter by search
//   useEffect(() => {
//     setIsLoading(true);
//     setTimeout(() => {
//       if (!search.trim()) {
//         if (category === "All") {
//           setFilteredMembers(MembersData);
//         } else {
//           const filterData = MembersData.filter((item) => item.category === category);
//           setFilteredMembers(filterData);
//         }
//       } else {
//         const filtered = MembersData.filter((member) => {
//           const query = search.toLowerCase().trim();
//           return (
//             (category === "All" || member.category === category) &&
//             (member.name?.toLowerCase().includes(query) ||
//               member.business?.toLowerCase().includes(query) ||
//               member.category?.toLowerCase().includes(query) ||
//               member.mobile?.includes(query))
//           );
//         });
//         setFilteredMembers(filtered);
//       }
//       setIsLoading(false);
//     }, 150);
//   }, [search, category]);

//   return (
//     <div className="min-h-screen bg-white">
//       <Header
//         category={category}
//         setCategory={setCategory}
//         search={search}
//         setSearch={setSearch}
//         categories={categories}
//       />

//       <main className="container mx-auto px-4 py-8 md:py-10">
//         {/* Stats Bar */}
//         <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
//           <div className="flex items-center gap-2">
//             <span className="text-sm font-medium text-gray-600">Total:</span>
//             <span className="text-xl font-bold text-gray-900">{filteredMembers.length}</span>
//             <span className="text-sm text-gray-500">members</span>
//           </div>
//           {category !== "All" && (
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-600">Filter:</span>
//               <span className="rounded bg-gray-200 px-2 py-0.5 text-sm text-gray-800">{category}</span>
//               <button
//                 onClick={() => setCategory("All")}
//                 className="text-gray-400 hover:text-red-600 text-sm"
//               >
//                 ✕
//               </button>
//             </div>
//           )}
//           {search && (
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-600">Search:</span>
//               <span className="rounded bg-gray-200 px-2 py-0.5 text-sm text-gray-800">"{search}"</span>
//               <button
//                 onClick={() => setSearch("")}
//                 className="text-gray-400 hover:text-red-600 text-sm"
//               >
//                 ✕
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Loading State */}
//         {isLoading ? (
//           <div className="flex justify-center py-16">
//             <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-red-600"></div>
//           </div>
//         ) : filteredMembers.length === 0 ? (
//           /* Empty State */
//           <div className="rounded-lg border border-gray-200 bg-gray-50 py-16 text-center">
//             <div className="mb-3 text-4xl text-gray-400">👥</div>
//             <p className="text-lg font-medium text-gray-700">No members found</p>
//             <p className="mt-1 text-sm text-gray-500">Try changing your filter or search</p>
//             <button
//               onClick={() => {
//                 setCategory("All");
//                 setSearch("");
//               }}
//               className="mt-4 rounded-md bg-gray-900 px-4 py-1.5 text-sm text-white hover:bg-red-700 transition"
//             >
//               Clear filters
//             </button>
//           </div>
//         ) : (
//           /* Member Grid */
//           <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//             {[...filteredMembers]
//               .sort((a, b) => a.name.localeCompare(b.name))
//               .map((member) => (
//                 <div
//                   key={member.id}
//                   className="rounded-lg border border-gray-200 bg-white p-4 transition hover:shadow-md"
//                 >
//                   {/* Header */}
//                   <div className="flex items-start gap-3">
//                     {/* Avatar */}
//                     <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-800 text-lg font-bold text-white">
//                       {member.name?.charAt(0).toUpperCase()}
//                     </div>
//                     <div className="min-w-0 flex-1">
//                       <h2 className="text-base font-bold text-gray-900">
//                         {member.name}
//                       </h2>
//                       <p className="text-xs text-gray-500 truncate">
//                         {member.business}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Category */}
//                   <div className="mt-3">
//                     <span className="inline-block rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
//                       {member.category}
//                     </span>
//                   </div>

//                   {/* Contact */}
//                   <div className="mt-3 space-y-2 border-t border-gray-100 pt-3">
//                     <div className="flex items-center text-sm">
//                       <span className="w-7 text-gray-500">📞</span>
//                       <a href={`tel:${member.mobile}`} className="text-gray-700 hover:text-blue-700">
//                         +91 {member.mobile}
//                       </a>
//                     </div>
//                     <div className="flex text-sm">
//                       <span className="w-7 text-gray-500">📍</span>
//                       <span className="text-xs text-gray-500 line-clamp-2">
//                         {member.address}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Buttons */}
//                   <div className="mt-4 flex gap-2">
//                     <a
//                       href={`tel:${member.mobile}`}
//                       className="flex-1 rounded-md bg-gray-800 py-1.5 text-center text-sm font-medium text-white hover:bg-blue-700 transition"
//                     >
//                       Call
//                     </a>
//                     <a
//                       href={`https://wa.me/91${member.mobile}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex-1 rounded-md border border-gray-300 py-1.5 text-center text-sm font-medium text-gray-700 hover:border-green-500 hover:text-green-600 transition"
//                     >
//                       WhatsApp
//                     </a>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         )}

//         {/* Footer count */}
//         {!isLoading && filteredMembers.length > 0 && (
//           <div className="mt-8 text-center text-xs text-gray-400">
//             {filteredMembers.length} member{filteredMembers.length !== 1 ? "s" : ""}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }