import BirthdayMessage from "@/components/BirthdayMessage";
import Countdown from "@/components/Countdown";
import EventDetails from "@/components/EventDetails";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import InviteProvider from "@/components/InviteProvider";
import MusicToggle from "@/components/MusicToggle";
import Navbar from "@/components/Navbar";
import PickleballSection from "@/components/PickleballSection";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <InviteProvider>
      <Navbar />
      <main>
        <Hero />
        <EventDetails />
        <Countdown />
        <PickleballSection />
        <Timeline />
        <BirthdayMessage />
      </main>
      <Footer />
      <MusicToggle />
    </InviteProvider>
  );
}
