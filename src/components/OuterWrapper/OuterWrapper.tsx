import React from 'react';
import ScrollToTop from '../../ScrollToTop';
import Navbar from '../Navbar/Navbar';
import Chatbot from '../Chatbot/Chatbot';

const OuterWrapper = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Chatbot />
    </>
  );
};

export default OuterWrapper;
