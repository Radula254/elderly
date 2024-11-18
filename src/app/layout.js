import { Roboto } from "next/font/google";
import "./globals.css";
import AppProvider from "../components/AppContext.js";
import { Toaster } from "react-hot-toast";
import Header from "@/components/layout/Header";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "ElderElevation",
  description: "Better Social Network for senior citizens",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main>
          <AppProvider>
            <Toaster />
            <Header />
            {children}
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
