import { useEffect, useRef } from "react";
import UiLink from "../../shared/components/ui/UiLink";
import links from "../data/links.json";

export default function ContactSection() {
  const sectionRef = useRef(null);
  const { contact, whatsapp } = links;
  const phone = import.meta.env.VITE_WHATSAPP_PHONE;
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(whatsapp.message)}`;

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
    <section
      ref={sectionRef}
      className="py-section-padding-mobile md:py-section-padding-desktop max-w-container-max mx-auto px-6 md:px-24 scroll-reveal"
      id="contact"
    >
      <div className="max-w-2xl mx-auto bg-hero-mask">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-headline-md text-primary">{contact.title}</h2>
          <p className="text-body-md text-on-surface-variant mt-2">
            {contact.subtitle}
          </p>
        </div>

        {/* Form */}
        <form className="bg-surface/90 backdrop-blur-sm border border-surface-variant rounded-xl p-8 shadow-[0_4px_6px_-1px_rgb(0,0,0,0.05)]">
          <h3 className="text-headline-sm text-primary mb-6 border-b border-surface-variant pb-4">
            {contact.formTitle}
          </h3>

          <div className="space-y-6">
            {contact.fields.map((field) => (
              <div key={field.id}>
                <label
                  className="block font-label-md text-label-md text-on-surface-variant mb-2"
                  htmlFor={field.id}
                >
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    className="w-full bg-surface border border-outline-variant rounded px-4 py-3 text-body-md text-on-surface focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none transition-colors resize-none"
                    id={field.id}
                    name={field.id}
                    rows={field.rows ?? 4}
                  />
                ) : (
                  <input
                    className="w-full bg-surface border border-outline-variant rounded px-4 py-3 text-body-md text-on-surface focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none transition-colors"
                    id={field.id}
                    name={field.id}
                    placeholder={field.placeholder}
                    type={field.type}
                  />
                )}
              </div>
            ))}

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="w-full md:w-auto bg-secondary text-on-secondary font-label-md text-label-md px-8 py-3 rounded-lg hover:bg-on-secondary-fixed-variant transition-colors shadow-sm animate-pulse-subtle"
              >
                {contact.submitText}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
