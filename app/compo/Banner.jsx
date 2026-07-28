"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);

// Reduced to 7 images by removing one from the left side, keeping the exact layout structure intact
const BANNER_IMAGES = [
  "/Other/banner1.webp", // left large (top)
  "/Other/banner2.webp", // centre top
  "/Other/banner0.webp", // centre large
  "/Other/banner3.webp", // right large
  "/Other/banner5.webp", // right large bottom
  "/Other/banner6.webp", // left bottom
  "/Other/banner7.webp", // centre bottom
];

const Banner = () => {
  const containerRef = useRef(null);
  const showsearch = false;

  // Bento Grid Flip Scroll Animation with 7 items
  useGSAP(
    () => {
      let galleryElement = containerRef.current.querySelector("#gallery-8");
      if (!galleryElement) return;

      let galleryItems = galleryElement.querySelectorAll(".gallery__item");
      let flipCtx;

      const createTween = () => {
        flipCtx && flipCtx.revert();
        galleryElement.classList.remove("gallery--final");

        flipCtx = gsap.context(() => {
          galleryElement.classList.add("gallery--final");
          const flipState = Flip.getState(galleryItems);
          galleryElement.classList.remove("gallery--final");

          const flip = Flip.to(flipState, {
            simple: true,
            ease: "expoScale(1, 5)",
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: galleryElement,
              start: "center center",
              end: "+=100%",
              scrub: true,
              pin: galleryElement.parentNode,
            },
          });

          tl.add(flip);

          return () => gsap.set(galleryItems, { clearProps: "all" });
        });
      };

      createTween();
      window.addEventListener("resize", createTween);

      return () => {
        window.removeEventListener("resize", createTween);
        flipCtx && flipCtx.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full bg-[#fdfbf7] overflow-x-hidden -mt-12 lg:-mt-3">
      {/* Gallery Wrap Filling Full Screen */}
      <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        
        {/* Centered Logo & Title Overlay with Low Opacity */}
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <div
            className={`flex items-start gap-1.5 sm:gap-2 opacity-25 transition-opacity duration-300 ${
              showsearch ? "hidden sm:flex" : "flex"
            }`}
          >
            <div>
              <img
                src="/Other/logo.webp"
                alt="Logo"
                className="h-7 sm:h-10 lg:h-14 object-contain drop-shadow-lg"
              />
              <h1 className="font-semibold text-center text-[10px] sm:text-xs lg:text-sm text-white tracking-[0.2em] sm:tracking-[0.3em]">
                PATIALA
              </h1>
            </div>
            <div className="pl-1.5 sm:pl-2">
              <h1 className="font-extrabold text-xl sm:text-2xl lg:text-4xl border-l-2 pl-1.5 sm:pl-2 leading-tight text-white tracking-wider">
                DIVINE
              </h1>
            </div>
          </div>
        </div>

        {/* Bento Grid Gallery with 7 items */}
        <div
          id="gallery-8"
          className="gallery gallery--bento gallery--switch relative w-full h-full grid overflow-hidden"
        >
          {BANNER_IMAGES.map((img, idx) => (
            <div
              key={idx}
              className="gallery__item relative overflow-hidden w-full h-full bg-black"
            >
              <img
                src={img}
                alt={`Collage item ${idx + 1}`}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Styles for Bento Grid layout matching the 7-item arrangement */}
      <style jsx global>{`
        .gallery--bento {
          display: grid;
          gap: 1vh;
          grid-template-columns: repeat(3, 85vw);
          grid-template-rows: repeat(4, 21vh);
          justify-content: center;
          align-content: center;
        }

        .gallery--final.gallery--bento {
          grid-template-columns: repeat(3, 100vw) !important;
          grid-template-rows: repeat(4, 49.5vh) !important;
          gap: 1vh !important;
        }

        @media (min-width: 640px) {
          .gallery--bento {
            grid-template-columns: repeat(3, 50vw);
            grid-template-rows: repeat(4, 22vh);
          }
        }

        @media (min-width: 1024px) {
          .gallery--bento {
            grid-template-columns: repeat(3, 32.5vw);
            grid-template-rows: repeat(4, 23vh);
          }
        }

        /* Adjusted grid placement for 7 items (banner4 removed from left side) */
        .gallery--bento .gallery__item:nth-child(1) {
          grid-area: 1 / 1 / 3 / 2;
        }
        .gallery--bento .gallery__item:nth-child(2) {
          grid-area: 1 / 2 / 2 / 3;
        }
        .gallery--bento .gallery__item:nth-child(3) {
          grid-area: 2 / 2 / 4 / 3;
        }
        .gallery--bento .gallery__item:nth-child(4) {
          grid-area: 1 / 3 / 3 / 3;
        }
        .gallery--bento .gallery__item:nth-child(5) {
          grid-area: 3 / 3 / 5 / 4;
        }
        .gallery--bento .gallery__item:nth-child(6) {
          grid-area: 3 / 1 / 5 / 2;
        }
        .gallery--bento .gallery__item:nth-child(7) {
          grid-area: 4 / 2 / 5 / 3;
        }
      `}</style>
    </div>
  );
};

export default Banner;


// "use client";

// import React, { useRef, useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Flip } from "gsap/Flip";
// import { useGSAP } from "@gsap/react";

// gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);

// const BANNER_IMAGES = [
//   "/Other/banner2.webp", // left large
//   "/Other/banner1.webp", // centre top
//   "/Other/banner3.webp", // centre large
//   "/Other/banner0.webp", // right large
//   "/Other/banner4.webp", // left middle
//   "/Other/banner5.webp", // right large bottom
//   "/Other/banner6.webp", // left bottom
//   "/Other/banner7.webp", // centre bottom
// ];

// const Banner = () => {
//   const containerRef = useRef(null);
//   const showsearch = false;

//   // Bento Grid Flip Scroll Animation matching exact Codepen behavior
//   useGSAP(
//     () => {
//       let galleryElement = containerRef.current.querySelector("#gallery-8");
//       if (!galleryElement) return;

//       let galleryItems = galleryElement.querySelectorAll(".gallery__item");
//       let flipCtx;

//       const createTween = () => {
//         flipCtx && flipCtx.revert();
//         galleryElement.classList.remove("gallery--final");

//         flipCtx = gsap.context(() => {
//           galleryElement.classList.add("gallery--final");
//           const flipState = Flip.getState(galleryItems);
//           galleryElement.classList.remove("gallery--final");

//           const flip = Flip.to(flipState, {
//             simple: true,
//             ease: "expoScale(1, 5)",
//           });

//           const tl = gsap.timeline({
//             scrollTrigger: {
//               trigger: galleryElement,
//               start: "center center",
//               end: "+=100%",
//               scrub: true,
//               pin: galleryElement.parentNode,
//             },
//           });

//           tl.add(flip);

//           return () => gsap.set(galleryItems, { clearProps: "all" });
//         });
//       };

//       createTween();
//       window.addEventListener("resize", createTween);

//       return () => {
//         window.removeEventListener("resize", createTween);
//         flipCtx && flipCtx.revert();
//       };
//     },
//     { scope: containerRef }
//   );

//   return (
//     <div ref={containerRef} className="w-full bg-[#fdfbf7]  overflow-x-hidden -mt-3">
//       {/* Gallery Wrap Filling Full Screen */}
//       <div className="relative w-full h-screen flex items-center justify-center overflow-hidden ">
        
//         {/* Centered Logo & Title Overlay with Low Opacity */}
//         <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
//           <div
//             className={`flex items-start gap-1.5 sm:gap-2 opacity-25 transition-opacity duration-300 ${
//               showsearch ? "hidden sm:flex" : "flex"
//             }`}
//           >
//             <div>
//               <img
//                 src="/Other/logo.webp"
//                 alt="Logo"
//                 className="h-7 sm:h-10 lg:h-14 object-contain drop-shadow-lg"
//               />
//               <h1 className="font-semibold text-center text-[10px] sm:text-xs lg:text-sm text-white tracking-[0.2em] sm:tracking-[0.3em]">
//                 PATIALA
//               </h1>
//             </div>
//             <div className="pl-1.5 sm:pl-2">
//               <h1 className="font-extrabold text-xl sm:text-2xl lg:text-4xl border-l-2 pl-1.5 sm:pl-2 leading-tight text-white tracking-wider">
//                 DIVINE
//               </h1>
//             </div>
//           </div>
//         </div>

//         {/* Bento Grid Gallery matching Codepen layout and class structure */}
//         <div
//           id="gallery-8"
//           className="gallery gallery--bento gallery--switch relative w-full h-full grid  overflow-hidden"
//         >
//           {BANNER_IMAGES.map((img, idx) => (
//             <div
//               key={idx}
//               className="gallery__item relative overflow-hidden w-full h-full  bg-black"
//             >
//               <img
//                 src={img}
//                 alt={`Collage item ${idx + 1}`}
//                 className="absolute inset-0 h-full w-full object-cover object-center"
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Styles for Bento Grid layout and responsive scaling */}
//       <style jsx global>{`

//         .gallery--bento {
//           display: grid;
//           gap:1vh;
//           grid-template-columns: repeat(3, 85vw);
//           grid-template-rows: repeat(4, 21vh);
//           justify-content: center;
//           align-content: center;
//         }

//         .gallery--final.gallery--bento {
//           grid-template-columns: repeat(3, 100vw) !important;
//           grid-template-rows: repeat(4, 49.5vh) !important;
//           gap: 1vh !important;
//         }

//         @media (min-width: 640px) {
//           .gallery--bento {
//             grid-template-columns: repeat(3, 50vw);
//             grid-template-rows: repeat(4, 22vh);
//           }
//         }

//         @media (min-width: 1024px) {
//           .gallery--bento {
//             grid-template-columns: repeat(3, 32.5vw);
//             grid-template-rows: repeat(4, 23vh);
//           }
//         }

//         .gallery--bento .gallery__item:nth-child(1) {
//           grid-area: 1 / 1 / 3 / 2;
//         }
//         .gallery--bento .gallery__item:nth-child(2) {
//           grid-area: 1 / 2 / 2 / 3;
//         }
//         .gallery--bento .gallery__item:nth-child(3) {
//           grid-area: 2 / 2 / 4 / 3;
//         }
//         .gallery--bento .gallery__item:nth-child(4) {
//           grid-area: 1 / 3 / 3 / 3;
//         }
//         .gallery--bento .gallery__item:nth-child(5) {
//           grid-area: 3 / 1 / 3 / 2;
//         }
//         .gallery--bento .gallery__item:nth-child(6) {
//           grid-area: 3 / 3 / 5 / 4;
//         }
//         .gallery--bento .gallery__item:nth-child(7) {
//           grid-area: 4 / 1 / 5 / 2;
//         }
//         .gallery--bento .gallery__item:nth-child(8) {
//           grid-area: 4 / 2 / 5 / 3;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Banner;
