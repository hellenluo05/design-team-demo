'use client'

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Roboto, Lora, Montserrat, Pacifico, Oswald, Crimson_Text } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: "400", display: "swap" });
const lora = Lora({ subsets: ["latin"], weight: "400", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], weight: "400", display: "swap" });
const pacifico = Pacifico({ subsets: ["latin"], weight: "400", display: "swap" });
const oswald = Oswald({ subsets: ["latin"], weight: "400", display: "swap" });
const crimsonText = Crimson_Text({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });

const fontClasses = [
  roboto.className,
  lora.className,
  montserrat.className,
  pacifico.className,
  oswald.className,
];

const ANIMATION_DURATION = 0.65; // seconds
const ANIMATION_STAGGER = 0.15; // seconds
const FONT_SWAP_INTERVAL = (ANIMATION_DURATION + ANIMATION_STAGGER * 4 + 0.2) * 1000; // ms, a bit of buffer

export default function Landing() {
  const linesRef = useRef([]);
  const [fontOrderIndex, setFontOrderIndex] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeVisible, setWelcomeVisible] = useState(false);

  // Animate in on mount and on font order change
  useEffect(() => {
    if (showWelcome) return;
    linesRef.current.forEach((el, i) => {
      if (el) {
        el.classList.remove("slide-in-up");
        // Reset to initial state for re-animation
        // (in case of font swap, re-animate)
        // Force reflow to restart animation
        // eslint-disable-next-line no-unused-expressions
        el.offsetHeight;
        setTimeout(() => {
          el.classList.add("slide-in-up");
        }, i * ANIMATION_STAGGER * 1000);
      }
    });
  }, [fontOrderIndex, showWelcome]);

  // Font swap logic and showWelcome trigger
  useEffect(() => {
    let swapCount = 0;
    let intervalId = null;
    let timeoutId = null;

    if (!showWelcome) {
      intervalId = setInterval(() => {
        setFontOrderIndex(prev => {
          swapCount += 1;
          if (swapCount >= 2) {
            clearInterval(intervalId);
          }
          return (prev + 1) % fontClasses.length;
        });
      }, FONT_SWAP_INTERVAL);

      // 2 swaps, so 3 total font orders (initial + 2 swaps)
      // Each swap takes FONT_SWAP_INTERVAL ms
      // After the last animation, show the welcome message
      const totalDuration = FONT_SWAP_INTERVAL * 2;
      timeoutId = setTimeout(() => {
        setShowWelcome(true);
      }, totalDuration);

      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    }
  }, [showWelcome]);

  // When showWelcome becomes true, trigger fade-in for welcome message
  useEffect(() => {
    if (showWelcome) {
      // Allow a tick for the DOM to render the element with fade-in-welcome-init,
      // then switch to fade-in-welcome to trigger the CSS transition.
      const fadeTimeout = setTimeout(() => {
        setWelcomeVisible(true);
      }, 20); // 20ms is enough for next render tick
      return () => clearTimeout(fadeTimeout);
    }
  }, [showWelcome]);

  // Compute the current font order by rotating the fontClasses array
  const getFontOrder = () => {
    const order = [];
    for (let i = 0; i < fontClasses.length; i++) {
      order.push(fontClasses[(i + fontOrderIndex) % fontClasses.length]);
    }
    return order;
  };

  const currentFontOrder = getFontOrder();

  return (
    <section
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{
        minHeight: "100vh",
      }}
    >
      {/* Background SVG */}
      <Image
        src="/design-landing.svg"
        alt="Design Landing Background"
        fill
        style={{ objectFit: "cover", zIndex: 0 }}
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <style jsx>{`
          .slide-in-up-init {
            opacity: 0;
            transform: translateY(100%);
          }
          .slide-in-up {
            opacity: 1;
            transform: translateY(0);
            transition:
              opacity ${ANIMATION_DURATION}s cubic-bezier(0.4,0,0.2,1),
              transform ${ANIMATION_DURATION}s cubic-bezier(0.4,0,0.2,1);
          }
          .fade-in-welcome {
            opacity: 1;
            transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1);
          }
          .fade-in-welcome-init {
            opacity: 0;
          }
        `}</style>
        {!showWelcome ? (
          ["Design", "Design", "Design", "Design", "Design"].map((text, i) => (
            <span
              key={i}
              ref={el => (linesRef.current[i] = el)}
              className={`text-6xl md:text-6xl font-normal text-black ${currentFontOrder[i]} slide-in-up-init`}
              style={{
                letterSpacing: "0.05em",
                lineHeight: 1.1,
                willChange: "opacity, transform",
                display: "block",
                marginBottom: i !== 4 ? "0.1em" : 0,
              }}
              aria-hidden={i !== 0}
            >
              {text}
            </span>
          ))
        ) : (
          <span
            className={`text-6xl md:text-6xl font-normal text-black ${crimsonText.className} ${welcomeVisible ? "fade-in-welcome" : "fade-in-welcome-init"}`}
            style={{
              letterSpacing: "0.01em",
              lineHeight: 1.2,
              display: "block",
              textAlign: "center",
              maxWidth: "50vw",
            }}
            aria-label="Welcome to the Princeton Design Team."
            id="welcome-message"
          >
            Welcome to the Princeton Design Team.
          </span>
        )}
      </div>
    </section>
  );
}