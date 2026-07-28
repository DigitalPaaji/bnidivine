import React from "react";

const Supporters = () => {
  const supportersData = [
    {
      name: "Girisha Gupta",
      company: "ACME INDUSTRIES",
      category: "Modular Kitchens",
      phone: "+91 9592700658",
      tel: "+919592700658",
      address: "Backside Milkfood Ltd., Raja Farms, Bahadurgarh, Patiala",
      image: "Girisha-Gupta.webp",
    },
    {
      name: "Rishi Raj Singh",
      company: "DIGITAL PAAJI",
      category: "Digital Marketing",
      phone: "+91 9888401666",
      tel: "+919888401666",
      address: "78, Kissan Market, 2nd Floor, Sirhind Road, Nr Hemkunt Petrol Pump, Patiala",
      image: "Rishi-Raj-Singh.webp",
    },
  ];

  return (
    <section className="relative overflow-hidden px-5 py-24 lg:py-32 bg-[#fdfbf7] text-neutral-900">
      {/* Background Decorative Graphic positioned Top-Left */}
      <div className="absolute top-1/2 lg:top-0 right-0 z-0 pointer-events-none opacity-40">
        <img
          src="/Other/1.png"
          alt="Background decoration top-left"
          className="w-72 sm:w-96 h-auto object-contain object-top-left"
        />
      </div>



      {/* Central Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#cfbea0] blur-[120px] rounded-full" />
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-20">
          <div className="mx-auto h-1 w-14 rounded-full bg-[#8c7a6b] mb-4" />
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#8c7a6b]">
            Our Supporters
          </p>
          <h2 className="mt-2 text-3xl sm:text-5xl font-serif font-normal text-neutral-900 tracking-tight">
            Key Chapter Supporters
          </h2>
        </div>

        {/* Modern Editorial Non-Box Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {supportersData.map((person) => (
            <div key={person.name} className="group flex flex-col items-center text-center">
              {/* Floating Artistic Image Container */}
              <div className="relative w-64 h-auto mb-8">
                {/* Image Frame */}
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={`/Images/${person.image}`}
                    alt={person.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>

              {/* Clean Typography Details (No Box) */}
              <div className="w-full max-w-md px-4">
                <span className="inline-block font-sans text-xs font-bold uppercase tracking-[0.3em] text-[#8c7a6b] mb-2">
                  {person.company}
                </span>

                <h3 className="text-3xl font-serif font-normal text-neutral-900 tracking-tight leading-tight">
                  {person.name}
                </h3>

                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  {person.category}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                  {person.address}
                </p>

                {/* Call-to-Action Link */}
                <div className="mt-8 pt-6 border-t border-[#e8dfcf] flex items-center justify-center gap-6">
                  <a
                    href={`tel:${person.tel}`}
                    className="text-sm font-bold text-neutral-900 hover:text-[#8c7a6b] transition-colors tracking-wide"
                  >
                    {person.phone}
                  </a>

                  <a
                    href={`tel:${person.tel}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#8c7a6b]/30 bg-[#8c7a6b]/10 text-xs font-bold uppercase tracking-wider text-neutral-900 transition-all duration-300 hover:bg-neutral-900 hover:text-[#fdfbf7] hover:scale-105"
                  >
                    <span>Call Now</span>
                    <span className="text-sm">↗</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Supporters;