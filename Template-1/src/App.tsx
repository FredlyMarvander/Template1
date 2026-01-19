import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CoupleSection from "./components/CoupleSection";

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <CoupleSection />
    </>
  );
}

export default App;
