import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import { ModeToggle } from "./ModeToggle";

export default function Header() {
  const t = useTranslations("Header");
  return <header className="sticky top-0 z-50 w-full border-b border-border/60 backdrop-blur bg-background/95">
    <div className="mx-auto flex items-center justify-between h-14 px-6">
      <div className="mr-4 flex">
        <Link href="/" className="text-lg font-medium mr-16">
          <div className="flex items-center gap-x-2 cursor-pointer">
            <Image src="/imgs/logo.svg" alt="logo" width={32} height={32}  className="h-8" />
            <h1 className="text-xl font-bold">{t("title")}</h1>
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-4 sm:gap-6">
        <LanguageSwitcher />
        <ModeToggle />
      </div>
    </div>
  </header>
}
