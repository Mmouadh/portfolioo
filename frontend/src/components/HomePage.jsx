import React from "react";
import HeroCTA from "./HeroCTA";
import AboutExperience from "./AboutExperience";
import Skills from "./Skills";
import ProjectsHome from "./ProjectsHome";
import ContactPopup from "./ContactPopup";
import TechLoop from "./TechLoop";
import Testimonials from "./Testimonials";

function HomePage() {
  return (
    <>
      <HeroCTA />
      <AboutExperience />
      <ProjectsHome />
      <Skills />
      <ContactPopup />
      <TechLoop />
      <Testimonials />
    </>
  );
}

export default HomePage;
