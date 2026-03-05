// src/components/markdown-page.tsx
import { useEffect, useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkHeadingId from "remark-heading-id";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";

interface TocEntry {
  id: string;
  text: string;
  level: number;
}

type PageSlug = "datenschutz" | "impressum" | "kompetenzen" | "leistungen" | "projekte";

// Mapping from route slug to actual markdown filename per language
const pageFileMap: Record<string, Record<PageSlug, string>> = {
  de: {
    datenschutz: "datenschutz",
    impressum: "impressum",
    kompetenzen: "kompetenzen",
    leistungen: "leistungen",
    projekte: "projekte",
  },
  en: {
    datenschutz: "datenschutz",
    impressum: "impressum",
    kompetenzen: "competences",
    leistungen: "services",
    projekte: "projects",
  },
};

interface MarkdownPageProps {
  lang: "de" | "en";
  page: PageSlug;
}

export default function MarkdownPage({ lang, page }: MarkdownPageProps) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [activeId, setActiveId] = useState<string>("");
  const [headings, setHeadings] = useState<TocEntry[]>([]);
  const location = useLocation();
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMarkdown = async () => {
      setLoading(true);
      setError("");
      try {
        const filename = pageFileMap[lang]?.[page] ?? page;
        const response = await fetch(
          `${import.meta.env.BASE_URL}docs/${lang}/${filename}.md`
        );
        if (!response.ok) {
          throw new Error("Could not load page");
        }
        const text = await response.text();
        // Strip {#id} markers from headings — rehypeSlug generates IDs automatically
        const cleaned = text.replace(/^(#{1,6}\s+.*?)\s*\{#[^}]+\}\s*$/gm, "$1");
        setContent(cleaned);
      } catch (err) {
        setError(
          lang === "de"
            ? "Seite konnte nicht geladen werden"
            : "Could not load page"
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMarkdown();
  }, [lang, page]);

  // Extract headings from the rendered DOM and set up scroll spy
  useEffect(() => {
    if (loading || !content || !articleRef.current) return;

    const timer = setTimeout(() => {
      if (!articleRef.current) return;

      const elements = articleRef.current.querySelectorAll("h1[id], h2[id], h3[id]");
      const extracted: TocEntry[] = [];
      elements.forEach((el) => {
        const id = el.getAttribute("id");
        // Clean text: remove {#...} markers that remarkHeadingId may leave in the DOM
        const text = (el.textContent ?? "").replace(/\s*\{#[^}]+\}\s*/g, "").trim();
        if (id && text) {
          const level = parseInt(el.tagName.charAt(1), 10);
          extracted.push({ id, text, level });
        }
      });
      setHeadings(extracted);

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          }
        },
        { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      );

      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }, 400);

    return () => clearTimeout(timer);
  }, [loading, content]);

  // Scroll to anchor after content is loaded or when hash changes
  useEffect(() => {
    if (!loading && content) {
      const hash = location.hash;
      if (hash) {
        setTimeout(() => {
          const id = hash.replace('#', '');
          const element = document.getElementById(id);
          if (element) {
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 300);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [loading, content, location.hash]);

  const handleTocClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
    }
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-6 md:px-8 py-16 text-center">
        <p className="text-lg text-muted-foreground">
          {lang === "de" ? "Lädt..." : "Loading..."}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 md:px-8 py-16 text-center">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 md:px-8 py-16">
      <div className="flex gap-10 max-w-6xl mx-auto">
        {/* Sidebar TOC – visible on lg+ only */}
        {headings.length > 1 && (
          <nav className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-28">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                {lang === "de" ? "Inhalt" : "Contents"}
              </p>
              <ul className="space-y-1 border-l border-slate-200">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      onClick={(e) => handleTocClick(e, h.id)}
                      className={`block text-sm leading-snug py-1 transition-colors ${
                        h.level === 1
                          ? "pl-3"
                          : h.level === 2
                          ? "pl-3"
                          : "pl-6"
                      } ${
                        activeId === h.id
                          ? "text-[#1E2656] font-semibold border-l-2 border-[#1E2656] -ml-px"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}

        {/* Main content */}
        <article ref={articleRef} className="prose prose-lg dark:prose-invert max-w-4xl flex-1 min-w-0">
          <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkHeadingId]}
          rehypePlugins={[rehypeSlug, rehypeRaw]}
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="text-4xl font-bold mb-6 text-foreground scroll-mt-24" {...props}>
                {props.children}
              </h1>
            ),
            h2: ({ node, children, ...props }) => (
              <h2 className="text-3xl font-semibold mt-8 mb-4 text-foreground scroll-mt-24" {...props}>
                {children}
              </h2>
            ),
            h3: ({ node, children, ...props }) => (
              <h3 className="text-2xl font-semibold mt-6 mb-3 text-foreground scroll-mt-24" {...props}>
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="mb-4 text-muted-foreground leading-relaxed">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside mb-4 text-muted-foreground space-y-2">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside mb-4 text-muted-foreground space-y-2">
                {children}
              </ol>
            ),
            li: ({ children }) => <li className="ml-4">{children}</li>,
            a: ({ href, children }) => (
              <a
                href={href}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
            code: ({ className, children }) => {
              const isInline = !className;
              return isInline ? (
                <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
                  {children}
                </code>
              ) : (
                <code
                  className={`block bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto ${className}`}
                >
                  {children}
                </code>
              );
            },
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-muted-foreground">
                {children}
              </blockquote>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
