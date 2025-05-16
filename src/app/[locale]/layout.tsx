import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { jsonLdScriptProps } from "react-schemaorg";
import { WebSite } from "schema-dts";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Metadata" });
  return (
    <html lang={locale} dir="ltr" suppressHydrationWarning>
      <head>
        <link
          rel="canonical"
          href={`https://www.devutils.top`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://www.devutils.top"
        />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://www.devutils.top"
        />
        <link
          rel="alternate"
          hrefLang="zh"
          href="https://www.devutils.top/zh"
        />
        <meta name="keywords" content={t("keywords")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow"></meta>
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <Header />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

const locales = ["en", "zh"] as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const o = await getTranslations({ locale, namespace: "OrgCard" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    other: {
      "google-site-verification": "********",
    },
    openGraph: {
      title: o("title"),
      description: o("description"),
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
      title: o("title"),
      description: o("description"),
      images: ["https://www.devutils.top/og-image.png"],
    },
    alternates: {
      canonical: `https://www.devutils.top`,
      languages: {
        en: "https://www.devutils.top",
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
