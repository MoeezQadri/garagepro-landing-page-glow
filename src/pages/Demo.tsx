import { Helmet } from "react-helmet-async";
import { SandboxProvider } from "@/features/demo/useSandbox";
import SandboxShell from "@/features/demo/components/SandboxShell";

const TITLE = "Try GaragePro Free — Interactive Invoicing Demo";
const DESCRIPTION =
  "Play with a live GaragePro shop: build an auto repair invoice with parts and labour, record payments and see totals. No login, no setup.";

const Demo = () => {
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://mygaragepro.co/demo/sandbox" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content="https://mygaragepro.co/demo/sandbox" />
      </Helmet>
      <h1 className="sr-only">GaragePro interactive invoicing demo</h1>
      <SandboxProvider>
        <SandboxShell />
      </SandboxProvider>
    </>
  );
};

export default Demo;