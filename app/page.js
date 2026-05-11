"use client";

import { useEffect, useState } from "react";
import Header from "./compo/Header";
import MembersData from "./compo/member.json";
import { useRouter } from "next/navigation";

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
 const [presentations,setPresentations]=useState("")
  const categories = getAllCategories();
    // const router = useRouter();

 const getModalVideoUrl = (url) => {
    const videoId = url.split("/embed/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0`;
  };
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
          m.mobile?.includes(query) ||
         m.category?.toLowerCase().includes(query)
        );
      }

      setFilteredMembers(data.sort((a, b) => a.name.localeCompare(b.name)));
      setIsLoading(false);
    }, 150);
    return () => clearTimeout(timer);
  }, [search, category]);


//  useEffect(() => {
//    if(!presentations) return

//     window.history.pushState(null, "", window.location.href);

//     const handleBackButton = () => {
//     setPresentations("")
//       // Push again so user stays
//       window.history.pushState(null, "", window.location.href);
//     };

//     window.addEventListener("popstate", handleBackButton);

//     return () => {
//       window.removeEventListener("popstate", handleBackButton);
//     };
//   }, [router]);


if(presentations)
{
  return(
<div className="h-screen relative">

 <iframe
                  src={getModalVideoUrl(
                    presentations
                  )}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />


</div>


  )

}
  return (
    <div className="min-h-screen bg-[#F8FAFC]">



      <Header
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
        categories={categories}
      />

      <main className="container mx-auto px-4 py-4">
        <div className=" flex flex-col md:flex-row md:items-end justify-between gap-4 ">
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
            <h2 className="pb-4 font-bold text-xl md:text-2xl uppercase text-center tracking-wide opacity-55 text-[#CF2030] whitespace-nowrap">
      Patiala Roaster
    </h2>

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
                    {/* Header: Dynamic Avatar/Image & Info */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 overflow-hidden">
                        <h3 className="truncate text-lg font-bold leading-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                          {member.name}
                        </h3>
                        <p className="truncate text-sm font-medium text-gray-500">{member.business}</p>
                        {/* <div onClick={()=>{member?.Presentations && setPresentations(member?.Presentations)  }} className={` font-bold uppercase tracking-widest flex gap-1 mt-2  px-2 py-0.5  items-center text-[10px] cursor-pointer`}>
                        <span className={`inline-block rounded-md   ${colorStyles.bg} ${colorStyles.text}`}>
                          {member.category}
                        </span>
                     {member?.Presentations &&   <button className=" fa-regular fa-circle-play">
                        </button>

                        
                      
                     }</div> */}
                      <span className={`inline-block rounded-md font-bold uppercase tracking-widest mt-2  px-2 py-0.5   text-[10px]   ${colorStyles.bg} ${colorStyles.text}`}>
                          {member.category}
                        </span>
                      
                      </div>
                      {/* Image on the right side */}
                      <div className={`relative flex h-20 w-18 shrink-0 items-center justify-center overflow-hidden rounded-lg ${colorStyles.bg} ${colorStyles.ring}`}>
                        {member.img && member.img !== ".webp" ? (
                          <img 
                            src={`/Images/${member.img}`} 
                            alt={member.name}
                            className="h-full w-full object-cover object-top"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <span className={`text-lg font-semibold ${colorStyles.text}`}>{initials}</span>
                        )}
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div className="mt-6 space-y-3">
                      <div className="flex items-center gap-3 text-gray-600">
                        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <p className="flex items-center justify-between w-full">
                        <a href={`tel:${member.mobile}`} className="text-sm font-semibold hover:text-blue-600 tracking-tight">
                          +91 {member.mobile}
                        </a>
                                  <a 
                      href={`tel:${member.mobile}`}
                      className="text-xs font-bold text-gray-400 hover:text-blue-600 uppercase tracking-tighter"
                    >
                      Call Now
                    </a>
                    </p>
                      </div>
                    </div>
                  </div>


 
<div className="mt-1 space-y-3">
                      <div className="flex items-center gap-3 text-gray-600">
                        <i className="fa-solid fa-location-dot"></i>
                        <span  className="text-sm font-semibold hover:text-blue-600 tracking-tight">
                        {member.address}
                        </span>
                      </div>
                    </div>



                  {/* Action Section */}
                  <div className="mt-6 border-t border-gray-100 pt-4 flex items-center justify-between">
             {member?.Presentations && (
  <button
    onClick={() => setPresentations(member.Presentations)}
    className="text-xs font-bold text-gray-400 hover:text-blue-600 uppercase tracking-tighter"
  >
    View Profile
  </button>
)}
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
