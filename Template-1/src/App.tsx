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

function App() {
  return (
    <>
      <Navbar />
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
