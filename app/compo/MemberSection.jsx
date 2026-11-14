
"use client";

import React, { useEffect, useState } from "react";
import { API_ENDPOINT, getImageUrl } from "../src/lib/api";

const MemberSection = ({
  section,
  title,
  variant = "flip",
  term,
}) => {
  const [members, setMembers] = useState([]);
  const [flippedCard, setFlippedCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_ENDPOINT}/members?section=${section}`,
          { cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error("Unable to fetch members");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || "Something went wrong");
        }

        setMembers(result.data || []);
      } catch (err) {
        console.error(`Error fetching ${section}:`, err);
        setError("Unable to load members. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [section]);

  const handleFlip = (id) => {
    setFlippedCard((current) => (current === id ? null : id));
  };

  const getMemberId = (member) => member._id || member.id;

  const getBadges = (member) => {
    const badges = member.badge || [];
    return Array.isArray(badges) ? badges.filter(Boolean) : [badges].filter(Boolean);
  };

  const getPresentation = (member) =>
    member.presentations || member.Presentations || "";

  return (
    <section
      className={`relative overflow-hidden px-5 ${
        variant === "supporters"
          ? "bg-[#fdfbf7] py-24 lg:py-32"
          : "bg-[#f8f6f1] py-24 lg:py-32"
      }`}
    >
      {/* Decorative background */}
      {variant !== "flip" && (
        <>
          <div className="absolute top-0 right-0 pointer-events-none opacity-30">
            <img
              src="/Other/1.png"
              alt=""
              className="w-72 sm:w-96 h-auto object-contain"
            />
          </div>

          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#cfbea0] blur-[120px] rounded-full" />
          </div>
        </>
      )}

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20">
          {term && (
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b08b4f] mb-3">
              {term}
            </p>
          )}

          <h2 className="text-3xl tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl font-serif">
            {title}
          </h2>

          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#8c7a6b]" />
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center text-neutral-500">
            Loading members...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="py-16 text-center text-red-600">
            {error}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && members.length === 0 && (
          <div className="py-16 text-center text-neutral-500">
            No members found in this section.
          </div>
        )}

        {/* Supporters layout */}
        {!loading && !error && members.length > 0 && variant === "supporters" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {members.map((member) => {
              const id = getMemberId(member);
              const badges = getBadges(member);

              return (
                <div
                  key={id}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="relative w-64 mb-8">
                    <div className="w-full aspect-[4/5] overflow-hidden">
                      <img
                        src={getImageUrl(member.img)}
                        alt={member.name || "Member"}
                        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  <div className="w-full max-w-md px-4">
                    {member.business && (
                      <span className="inline-block font-sans text-xs font-bold uppercase tracking-[0.3em] text-[#8c7a6b] mb-2">
                        {member.business}
                      </span>
                    )}

                    <h3 className="text-3xl font-serif font-normal text-neutral-900 tracking-tight leading-tight">
                      {member.name}
                    </h3>

                    {member.type && (
                      <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8c7a6b]">
                        {member.type}
                      </p>
                    )}

                    {member.category && (
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                        {member.category}
                      </p>
                    )}

                    {badges.length > 0 && (
                      <div className="mt-3 flex flex-wrap justify-center gap-2">
                        {badges.map((badge, index) => (
                          <span
                            key={`${id}-badge-${index}`}
                            className="rounded-full bg-[#8c7a6b]/10 px-3 py-1 text-xs font-semibold text-[#8c7a6b]"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}

                    {member.address && (
                      <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                        {member.address}
                      </p>
                    )}

                    {member.mobile && (
                      <div className="mt-8 pt-6 border-t border-[#e8dfcf] flex items-center justify-center gap-6">
                        <a
                          href={`tel:${member.mobile}`}
                          className="text-sm font-bold text-neutral-900 hover:text-[#8c7a6b] transition-colors tracking-wide"
                        >
                          +91 {member.mobile}
                        </a>

                        <a
                          href={`tel:${member.mobile}`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#8c7a6b]/30 bg-[#8c7a6b]/10 text-xs font-bold uppercase tracking-wider text-neutral-900 transition-all duration-300 hover:bg-neutral-900 hover:text-[#fdfbf7]"
                        >
                          Call Now <span>↗</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Founder / Current LT flip-card layout */}
        {!loading && !error && members.length > 0 && variant === "flip" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-32 lg:gap-y-16 items-start">
            {members.map((member, index) => {
              const id = getMemberId(member);
              const isFlipped = flippedCard === id;
              const badges = getBadges(member);
              const presentation = getPresentation(member);
              const staggeredClass =
                index % 2 === 1 ? "lg:mt-16" : "lg:mt-0";

              return (
                <div key={id} className={staggeredClass}>
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label={`View details for ${member.name}`}
                    aria-pressed={isFlipped}
                    onClick={() => handleFlip(id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        handleFlip(id);
                      }
                    }}
                    className="group w-full cursor-pointer text-left [perspective:1200px] focus:outline-none"
                  >
                    <div
                      className={`relative w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ${
                        isFlipped ? "[transform:rotateY(180deg)]" : ""
                      }`}
                    >
                      {/* Front */}
                      <div className="absolute inset-0 lg:bg-[#fcfbf9] [backface-visibility:hidden]">
                        <div className="aspect-square lg:aspect-[3/4] w-full overflow-hidden lg:bg-neutral-200">
                          <img
                            src={getImageUrl(member.img)}
                            alt={member.name || "Member"}
                            className="h-full w-full object-contain lg:object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>

                        <div className="mt-6 text-center">
                          <h3 className="text-xl font-bold text-neutral-900 font-serif">
                            {member.name}
                          </h3>

                          {member.type && (
                            <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                              {member.type}
                            </p>
                          )}

                          <div className="mx-auto mt-3 h-0.5 w-12 bg-neutral-300 transition-all duration-300 group-hover:w-20 group-hover:bg-[#0ea5e9]" />
                        </div>
                      </div>

                      {/* Back */}
                      <div className="relative flex flex-col aspect-square lg:aspect-[3/4] rounded-2xl bg-neutral-950 p-6 text-white shadow-2xl [backface-visibility:hidden] [transform:rotateY(180deg)] justify-between">
                        <div>
                          {member.type && (
                            <span className="inline-block rounded-full bg-[#0ea5e9] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                              {member.type}
                            </span>
                          )}

                          <h3 className="mt-4 text-xl font-bold font-serif leading-snug">
                            {member.name}
                          </h3>

                          {member.business && (
                            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#0ea5e9]">
                              {member.business}
                            </p>
                          )}
                        </div>

                        <div className="space-y-4 my-auto text-xs">
                          {member.category && (
                            <div>
                              <p className="font-bold uppercase tracking-[0.15em] text-white/40">
                                Category
                              </p>
                              <p className="mt-1 text-white/90 font-medium">
                                {member.category}
                              </p>
                            </div>
                          )}

                          {member.mobile && (
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
                          )}

                          {member.address && (
                            <div>
                              <p className="font-bold uppercase tracking-[0.15em] text-white/40">
                                Address
                              </p>
                              <p className="mt-1 text-white/75 leading-relaxed">
                                {member.address}
                              </p>
                            </div>
                          )}

                          {badges.length > 0 && (
                            <div>
                              <p className="font-bold uppercase tracking-[0.15em] text-white/40">
                                Badges
                              </p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {badges.map((badge, index) => (
                                  <span
                                    key={`${id}-badge-${index}`}
                                    className="rounded-full bg-white/10 px-2 py-1 text-[10px]"
                                  >
                                    {badge}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {presentation && (
                            <div>
                              <p className="font-bold uppercase tracking-[0.15em] text-white/40">
                                Presentation
                              </p>
                              <a
                                href={presentation}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="mt-1 inline-block text-[#0ea5e9] hover:underline"
                              >
                                Watch Presentation ↗
                              </a>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between border-t border-white/10 pt-4 text-[10px] uppercase tracking-widest text-white/40">
                          <span>Click to flip</span>
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black text-sm">
                            ↻
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default MemberSection;
