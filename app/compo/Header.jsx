import React, { useState } from 'react';

const filterData = [
  { "id": 1, "category": "Retailer - Tiles" },
  { "id": 2, "category": "Modular Kitchens" },
  { "id": 3, "category": "Interior Designer" },
  { "id": 4, "category": "Retailer - Paints" },
  { "id": 5, "category": "Architectural Services" },
  { "id": 6, "category": "Retailer - Plywood" },
  { "id": 7, "category": "Jewellers" },
  { "id": 8, "category": "Furniture" },
  { "id": 9, "category": "Digital Marketing" },
  { "id": 10, "category": "Insurance" },
  { "id": 11, "category": "Financial Services" },
  { "id": 12, "category": "Bricks" },
  { "id": 13, "category": "PVC Panels" },
  { "id": 14, "category": "Rice Mill" },
  { "id": 15, "category": "Taxation" },
  { "id": 16, "category": "Medical Supplies" },
  { "id": 17, "category": "Dental" },
  { "id": 18, "category": "Catering" },
  { "id": 19, "category": "Solar" },
  { "id": 20, "category": "Lawyer" },
  { "id": 21, "category": "Logistics" },
  { "id": 22, "category": "Manufacturing" },
  { "id": 23, "category": "HVAC" },
  { "id": 24, "category": "CNC Machines" },
  { "id": 25, "category": "Event Management" },
  { "id": 26, "category": "Crockery" },
  { "id": 27, "category": "Electrical Safety" },
  { "id": 28, "category": "Restaurant" },
  { "id": 29, "category": "Furnishings" },
  { "id": 30, "category": "Real Estate" },
  { "id": 31, "category": "Eye Hospital" },
  { "id": 32, "category": "Agriculture" },
  { "id": 33, "category": "Travel" },
  { "id": 34, "category": "Fitness" },
  { "id": 35, "category": "Fiber" },
  { "id": 36, "category": "Vastu" },
  { "id": 37, "category": "Sanitary" },
  { "id": 38, "category": "Building Materials" },
  { "id": 39, "category": "Loans" },
  { "id": 40, "category": "Electronics" },
  { "id": 41, "category": "Fire Safety" },
  { "id": 42, "category": "Printing" },
  { "id": 43, "category": "Pest Control" },
  { "id": 44, "category": "Electrical" },
  { "id": 45, "category": "Clothing" },
  { "id": 46, "category": "Grocery" },
  { "id": 47, "category": "Electricals" },
  { "id": 48, "category": "UPVC" },
  { "id": 49, "category": "Builder" },
  { "id": 50, "category": "Astrology" },
  { "id": 51, "category": "IT Services" },
  { "id": 52, "category": "Chemicals" },
  { "id": 53, "category": "Opticals" },
  { "id": 54, "category": "Photography" },
  { "id": 55, "category": "Wellness" },
  { "id": 56, "category": "Computers" },
  { "id": 57, "category": "Generators" },
  { "id": 58, "category": "Sweets" },
  { "id": 59, "category": "Homoeopathy" },
  { "id": 60, "category": "Education" },
  { "id": 61, "category": "Boutique" },
  { "id": 62, "category": "Cosmetics" },
  { "id": 63, "category": "Food Processing" },
  { "id": 64, "category": "Corporate Gifting" }
];

const Header = ({ category, setCategory,search,setSearch }) => {
  const [showsearch, setShowSearch] = useState(false);

  return (<>
  
    <header className="py-3 border-b bg-white sticky top-0 z-50 shadow-sm">
      {/* Top Row: Logo, Title, and Search */}
      {/* <div className='text-center'>
    Made by <a href='https://digitalpaaji.com' target='_blank'>Digital paaji</a>  ·  AI Consultant
  </div> */}
      <div className="container mx-auto flex items-center justify-between px-4 gap-4">
        
        {/* Logo & Title - Hides text on very small screens if searching to save space */}
        <div className={`flex items-center gap-3 ${showsearch ? 'hidden sm:flex' : 'flex'}`}>
          <img src="/logo.webp" alt="Logo" className="h-10 object-contain cursor-pointer" />
          <div className="cursor-pointer">
            <h1 className="font-semibold text-lg leading-tight text-gray-800">BNI Divine</h1>
            <p className="text-xs sm:text-sm text-gray-500">Member Directory · Patiala Chapter</p>
          </div>
        </div>

        {/* Search Input Box */}
        {showsearch && (
          <div className="flex-1 max-w-2xl mx-auto transition-all duration-300">
            <input
              type="text"
              autoFocus
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              className="w-full bg-transparent border-b-2 border-gray-300 px-2 py-1 text-sm sm:text-base outline-none focus:border-blue-600 transition-colors placeholder-gray-400"
              placeholder="Search by name, company, category..."
            />
          </div>
        )}

        {/* Search Toggle Icon */}
        <button
          onClick={() => {setSearch(""),setShowSearch((prev) => !prev)}}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-black transition-colors focus:outline-none"
          aria-label={showsearch ? "Close Search" : "Open Search"}
        >
          <i className={`fa-solid text-lg ${showsearch ? 'fa-xmark' : 'fa-magnifying-glass'}`}></i>
        </button>
      </div>

      {/* Bottom Row: Category Navigation */}
      <nav className="container mx-auto mt-4 px-4 flex overflow-x-auto gap-6 hide-scrollbar pb-1">
        <button
          onClick={() => setCategory("All")}
          className={` cursor-pointer whitespace-nowrap text-sm font-medium capitalize transition-all duration-200 pb-1 ${
            category === "All"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 border-b-2 border-transparent hover:text-gray-900"
          }`}
        >
          All
        </button>

        {[...filterData]
                     .sort((a, b) => a.category.localeCompare(b.category)).map((item) => (
          <button
            key={item.id}
            onClick={() => setCategory(item.category)}
            className={` cursor-pointer whitespace-nowrap text-sm font-medium capitalize transition-all duration-200 pb-1 ${
              category === item.category
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {item.category.toLowerCase()}
          </button>
        ))}
      </nav>
    </header>
    </>
  );
};

export default Header;