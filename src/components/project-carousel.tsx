import { useState } from "react";
import { Link } from "react-router-dom";
import de from "@/locales/de.json";
import en from "@/locales/en.json";

type Props = { lang: "de" | "en" };

function ProjectCarousel({ lang }: Props) {
  const translations = { de, en } as const;
  const t = (key: string) =>
    (key
      .split(".")
      .reduce((o: any, k: string) => (o && o[k] !== undefined ? o[k] : undefined), translations[lang]) as string | undefined) ??
    key;

  // Build projects dynamically from the translations object so any
  // `projects.projectX` entry in the locale files is picked up.
  const projectsSrc = ((translations as any)[lang]?.projects ?? {}) as Record<string, any>;
  const projectEntries = Object.entries(projectsSrc)
    .filter(([key]) => key !== "sectionTitle")
    .sort(([a], [b]) => a.localeCompare(b));

  const projects = projectEntries.map(([key, v]) => ({
    title: v?.title,
    subtitle: v?.subtitle,
    text: v?.text,
    image: v?.image,
    anchor: key, // e.g., "project1", "project2", etc.
  }));

  // Fallback if no projects are defined
  if (projects.length === 0) {
    projects.push({
      title: t("projects.project1.title"),
      subtitle: t("projects.project1.subtitle"),
      text: t("projects.project1.text"),
      image: t("projects.project1.image"),
      anchor: "project1",
    });
  }

  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + projects.length) % projects.length);
  const next = () => setIndex((i) => (i + 1) % projects.length);

  

  return (
    <section id="projects">
      {/* Constrained background: use the same container/padding as the main content so
          heading, image and text line up exactly with the section above. */}
      <div 
        className="bg-gray-100 bg-cover bg-center"
        style={{
          backgroundImage: `url('${import.meta.env.BASE_URL}Hintergrund_weiss.png')`,
        }}
      >
        <div className="container mx-auto px-6 md:px-8 py-8 rounded-lg">
          {/* Section heading */}
          <h2 className="text-2xl font-semibold mb-4 text-white">{t("projects.sectionTitle")}</h2>

          <div className="w-full px-4 md:px-12">
            {/* Small + medium screens: show only the active card (use prev/next to navigate) */}
            <div className="block lg:hidden">
              {projects.length > 0 && (
                <article className="w-full rounded-md shadow-md overflow-hidden" style={{ backgroundColor: '#1E2656' }}>
                  {projects[index]?.image && (
                    <img src={`${import.meta.env.BASE_URL}${projects[index].image}`} alt={projects[index].title} className="w-full object-cover h-56" />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-xl text-white">{projects[index]?.title}</h3>
                    <p className="text-sm text-white/75 mt-1">{projects[index]?.subtitle}</p>
                    <p className="mt-3 text-sm text-white">{projects[index]?.text}</p>
                    <Link 
                      to={`/documentation#${projects[index]?.anchor}`}
                      className="inline-block mt-4 px-4 py-2 rounded hover:opacity-90 transition-opacity text-sm font-medium"
                      style={{ backgroundColor: 'white', color: '#1E2656' }}
                    >
                      {lang === "de" ? "Mehr erfahren" : "Learn more"}
                    </Link>
                  </div>
                </article>
              )}
            </div>

            {/* lg+ Carousel viewport */}
            <div className="hidden lg:block relative w-full">
              <div className="relative h-auto min-h-[520px] md:min-h-[720px] overflow-visible">
              {projects.map((proj, i) => {
                // compute shortest circular offset between i and index
                let diff = i - index;
                const n = projects.length;
                if (diff > n / 2) diff -= n;
                if (diff < -n / 2) diff += n;

                // Only render center and immediate neighbours to keep
                // the viewport showing at most three cards.
                if (Math.abs(diff) > 1 && n > 3) return null;

                // horizontal offset per step in viewport width (vw) to avoid
                // percent-based overlap issues across different viewports.
                // use a moderate vw so side cards stay inside padded container
                const stepVw = 28; // vw shift per card (adjust to taste)
                const translateX = `calc(-50% + ${diff * stepVw}vw)`;
                const isCenter = diff === 0;

                return (
                  <article
                    key={i}
                    className={`absolute left-1/2 top-4 md:top-6 transition-all duration-500 ease-out flex flex-col items-stretch ${
                      isCenter ? "z-20" : "z-10"
                    }`}
                    style={{
                      transform: `${isCenter ? "translateX(-50%) scale(1)" : `translateX(${translateX}) scale(0.9)`}`,
                      width: isCenter ? "48%" : "30%",
                      opacity: isCenter ? 1 : 0.85,
                    }}
                  >
                    {/* card */}
                    <div className={`text-white rounded-md shadow-md overflow-hidden ${isCenter ? "ring-1 ring-black/5" : ""}`} style={{ backgroundColor: '#1E2656' }}>
                      {proj.image && (
                        <img
                          src={`${import.meta.env.BASE_URL}${proj.image}`}
                          alt={proj.title}
                          className={`w-full object-cover ${isCenter ? "h-56 md:h-80" : "h-44 md:h-56"}`}
                        />
                      )}
                      <div className="p-4 md:p-6">
                        <h3 className={`font-semibold ${isCenter ? "text-2xl" : "text-xl"} text-white`}>{proj.title}</h3>
                        <p className="text-sm text-white/75 mt-1">{proj.subtitle}</p>
                        <p className={`mt-3 text-sm md:text-base text-white ${isCenter ? "" : "line-clamp-3"}`}>{proj.text}</p>
                        {isCenter && (
                          <Link 
                            to={`/documentation#${proj.anchor}`}
                            className="inline-block mt-4 px-4 py-2 rounded hover:opacity-90 transition-opacity text-sm font-medium"
                            style={{ backgroundColor: 'white', color: '#1E2656' }}
                          >
                            {lang === "de" ? "Mehr erfahren" : "Learn more"}
                          </Link>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
                </div>
              </div>

              {/* Controls overlay */}
            <div className="mt-6 flex items-center justify-between relative z-30">
              <div className="text-sm text-muted-foreground">{index + 1}/{projects.length}</div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous project"
                  className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-2xl md:text-3xl shadow-sm"
                >
                  ‹
                </button>
                <button
                  onClick={next}
                  aria-label="Next project"
                  className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-2xl md:text-3xl shadow-sm"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectCarousel;
