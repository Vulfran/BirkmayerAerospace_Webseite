import { useState } from "react";
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

  const projects = projectEntries.map(([, v]) => ({
    title: v?.title,
    subtitle: v?.subtitle,
    text: v?.text,
    image: v?.image,
  }));

  // Fallback if no projects are defined
  if (projects.length === 0) {
    projects.push({
      title: t("projects.project1.title"),
      subtitle: t("projects.project1.subtitle"),
      text: t("projects.project1.text"),
      image: t("projects.project1.image"),
    });
  }

  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + projects.length) % projects.length);
  const next = () => setIndex((i) => (i + 1) % projects.length);

  const p = projects[index];

  return (
    <section id="projects" className="my-12">
      {/* Constrained background: use the same container/padding as the main content so
          heading, image and text line up exactly with the section above. */}
      <div className="bg-gray-100">
        <div className="container mx-auto px-6 md:px-8 py-8 rounded-lg">
          {/* Section heading */}
          <h2 className="text-2xl font-semibold mb-4">{t("projects.sectionTitle")}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Image column */}
            <div className="flex items-stretch">
              {p.image && (
                <img
                  src={`${import.meta.env.BASE_URL}${p.image}`}
                  alt={p.title}
                  className="w-full md:h-full h-64 object-cover rounded-md shadow-sm"
                />
              )}
            </div>

            {/* Text + controls column */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{p.subtitle}</p>
                <p className="mt-4 text-sm md:text-base text-muted-foreground">{p.text}</p>
              </div>

              <div className="mt-6 flex items-center justify-between">
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
      </div>
    </section>
  );
}

export default ProjectCarousel;
