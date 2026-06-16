'use client';
import dynamic from 'next/dynamic';
import Navbar from '../Navbar/Navbar';
import Hero from '../Hero/Hero';
import Footer from '../Footer/Footer';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import CursorGlow from '../CursorGlow/CursorGlow';

const About = dynamic(() => import('../About/About'));
const Skills = dynamic(() => import('../Skills/Skills'));
const Projects = dynamic(() => import('../Projects/Projects'));
const Contact = dynamic(() => import('../Contact/Contact'));

export default function HomePage() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
