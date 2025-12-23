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
      description: t("services.card1.description"),
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      items: [
        t("services.card1.items.0"),
        t("services.card1.items.1"),
        t("services.card1.items.2"),
        t("services.card1.items.3"),
        t("services.card1.items.4"),
      ],
    },
    {
      title: t("services.card2.title"),
      description: t("services.card2.description"),
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      items: [
        t("services.card2.items.0"),
        t("services.card2.items.1"),
        t("services.card2.items.2"),
        t("services.card2.items.3"),
        t("services.card2.items.4"),
      ],
    },
    {
      title: t("services.card3.title"),
      description: t("services.card3.description"),
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      items: [
        t("services.card3.items.0"),
        t("services.card3.items.1"),
        t("services.card3.items.2"),
        t("services.card3.items.3"),
        t("services.card3.items.4"),
      ],
    },
  ];

  return (
    <section id="services" className="container mx-auto px-6 md:px-8 py-16">
      <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
        {t("services.sectionTitle")}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow text-white"
            style={{ backgroundColor: '#1E2656' }}
          >
            {/* Icon */}
            <div className="flex justify-center mb-6">
              {service.icon}
            </div>
            
            {/* Title */}
            <h3 className="text-2xl font-bold mb-4 text-center">
              {service.title}
            </h3>
            
            {/* Description */}
            <p className="text-sm mb-6 leading-relaxed opacity-90">
              {service.description}
            </p>
            
            {/* Items List */}
            <ul className="space-y-3">
              {service.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start gap-3">
                  <span className="text-white mt-1 flex-shrink-0">
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
                  <span className="text-sm leading-relaxed">
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
