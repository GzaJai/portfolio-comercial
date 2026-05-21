import { useEffect, useRef } from "react";
import { MdDownload } from "react-icons/md";
import UiLink from "./shared/ui/UiLink";
import links from "../data/links.json";

const PARALLAX_LAYERS = [
  {
    speed: 0.05,
    children: (
      <>
        <div className="absolute top-[10%] left-[15%] w-96 h-96 bg-primary-fixed rounded-full blur-[80px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-secondary-fixed-dim rounded-full blur-[100px] opacity-50" />
      </>
    ),
  },
  {
    speed: 0.15,
    children: (
      <>
        <svg
          className="absolute top-[30%] left-[70%] w-64 h-64 text-secondary/10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="80" strokeDasharray="4 8" />
          <rect
            x="40"
            y="40"
            width="120"
            height="120"
            transform="rotate(45 100 100)"
          />
        </svg>
        <svg
          className="absolute bottom-[40%] left-[20%] w-48 h-48 text-primary/10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          viewBox="0 0 200 200"
        >
          <polygon points="100,20 180,180 20,180" />
        </svg>
      </>
    ),
  },
  {
    speed: -0.08,
    children: (
      <>
        <div className="absolute top-[60%] left-[40%] w-32 h-32 border border-tertiary-fixed rounded-lg rotate-12" />
        <div className="absolute top-[20%] right-[30%] w-16 h-16 border-2 border-secondary/20 rounded-full" />
      </>
    ),
  },
];

const LAYER_OPACITIES = [
  "opacity-40 mix-blend-multiply",
  "opacity-60",
  "opacity-30",
];

export default function HeroSection() {
  const containerRef = useRef(null);
  const layersRef = useRef([]);
  const { hero, whatsapp } = links;
  const phone = import.meta.env.VITE_WHATSAPP_PHONE;
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(whatsapp.message)}`;

  useEffect(() => {
    const parallaxContainer = containerRef.current;
    const parallaxLayers = layersRef.current;

    if (
      !parallaxContainer ||
      parallaxLayers.length === 0 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    function onMouseMove(e) {
      mouseX = e.clientX - centerX;
      mouseY = e.clientY - centerY;
    }

    function animate() {
      targetX += (mouseX - targetX) * 0.1;
      targetY += (mouseY - targetY) * 0.1;

      parallaxLayers.forEach((layer) => {
        if (!layer) return;
        const speed = parseFloat(layer.dataset.speed) || 0.1;
        const x = targetX * speed;
        const y = targetY * speed;
        layer.style.transform = `translate(${x}px, ${y}px)`;
      });

      requestAnimationFrame(animate);
    }

    document.addEventListener("mousemove", onMouseMove);
    animate();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section
      className="relative py-section-padding-mobile md:py-section-padding-desktop max-w-container-max mx-auto px-6 md:px-24 overflow-hidden"
      id="about"
    >
      {/* Parallax Background Layers */}
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden md:block"
      >
        {PARALLAX_LAYERS.map((layer, i) => (
          <div
            key={i}
            ref={(el) => (layersRef.current[i] = el)}
            className={`parallax-layer ${LAYER_OPACITIES[i]}`}
            data-speed={layer.speed}
          >
            {layer.children}
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left: Text Content */}
        <div className="md:col-span-7 flex flex-col items-start space-y-6 relative">
          {/* Soft mask to keep the dots extremely light behind the text */}
          <div className="absolute -inset-10 bg-hero-mask pointer-events-none z-0" />

          <div className="relative z-10 flex flex-col items-start space-y-6 w-full">
            <div>
              <h1 className="text-display-lg-mobile md:text-display-lg text-primary">
                {hero.name}
              </h1>
              <h2 className="text-headline-md text-secondary mt-2">
                {hero.title}
              </h2>
            </div>

            {/* Desktop: ambos párrafos, Mobile: solo el segundo */}
            <p className="text-body-lg text-on-surface-variant max-w-2xl leading-relaxed hidden md:block">
              {hero.description.map((paragraph, i) => (
                <span key={i}>
                  {i > 0 && <><br /><br /></>}
                  {paragraph}
                </span>
              ))}
            </p>
            <p className="text-body-lg text-on-surface-variant max-w-2xl leading-relaxed block md:hidden">
              {hero.description[1]}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
              <UiLink
                href={hero.buttons.cv.href}
                className="inline-flex items-center justify-center gap-2 bg-secondary text-on-secondary font-label-md text-label-md px-6 py-3 rounded-lg hover:bg-on-secondary-fixed-variant transition-colors w-full sm:w-auto"
              >
                <MdDownload size={18} />
                {hero.buttons.cv.label}
              </UiLink>
              <UiLink
                href={whatsappUrl}
                className="inline-flex items-center justify-center bg-transparent border border-primary text-primary font-label-md text-label-md px-6 py-3 rounded-lg hover:bg-surface-variant transition-colors w-full sm:w-auto animate-pulse-subtle"
              >
                {hero.buttons.contact.label}
              </UiLink>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="md:col-span-5 w-full order-first md:order-last mb-8 md:mb-0">
          <div className="aspect-square w-full max-w-[400px] mx-auto rounded-xl overflow-hidden bg-surface-container-high border border-surface-variant shadow-[0_4px_6px_-1px_rgb(0,0,0,0.05),0_2px_4px_-2px_rgb(0,0,0,0.05)] relative">
            <img
              alt={hero.imageAlt}
              className="w-full h-full object-cover"
              src={hero.imageUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
