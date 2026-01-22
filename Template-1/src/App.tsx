import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CoupleSection from "./components/CoupleSection";
import LocationSection from "./components/LocationSection";

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <CoupleSection />
      <LocationSection />
      <div className="h-96"></div>
    </>
  );
}

export default App;
