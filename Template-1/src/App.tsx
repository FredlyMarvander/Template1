import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CoupleSection from "./components/CoupleSection";
import LocationSection from "./components/LocationSection";
import ScrollUp from "./components/ScrollUp";
import OurStory from "./components/OurStory";
import Relative from "./components/Relative";
import Gallery from "./components/Gallery";
import LocationDetail from "./components/LocationDetail";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import WelcomePopup from "./components/Welcome";

function App() {
  return (
    <>
      <WelcomePopup
        onOpen={() => {
          // Optional: trigger music player saat popup dibuka
          console.log("Undangan dibuka!");
        }}
      />
      <Navbar />
      <MusicPlayer />
      <ScrollUp />
      <HeroSection />
      <CoupleSection />
      <LocationSection />
      <OurStory />
      <Relative />
      <Gallery />
      <LocationDetail />
      <Footer />
    </>
  );
}

export default App;
