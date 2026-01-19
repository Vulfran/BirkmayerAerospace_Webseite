// src/components/personal-quote.tsx
import de from "@/locales/de.json";
import en from "@/locales/en.json";

type Props = { lang: "de" | "en" };

function PersonalQuote({ lang }: Props) {
  const translations = { de, en } as const;
  const t = (key: string) =>
    (key
      .split(".")
      .reduce((o: any, k: string) => (o && o[k] !== undefined ? o[k] : undefined), translations[lang]) as string | undefined) ??
    key;

  return (
    <section 
      className="w-full py-16 bg-cover bg-center bg-right relative"
      style={{
        backgroundImage: `url('${import.meta.env.BASE_URL}955_Birkmayer_Hand-auf-Schulter_Zitat_comp.png')`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="max-w-2xl">
          {/* Quote Content - Left aligned */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-xl p-8 md:p-12 border border-white/20">
            {/* Quote Icon */}
            <svg
              className="w-12 h-12 text-white/60 mb-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>

            {/* Quote Text */}
            <p className="text-xl md:text-2xl text-white italic mb-8 leading-relaxed">
              "{t("quote.text")}"
            </p>

            {/* Author */}
            <p className="text-lg font-semibold text-white">
              — {t("quote.author")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PersonalQuote;
