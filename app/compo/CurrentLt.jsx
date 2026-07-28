"use client";

import React, { useState } from "react";

const data = [
  {
    id: 5,
    name: "Ar. Rakesh Arora",
    img: "Ar-Rakesh-Arora.webp",
    business: "SPACE ART DESIGN STUDIO",
    category: "Architectural Services",
    mobile: "9814460603",
    address: "SCO 2, Upper Mall Road, New Lal Bagh, Patiala",
    type: "PRESIDENT",
  },
  {
    id: 23,
    name: "Manpreet Singh Birdi",
    img: "Manpreet-Singh-Birdi.webp",
    business: "MARSHALL AIR CONDITIONERS",
    category: "HVAC",
    mobile: "9814110036",
    address: "Shop No. 2217/3, Ghass Mandi, Ragho Majra, Patiala",
    type: "VICE PRESIDENT",
  },
  {
    id: 9,
    name: "Rishi Raj Singh",
    img: "Rishi-Raj-Singh.webp",
    business: "DIGITAL PAAJI",
    category: "Digital Marketing",
    mobile: "9888401666",
    address: "78, Kissan Market, 2nd Floor, Sirhind Road, Nr Hemkunt Petrol Pump, Patiala",
    Presentations: "https://www.youtube.com/embed/sQB8aZIg2_k",
    type: "SECRETARY",
  },
  {
    id: 16,
    name: "Bharat Bhushan",
    img: "Bharat-Bhushan.webp",
    business: "JN SURGICALS",
    category: "Medical Supplies",
    mobile: "7888306597",
    address: "Shop no 3, GTB Market, Near TB Hospital, Patiala",
    type: "TREASURER",
  },
];

const CurrentLt = () => {
  const [flippedCard, setFlippedCard] = useState(null);

  const handleFlip = (id) => {
    setFlippedCard((currentId) => (currentId === id ? null : id));
  };

  return (
    <section className="relative bg-[#f8f6f1] px-5 pt-24 lg:pt-32 pb-60  overflow-hidden">
          {/* Background Decorative Graphic positioned Bottom-Right */}
      <div className="absolute top-2 left-0 lg:right-1/4 z-0 pointer-events-none opacity-40 rotate-180">
        <img
          src="/Other/1.png"
          alt="Background decoration bottom-right"
          className="w-72 sm:w-96 rotate-90 h-auto object-contain object-bottom-right"
        />
      </div>
      <div className="mx-auto max-w-7xl">
        {/* Header layout matching FounderLT */}
        <div className="text-center mb-20">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b08b4f] mb-3">
            (1st April to 31st September, 2026)
          </p>
          <h2 className="text-3xl tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl font-serif">
            Current LT Team
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#8c7a6b]" />
        </div>

        {/* Staggered Grid Layout matching FounderLT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-32 lg:gap-y-16  items-start">
          {data.map((member, index) => {
            const isFlipped = flippedCard === member.id;
            // Apply vertical offset on even/odd indices for larger screens to replicate the staggered layout
            const staggeredClass = index % 2 === 1 ? "lg:mt-16" : "lg:mt-0";

            return (
              <div key={member.id} className={staggeredClass}>
                <button
                  type="button"
                  onClick={() => handleFlip(member.id)}
                  aria-label={`View details for ${member.name}`}
                  aria-pressed={isFlipped}
                  className="group w-full cursor-pointer text-left [perspective:1200px] focus:outline-none"
                >
                  <div
                    className={`relative w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ${
                      isFlipped ? "[transform:rotateY(180deg)]" : ""
                    }`}
                  >
                    {/* Front side */}
                    <div className="absolute inset-0 lg:bg-[#fcfbf9] [backface-visibility:hidden]">
                      <div className="aspect-square lg:aspect-[3/4] w-full overflow-hidden">
                        <img
                          src={`/Images/${member.img}`}
                          alt={member.name}
                          className="h-full w-full object-contain lg:object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="mt-6 text-center">
                        <h3 className="text-xl font-bold text-neutral-900 font-serif">
                          {member.name}
                        </h3>
                        <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                          {member.type}
                        </p>
                        <div className="mx-auto mt-3 h-0.5 w-12 bg-neutral-300 transition-all duration-300 group-hover:w-20 group-hover:bg-[#0ea5e9]" />
                      </div>
                    </div>

                    {/* Back side */}
                    <div className="relative flex flex-col aspect-square lg:aspect-[3/4] rounded-2xl bg-neutral-950 p-6 text-white shadow-2xl [backface-visibility:hidden] [transform:rotateY(180deg)] justify-between">
                      <div>
                        <span className="inline-block rounded-full bg-[#0ea5e9] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                          {member.type}
                        </span>

                        <h3 className="mt-4 text-xl font-bold font-serif leading-snug">
                          {member.name}
                        </h3>

                        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#0ea5e9]">
                          {member.business}
                        </p>
                      </div>

                      <div className="space-y-4 my-auto text-xs">
                        <div>
                          <p className="font-bold uppercase tracking-[0.15em] text-white/40">
                            Category
                          </p>
                          <p className="mt-1 text-white/90 font-medium">
                            {member.category}
                          </p>
                        </div>

                        <div>
                          <p className="font-bold uppercase tracking-[0.15em] text-white/40">
                            Mobile
                          </p>
                          <a
                            href={`tel:${member.mobile}`}
                            onClick={(e) => e.stopPropagation()}
                            className="mt-1 inline-block font-semibold text-white hover:text-[#0ea5e9] transition"
                          >
                            +91 {member.mobile}
                          </a>
                        </div>

                        <div>
                          <p className="font-bold uppercase tracking-[0.15em] text-white/40">
                            Address
                          </p>
                          <p className="mt-1 text-white/75 leading-relaxed">
                            {member.address}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-white/10 pt-4 text-[10px] uppercase tracking-widest text-white/40">
                        <span>Click to flip</span>
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black text-sm">
                          ↻
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CurrentLt;