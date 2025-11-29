import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { getPages } from "@/lib/storage";
import { getSettings } from "@/lib/settings";
import LayoutWrapper from "./components/LayoutWrapper";

const inter = Inter({ subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Develi Derneği",
  description: "Develi Derneği Resmi Web Sitesi",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pages = await getPages();
  const settings = await getSettings();

  const publicLayout = (
    <>
      <nav className="navbar">
        <div className="container navbar-container">
          <div className="navbar-left">
            {settings.logoUrl ? (
              <Link href="/" className="logo-image-link">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={settings.logoUrl} alt="Develi Derneği Logo" className="logo-image" />
              </Link>
            ) : (
              <Link href="/" className="logo">Develi Derneği</Link>
            )}
          </div>

          <div className="navbar-center">
            <ul className={`nav-links ${openSans.className}`}>
              {pages.sort((a, b) => a.order - b.order).map((page) => (
                <li key={page.id}>
                  <Link href={`/${page.slug === 'home' ? '' : page.slug}`}>
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="navbar-right">
            {/* Placeholder for future right-aligned items if needed */}
          </div>
        </div>
      </nav>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h3>İletişim</h3>
            <div className="footer-info">
              <p>
                <strong>Adres:</strong><br />
                Caferağa, Albay Faik Sözdener Cd. No:21,<br />
                34710 Kadıköy/İstanbul
              </p>
              <p>
                <strong>Telefon:</strong><br />
                (0216) 346 79 93
              </p>
            </div>
          </div>

          <div className="footer-column">
            <h3>Hızlı Erişim</h3>
            <nav className="footer-nav">
              <Link href="/">Anasayfa</Link>
              {pages.sort((a, b) => a.order - b.order).map((page) => (
                <Link key={page.id} href={`/${page.slug === 'home' ? '' : page.slug}`}>
                  {page.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Tüm hakları saklıdır 2025 Develi Derneği</p>
        </div>
      </footer>
    </>
  );

  return (
    <html lang="tr">
      <body className={inter.className}>
        <LayoutWrapper publicLayout={publicLayout}>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
