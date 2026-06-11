import Opening from "@/components/scenes/Opening";
import Philosophy from "@/components/scenes/Philosophy";
import Craft from "@/components/scenes/Craft";
import Work from "@/components/scenes/Work";
import Experiments from "@/components/scenes/Experiments";
import Timeline from "@/components/scenes/Timeline";
import Contact from "@/components/scenes/Contact";

export default function Home() {
  return (
    <main id="main">
      <Opening />
      <Philosophy />
      <Craft />
      <Work />
      <Experiments />
      <Timeline />
      <Contact />
    </main>
  );
}
