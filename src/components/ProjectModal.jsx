import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MdClose, MdArrowForward, MdCode, MdChevronLeft, MdChevronRight } from "react-icons/md";
import UiLink from "../../shared/components/ui/UiLink";
import UiTooltip from "../../shared/components/ui/UiTooltip";

export default function ProjectModal({ project, onClose }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const images = project?.images?.length ? project.images : [project?.imageUrl];
  const hasMultipleImages = images.length > 1;

  // Reset active image index and lightbox status when project changes
  useEffect(() => {
    setActiveImageIndex(0);
    setIsLightboxOpen(false);
  }, [project]);

  // Use a ref to avoid the effect re-running when onClose changes reference
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          onCloseRef.current();
        }
        return;
      }

      // Navegar entre imágenes con flechas del teclado (solo en lightbox)
      if (isLightboxOpen && hasMultipleImages) {
        if (e.key === "ArrowLeft") {
          setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
        }
        if (e.key === "ArrowRight") {
          setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Block scroll while modal is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen, hasMultipleImages, images.length]);

  if (!project) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm modal-backdrop-enter"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white dark:bg-surface-container w-full max-w-5xl rounded-2xl p-6 md:p-10 shadow-2xl relative modal-content-enter border border-outline/10 z-[10000] max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-variant cursor-pointer z-10"
          aria-label="Cerrar modal"
        >
          <MdClose size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mt-4 md:mt-0">
          {/* Left Column: Image Carousel (Takes 7 cols for a larger image) */}
          <div className="md:col-span-7 flex flex-col order-1">
            {/* Main Image Box */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-surface-container-highest shadow-inner group border border-outline-variant/20">
              <img
                src={images[activeImageIndex]}
                alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                onClick={() => setIsLightboxOpen(true)}
                className="w-full h-full object-cover transition-transform duration-500 ease-out cursor-zoom-in hover:scale-102"
              />
              
              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors cursor-pointer hover:scale-105 z-10"
                    aria-label="Imagen anterior"
                  >
                    <MdChevronLeft size={22} />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors cursor-pointer hover:scale-105 z-10"
                    aria-label="Imagen siguiente"
                  >
                    <MdChevronRight size={22} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails list */}
            {images.length > 1 && (
              <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1 scrollbar-hidden">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer flex-shrink-0 ${
                      activeImageIndex === idx
                        ? "border-primary shadow-md scale-102 opacity-100"
                        : "border-transparent opacity-60 hover:opacity-90"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${project.title} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details (Takes 5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-between min-h-full order-2">
            <div>
              {/* Title */}
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
                  {project.title}
                </h3>
                {/* Decorative Underline */}
                <div className="h-1 w-16 bg-gradient-to-r from-secondary to-primary mt-2 rounded-full" />
              </div>

              {/* Description */}
              <p className="text-body-md text-on-surface-variant mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="mb-8">
                <span className="text-label-md font-bold text-on-surface-variant tracking-wider uppercase block mb-3">
                  Tecnologías
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="tag-metallic font-label-md text-label-md px-3 py-1 rounded-full cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons (More compact sizing) */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              {project.demoUrl ? (
                <UiLink
                  href={project.demoUrl}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-on-primary font-semibold px-4 py-2.5 text-sm rounded-lg hover:bg-primary-container hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  Visitar Sitio
                  <MdArrowForward size={16} className="translate-y-[0.5px]" />
                </UiLink>
              ) : (
                <UiTooltip
                  text="Este sitio es privado."
                  className="flex-1"
                >
                  <button
                    disabled
                    className="w-full inline-flex items-center justify-center gap-2 bg-surface-variant text-outline font-semibold px-4 py-2.5 text-sm rounded-lg opacity-60 cursor-not-allowed border border-outline-variant/30"
                  >
                    Sitio Privado
                    <MdArrowForward size={16} className="translate-y-[0.5px]" />
                  </button>
                </UiTooltip>
              )}

              {project.repoUrl ? (
                <UiLink
                  href={project.repoUrl}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-transparent border border-outline text-primary font-semibold px-4 py-2.5 text-sm rounded-lg hover:bg-surface-variant transition-all duration-300 cursor-pointer"
                >
                  <MdCode size={16} />
                  Ver Repositorio
                </UiLink>
              ) : (
                <UiTooltip
                  text="Este repositorio es privado."
                  className="flex-1"
                >
                  <button
                    disabled
                    className="w-full inline-flex items-center justify-center gap-2 bg-transparent border border-outline/30 text-outline font-semibold px-4 py-2.5 text-sm rounded-lg opacity-60 cursor-not-allowed"
                  >
                    <MdCode size={16} />
                    Repo Privado
                  </button>
                </UiTooltip>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Overlay */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[10100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 modal-backdrop-enter"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsLightboxOpen(false);
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full cursor-pointer transition-colors z-20"
            aria-label="Cerrar vista ampliada"
          >
            <MdClose size={24} />
          </button>

          {/* Main Image Box in Lightbox */}
          <div className="relative max-h-[70vh] max-w-[85vw] flex items-center justify-center">
            <img
              src={images[activeImageIndex]}
              alt={`${project.title} screenshot ${activeImageIndex + 1}`}
              className="max-h-[70vh] max-w-[85vw] object-contain rounded-lg shadow-2xl"
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors cursor-pointer hover:scale-105 z-20"
                  aria-label="Imagen anterior"
                >
                  <MdChevronLeft size={28} />
                </button>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors cursor-pointer hover:scale-105 z-20"
                  aria-label="Imagen siguiente"
                >
                  <MdChevronRight size={28} />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Thumbnails list (Match carousel format) */}
          {images.length > 1 && (
            <div className="flex gap-2.5 mt-6 overflow-x-auto pb-1 max-w-[80vw] scrollbar-hidden">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer flex-shrink-0 ${
                    activeImageIndex === idx
                      ? "border-white shadow-md scale-102 opacity-100"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${project.title} lightbox thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );

  return createPortal(modalContent, document.body);
}
