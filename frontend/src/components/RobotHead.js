// src/components/FloatingDroneBot.js
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const FloatingDroneBot = () => {
  const botRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);

  useEffect(() => {
    const bot = botRef.current;
    const leftEye = leftEyeRef.current;
    const rightEye = rightEyeRef.current;

    if (!bot || !leftEye || !rightEye) return;

    // Floating animation
    gsap.to(bot, {
      y: -20,
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "sine.inOut",
    });

    // Blinking animation
    const blink = () => {
      gsap.to([leftEye, rightEye], {
        scaleY: 0.1,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        transformOrigin: "center",
        onComplete: () => {
          setTimeout(blink, Math.random() * 3000 + 2000);
        },
      });
    };
    blink();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700">
      <div ref={botRef} className="relative w-48 h-48">
        {/* Body wrapper to add top rounded corners */}
        <div className="relative w-full h-full flex justify-center items-start">
          <div
            className="w-0 h-0 border-l-[96px] border-r-[96px] border-b-[160px] border-l-transparent border-r-transparent border-b-white shadow-xl relative"
            style={{
              borderBottomLeftRadius: "30px",
              borderBottomRightRadius: "30px",
              overflow: "hidden",
              clipPath: "polygon(0 30%, 50% 0, 100% 30%, 100% 100%, 0% 100%)",
            }}
          />

          {/* Face / Screen */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[80px] h-[40px] bg-black rounded-xl flex items-center justify-around px-2 shadow-inner z-10">
            <div
              ref={leftEyeRef}
              className="w-4 h-4 bg-cyan-400 rounded-full shadow-md"
            ></div>
            <div
              ref={rightEyeRef}
              className="w-4 h-4 bg-cyan-400 rounded-full shadow-md"
            ></div>
          </div>

          {/* Side Arms */}
          <div className="absolute w-4 h-12 bg-white rounded-full left-[-12px] top-[70px] rotate-[-20deg] shadow-md"></div>
          <div className="absolute w-4 h-12 bg-white rounded-full right-[-12px] top-[70px] rotate-[20deg] shadow-md"></div>

          {/* Floating lines */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 space-y-1">
            <div className="w-1 h-3 bg-white opacity-50 animate-pulse rounded"></div>
            <div className="w-1 h-4 bg-white opacity-30 animate-pulse rounded"></div>
            <div className="w-1 h-3 bg-white opacity-20 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingDroneBot;
