import { Poppins, Roboto } from "next/font/google";
import Header from "../shared/widgets/header";
import "./global.css";
import Providers from "./providers";

export const metadata = {
  title: "NexBuy",
  description:
    "Discover the future of shopping with NexBuy. From everyday essentials to trending gadgets, we bring you everything you need at your fingertips.",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${poppins.variable}`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
