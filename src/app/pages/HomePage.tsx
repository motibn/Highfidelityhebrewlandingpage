import React, { Suspense, lazy, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { HOME_SEO, setPageSEO } from '../utils/seo';

const VideoStory = lazy(() => import('../components/VideoStory').then(module => ({ default: module.VideoStory })));
const Testimonials = lazy(() => import('../components/Testimonials').then(module => ({ default: module.Testimonials })));
const WhyNow = lazy(() => import('../components/WhyNow').then(module => ({ default: module.WhyNow })));
const Stats = lazy(() => import('../components/Stats').then(module => ({ default: module.Stats })));
const Process = lazy(() => import('../components/Process').then(module => ({ default: module.Process })));
const FAQ = lazy(() => import('../components/FAQ').then(module => ({ default: module.FAQ })));
const ContactForm = lazy(() => import('../components/ContactForm').then(module => ({ default: module.ContactForm })));

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
      <Suspense fallback={<div style={{ minHeight: '200px' }} aria-hidden="true" />}>
        <VideoStory />
        <Testimonials />
        <WhyNow />
        <Stats />
        <Process />
        <FAQ />
        <ContactForm />
      </Suspense>
    </>
  );
}
