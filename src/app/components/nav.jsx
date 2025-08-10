'use client'

import Image from "next/image";
import Link from "next/link";

const menuItems = [
  { href: "#team", label: "Team", scroll: true },
  { href: "#gallery", label: "Gallery", scroll: true },
  { href: "/request", label: "Start Your Request", scroll: false },
];

function handleScroll(e, href) {
  e.preventDefault();
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

export default function Nav() {
  return (
    <nav className="w-full flex items-center justify-between py-4 px-8">
      {}
      <div className="flex items-center">
        <Image
            src="/design-logo.svg"
            alt="Design Logo"
            width={40}
            height={40}
            priority
        />
      </div>
      {}
      <div className="flex-1 flex justify-center">
        <ul className="flex space-x-8 text-lg font-normal">
          {menuItems.map((item) => (
            <li key={item.href}>
              {item.scroll ? (
                <a
                  href={item.href}
                  className="hover:text-[#cb6774] transition-colors cursor-pointer"
                  onClick={(e) => handleScroll(e, item.href)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-[#cb6774] transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
      {}
      <div className="w-10" />
    </nav>
  );
}
