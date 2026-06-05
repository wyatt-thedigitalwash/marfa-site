import HeroStack from "@/components/HeroStack";
import FilmReel from "@/components/FilmReel";
import About from "@/components/About";
import TourPreview from "@/components/TourPreview";
import Signup from "@/components/Signup";

export default function Home() {
  return (
    <>
      <HeroStack />

      {/* Breath */}
      <section
        className="py-20 md:py-32"
        style={{ backgroundColor: "var(--color-cream)" }}
        aria-hidden="true"
      />

      <FilmReel />
      <About />
      <TourPreview />
      <Signup />
    </>
  );
}
