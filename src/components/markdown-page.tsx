// src/components/markdown-page.tsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkHeadingId from "remark-heading-id";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";

interface MarkdownPageProps {
  lang: "de" | "en";
  page: "datenschutz" | "impressum";
}

export default function MarkdownPage({ lang, page }: MarkdownPageProps) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    const loadMarkdown = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}docs/${lang}/${page}.md`
        );
        if (!response.ok) {
          throw new Error("Could not load page");
        }
        const text = await response.text();
        setContent(text);
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
      <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkHeadingId]}
          rehypePlugins={[rehypeSlug, rehypeRaw]}
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="text-4xl font-bold mb-6 text-foreground scroll-mt-24" {...props}>
                {props.children}
              </h1>
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-3xl font-semibold mt-8 mb-4 text-foreground scroll-mt-24" {...props}>
                {props.children}
              </h2>
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-2xl font-semibold mt-6 mb-3 text-foreground scroll-mt-24" {...props}>
                {props.children}
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
  );
}
