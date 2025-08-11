'use client'

export default function Footer() {
  return (
    <footer
      className="w-full flex flex-col items-center justify-center py-6"
      style={{ background: "#cb6774" }}
    >
      <div className="text-base md:text-lg mb-1" style={{ color: "#e4dfda" }}>
        Follow us on Instagram: <a href="https://instagram.com/princetondesign" target="_blank" rel="noopener noreferrer" style={{ color: "#e4dfda"}}>@princetondesign</a>
      </div>
      <div className="text-sm md:text-base" style={{ color: "#e4dfda" }}>
        © 2025 Princeton E-Club Design
      </div>
    </footer>
  );
}
