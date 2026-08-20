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
    <section className="relative">
      {data.map((member, index) => (
        <div
          key={member.name}
          className="relative min-h-screen w-full overflow-hidden flex items-center"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/Other/bg.webp"
              alt=""
              className="h-full w-full object-cover"
            />

            {/* Soft background overlay */}
            <div className="absolute inset-0 bg-[#f4efe6]/75" />

            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f4efe6]/90 via-transparent to-[#c9b79c]/30" />
          </div>

          {/* Decorative circles */}
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-[#8c7a6b]/20" />
          <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full border border-[#8c7a6b]/15" />

          <div className="relative z-10 w-full px-5 md:px-12 lg:px-24 xl:px-40 py-16">
            <div
              className={`mx-auto grid max-w-[1500px] grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-16 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* IMAGE */}
              <div
                className={`relative lg:col-span-5 h-[55vh] min-h-[450px] max-h-[650px] overflow-hidden ${
                  index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <img
                  src={`/Other/${member.image}`}
                  alt={member.name}
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent" />

                {/* Vertical label */}
                <div className="absolute bottom-6 left-6">
                  <span className="text-xs font-bold uppercase tracking-[0.35em] text-white/90">
                    {String(index + 1).padStart(2, "0")} / 02
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div
                className={`lg:col-span-7 ${
                  index % 2 === 1 ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="max-w-3xl">
                  {/* Small heading */}
                  <div className="mb-5 flex items-center gap-4">
                    <span className="h-px w-12 bg-[#8c7a6b]" />

                    <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-[#8c7a6b]">
                      {member.type}
                    </span>
                  </div>

                  {/* Name */}
                  <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal leading-[0.95] tracking-tight text-neutral-900">
                    {member.name}
                  </h2>

                  {/* Tagline */}
                  <h3 className="mt-8 max-w-2xl font-serif text-xl sm:text-2xl lg:text-3xl font-normal leading-snug text-neutral-800">
                    {member.tagline}
                  </h3>

                  {/* Description */}
                  <p className="mt-6 max-w-xl font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.25em] leading-relaxed text-neutral-600">
                    {member.description}
                  </p>

                  {/* Bottom information */}
                  <div className="mt-10 border-t border-[#8c7a6b]/30 pt-6">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
                      <div>
                        <span className="block text-[10px] uppercase tracking-[0.25em] text-[#8c7a6b]">
                          Patiala Chapter Leadership
                        </span>

                        <span className="mt-2 block font-serif text-xl font-bold text-neutral-900">
                          {member.name}
                        </span>
                      </div>

                      <div className="text-5xl font-serif text-[#8c7a6b]/30">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          {index === 0 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
              <span className="text-[9px] uppercase tracking-[0.35em] text-neutral-500">
                Scroll
              </span>

              <span className="h-10 w-px bg-neutral-900/30 animate-pulse" />
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default Directors;