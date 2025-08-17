import { Appbar } from "./components/Appbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { Redirect } from "./components/Redirect";

export default function Home() {
  return (
    <main>
      <div className="bg-gradient-to-b from-gray-900 to-gray-800">
        <Appbar />
        <Redirect />
        <Hero />
        <Features />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
