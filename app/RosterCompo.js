
"use client";

import { useEffect, useState } from "react";
import { FiPhone, FiMapPin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Header from "./compo/Header";
import { API_URL, getImageUrl } from "./src/lib/api";

const getMemberColor = (name = "User") => {
  const colors = [
    { bg: "bg-blue-50", text: "text-blue-700" },
    { bg: "bg-purple-50", text: "text-purple-700" },
    { bg: "bg-emerald-50", text: "text-emerald-700" },
    { bg: "bg-rose-50", text: "text-rose-700" },
    { bg: "bg-amber-50", text: "text-amber-700" },
    { bg: "bg-indigo-50", text: "text-indigo-700" },
    { bg: "bg-cyan-50", text: "text-cyan-700" },
  ];

  const sum = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return colors[sum % colors.length];
};

export default function RosterCompo() {
  const [category, setCategory] = useState("All");
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [presentations, setPresentations] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [membersRes, categoriesRes] = await Promise.all([
          fetch(`${API_URL}/members?section=roster`),
          fetch(`${API_URL}/members/categories`),
        ]);

        if (!membersRes.ok || !categoriesRes.ok) {
          throw new Error("Unable to load roster");
        }

        const membersJson = await membersRes.json();
        const categoriesJson = await categoriesRes.json();

        setMembers(membersJson.data || []);
        setCategories(categoriesJson.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let data = [...members];

    if (category !== "All") {
      data = data.filter((member) => member.category === category);
    }

    if (search.trim()) {
      const query = search.toLowerCase().trim();

      data = data.filter((member) =>
        [
          member.name,
          member.business,
          member.mobile,
          member.category,
          member.address,
        ].some((value) => String(value || "").toLowerCase().includes(query))
      );
    }

    data.sort((a, b) => a.name.localeCompare(b.name));
    setFilteredMembers(data);
  }, [members, category, search]);

  const getModalVideoUrl = (url) => {
    const videoId = url.split("/embed/")[1]?.split("?")[0];

    return videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0`
      : url;
  };

  const getPhoneNumber = (mobile) => {
    const number = String(mobile || "").replace(/\D/g, "");

    if (!number) return "";
    return number.startsWith("91") ? number : `91${number}`;
  };

  const formatPhoneNumber = (mobile) => {
    const number = String(mobile || "").replace(/\D/g, "");

    if (!number) return "";
    return number.startsWith("91")
      ? `+${number}`
      : `+91 ${number}`;
  };

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
        <h2 className="pb-4 text-center text-xl font-bold uppercase tracking-wide text-[#CF2030] opacity-55 md:text-2xl">
          BNI DIVINE ROSTER
        </h2>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredMembers.map((member) => {
              const colorStyles = getMemberColor(member.name);
              const initials = member.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              const phoneNumber = getPhoneNumber(member.mobile);

              return (
                <div
                  key={member._id}
                  className="group relative flex flex-col rounded-2xl border border-[#D5E3FF] bg-white p-5 shadow-[0_2px_5px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {member.badge?.includes("Crorepati") && (
                    <div className="absolute -left-3 -top-4 z-10">
                      <img
                        src="/Other/crorepati.webp"
                        alt="Crorepati"
                        className="h-14 w-14 object-contain"
                      />
                    </div>
                  )}

                  {/* Member Details */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-lg font-bold leading-tight text-[#1260FF]">
                        {member.name}
                      </h3>

                      <p className="mt-0.5 truncate text-sm font-medium text-gray-600">
                        {member.business}
                      </p>

                      {member.category && (
                        <span
                          className={`mt-2 inline-block rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${colorStyles.bg} ${colorStyles.text}`}
                        >
                          {member.category}
                        </span>
                      )}
                    </div>

                    {/* Profile Image */}
                    <div
                      className={`flex h-20 w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-lg ${colorStyles.bg}`}
                    >
                      {member.img ? (
                        <img
                          src={getImageUrl(member.img)}
                          alt={member.name}
                          className="h-full w-full object-cover object-top"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <span className={`text-lg font-semibold ${colorStyles.text}`}>
                          {initials}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Phone Number */}
                  {member.mobile && (
                    <div className="mt-5 flex items-center justify-between gap-3">
                      <a
                        href={`tel:${member.mobile}`}
                        className="flex min-w-0 items-center gap-3 text-sm text-gray-700 transition hover:text-blue-600"
                      >
                        <FiPhone className="shrink-0 text-gray-400" size={16} />
                        <span>{formatPhoneNumber(member.mobile)}</span>
                      </a>

                      <a
                        href={`tel:${member.mobile}`}
                        className="shrink-0 text-xs font-semibold uppercase text-gray-400 transition hover:text-blue-600"
                      >
                        Call Now
                      </a>
                    </div>
                  )}

                  {/* Address */}
                  {member.address && (
                    <div className="mt-2 flex items-start gap-3 text-sm text-gray-700">
                      <FiMapPin
                        className="mt-0.5 shrink-0 text-[#52677D]"
                        size={17}
                        fill="#52677D"
                      />
                      <p className="leading-5">{member.address}</p>
                    </div>
                  )}

                  {/* Bottom Actions */}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                    <div className="flex flex-wrap items-center gap-2">
                      {phoneNumber && (
                        <a
                          href={`https://wa.me/${phoneNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50/50 px-4 py-2 text-sm font-bold text-emerald-700 transition hover:border-emerald-600 hover:bg-emerald-600 hover:text-white"
                        >
                          <FaWhatsapp size={17} />
                          WhatsApp
                        </a>
                      )}

                      {member.presentations && (
                        <button
                          onClick={() => setPresentations(member.presentations)}
                          className="text-xs font-bold uppercase tracking-wide text-gray-400 transition hover:text-blue-600"
                        >
                          View Profile
                        </button>
                      )}
                    </div>

                    {/* Member Badges */}
                    <div className="flex items-center gap-1">
                      {member.badge?.includes("Gold") && (
                        <img
                          src="/Other/gold.webp"
                          alt="Gold"
                          className="h-12 w-12 object-contain"
                        />
                      )}

                      {member.badge?.includes("Green") && (
                        <img
                          src="/Other/green.webp"
                          alt="Green"
                          className="h-12 w-12 object-contain"
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!isLoading && filteredMembers.length === 0 && (
          <p className="py-12 text-center text-gray-500">
            No members found.
          </p>
        )}
      </main>

      {/* Presentation Video Modal */}
      {presentations && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <button
            onClick={() => setPresentations("")}
            className="absolute right-5 top-5 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white hover:text-black"
          >
            ✕
          </button>

          <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-black">
            <div className="relative aspect-video w-full">
              <iframe
                src={getModalVideoUrl(presentations)}
                className="absolute inset-0 h-full w-full"
                allowFullScreen
                title="Member presentation"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




// "use client";

// import { useEffect, useState } from "react";
// import Header from "./compo/Header";
// import { API_URL, getImageUrl } from "./src/lib/api";

// const getMemberColor = (name = "User") => {
//   const colors = [
//     { bg: "bg-blue-50", text: "text-blue-700", ring: "ring-blue-700/20" },
//     { bg: "bg-purple-50", text: "text-purple-700", ring: "ring-purple-700/20" },
//     { bg: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-700/20" },
//     { bg: "bg-rose-50", text: "text-rose-700", ring: "ring-rose-700/20" },
//     { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-700/20" },
//     { bg: "bg-indigo-50", text: "text-indigo-700", ring: "ring-indigo-700/20" },
//     { bg: "bg-cyan-50", text: "text-cyan-700", ring: "ring-cyan-700/20" },
//   ];

//   const sum = name
//     .split("")
//     .reduce((acc, char) => acc + char.charCodeAt(0), 0);

//   return colors[sum % colors.length];
// };

// export default function RosterCompo() {
//   const [category, setCategory] = useState("All");
//   const [members, setMembers] = useState([]);
//   const [filteredMembers, setFilteredMembers] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [search, setSearch] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [presentations, setPresentations] = useState("");

//   // Fetch roster and categories
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);

//         const [membersRes, categoriesRes] = await Promise.all([
//           fetch(`${API_URL}/members?section=roster`),
//           fetch(`${API_URL}/members/categories`),
//         ]);

//         if (!membersRes.ok || !categoriesRes.ok) {
//           throw new Error("Unable to load roster");
//         }

//         const membersJson = await membersRes.json();
//         const categoriesJson = await categoriesRes.json();

//         setMembers(membersJson.data || []);
//         setCategories(categoriesJson.data || []);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Filter locally when searching or changing category
//   useEffect(() => {
//     let data = [...members];

//     if (category !== "All") {
//       data = data.filter((member) => member.category === category);
//     }

//     if (search.trim()) {
//       const query = search.toLowerCase().trim();

//       data = data.filter((member) =>
//         [
//           member.name,
//           member.business,
//           member.mobile,
//           member.category,
//         ].some((value) => value?.toLowerCase().includes(query))
//       );
//     }
//     // console.log('ndvfjf',categories)
//     data.sort((a, b) => a.name.localeCompare(b.name));
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     setFilteredMembers(data);
//   }, [members, category, search]);

//   const getModalVideoUrl = (url) => {
//     const videoId = url.split("/embed/")[1]?.split("?")[0];

//     return videoId
//       ? `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0`
//       : url;
//   };

//   return (
//     <div className="min-h-screen bg-[#F8FAFC]">
//       <Header
//         category={category}
//         setCategory={setCategory}
//         search={search}
//         setSearch={setSearch}
//         categories={categories}
//       />

//       <main className="container mx-auto px-4 py-4">
//         <h2 className="pb-4 text-center text-xl font-bold uppercase tracking-wide text-[#CF2030] opacity-55 md:text-2xl">
//           BNI DIVINE ROSTER
//         </h2>

//         {isLoading ? (
//           <div className="flex justify-center py-20">
//             <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {filteredMembers.map((member) => {
//               const colorStyles = getMemberColor(member.name);
//               const initials = member.name
//                 ?.split(" ")
//                 .map((n) => n[0])
//                 .join("")
//                 .slice(0, 2)
//                 .toUpperCase();

//               return (
//                 <div
//                   key={member._id}
//                   className="group relative flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md"
//                 >
//                   {member.badge?.includes("Crorepati") && (
//                     <div className="absolute -left-4 -top-5 z-10">
//                       <img
//                         src="/Other/crorepati.webp"
//                         alt="Crorepati"
//                         className="h-16 w-16 object-contain"
//                       />
//                     </div>
//                   )}

//                   <div>
//                     <div className="flex items-start justify-between gap-4">
//                       <div className="flex-1 overflow-hidden">
//                         <h3 className="truncate text-lg font-bold text-gray-900">
//                           {member.name}
//                         </h3>

//                         <p className="truncate text-sm font-medium text-gray-500">
//                           {member.business}
//                         </p>

//                         <span
//                           className={`mt-2 inline-block rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${colorStyles.bg} ${colorStyles.text}`}
//                         >
//                           {member.category}
//                         </span>
//                       </div>

//                       <div
//                         className={`relative flex h-20 w-18 shrink-0 items-center justify-center overflow-hidden rounded-lg ${colorStyles.bg} ${colorStyles.ring}`}
//                       >
//                         {member.img ? (
//                           <img
//                             src={getImageUrl(member.img)}
//                             alt={member.name}
//                             className="h-full w-full object-cover object-top"
//                             onError={(e) => {
//                               e.currentTarget.style.display = "none";
//                             }}
//                           />
//                         ) : (
//                           <span className={`text-lg font-semibold ${colorStyles.text}`}>
//                             {initials}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
//                     <a
//                       href={`https://wa.me/91${member.mobile?.replace(/\D/g, "")}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="inline-flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50/50 px-4 py-2 text-sm font-bold text-emerald-700 transition hover:bg-emerald-600 hover:text-white"
//                     >
//                       WhatsApp
//                     </a>

//                     <div className="flex items-center">
//                       {member.badge?.includes("Gold") && (
//                         <img
//                           src="/Other/gold.webp"
//                           alt="Gold"
//                           className="h-20 w-20 object-contain"
//                         />
//                       )}

//                       {member.badge?.includes("Green") && (
//                         <img
//                           src="/Other/green.webp"
//                           alt="Green"
//                           className="h-20 w-20 object-contain"
//                         />
//                       )}
//                     </div>

//                     {member.presentations && (
//                       <button
//                         onClick={() => setPresentations(member.presentations)}
//                         className="text-xs font-bold uppercase tracking-tighter text-gray-400 hover:text-blue-600"
//                       >
//                         View Profile
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {!isLoading && filteredMembers.length === 0 && (
//           <p className="py-12 text-center text-gray-500">
//             No members found.
//           </p>
//         )}
//       </main>

//       {presentations && (
//         <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
//           <button
//             onClick={() => setPresentations("")}
//             className="absolute right-5 top-5 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white hover:text-black"
//           >
//             ✕
//           </button>

//           <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-black">
//             <div className="relative aspect-video w-full">
//               <iframe
//                 src={getModalVideoUrl(presentations)}
//                 className="absolute inset-0 h-full w-full"
//                 allowFullScreen
//                 title="Member presentation"
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



