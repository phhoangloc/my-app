import type { Metadata } from "next";
import "../style/globals.css"
import { Public_Sans, Noto_Serif } from 'next/font/google'
import Layout from "../component/layout/layout";
import Provider from "../redux/component/provider";

const publicSans = Public_Sans({
  variable: '--font-public-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
})

const notoSerif = Noto_Serif({
  variable: '--font-noto-serif',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: process.env.name,
  description: process.env.description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${publicSans.className} ${notoSerif.className} bg-one text-five`}
      >
        <Provider>
          <Layout>
            {children}
          </Layout>
        </Provider>
      </body>
    </html>
  );
}
