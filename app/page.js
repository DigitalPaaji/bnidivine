"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "./compo/Header";
import Members from "./compo/member.json"
export default function Home() {
const [primeryColor,setPrimeryColor]=useState("#ff3131")
const [secondryColor,setsecondryColor]=useState("#000")
const [category,setCategory]=useState("All")
const [filteredMembers,setFilteredMembers]=useState(Members)

const [search,setSearch]=useState("")

useEffect(()=>{
if(category=="All"){
  setFilteredMembers(Members)
}
else{
  const filterData= Members.filter((item)=>item.category==category);
setFilteredMembers(filterData)
}
},[category])

useEffect(()=>{
 if (!search) {
    setFilteredMembers(Members);
    return;
  }
const filtered = Members.filter((member) => {
    const query = search.toLowerCase();

    return (
      member.name?.toLowerCase().includes(query) ||
      member.business?.toLowerCase().includes(query) ||
      member.category?.toLowerCase().includes(query)
    );
  });

  setFilteredMembers(filtered);

},[search])

  return (
 <div className="min-h-screen"  >
  <Header  category={category} setCategory={setCategory} search={search}  setSearch={setSearch} />
 




<main className="container mx-auto px-4 py-10 bg-gradient-to-b from-gray-50 to-white min-h-screen">
  
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    
    {[...filteredMembers]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((member) => (
      <div
        key={member.id}
        className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden"
      >
        
        {/* Gradient Top Border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-400"></div>

        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-lg">
            {member.name?.charAt(0)}
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">
              {member.name}
            </h2>
            <p className="text-sm text-gray-500">{member.business}</p>
          </div>
        </div>

        {/* Category */}
        <div className="mb-4">
          <span className="inline-block bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full font-semibold">
            {member.category}
          </span>
        </div>

        {/* Contact Info */}
        <div className="mt-auto space-y-3 pt-4 border-t border-gray-100">
          
          {/* Phone */}
          <div className="flex items-center text-sm text-gray-600">
            <i className="fa-solid fa-phone mr-2 text-gray-400"></i>
            <a href={`tel:${member.mobile}`} className="hover:text-blue-600">
              +91 {member.mobile}
            </a>
          </div>

          {/* Address */}
          <div className="flex items-start text-sm text-gray-600">
            <i className="fa-solid fa-location-dot mr-2 mt-1 text-gray-400"></i>
            <span>{member.address}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-3">
            
            {/* Call Button */}
            <a
              href={`tel:${member.mobile}`}
              className="flex-1 text-center bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 rounded-lg transition"
            >
              Call
            </a>

            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/91${member.mobile}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-green-500 hover:bg-green-600 text-white text-sm py-2 rounded-lg transition flex items-center justify-center gap-1"
            >
              <i className="fa-brands fa-whatsapp"></i> WhatsApp
            </a>

          </div>
        </div>
      </div>
    ))}

    {/* Empty State */}
    {filteredMembers.length === 0 && (
      <div className="col-span-full text-center py-16 text-gray-400">
        <p className="text-lg font-medium">No members found</p>
        <p className="text-sm">Try changing your filter or search</p>
      </div>
    )}

  </div>
</main>





 </div>
  );
}

