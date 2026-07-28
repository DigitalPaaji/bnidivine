"use client";

import React, { useState } from "react";

const data = [
  {
    id: 17,
    name: "Dr. Anshuman Kharbanda",
    img: "Dr-Anshuman-Kharbanda.webp",
    business: "KHARBANDA DENTAL CLINIC",
    category: "Dental",
    mobile: "9815836630",
    address: "Opp. Income Tax Office, Leela Bhawan, Patiala",
    type: "PRESIDENT",
  },
  {
    id: 30,
    name: "Rohit Bansal",
    img: "Rohit-Bansal.webp",
    business: "R1 PROPERTIES",
    category: "Real Estate",
    mobile: "9814107846",
    address: "C-167, Near Toyota Agency, Focal Point, Patiala",
    type: "VICE PRESIDENT",
  },
  {
    id: 1,
    name: "Aneesh Bansal",
    img: "Aneesh-Bansal.webp",
    business: "ATMA RAM SOHAN LAL",
    category: "Retailer - Tiles",
    mobile: "9888443399",
    address: "D-90, Focal Point, Sirhind Rajpura Bye-Pass, Patiala",
    type: "SECRETARY",
  },
  {
    id: 3,
    name: "Sarabpreet Singh Luthra",
    img: "Sarabpreet-Singh-Luthra.webp",
    business: "AAKAAR CONSULTANTS",
    category: "Interior Designer",
    mobile: "9041050002",
    address: "SCO-41-A, New Budha Dal Complex, Lower Mall, Patiala",
    type: "TREASURER",
  },
];

const FounderLT = () => {
  const [flippedCard, setFlippedCard] = useState(null);

  const handleFlip = (id) => {
    setFlippedCard((currentId) => (currentId === id ? null : id));
  };

  return (
    <section className="bg-[#f8f6f1] px-5 py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Header matching the reference style */}
        <div className="text-center mb-20">
          <h2 className="text-3xl tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl font-serif">
            Founder LT Team
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#8c7a6b]" />
        </div>

        {/* Staggered Grid Layout matching the reference image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-32 lg:gap-y-16 items-start">
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
                      <div className="aspect-square lg:aspect-[3/4] w-full overflow-hidden lg:bg-neutral-200 lg:*:shadow-lg">
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

export default FounderLT;