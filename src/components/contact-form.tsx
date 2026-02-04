// src/components/contact-form.tsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ContactFormProps {
  lang: "de" | "en";
  t: (key: string) => string;
}

export default function ContactForm({ t }: ContactFormProps) {
  const location = useLocation();
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", "d897459d-964b-4055-b327-94f5d17f8cd5");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult(t("contact.form.successMessage"));
        form.reset();
      } else {
        console.error("Web3Forms error:", data);
        setResult(data.message || t("contact.form.errorMessage"));
      }
    } catch (error) {
      console.error("Network error:", error);
      setResult(t("contact.form.errorMessage"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-6 md:px-8 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          {t("contact.title")}
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          {t("contact.subtitle")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-foreground mb-2"
            >
              {t("contact.form.name")}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder={t("contact.form.namePlaceholder")}
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground mb-2"
            >
              {t("contact.form.email")}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder={t("contact.form.emailPlaceholder")}
            />
          </div>

          {/* Subject Field */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-foreground mb-2"
            >
              {t("contact.form.subject")}
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder={t("contact.form.subjectPlaceholder")}
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-foreground mb-2"
            >
              {t("contact.form.message")}
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-vertical"
              placeholder={t("contact.form.messagePlaceholder")}
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 text-white rounded-md hover:opacity-90 transition-opacity font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#1E2656' }}
            >
              {isSubmitting ? t("contact.form.sending") || "Sending..." : t("contact.form.submit")}
            </button>
          </div>

          {/* Result Message */}
          {result && (
            <div className={`p-4 rounded-md ${result.includes("Success") || result.includes("Erfolg") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {result}
            </div>
          )}
        </form>

        {/* Additional Contact Information */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            {t("contact.alternativeTitle")}
          </h2>
          <div className="space-y-3 text-muted-foreground">
            <p>
              <strong className="text-foreground">LinkedIn:</strong>{" "}
              <a
                href="https://www.linkedin.com/in/wolfram-birkmayer/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                linkedin.com/in/wolfram-birkmayer
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
