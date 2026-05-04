import { useEffect } from "react";

export interface DocumentMeta {
  title: string;
  description: string;
  keywords?: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

type JsonLd = Record<string, unknown>;

const JSON_LD_ATTR = "data-page-jsonld";

function ensureMeta(selector: string, create: () => HTMLMetaElement | HTMLLinkElement): {
  el: HTMLMetaElement | HTMLLinkElement;
  prev: string | null;
  created: boolean;
} {
  let el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  let created = false;
  if (!el) {
    el = create();
    document.head.appendChild(el);
    created = true;
  }
  const attr = el.tagName === "LINK" ? "href" : "content";
  return { el, prev: el.getAttribute(attr), created };
}

function setAttr(el: Element, attr: string, value: string) {
  el.setAttribute(attr, value);
}

/**
 * Mutates document head tags (title, description, canonical, OG, Twitter) and
 * optionally injects JSON-LD. Restores previous values on unmount so navigation
 * back to the home page keeps the original tags intact.
 */
export function useDocumentMeta(meta: DocumentMeta, jsonLd?: JsonLd[] | JsonLd) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = meta.title;

    const restorers: Array<() => void> = [() => (document.title = prevTitle)];

    const apply = (
      selector: string,
      create: () => HTMLMetaElement | HTMLLinkElement,
      attr: "content" | "href",
      value: string | undefined,
    ) => {
      if (value === undefined) return;
      const { el, prev, created } = ensureMeta(selector, create);
      setAttr(el, attr, value);
      restorers.push(() => {
        if (created) {
          el.remove();
        } else if (prev !== null) {
          setAttr(el, attr, prev);
        }
      });
    };

    apply(
      'meta[name="description"]',
      () => Object.assign(document.createElement("meta"), { name: "description" }),
      "content",
      meta.description,
    );

    if (meta.keywords !== undefined) {
      apply(
        'meta[name="keywords"]',
        () => Object.assign(document.createElement("meta"), { name: "keywords" }),
        "content",
        meta.keywords,
      );
    }

    apply(
      'link[rel="canonical"]',
      () => Object.assign(document.createElement("link"), { rel: "canonical" }),
      "href",
      meta.canonical,
    );

    const og = (prop: string, value: string | undefined) =>
      apply(
        `meta[property="${prop}"]`,
        () => {
          const el = document.createElement("meta");
          el.setAttribute("property", prop);
          return el;
        },
        "content",
        value,
      );

    og("og:title", meta.ogTitle ?? meta.title);
    og("og:description", meta.ogDescription ?? meta.description);
    og("og:url", meta.ogUrl ?? meta.canonical);
    og("og:type", meta.ogType ?? "article");
    og("og:image", meta.ogImage);

    const tw = (name: string, value: string | undefined) =>
      apply(
        `meta[name="${name}"]`,
        () => Object.assign(document.createElement("meta"), { name }),
        "content",
        value,
      );

    tw("twitter:title", meta.twitterTitle ?? meta.title);
    tw("twitter:description", meta.twitterDescription ?? meta.description);
    tw("twitter:image", meta.twitterImage ?? meta.ogImage);

    // JSON-LD
    const jsonLdNodes: HTMLScriptElement[] = [];
    if (jsonLd) {
      const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      for (const item of items) {
        const node = document.createElement("script");
        node.type = "application/ld+json";
        node.setAttribute(JSON_LD_ATTR, "true");
        node.textContent = JSON.stringify(item);
        document.head.appendChild(node);
        jsonLdNodes.push(node);
      }
      restorers.push(() => jsonLdNodes.forEach((n) => n.remove()));
    }

    return () => {
      // Run restorers in reverse so adds undo before sets.
      for (let i = restorers.length - 1; i >= 0; i--) restorers[i]();
    };
  }, [meta, jsonLd]);
}
