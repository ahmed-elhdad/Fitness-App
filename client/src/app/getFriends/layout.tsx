import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Fitness Tracker|Get Your Friend",
  description:
    "Get Your First Friend,You Can Add Your Friend Here,Start Chalanges With Them And Coicte Your Fitness Journey Together And Score",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="bg-gray-100 min-h-screen flex flex-col justify-content-between">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </body>
  );
}
