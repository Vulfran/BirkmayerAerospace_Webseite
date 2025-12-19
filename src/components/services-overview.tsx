// src/components/services-overview.tsx
import de from "@/locales/de.json";
import en from "@/locales/en.json";

type Props = { lang: "de" | "en" };

function ServicesOverview({ lang }: Props) {
  const translations = { de, en } as const;
  const t = (key: string) =>
    (key
      .split(".")
      .reduce((o: any, k: string) => (o && o[k] !== undefined ? o[k] : undefined), translations[lang]) as string | undefined) ??
    key;

  const services = [
    {
      title: t("services.card1.title"),
      items: [
        t("services.card1.items.0"),
        t("services.card1.items.1"),
        t("services.card1.items.2"),
        t("services.card1.items.3"),
      ],
    },
    {
      title: t("services.card2.title"),
      items: [
        t("services.card2.items.0"),
        t("services.card2.items.1"),
        t("services.card2.items.2"),
        t("services.card2.items.3"),
      ],
    },
    {
      title: t("services.card3.title"),
      items: [
        t("services.card3.items.0"),
        t("services.card3.items.1"),
        t("services.card3.items.2"),
        t("services.card3.items.3"),
      ],
    },
  ];

  return (
    <section id="services" className="container mx-auto px-6 md:px-8 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
        {t("services.sectionTitle")}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              {service.title}
            </h3>
            <ul className="space-y-3">
              {service.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start gap-3">
                  <span className="text-green-600 mt-1 flex-shrink-0">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-sm text-foreground leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServicesOverview;
