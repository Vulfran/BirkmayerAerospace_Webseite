// src/components/contact-form.tsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ContactFormProps {
  lang: "de" | "en";
  t: (key: string) => string;
}

export default function ContactForm({ t }: ContactFormProps) {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for future backend integration
    console.log("Form submitted:", formData);
    alert(t("contact.form.successMessage"));
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
              value={formData.name}
              onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.subject}
              onChange={handleChange}
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
              value={formData.message}
              onChange={handleChange}
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
              className="w-full px-6 py-3 text-white rounded-md hover:opacity-90 transition-opacity font-medium"
              style={{ backgroundColor: '#1E2656' }}
            >
              {t("contact.form.submit")}
            </button>
          </div>
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
