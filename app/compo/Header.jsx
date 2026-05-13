'use client';
import React, { useState, useRef } from "react";

const filterData = [
  { id: 1, category: "Retailer - Tiles" },
  { id: 2, category: "Modular Kitchens" },
  { id: 3, category: "Interior Designer" },
  { id: 4, category: "Retailer - Paints" },
  { id: 5, category: "Architectural Services" },
  // { id: 6, category: "Retailer - Plywood" },
  { id: 7, category: "Jewellers" },
  { id: 8, category: "Furniture" },
  { id: 9, category: "Digital Marketing" },
  { id: 10, category: "Insurance" },
  { id: 11, category: "Financial Services" },
  // { id: 12, category: "Bricks" },
  { id: 13, category: "PVC Panels" },
  { id: 14, category: "Rice Mill" },
  { id: 15, category: "Taxation" },
  { id: 16, category: "Medical Supplies" },
  { id: 17, category: "Dental" },
  // { id: 18, category: "Catering" },
  { id: 19, category: "Solar" },
  { id: 20, category: "Lawyer" },
  { id: 21, category: "Logistics" },
  { id: 22, category: "Manufacturing" },
  { id: 23, category: "HVAC" },
  { id: 24, category: "CNC Machines" },
  { id: 25, category: "Event Management" },
  { id: 26, category: "Crockery" },
  { id: 27, category: "Electrical Safety" },
  // { id: 28, category: "Restaurant" },
  { id: 29, category: "Furnishings" },
  { id: 30, category: "Real Estate" },
  { id: 31, category: "Eye Hospital" },
  { id: 32, category: "Agriculture" },
  { id: 33, category: "Travel" },
  // { id: 34, category: "Fitness" },
  { id: 35, category: "Fiber" },
  { id: 36, category: "Vastu" },
  { id: 37, category: "Sanitary" },
  { id: 38, category: "Building Materials" },
  { id: 39, category: "Loans" },
  { id: 40, category: "Electronics" },
  { id: 41, category: "Fire Safety" },
  { id: 42, category: "Printing" },
  { id: 43, category: "Pest Control" },
  { id: 44, category: "Electrical" },
  { id: 45, category: "Clothing" },
  { id: 46, category: "Grocery" },
  { id: 47, category: "Electricals" },
  { id: 48, category: "UPVC" },
  { id: 49, category: "Builder" },
  // { id: 50, category: "Astrology" },
  { id: 51, category: "IT Services" },
  { id: 52, category: "Chemicals" },
  { id: 53, category: "Opticals" },
  { id: 54, category: "Photography" },
  { id: 55, category: "Wellness" },
  { id: 56, category: "Computers" },
  { id: 57, category: "Generators" },
  { id: 58, category: "Sweets" },
  { id: 59, category: "Homoeopathy" },
  { id: 60, category: "Education" },
  { id: 61, category: "Boutique" },
  { id: 62, category: "Cosmetics" },
  { id: 63, category: "Food Processing" },
  { id: 64, category: "Corporate Gifting" }
];

