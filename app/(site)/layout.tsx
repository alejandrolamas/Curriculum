import { ReactNode } from "react";
import { Cursor } from "@/components/site/Cursor";
import { Nav } from "@/components/site/Nav";
import { AnalyticsInjector } from "@/components/site/AnalyticsInjector";
import { getSettings } from "@/lib/settings";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const settings = await getSettings().catch(() => ({ analyticsCode: "" }));

  return (
    <div className="noise">
      <Cursor />
      <Nav />
      <main>{children}</main>
      {settings.analyticsCode ? (
        <AnalyticsInjector code={settings.analyticsCode} />
      ) : null}
    </div>
  );
}
