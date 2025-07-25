import type { Metadata } from "next";
import "@/styles/globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Pusat Karir FTI UNSAP",
  description: "Made with love by @ipsusoedra and @ilham5x",
  icons: {
    icon: "/logofti.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-jakarta bg-background-primary   
        `}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
