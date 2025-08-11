'use client'
import React, { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";

const PLACEHOLDER_PROJECTS = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  title: "Lorem Ipsum",
  year: "2025",
  image: "/design-placeholder.svg",
  details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Etiam ac facilisis erat. Suspendisse potenti. Mauris euismod, sapien eu commodo cursus, erat erat dictum urna, at consequat erat erat non urna.",
}));

export default function Gallery() {
  const [openProjectId, setOpenProjectId] = useState(null);

  const expandedRef = useRef([]);
  const [expandedHeights, setExpandedHeights] = useState([0, 0, 0]);

  const openProject =
    openProjectId !== null
      ? PLACEHOLDER_PROJECTS.find((p) => p.id === openProjectId)
      : null;

  const rows = [0, 1, 2].map((rowIdx) =>
    PLACEHOLDER_PROJECTS.slice(rowIdx * 4, rowIdx * 4 + 4)
  );

  const handleToggleProject = (projectId, rowIdx) => {
    if (openProjectId === projectId) {
      setOpenProjectId(null);
    } else {
      setOpenProjectId(projectId);
    }
  };

  const handleCloseProject = () => {
    setOpenProjectId(null);
  };

  useLayoutEffect(() => {
    rows.forEach((_, rowIdx) => {
      if (expandedRef.current[rowIdx]) {
        setExpandedHeights((prev) => {
          const newHeights = [...prev];
          newHeights[rowIdx] = expandedRef.current[rowIdx].scrollHeight;
          return newHeights;
        });
      }
    });
  }, [openProjectId]);

  return (
    <section id="gallery" className="py-10 bg-transparent flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-10 text-black text-center">Gallery</h2>
      <div className="flex flex-col gap-12 w-full max-w-6xl">
        {rows.map((row, rowIdx) => {
          const openInThisRow =
            openProject &&
            row.some((project) => project.id === openProjectId);

          const expandedProject = openProject &&
            row.some((project) => project.id === openProjectId)
            ? openProject
            : null;

          return (
            <React.Fragment key={rowIdx}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {row.map((project) => (
                  <div key={project.id} className="flex flex-col items-center">
                    <div className="w-full flex justify-center">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={240}
                        height={180}
                        className="object-cover"
                        style={{ background: "#e4dfda" }}
                        draggable={false}
                        unselectable="on"
                      />
                    </div>
                    <div className="mt-4 w-full flex flex-col items-center">
                      <span className="text-lg font-semibold text-black">{project.title}</span>
                      <span className="text-sm text-black mb-3">{project.year}</span>
                      <button
                        className="px-5 py-2 bg-black text-[#e4dfda] border border-black font-medium text-base transition-colors duration-150"
                        style={{ borderRadius: 0 }}
                        onClick={() => handleToggleProject(project.id, rowIdx)}
                        onMouseDown={e => e.preventDefault()}
                        tabIndex={0}
                        aria-expanded={openProjectId === project.id}
                        aria-controls={openProjectId === project.id ? `project-details-${project.id}` : undefined}
                        onKeyDown={e => {
                          if (e.key === "Enter" || e.key === " ") {
                            handleToggleProject(project.id, rowIdx);
                          }
                        }}
                      >
                        {openProjectId === project.id ? "Close" : "Learn More"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {}
              <div
                className="transition-all duration-300 ease-in-out w-full flex justify-center"
                style={{
                  minHeight: openInThisRow && expandedProject ? (expandedHeights[rowIdx] || 0) + 24 : 0,
                  maxHeight: openInThisRow && expandedProject ? (expandedHeights[rowIdx] || 9999) + 24 : 0,
                  overflow: "hidden",
                  marginTop: openInThisRow && expandedProject ? 24 : 0,
                  marginBottom: openInThisRow && expandedProject ? 24 : 0,
                  pointerEvents: openInThisRow && expandedProject ? "auto" : "none",
                }}
                aria-hidden={!openInThisRow || !expandedProject}
              >
                <div
                  ref={el => (expandedRef.current[rowIdx] = el)}
                  style={{
                    opacity: openInThisRow && expandedProject ? 1 : 0,
                    transition: "opacity 200ms",
                    width: "100%",
                    maxWidth: "64rem",
                    pointerEvents: openInThisRow && expandedProject ? "auto" : "none",
                  }}
                  id={expandedProject ? `project-details-${expandedProject.id}` : undefined}
                >
                  {openInThisRow && expandedProject && (
                    <div
                      className="bg-[#e4dfda] p-8 flex flex-col md:flex-row gap-8 rounded-none w-full border border-black"
                      style={{
                        minHeight: 360,
                        alignItems: "stretch",
                        marginBottom: 24,
                      }}
                    >
                      <div className="flex-shrink-0 flex justify-center items-center w-full md:w-1/2">
                        <Image
                          src={expandedProject.image}
                          alt={expandedProject.title}
                          width={480}
                          height={360}
                          className="object-contain"
                          style={{
                            background: "#e4dfda",
                            maxHeight: 360,
                            width: "100%",
                            minHeight: 360,
                          }}
                          draggable={false}
                          unselectable="on"
                        />
                      </div>
                      <div className="flex flex-col justify-center w-full md:w-1/2">
                        <h3 className="text-2xl font-bold text-black mb-2">{expandedProject.title}</h3>
                        <span className="text-base text-black mb-4">{expandedProject.year}</span>
                        <p className="text-black text-base mb-6">{expandedProject.details}</p>
                        <button
                          className="self-start px-5 py-2 bg-black text-[#e4dfda] border border-black font-medium text-base transition-colors duration-150"
                          style={{ borderRadius: 0 }}
                          onClick={handleCloseProject}
                          onMouseDown={e => e.preventDefault()}
                          tabIndex={0}
                          onKeyDown={e => {
                            if (e.key === "Enter" || e.key === " ") handleCloseProject();
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <style jsx>{`
        button {
          outline: none;
          border: 1px solid black;
        }
        button:hover, button:focus-visible {
          background: #e4dfda;
          color: black;
          border: 1px solid black;
        }
        button:active {
          filter: brightness(0.95);
        }
      `}</style>
    </section>
  );
}