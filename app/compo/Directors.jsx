import React from "react";

const Directors = () => {
  const data = [
    {
      name: "Shivani Gupta",
      type: "Executive Director",
      image: "executivedirector.png",
    },
    {
      name: "Pardeep Gupta",
      type: "Area Director",
      image: "areadirector.png",
    },
  ];

  return (
    <section className=" px-5 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto h-1 w-14 rounded-full bg-red-600" />

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.35em] text-red-500">
            Our Leadership
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Meet Our Directors
          </h2>

          <p className="mt-5 text-sm leading-7 text-neutral-400 sm:text-base">
            Experienced leaders committed to guiding the organization with
            vision, dedication and professional excellence.
          </p>
        </div>

        {/* Director cards */}
        <div className="mx-auto mt-14 grid max-w-4xl gap-8 sm:grid-cols-2">
          {data.map((member) => (
            <article
              key={member.name}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#101010] shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
            >
              {/* Image */}
              <div className="relative h-[440px] overflow-hidden bg-neutral-900">
                <img
                  src={`/Other/${member.image}`}
                  alt={member.name}
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute left-0 top-0 h-1 w-full bg-red-600" />

                {/* Director details */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <span className="inline-flex rounded-md bg-red-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                    {member.type}
                  </span>

                  <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                    {member.name}
                  </h3>

                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
                      Leadership Team
                    </p>

                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-red-500/40 bg-red-600/10 text-xl text-red-500 transition-all duration-300 group-hover:bg-red-600 group-hover:text-white">
                      ↗
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Directors;