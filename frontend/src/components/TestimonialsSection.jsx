import React, { useState, useEffect, useRef } from 'react';
import TestimonialCard from './testimonials/TestimonialCard';
import TestimonialNavigation from './testimonials/TestimonialNavigation';
import useResize from '../hooks/useResize';
import { APP_NAME } from '../config/app';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useResize(768);
  const isDesktop = !isMobile;
  const scrollContainerRef = useRef(null);

  const testimonials = [
    {
      quote: `"${APP_NAME} really helps me to manage my finances. So that now my finances are well managed without any excess expenses. I highly recommend this! I am very satisfied."`,
      name: 'Doni Sarmoyo',
      title: 'Finance Manager at YouTube',
      avatar: null,
    },
    {
      quote: `"Since using ${APP_NAME}, my spending has become more structured and less messy. So no more wastage. This is very helpful. I am very grateful with ${APP_NAME}!"`,
      name: 'Aliani Melani',
      title: 'Finance Manager at Spotify',
      avatar: null,
    },
    {
      quote: `"${APP_NAME} has transformed how I track my expenses. The AI-powered insights help me make better financial decisions every day. Highly recommended!"`,
      name: 'Sarah Johnson',
      title: 'Financial Analyst at Microsoft',
      avatar: null,
    },
    {
      quote: `"Managing budgets has never been easier. ${APP_NAME} provides clear visibility into my spending patterns and helps me stay on track with my financial goals."`,
      name: 'Michael Chen',
      title: 'CFO at TechStart Inc',
      avatar: null,
    },
  ];

  const handleScroll = () => {
    if (isMobile && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < testimonials.length) {
        setCurrentIndex(newIndex);
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    const maxIndex = isDesktop ? testimonials.length - 2 : testimonials.length - 1;
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const maxIndex = isDesktop ? testimonials.length - 2 : testimonials.length - 1;

  useEffect(() => {
    if (isMobile && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.offsetWidth;
      container.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth',
      });
    }
  }, [currentIndex, isMobile]);

  return (
    <section className="py-20 px-6 lg:px-8 bg-gray-800 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-12">
          <div className="flex-1">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4">
              Why they love {APP_NAME}
            </h2>
            <p className="text-base lg:text-lg text-white opacity-90">
              These are the words of those who have managed their finances and expenses.
            </p>
          </div>
          
          <div className="hidden md:flex flex-shrink-0 sm:self-start">
            <TestimonialNavigation
              onPrevious={handlePrevious}
              onNext={handleNext}
              currentIndex={currentIndex}
              total={testimonials.length}
              maxIndex={maxIndex}
            />
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            ref={scrollContainerRef}
            className={`flex gap-4 transition-transform duration-500 ease-in-out ${
              isDesktop ? '' : 'overflow-x-auto snap-x snap-mandatory scrollbar-hide'
            }`}
            style={{
              transform: isDesktop ? `translateX(-${currentIndex * 50}%)` : 'none',
            }}
            onScroll={handleScroll}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`flex-shrink-0 ${isDesktop ? 'w-1/2' : 'w-full snap-start'} ${
                  isDesktop && index < testimonials.length - 1 ? 'pr-4 lg:pr-8' : ''
                }`}
              >
                <TestimonialCard
                  quote={testimonial.quote}
                  name={testimonial.name}
                  title={testimonial.title}
                  avatar={testimonial.avatar}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
