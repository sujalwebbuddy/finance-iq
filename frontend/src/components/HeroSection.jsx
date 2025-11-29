import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import DashboardMockup from './DashboardMockup';
import ArrowRightIcon from './icons/ArrowRightIcon';
import PlayIcon from './icons/PlayIcon';

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <section className="py-16 lg:py-24 px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="text-center lg:text-left">
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white leading-[1.1] mb-6">
              Manage spending money{' '}
              <span className="bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                effectively
              </span>{' '}
              and{' '}
              <span className="bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                efficiently
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Don&apos;t let your money get out of control and run out because your
              expenses are not properly monitored.
            </p>

            {/* Explore Features Link */}
            <div className="flex justify-center lg:justify-start mb-6">
              <Link
                to={user ? '/dashboard' : '/register'}
                className="flex items-center gap-2 text-gray-900 dark:text-white text-lg font-semibold hover:opacity-80 transition-opacity underline underline-offset-4 decoration-gray-900 dark:decoration-white"
              >
                Explore Features
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </div>

            {/* CTA Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
              {/* Social Proof Card */}
              <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-lg">
                {/* Teal dot */}
                <div className="w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400 flex-shrink-0" />
                
                {/* Text */}
                <span className="text-base font-semibold text-gray-900 dark:text-white">
                  7.2M+ Users
                </span>
                
                {/* Profile Avatars */}
                <div className="flex -space-x-2 ml-1">
                  <div className="w-8 h-8 rounded-full bg-green-200 border-2 border-white dark:border-gray-800" />
                  <div className="w-8 h-8 rounded-full bg-purple-200 border-2 border-white dark:border-gray-800" />
                  <div className="w-8 h-8 rounded-full bg-blue-200 border-2 border-white dark:border-gray-800" />
                </div>
              </div>

              {/* How it works Button */}
              <button className="flex items-center gap-2 bg-gray-900 dark:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors">
                {/* Teal Play Icon (circle with triangle) */}
                <div className="w-6 h-6 rounded-full bg-teal-500 dark:bg-teal-400 flex items-center justify-center flex-shrink-0">
                  <PlayIcon className="h-3 w-3 text-white ml-0.5" />
                </div>
                How it works
              </button>
            </div>
          </div>

          {/* Right Side - Dashboard Mockup */}
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

