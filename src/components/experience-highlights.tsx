import { Link } from "react-router-dom";
import { colors } from "@/config/settings";
import de from "@/locales/de.json";
import en from "@/locales/en.json";

type Props = { lang: "de" | "en" };

function ExperienceHighlights({ lang }: Props) {
  const translations = { de, en } as const;
  const t = (key: string) =>
    (key
      .split(".")
      .reduce(
        (o: any, k: string) => (o && o[k] !== undefined ? o[k] : undefined),
        translations[lang]
      ) as string | undefined) ?? key;

  const items = [
    {
      title: t("experience.item1.title"),
      description: t("experience.item1.description"),
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: t("experience.item2.title"),
      description: t("experience.item2.description"),
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: t("experience.item3.title"),
      description: t("experience.item3.description"),
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: t("experience.item4.title"),
      description: t("experience.item4.description"),
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
      ),
    },
    {
      title: t("experience.item5.title"),
      description: t("experience.item5.description"),
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: t("experience.item6.title"),
      description: t("experience.item6.description"),
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
    },
  ];

  return (
    <section className="container mx-auto px-6 md:px-8 py-16">
      <h2 className="text-3xl font-bold mb-4 text-center text-foreground">
        {t("experience.sectionTitle")}
      </h2>
      <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-12 leading-relaxed">
        {t("experience.sectionSubtitle")}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow text-white"
            style={{ backgroundColor: colors.brandPrimary }}
          >
            <div className="text-white mb-4 flex justify-center">
              {item.icon}
            </div>
            <h3 className="text-base font-bold text-white mb-2 leading-snug">
              {item.title}
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/kompetenzen"
          className="inline-block px-8 py-3 rounded text-white font-semibold transition-colors"
          style={{ backgroundColor: colors.brandPrimary }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.brandPrimaryHover)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.brandPrimary)}
        >
          {t("experience.cta")}
        </Link>
      </div>
    </section>
  );
}

export default ExperienceHighlights;
