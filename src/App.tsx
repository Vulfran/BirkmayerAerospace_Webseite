// src/App.tsx
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
// Table component removed

function App() {
  // removed unused tableData

  return (
    <div className="min-h-screen text-foreground">
      {/* Absolute navbar overlayed on hero image */}
      <header className="absolute top-0 left-0 w-full z-20">
        <div className="bg-white/10 backdrop-blur-sm text-white">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <img
              src={`${import.meta.env.BASE_URL}logo_merch5.png`}
              alt="Birkmayer Aerospace Logo"
              className="h-10"
            />
            <NavigationMenu>
              <NavigationMenuList className="gap-4">
                <NavigationMenuItem>
                  <NavigationMenuLink href="/" className="hover:underline text-white">
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/about" className="hover:underline text-white">
                    About
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/contact" className="hover:underline text-white">
                    Contact
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
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
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold">
              Willkommen bei Birkmayer Aerospace
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
              Innovative Lösungen für Ihre Luftfahrtprojekte.
            </p>
          </div>
        </div>
      </section>

      {/* Page content below the hero */}
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold">Luftfahrt & hochregulierte Industrien – Produkte sicher, zuverlässig und marktreif machen</h2>
        <p className="mt-4 text-muted-foreground">
          Unternehmen in hochregulierten Märkten stehen unter Druck: mehr Innovation, kürzere Entwicklungszeiten, strengere Zertifizierungen. Ich unterstütze Unternehmen dabei, Produktentwicklung, Engineering und Serienfertigung schneller, sicherer und effizienter zu gestalten. Operativ, coachend und auf Managementebene verkürze ich Time-to-Market, erhöhe Lieferpünktlichkeit, steigere Produktzuverlässigkeit und reduziere Total Cost of Ownership – für Compliance, Resilienz und nachhaltige technologische Marktführerschaft.
        </p>
      </main>
    </div>
  );
}

export default App;

