// src/components/footer.tsx
import { Link } from "react-router-dom";

interface FooterProps {
  lang: "de" | "en";
  t: (key: string) => string;
}

export default function Footer({ t }: FooterProps) {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-12">
      <div className="container mx-auto px-6 md:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left side - Logo or company name */}
          <div className="flex items-center">
            <img
              src={`${import.meta.env.BASE_URL}logo_merch1.png`}
              alt="Birkmayer Aerospace"
              className="h-8"
            />
          </div>

          {/* Center - Links */}
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
            <Link
              to="/contact"
              className="text-foreground hover:text-foreground/70 transition-colors"
            >
              {t("footer.contact")}
            </Link>
            <Link
              to="/datenschutz"
              className="text-foreground hover:text-foreground/70 transition-colors"
            >
              {t("footer.privacy")}
            </Link>
            <Link
              to="/impressum"
              className="text-foreground hover:text-foreground/70 transition-colors"
            >
              {t("footer.imprint")}
            </Link>
            <a
              href="https://www.linkedin.com/in/wolfram-birkmayer/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-foreground/70 transition-colors flex items-center gap-1"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="https://www.ddim.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-foreground/70 transition-colors flex items-center gap-1"
            >
              <img
                src={`${import.meta.env.BASE_URL}ddim_mitglied.png`}
                alt="DDIM Mitglied"
                className="h-4"
              />
              DDIM
            </a>
          </nav>

          {/* Right side - Copyright */}
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Birkmayer Aerospace
          </div>
        </div>
      </div>
    </footer>
  );
}
