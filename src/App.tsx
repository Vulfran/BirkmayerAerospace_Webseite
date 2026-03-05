// src/App.tsx
import { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import de from "@/locales/de.json";
import en from "@/locales/en.json";
import ProjectCarousel from "@/components/project-carousel";
import Footer from "@/components/footer";
import MarkdownPage from "@/components/markdown-page";
import ContactForm from "@/components/contact-form";
import ServicesOverview from "@/components/services-overview";
import ExperienceHighlights from "@/components/experience-highlights";
import TestimonialCarousel from "@/components/testimonial-carousel";
import PersonalQuote from "@/components/personal-quote";
// Table component removed

function App() {
  const [lang, setLang] = useState<"de" | "en">(() =>
    (localStorage.getItem("lang") as "de" | "en") || "de"
  );
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const translations = { de, en } as const;
  const t = (key: string) =>
    (key
      .split(".")
      .reduce((o: any, k: string) => (o && o[k] !== undefined ? o[k] : undefined), translations[lang]) as
      | string
      | undefined) ?? key;

  // Check if we're on a subpage (dark blue navbar instead of transparent hero overlay)
  const isSubPage = ['/kompetenzen', '/leistungen', '/projekte', '/datenschutz', '/impressum', '/contact'].includes(location.pathname);

  return (
    <div className="min-h-screen text-foreground bg-white">
      {/* Navbar - absolute on home, fixed with background on other pages */}
      <header className={isSubPage ? "fixed top-0 left-0 w-full z-20" : "absolute top-0 left-0 w-full z-20"}>
        <div className={isSubPage ? "bg-slate-900 text-white shadow-md" : "bg-white/10 backdrop-blur-sm text-white"}>
          <div className="container mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
            <img
              src={`${import.meta.env.BASE_URL}logo3_Birkmayer_white_Slogan.png`}
              alt="Birkmayer Aerospace Logo"
              className="h-14 md:h-16"
            />
            <nav className="flex items-center gap-4">
              <div className="hidden md:flex">
                <NavigationMenu>
                  <NavigationMenuList className="gap-4">
                    <NavigationMenuItem>
                      <Link to="/" className="text-white px-3 py-2 hover:bg-white/20 rounded">
                        {t("nav.home")}
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link to="/kompetenzen" className="text-white px-3 py-2 hover:bg-white/20 rounded">
                        {t("nav.competences")}
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link to="/leistungen" className="text-white px-3 py-2 hover:bg-white/20 rounded">
                        {t("nav.services")}
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link to="/projekte" className="text-white px-3 py-2 hover:bg-white/20 rounded">
                        {t("nav.projects")}
                      </Link>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              {/* contact button */}
              <Link
                to="/contact"
                className="hidden md:inline-block ml-2 px-4 py-1.5 rounded bg-white/20 text-white hover:bg-white/30 font-medium"
              >
                {t("nav.contact")}
              </Link>

              {/* language toggle */}
              <button
                onClick={() => setLang((l) => (l === "de" ? "en" : "de"))}
                aria-label="Toggle language"
                className="ml-2 px-3 py-1 rounded bg-white/20 text-white hover:bg-white/30"
              >
                {lang.toUpperCase()}
              </button>

              {/* mobile menu button */}
              <button
                onClick={() => setMobileOpen((s) => !s)}
                aria-label="Open menu"
                className="md:hidden ml-2 p-2 rounded bg-white/10 hover:bg-white/20"
              >
                <span className="text-xl">☰</span>
              </button>
            </nav>
          </div>
        </div>
        {/* Mobile menu panel */}
        {mobileOpen && (
          <div className={isSubPage ? "md:hidden absolute top-full right-4 mt-2 w-44 bg-slate-800 text-white rounded shadow-lg z-30" : "md:hidden absolute top-full right-4 mt-2 w-44 bg-white/10 backdrop-blur-sm text-white rounded shadow z-30"}>
            <Link to="/" className="block px-4 py-2 hover:bg-white/20" onClick={() => setMobileOpen(false)}>{t("nav.home")}</Link>
            <Link to="/contact" className="block px-4 py-2 hover:bg-white/20" onClick={() => setMobileOpen(false)}>{t("nav.contact")}</Link>
            <Link to="/kompetenzen" className="block px-4 py-2 hover:bg-white/20" onClick={() => setMobileOpen(false)}>{t("nav.competences")}</Link>
            <Link to="/leistungen" className="block px-4 py-2 hover:bg-white/20" onClick={() => setMobileOpen(false)}>{t("nav.services")}</Link>
            <Link to="/projekte" className="block px-4 py-2 hover:bg-white/20" onClick={() => setMobileOpen(false)}>{t("nav.projects")}</Link>
          </div>
        )}
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* Hero: fullscreen background image from public/ */}
              <header
                className="h-screen w-full bg-cover bg-[80%_top] md:bg-right-top lg:bg-center bg-gray-900 overflow-hidden"
                style={{
                  // Use Vite base URL so the image is requested correctly when the app
                  // is served from a subpath (e.g. /website-template/)
                  backgroundImage: `url('${import.meta.env.BASE_URL}955_Birkmayer_Hand-auf-Schulter_Landscape_comp.png')`,
                }}
              >
                <div className="h-full w-full bg-black/30 flex items-center justify-center">
                  <div className="text-center text-white px-6 md:px-8">
                    <h1 className="text-4xl md:text-6xl font-bold animate-fade-in-up">{t("hero.title")}</h1>
                    <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto animate-fade-in-up animation-delay-300">{t("hero.subtitle")}</p>
                  </div>
                </div>
              </header>

              {/* Page content below the hero */}
              <main>
                <section className="container mx-auto px-6 md:px-8 py-12">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-semibold mb-6">{t("about.title")}</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">{t("about.text1")}</p>
                    <p className="mt-4 text-muted-foreground leading-relaxed">{t("about.text2")}</p>
                    <p className="mt-4 text-muted-foreground leading-relaxed">{t("about.text3")}</p>
                  </div>
                </section>

              {/* Experience Highlights */}
              <ExperienceHighlights lang={lang} />

              {/* Services Overview */}
              <ServicesOverview lang={lang} />

              {/* Personal Quote */}
              <PersonalQuote lang={lang} />

              {/* Projects carousel */}
              <ProjectCarousel lang={lang} />

              {/* Testimonial Carousel */}
              <TestimonialCarousel lang={lang} />
              </main>
            </>
          }
        />
        <Route
          path="/kompetenzen"
          element={
            <>
              <div className="h-20"></div>
              <MarkdownPage lang={lang} page="kompetenzen" />
            </>
          }
        />
        <Route
          path="/leistungen"
          element={
            <>
              <div className="h-20"></div>
              <MarkdownPage lang={lang} page="leistungen" />
            </>
          }
        />
        <Route
          path="/projekte"
          element={
            <>
              <div className="h-20"></div>
              <MarkdownPage lang={lang} page="projekte" />
            </>
          }
        />
        <Route
          path="/datenschutz"
          element={
            <>
              {/* Spacer for fixed header */}
              <div className="h-20"></div>
              <MarkdownPage lang={lang} page="datenschutz" />
            </>
          }
        />
        <Route
          path="/impressum"
          element={
            <>
              {/* Spacer for fixed header */}
              <div className="h-20"></div>
              <MarkdownPage lang={lang} page="impressum" />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              {/* Spacer for fixed header */}
              <div className="h-20"></div>
              <ContactForm lang={lang} t={t} />
            </>
          }
        />
      </Routes>
      <Footer lang={lang} t={t} />
    </div>
  );
}

export default App;

