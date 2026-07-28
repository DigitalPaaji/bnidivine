import React from "react";

const Directors = () => {
  const data = [
    {
      name: "Shivani Gupta",
      type: "Executive Director",
      image: "shivani.png",
      tagline: "ELEVATE YOUR VISION. MASTER YOUR BUSINESS.",
      description: "STRATEGY. MINDSET. SUCCESS. WITH SHIVANI GUPTA.",
    },
    {
      name: "Pardeep Gupta",
      type: "Area Director",
      image: "pardeep.png",
      tagline: "BUILDING STRONG ROOTS. DRIVING GROWTH.",
      description: "LEADERSHIP. EXECUTION. SUCCESS. WITH PARDEEP GUPTA.",
    },
  ];

  return (
    <section className="relative overflow-hidden px-5 py-20 lg:py-28 text-neutral-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Other/bg.webp"
          alt="Background texture"
          className="h-full w-full object-cover object-center opacity-40"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/60 to-neutral-950/90" /> */}
      </div>

      <div className="px-4 md:px-12 lg:px-40 xl:px-52 relative z-10">
        {/* Director Banners matching the exact beige/editorial reference style with refined glassmorphism styling */}
        <div className="space-y-12">
          {data.map((member, index) => (
            <div
              key={member.name}
              className="group relative overflow-hidden"
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image Column */}
                <div
                  className={`relative lg:col-span-5 h-[400px] sm:h-[460px] lg:h-[500px] overflow-hidden ${
                    index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <img
                    src={`/Other/${member.image}`}
                    alt={member.name}
                    className="h-full w-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#f4efe6] via-transparent to-transparent lg:hidden" />
                </div>

                {/* Content Column matching the Typography & Layout of the Image */}
                <div
                  className={`lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center ${
                    index % 2 === 1 ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div>
                    <span className="inline-block font-sans text-xs font-bold uppercase tracking-[0.3em] text-[#8c7a6b] mb-3">
                      {member.type} — {member.name}
                    </span>

                    <h3 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-serif font-normal text-neutral-900 tracking-tight leading-[1.15]">
                      {member.tagline}
                    </h3>

                    <p className="mt-6 font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-neutral-600">
                      {member.description}
                    </p>
                  </div>

                  <div className="mt-10 pt-6 border-t border-[#e2d8c5] flex items-center justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-[0.2em] text-[#8c7a6b] block font-medium">
                        Patiala Chapter Leadership
                      </span>
                      <span className="text-lg font-serif font-bold text-neutral-900">
                        {member.name}
                      </span>
                    </div>

                    {/* <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#8c7a6b]/30 bg-[#8c7a6b]/10 text-xl text-neutral-900 transition-all duration-300 group-hover:bg-neutral-900 group-hover:text-[#f4efe6] group-hover:scale-110">
                      ↗
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Directors;




// import React from "react";

// const Directors = () => {
//   const data = [
//     {
//       name: "Shivani Gupta",
//       type: "Executive Director",
//       image: "executivedirector.png",
//     },
//     {
//       name: "Pardeep Gupta",
//       type: "Area Director",
//       image: "areadirector.png",
//     },
//   ];

//   return (
//     <section className=" px-5 py-20 lg:py-28">
//       <div className="mx-auto max-w-6xl">
//         {/* Heading */}
//         <div className="mx-auto max-w-2xl text-center">
//           <div className="mx-auto h-1 w-14 rounded-full bg-red-600" />

//           <p className="mt-5 text-xs font-bold uppercase tracking-[0.35em] text-red-500">
//             Our Leadership
//           </p>

//           <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
//             Meet Our Directors
//           </h2>

//           <p className="mt-5 text-sm leading-7 text-neutral-400 sm:text-base">
//             Experienced leaders committed to guiding the organization with
//             vision, dedication and professional excellence.
//           </p>
//         </div>

//         {/* Director cards */}
//         <div className="mx-auto mt-14 grid max-w-4xl gap-8 sm:grid-cols-2">
//           {data.map((member) => (
//             <article
//               key={member.name}
//               className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#101010] shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
//             >
//               {/* Image */}
//               <div className="relative h-[440px] overflow-hidden bg-neutral-900">
//                 <img
//                   src={`/Other/${member.image}`}
//                   alt={member.name}
//                   className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
//                 />

//                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

//                 <div className="absolute left-0 top-0 h-1 w-full bg-red-600" />

//                 {/* Director details */}
//                 <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
//                   <span className="inline-flex rounded-md bg-red-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
//                     {member.type}
//                   </span>

//                   <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
//                     {member.name}
//                   </h3>

//                   <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
//                     <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
//                       Leadership Team
//                     </p>

//                     <span className="flex h-10 w-10 items-center justify-center rounded-full border border-red-500/40 bg-red-600/10 text-xl text-red-500 transition-all duration-300 group-hover:bg-red-600 group-hover:text-white">
//                       ↗
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </article>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Directors;