import { useEffect, useRef, useState } from "react";
import { MdOpenInNew } from "react-icons/md";
import data from "../data/projects.json";
import ProjectModal from "./ProjectModal";

function ProjectCard({ project, onClick }) {

  const IMAGE_BASE_URL = "https://raw.githubusercontent.com/GzaJai/portfolio-comercial/refs/heads/master/src/assets/projects/";

  // Si project.imageUrl ya es una URL absoluta, úsala tal cual; si es relativa, concatena la base
  const imageSrc = project.imageUrl?.startsWith("http")
    ? project.imageUrl
    : IMAGE_BASE_URL + project.imageUrl;

  return (
    <div className="card-glow-wrapper group cursor-pointer" onClick={onClick}>
      <article className="rounded-xl overflow-hidden shadow-[0_8px_16px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col relative z-10 bg-surface">
        {/* Image */}
        <div className="h-64 overflow-hidden border-b border-surface-variant bg-surface-container relative transition-colors duration-300">
          <img
            alt={project.imageAlt}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            src={imageSrc}
          />
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-headline-sm text-on-surface transition-colors duration-300">
              {project.title}
            </h3>
            <MdOpenInNew
              size={20}
              className="text-outline group-hover:text-primary transition-colors duration-300 shrink-0 mt-1"
            />
          </div>

          <p className="text-body-md text-on-surface-variant mb-6 flex-grow transition-colors duration-300">
            {project.description}
          </p>

          {/* Tags */}
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
      </article>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const { projects } = data;
  const [selectedProject, setSelectedProject] = useState(null);

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
      className="w-full bg-smooth-fade scroll-reveal relative"
      id="projects"
    >
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-surface-variant to-transparent pointer-events-none" />

      <div className="max-w-container-max mx-auto px-6 md:px-24 py-section-padding-mobile md:py-section-padding-desktop">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-headline-md text-primary">
            Proyectos Destacados
          </h2>
          <p className="text-body-md text-on-surface-variant mt-2">
            Soluciones técnicas desarrolladas para impacto real.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Gradient bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-surface-variant to-transparent pointer-events-none" />
    </section>
  );
}
