import { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import links from "../data/links.json";

export default function TopNavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { nav, siteName } = links;

  return (
    <nav className="sticky top-0 z-50 w-full bg-surface/90 backdrop-blur-md border-b border-surface-variant flex justify-between items-center max-w-container-max mx-auto px-6 md:px-24 h-20">
      {/* Logo */}
      <div className="font-headline-sm font-bold text-primary">
        {siteName}
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        {nav.items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`font-label-md text-label-md transition-colors duration-200 ${
              item.active
                ? "text-secondary border-b-2 border-secondary pb-1"
                : "text-on-surface-variant hover:text-secondary"
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>

      <div className="hidden md:block">
        <a
          href={nav.cta.href}
          className="inline-flex items-center justify-center bg-transparent border border-primary text-primary font-label-md text-label-md px-4 py-2 rounded-lg hover:bg-surface-variant transition-colors animate-pulse-subtle"
        >
          {nav.cta.label}
        </a>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-primary"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {mobileOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-surface/95 backdrop-blur-md border-b border-surface-variant md:hidden shadow-lg">
          <div className="flex flex-col items-center gap-4 py-6 px-6">
            {nav.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`font-label-md text-label-md transition-colors duration-200 ${
                  item.active
                    ? "text-secondary"
                    : "text-on-surface-variant hover:text-secondary"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href={nav.cta.href}
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center bg-transparent border border-primary text-primary font-label-md text-label-md px-4 py-2 rounded-lg hover:bg-surface-variant transition-colors w-full text-center"
            >
              {nav.cta.label}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
