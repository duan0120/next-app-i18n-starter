import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "next/image";
export default function Footer() {
  const f = useTranslations("Footer");
  const t = useTranslations("Header");

  return (
    <footer className="container mx-auto px-4 border-t">
      <div className="flex justify-between px-4 py-4">
        <div className="w-full max-w-52 lg:max-w-96">
          <div className="flex items-center gap-x-2">
            <Image src="/imgs/logo.svg" alt="logo" width={32} height={32} className="h-8" />
            <h2 className="text-xl font-bold">{t("title")}</h2>
          </div>
          <div className="flex flex-wrap mt-6">
            {f("description")}
          </div>
          <div className="flex items-center gap-x-4 mt-6">
            <Link href="https://github.com/0120" target="_blank">
              <Image src="/imgs/github.svg" alt="github" width={24} height={24} />
            </Link>
            <Link href="https://x.com/duanhjlt" target="_blank">
              <Image src="/imgs/x.svg" alt="x" width={24} height={24} />
            </Link>
            <Link href="https://t.me/duanhjlt" target="_blank">
              <Image src="/imgs/telgram.svg" alt="telgram" width={24} height={24} />
            </Link>
            <Link href="mailto:support@devutils.top" target="_blank">
              <Image src="/imgs/mail.svg" alt="mail" width={24} height={24} />
            </Link>
          </div>
        </div>
        <div>
          <p className="mb-6 font-bold">{f("about")}</p>
          <ul className="mb-4">
            <li className="mt-2">
              <Link className="text-blue-500 hover:underline" href="/privacy">{f("privacy")}</Link>
            </li>
            <li className="mt-2">
              <Link className="text-blue-500 hover:underline" href="/terms">{f("terms")}</Link>
            </li>
            <li className="mt-2">
              <Link className="text-blue-500 hover:underline" href="/contact">{f("contact")}</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-6 font-bold">{f("FrendlyLinks")}</p>
          <ul className="mb-4">
            <li className="mt-2">
              <Link className="text-blue-500 hover:underline" href="https://www.memora.top" target="_blank">Memora</Link>
            </li>
            <li className="mt-2">
              <Link className="text-blue-500 hover:underline" href="https://www.crazykids.tech" target="_blank">CrazyKids</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex gap-2 py-6 w-full shrink-0 items-center px-4 md:px-6 justify-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} {f("copyright")}
        </p>
      </div>
    </footer>
  )
}
