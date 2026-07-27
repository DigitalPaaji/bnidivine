"use client";

import React, { useState } from "react";

const data = [
      { "id": 5, "name": "Ar. Rakesh Arora", "img" :"Ar-Rakesh-Arora.webp",  "business": "SPACE ART DESIGN STUDIO", "category": "Architectural Services", "mobile": "9814460603", "address": "SCO 2, Upper Mall Road, New Lal Bagh, Patiala",type:"PRESIDENT" },

     { "id": 23, "name": "Manpreet Singh Birdi", "img" :"Manpreet-Singh-Birdi.webp",  "business": "MARSHALL AIR CONDITIONERS", "category": "HVAC", "mobile": "9814110036", "address": "Shop No. 2217/3, Ghass Mandi, Ragho Majra, Patiala",type:"VICE PRESIDENT"  },

      { "id": 9, "name": "Rishi Raj Singh", "img" :"Rishi-Raj-Singh.webp",  "business": "DIGITAL PAAJI", "category": "Digital Marketing", "mobile": "9888401666", "address": "78, Kissan Market, 2nd Floor, Sirhind Road, Nr Hemkunt Petrol Pump, Patiala","Presentations":"https://www.youtube.com/embed/sQB8aZIg2_k",type:"SECRETARY"  },

     { "id": 16, "name": "Bharat Bhushan", "img" :"Bharat-Bhushan.webp",  "business": "JN SURGICALS", "category": "Medical Supplies", "mobile": "7888306597", "address": "Shop no 3, GTB Market, Near TB Hospital, Patiala",type:"TREASURER"  },

];

const CurrentLt = () => {
  const [flippedCard, setFlippedCard] = useState(null);

  const handleFlip = (id) => {
    setFlippedCard((currentId) => (currentId === id ? null : id));
  };

  return (
    <section className="bg-[#f8f6f1] px-5 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:gap-8">
  {/* Left Side: Titles */}
  <div className="max-w-lg">
    <p className="gsap-header text-xs font-bold uppercase tracking-[0.3em] text-[#b08b4f]">
      (1st April to 31st September, 2026)
    </p>

    <h2 className="gsap-header mt-2 text-2xl font-black text-neutral-900 sm:text-3xl lg:text-4xl">
      Current LT Team
    </h2>
  </div>

  
</div>

        {/* Cards */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((member) => {
            const isFlipped = flippedCard === member.id;

            return (
              <button
                key={member.id}
                type="button"
                onClick={() => handleFlip(member.id)}
                aria-label={`View details for ${member.name}`}
                aria-pressed={isFlipped}
                className="group h-[430px] w-full cursor-pointer text-left [perspective:1200px]"
              >
                <div
                  className={`relative h-full w-full rounded-[28px] transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ${
                    isFlipped ? "[transform:rotateY(180deg)]" : ""
                  }`}
                >
                  {/* Front side */}
                  <article className="absolute inset-0 overflow-hidden rounded-[10px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] [backface-visibility:hidden]">
                    <img
                      src={`/Images/${member.img}`}
                      alt={member.name}
                      className="h-full w-full  transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                      <span className="inline-flex rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[11px] font-bold tracking-[0.15em] backdrop-blur-md">
                        {member.type}
                      </span>

                      <h3 className="mt-4 text-2xl font-bold leading-tight">
                        {member.name}
                      </h3>

                      <p className="mt-2 text-sm text-white/75">
                        {member.business}
                      </p>

                      
                    </div>
                  </article>

                  {/* Back side */}
                  <article className="absolute inset-0 flex flex-col rounded-[28px] bg-neutral-950 p-7 text-white shadow-[0_20px_60px_rgba(0,0,0,0.2)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <div>
                      <span className="inline-flex rounded-full bg-[red] px-3 py-1 text-[11px] font-bold tracking-[0.15em] text-white">
                        {member.type}
                      </span>

                      <h3 className="mt-5 text-2xl font-bold leading-tight">
                        {member.name}
                      </h3>

                      <p className="mt-2 text-sm font-semibold text-[red]">
                        {member.business}
                      </p>
                    </div>

                    <div className="mt-8 space-y-5">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">
                          Business Category
                        </p>
                        <p className="mt-2 text-sm leading-6 text-white/90">
                          {member.category}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">
                          Mobile
                        </p>

                        <a
                          href={`tel:${member.mobile}`}
                          onClick={(event) => event.stopPropagation()}
                          className="mt-2 inline-block text-sm font-semibold text-white transition hover:text-[#d4b77f]"
                        >
                          +91 {member.mobile}
                        </a>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">
                          Address
                        </p>

                        <p className="mt-2 text-sm leading-6 text-white/75">
                          {member.address}
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-white/45">
                        Click to return
                      </span>

                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg text-black">
                        ↻
                      </span>
                    </div>
                  </article>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CurrentLt;