import React, { useEffect } from 'react';
import { Hero } from '../components/Hero';
import { VideoStory } from '../components/VideoStory';
import { Testimonials } from '../components/Testimonials';
import { WhyNow } from '../components/WhyNow';
import { Stats } from '../components/Stats';
import { Process } from '../components/Process';
import { ContactForm } from '../components/ContactForm';
import { HOME_SEO, setPageSEO } from '../utils/seo';

export function HomePage() {
  useEffect(() => {
    setPageSEO(HOME_SEO);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    window.setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }, []);

  return (
    <>
      <Hero />
      <VideoStory />
      <Testimonials />
      <WhyNow />
      <Stats />
      <Process />
      <ContactForm />
    </>
  );
}
