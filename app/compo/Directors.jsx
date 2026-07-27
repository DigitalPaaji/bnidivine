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
    <section className="relative overflow-hidden px-5 py-20 lg:py-28 bg-[#fdfbf7] text-neutral-900">
      {/* Decorative SVG Line art / Organic shapes matching the reference style */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
        <svg
          className="absolute -top-20 -left-20 w-96 h-96 text-[#e6decb]"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M44.7,-76.4C58.8,-69.3,71.8,-59.1,81.1,-45.9C90.4,-32.8,96,-16.4,95.3,-0.4C94.7,15.6,87.8,31.2,77.7,43.9C67.6,56.6,54.2,66.4,39.6,74.1C25,81.8,9.2,87.4,-5.2,85.5C-19.6,83.5,-32.7,74,-45.5,64.2C-58.3,54.4,-70.8,44.3,-78.9,30.9C-87,17.5,-90.7,0.8,-88.2,-14.7C-85.7,-30.2,-77,-44.5,-64.8,-52.7C-52.5,-60.9,-36.8,-63,-22.3,-70.6C-7.8,-78.3,5.6,-91.4,20.4,-91.3C35.2,-91.2,30.6,-83.5,44.7,-76.4Z"
            transform="translate(100 100)"
          />
        </svg>
        <svg
          className="absolute -bottom-20 -right-20 w-96 h-96 text-[#e6decb]"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M39,-65.8C50.9,-59.5,61.3,-49.2,69.5,-37C77.7,-24.8,83.7,-10.7,83.8,3.4C83.8,17.5,77.9,31.7,68.9,43.2C59.8,54.7,47.6,63.5,34.4,70.2C21.2,76.9,7.1,81.5,-6.7,80.4C-20.5,79.2,-34,72.3,-46.1,63.6C-58.2,54.8,-68.9,44.2,-75.7,31.5C-82.5,18.8,-85.4,4,-83.3,-9.7C-81.3,-23.3,-74.3,-35.7,-64.3,-44.6C-54.3,-53.4,-41.3,-58.8,-28.9,-64.7C-16.5,-70.6,-4.8,-77,6.4,-76.8C17.6,-76.7,27.1,-72.1,39,-65.8Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Heading */}
        {/* <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="mx-auto h-1 w-14 rounded-full bg-[#8c7a6b]" />
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.35em] text-[#8c7a6b]">
            Our Leadership
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl font-serif text-neutral-900">
            Meet Our Directors
          </h2>
          <p className="mt-5 text-sm leading-7 text-neutral-600 sm:text-base">
            Experienced leaders committed to guiding the organization with
            vision, dedication and professional excellence.
          </p>
        </div> */}

        {/* Director Banners matching the exact beige/editorial reference style */}
        <div className="space-y-12">
          {data.map((member, index) => (
            <div
              key={member.name}
              className="group relative overflow-hidden rounded-[2.5rem] bg-[#f4efe6] border border-[#e8dfcf] shadow-[0_20px_50px_rgba(140,122,107,0.12)] transition-all duration-500 hover:shadow-[0_30px_70px_rgba(140,122,107,0.22)]"
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image Column */}
                <div
                  className={`relative lg:col-span-5 h-[400px] sm:h-[460px] lg:h-[500px] overflow-hidden bg-[#e8dfcf] ${
                    index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <img
                    src={`/Other/${member.image}`}
                    alt={member.name}
                    className="h-full w-full object-cover object-top transition-transform duration-700 "
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#f4efe6]/80 via-transparent to-transparent lg:hidden" />
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

                    <h3 className="text-3xl sm:text-4xl lg:text-[2.75xl] font-serif font-normal text-neutral-900 tracking-tight leading-[1.15]">
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

                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#8c7a6b]/30 bg-[#8c7a6b]/10 text-xl text-neutral-900 transition-all duration-300 group-hover:bg-neutral-900 group-hover:text-[#f4efe6] group-hover:scale-110">
                      ↗
                    </span>
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