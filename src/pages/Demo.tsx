import { useEffect } from "react";
import { SandboxProvider } from "@/features/demo/useSandbox";
import SandboxShell from "@/features/demo/components/SandboxShell";

const TITLE = "Try GaragePro Free — Interactive Invoicing Demo";
const DESCRIPTION =
  "Play with a live GaragePro shop: build an auto repair invoice with parts and labour, record payments and see totals. No login, no setup.";

const Demo = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = TITLE;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      let created = false;
      if (!el) {
        el = document.createElement("meta");
        if (attr === "name") el.setAttribute("name", "description");
        else el.setAttribute("property", selector.replace(/.*="(.*)"\]/, "$1"));
        document.head.appendChild(el);
        created = true;
      }
      const previous = el.getAttribute("content");
      el.setAttribute("content", value);
      return () => {
        if (created) el?.remove();
        else if (previous !== null) el?.setAttribute("content", previous);
      };
    };

    const restores = [
      setMeta('meta[name="description"]', "name", DESCRIPTION),
      setMeta('meta[property="og:title"]', "property", TITLE),
      setMeta('meta[property="og:description"]', "property", DESCRIPTION),
    ];

    return () => {
      document.title = previousTitle;
      restores.forEach((restore) => restore());
    };
  }, []);

  return (
    <>
      <h1 className="sr-only">GaragePro interactive invoicing demo</h1>
      <SandboxProvider>
        <SandboxShell />
      </SandboxProvider>
    </>
  );
};

export default Demo;