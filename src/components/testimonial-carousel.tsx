// src/components/testimonial-carousel.tsx
import { useState, useEffect } from "react";
import de from "@/locales/de.json";
import en from "@/locales/en.json";

type Props = { lang: "de" | "en" };

function TestimonialCarousel({ lang }: Props) {
  const translations = { de, en } as const;
  const t = (key: string) =>
    (key
      .split(".")
      .reduce((o: any, k: string) => (o && o[k] !== undefined ? o[k] : undefined), translations[lang]) as string | undefined) ??
    key;

  const testimonials = [
    {
      quote: t("references.testimonial1.quote"),
      name: t("references.testimonial1.name"),
      company: t("references.testimonial1.company"),
      image: t("references.testimonial1.image"),
    },
    {
      quote: t("references.testimonial2.quote"),
      name: t("references.testimonial2.name"),
      company: t("references.testimonial2.company"),
      image: t("references.testimonial2.image"),
    },
    {
      quote: t("references.testimonial3.quote"),
      name: t("references.testimonial3.name"),
      company: t("references.testimonial3.company"),
      image: t("references.testimonial3.image"),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatisches Karussell - wechselt alle 5 Sekunden
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section 
      className="w-full py-16 bg-cover bg-center relative transition-all duration-1000"
      style={{
        backgroundImage: `url('${import.meta.env.BASE_URL}${testimonials[currentIndex].image}')`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <h2 className="text-3xl font-bold mb-12 text-center text-white">
          {t("references.sectionTitle")}
        </h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Content */}
          <blockquote className="bg-white/10 backdrop-blur-md rounded-lg shadow-xl p-8 md:p-12 transition-all duration-500 border border-white/20">
            <div className="text-center">
              {/* Quote Icon */}
              <svg
                className="w-12 h-12 text-white/60 mb-6 mx-auto"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              {/* Quote Text */}
              <p className="text-xl md:text-2xl text-white italic mb-8 leading-relaxed">
                "{testimonials[currentIndex].quote}"
              </p>

              {/* Name */}
              <p className="text-xl font-semibold text-white mb-2">
                {testimonials[currentIndex].name}
              </p>

              {/* Company */}
              <p className="text-base text-white/80">
                {testimonials[currentIndex].company}
              </p>
            </div>
          </blockquote>

          {/* Dots Navigation */}
          <nav className="flex justify-center gap-3 mt-8" aria-label="Testimonial navigation">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

export default TestimonialCarousel;
