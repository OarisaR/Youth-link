import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Footer from "../components/Footer";

function MainPage() {
  return (
    <>
      <NavBar />
      <Home />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
export default MainPage;