// src/App.tsx
import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import de from "@/locales/de.json";
import en from "@/locales/en.json";
import ProjectCarousel from "@/components/project-carousel";
// Table component removed

function App() {
  const [lang, setLang] = useState<"de" | "en">(() =>
    (localStorage.getItem("lang") as "de" | "en") || "de"
  );
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

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

  return (
    <div className="min-h-screen text-foreground">
      {/* Absolute navbar overlayed on hero image */}
      <header className="absolute top-0 left-0 w-full z-20">
        <div className="bg-white/10 backdrop-blur-sm text-white">
          <div className="container mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
            <img
              src={`${import.meta.env.BASE_URL}logo1_Slogan2f.png`}
              alt="Birkmayer Aerospace Logo"
              className="h-10"
            />
            <nav className="flex items-center gap-4">
              <div className="hidden md:flex">
                <NavigationMenu>
                  <NavigationMenuList className="gap-4">
                    <NavigationMenuItem>
                      <NavigationMenuLink href="/" className="text-white">
                        {t("nav.home")}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink href="/about" className="text-white">
                        {t("nav.about")}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink href="/contact" className="text-white">
                        {t("nav.contact")}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink href="#projects" className="text-white">
                        {t("nav.projects")}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

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
          <div className="md:hidden absolute top-full right-4 mt-2 w-44 bg-white/10 backdrop-blur-sm text-white rounded shadow z-30">
            <a href="/" className="block px-4 py-2 hover:bg-white/20">{t("nav.home")}</a>
            <a href="/about" className="block px-4 py-2 hover:bg-white/20">{t("nav.about")}</a>
            <a href="/contact" className="block px-4 py-2 hover:bg-white/20">{t("nav.contact")}</a>
            <a href="#projects" className="block px-4 py-2 hover:bg-white/20">{t("nav.projects")}</a>
          </div>
        )}
      </header>

      {/* Hero: fullscreen background image from public/ */}
      <section
        className="h-screen w-full bg-cover bg-center"
        style={{
          // Use Vite base URL so the image is requested correctly when the app
          // is served from a subpath (e.g. /website-template/)
          backgroundImage: `url('${import.meta.env.BASE_URL}Home_Birkmayer.png')`,
        }}
      >
          <div className="h-full w-full bg-black/30 flex items-center justify-center">
          <div className="text-center text-white px-6 md:px-8">
            <h1 className="text-4xl md:text-6xl font-bold">{t("hero.title")}</h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">{t("hero.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Page content below the hero */}
      <main className="container mx-auto px-6 md:px-8 py-4">
        <h2 className="text-2xl font-semibold">{t("about.title")}</h2>
        <p className="mt-4 text-muted-foreground">{t("about.text")}</p>
      </main>

      {/* Projects carousel */}
      <ProjectCarousel lang={lang} />
    </div>
  );
}

export default App;

