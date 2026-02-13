import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: string;
}

const defaults = {
  title: "DataVault — Premium USB Storage & Equipment",
  description: "High-speed USB drives, hubs, cables, adapters & accessories. Trusted by professionals worldwide. Free shipping on orders over $50.",
  image: "/favicon.ico",
  type: "website",
};

const SEOHead = ({ title, description, url, image, type }: SEOProps) => {
  const t = title ? `${title} | DataVault` : defaults.title;
  const d = description || defaults.description;
  const img = image || defaults.image;
  const pageType = type || defaults.type;
  const pageUrl = url || window.location.href;

  useEffect(() => {
    document.title = t;

    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", d);
    setMeta("og:title", t, "property");
    setMeta("og:description", d, "property");
    setMeta("og:image", img, "property");
    setMeta("og:url", pageUrl, "property");
    setMeta("og:type", pageType, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", t);
    setMeta("twitter:description", d);
    setMeta("twitter:image", img);
  }, [t, d, img, pageUrl, pageType]);

  return null;
};

export default SEOHead;
