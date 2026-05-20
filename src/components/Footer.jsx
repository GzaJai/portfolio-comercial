import { useEffect, useRef } from "react";
import links from "../data/links.json";

export default function Footer() {
  const sectionRef = useRef(null);
  const { footer, siteName } = links;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="w-full border-t border-surface-variant bg-surface-container-low/60 backdrop-blur-md text-on-surface scroll-reveal"
    >
      <div className="flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto px-6 md:px-24 py-16 gap-8">
        {/* Brand */}
        <div className="font-headline-sm font-bold text-primary">
          {siteName}
        </div>

        {/* Links */}
        <div className="flex gap-6 items-center">
          {footer.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              className="font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-body-md text-on-surface-variant text-center md:text-right">
          {footer.copyright}
        </div>
      </div>
    </footer>
  );
}
