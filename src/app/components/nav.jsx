'use client'

import Image from "next/image";

const menuItems = [
  { href: "#team", label: "Team", scroll: true },
  { href: "#gallery", label: "Gallery", scroll: true },
  { href: "#request", label: "Start Your Request", scroll: true }, 
];

function getNavHeight() {
  const nav = document.querySelector('nav');
  if (nav) {
    return nav.offsetHeight;
  }
  return 72; 
}

function slowScrollTo(targetY, duration = 1200) {
  const startY = window.scrollY || window.pageYOffset;
  const distance = targetY - startY;
  let startTime = null;

  function easeInOutQuad(t) {
    return t < 0.5
      ? 2 * t * t
      : -1 + (4 - 2 * t) * t;
  }

  function step(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutQuad(progress);
    window.scrollTo(0, startY + distance * ease);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

function handleScroll(e, href) {
  e.preventDefault();
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) {
    const navHeight = getNavHeight();
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = rect.top + scrollTop - navHeight;
    slowScrollTo(targetY, 1200);
  }
}

export default function Nav() {
  return (
    <nav className="w-full flex items-center justify-between py-4 px-8" style={{ position: "sticky", top: 0, zIndex: 50, background: "#C9ADA7" }}>
      <div className="flex items-center">
        <Image
            src="/design-logo.svg"
            alt="Design Logo"
            width={40}
            height={40}
            priority
        />
      </div>
      <div className="flex-1 flex justify-center">
        <ul className="flex space-x-8 text-lg font-normal">
          {menuItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="hover:text-[#cb6774] transition-colors cursor-pointer"
                onClick={(e) => handleScroll(e, item.href)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-10" />
    </nav>
  );
}