const Header = ({ category, setCategory, search, setSearch }) => {
  const [showsearch, setShowSearch] = useState(false);
  const scrollContainerRef = useRef(null);
  const inputRef = useRef(null);
  // Function to handle left/right scrolling
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 250; // Distance to scroll per click
      const currentScroll = scrollContainerRef.current.scrollLeft;
      scrollContainerRef.current.scrollTo({
        left: direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Top Banner Row */}


      {/* Main Sticky Header */}
      <header className=" sticky top-0 z-50">
              <div className="bg-gray-900 text-white text-xs py-1 px-4 text-center font-medium tracking-wide">
        Made by{" "}
        <a 
          href="https://digitalpaaji.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-red-400 hover:text-red-300 underline underline-offset-2 transition-colors"
        >
          Digital Paaji
        </a>{" "}
        <span className=" ">·</span>{" "}
        <span className="text-gray-300">
          Digital Marketing Agency
        </span>
      </div>

      <div className="pt-4 pb-2  bg-white/90 backdrop-blur-md  shadow-sm">

     
        {/* Top Row: Logo, Title, and Search */}
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
          
          {/* Logo & Title */}
          <div className={`items-start gap-1.5 transition-opacity duration-300 ${showsearch ? 'hidden sm:flex opacity-50' : 'flex opacity-100'}`}>
            <div>
                <img src="/logo.webp" alt="Logo" className="h-6 lg:h-6.5 object-contain cursor-pointer drop-shadow-sm" />
              <h1 className="font-semibold text-center text-sm lg:text-base   text-gray-900 tracking-wider">PATIALA</h1>
        
              </div>
                <div className="cursor-pointer">
              <h1 className="font-extrabold text-xl lg:text-2xl border-l-2 pl-1 leading-tight text-gray-900 tracking-tight ">DIVINE</h1>
              {/* <p className="text-xs font-medium text-gray-500">Patiala Chapter</p> */}
            </div>
          </div>

          {/* Search Input Box */}
          <div className={`flex-1 transition-all duration-300 ease-in-out ${showsearch ? 'opacity-100 max-w-2xl' : 'opacity-0 max-w-0 overflow-hidden pointer-events-none'}`}>
            <div className="relative flex items-center w-full">
              <i className="fa-solid fa-magnifying-glass absolute left-4 text-gray-400"></i>
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-gray-100 border-transparent rounded-full pl-11 pr-4 py-2.5 text-[16px] outline-none focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all text-gray-800 placeholder-gray-500 shadow-inner"
                placeholder="Search name, business, category..."
                 
              />
            </div>
          </div>

          {/* Search Toggle Icon */}
          <button
onClick={() => {
  if (showsearch) {
    setSearch("");
    setShowSearch(false);
  } else {
    setShowSearch(true);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }
}}
// onClick={() => {
            //   if (showsearch) setSearch(""); 
            //   setShowSearch((prev) => !prev);
            // }}
            className="p-3 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-red-100 shadow-sm shrink-0 hover:text-red-600"
            aria-label={showsearch ? "Close Search" : "Open Search"}
          >
            <i className={`fa-solid text-lg ${showsearch ? 'fa-xmark' : 'fa-magnifying-glass'}`}></i>
          </button>
        </div>

        {/* Bottom Row: Scrollable Category Navigation with Arrows */}
        <div className=" container mx-auto mt-4 px-2 sm:px-4 lg:px-6 flex items-center gap-2 pb-2">
          
          {/* Left Arrow */}
          <button 
            onClick={() => scroll("left")}
            className="hidden w-8 h-8 md:flex items-center justify-center rounded-full bg-white shadow-md border border-gray-100 text-gray-500 hover:text-red-600 hover:bg-red-50 shrink-0 transition-colors z-10"
            aria-label="Scroll left"
          >
            <i className="fa-solid fa-chevron-left text-xs"></i>
          </button>

          {/* Scrollable Container */}
          <nav 
            ref={scrollContainerRef}
            className="flex-1 flex overflow-x-auto gap-2.5 scroll-smooth px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} 
          >
            <style dangerouslySetInnerHTML={{__html: `nav::-webkit-scrollbar { display: none; }`}} />

            {/* "All" Button */}
            <button
              onClick={() => setCategory("All")}
              className={`cursor-pointer whitespace-nowrap text-sm font-semibold rounded-full px-5 py-2 transition-all duration-200 ${
                category === "All"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600 border border-transparent"
              }`}
            >
              All Members
            </button>

            {/* Dynamic Category Buttons */}
            {[...filterData]
              .sort((a, b) => a.category.localeCompare(b.category))
              .map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCategory(item.category)}
                  className={`cursor-pointer whitespace-nowrap text-sm font-semibold rounded-full px-5 py-2 transition-all duration-200 ${
                    category === item.category
                      ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                      : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600 border border-transparent"
                  }`}
                >
                  {item.category}
                </button>
            ))}
          </nav>

          {/* Right Arrow */}
          <button 
            onClick={() => scroll("right")}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-100 text-gray-500 hover:text-red-600 hover:bg-red-50 shrink-0 transition-colors z-10"
            aria-label="Scroll right"
          >
            <i className="fa-solid fa-chevron-right text-xs"></i>
          </button>

        </div>
         </div>
      </header>
    </>
  );
};

export default Header;
