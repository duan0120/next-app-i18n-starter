import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { WebSite } from "schema-dts";
import { jsonLdScriptProps } from "react-schemaorg";


export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return (
    <>
      <head>
        <script
          {...jsonLdScriptProps<WebSite>({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: t("title"),
            description: t("description"),
            url: "https://www.devutils.top",
            inLanguage: locale,
          })}
        />
      </head>
      {children}
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://www.devutils.top`,
      siteName: "DevUtils",
      images: [
        {
          url: "https://www.devutils.top/og-image.png",
          width: 1024,
          height: 1024,
        },
      ],
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["https://www.devutils.top/og-image.png"],
    },
    alternates: {
      canonical: `https://www.devutils.top`,
      languages: {
        en: "https://www.devutils.top/en",
        zh: "https://www.devutils.top/zh",
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
