"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Banner = () => {
  const containerRef = useRef(null);
  const loaderRef = useRef(null);
  const logoRef = useRef(null);
  const bannerRef = useRef(null);

  const [showLoader, setShowLoader] = useState(true);

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
        onComplete: () => {
          setShowLoader(false);
        },
      });

      // Initial banner state
      gsap.set(bannerRef.current, {
        scale: 1.1,
        opacity: 0.6,
      });

      timeline
        // Logo entrance
        .fromTo(
          logoRef.current,
          {
            opacity: 0,
            scale: 0.7,
            y: 30,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
          }
        )

        // Small logo pulse
        .to(logoRef.current, {
          scale: 1.08,
          duration: 0.35,
          ease: "power2.inOut",
        })

        .to(logoRef.current, {
          scale: 1,
          duration: 0.35,
          ease: "power2.inOut",
        })

        // Hide logo
        .to(logoRef.current, {
          opacity: 0,
          y: -30,
          duration: 0.5,
          ease: "power2.in",
        })

        // Reveal banner
        .to(
          bannerRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.4"
        )

        // Move loader upward
        .to(
          loaderRef.current,
          {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
          },
          "-=0.9"
        );
    },
    {
      scope: containerRef,
    }
  );

  return (
    <div
      ref={containerRef}
      className="relative h-[90vh] w-full overflow-hidden bg-black"
    >
      {/* Hero banner */}
      <img
        ref={bannerRef}
        src="/Other/banner.webp"
        alt="Hero banner"
        className="h-full w-full object-cover"
      />

      {/* Loader */}
      {showLoader && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          <img
            ref={logoRef}
            src="/Other/logo.webp"
            alt="Company logo"
            className="h-28 w-auto object-contain sm:h-36 md:h-40"
          />
        </div>
      )}
    </div>
  );
};

export default Banner;