import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

/**
 * A wrapper component for integrating AOS library for animation effects
 * @param {Object} props - The component props
 * @param {Array} props.children - The child components to be wrapped
 * @return {JSX.Element} - The wrapped components with AOS animation effects
 */
const AosWrapper = ({ children }) => {
  useEffect(() => {
    // Initialize AOS with custom options
    AOS.init({
      duration: 1000, // duration of animation
      easing: 'ease-out', // animation easing type
      offset: 50, // offset (in px) from the original trigger point
      once: true, // animation occurs only once
      mirror: false, // whether elements should animate out while scrolling past them in reverse
    });
    // Refresh AOS after initializing
    AOS.refresh();
  }, []);

  // Render the wrapped components with AOS animation effects
  return <div data-aos="fade-up">{children}</div>;
};

export default AosWrapper;
