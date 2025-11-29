import React from 'react';
import ArrowUpRightIcon from '../icons/ArrowUpRightIcon';

const FeaturedBlogPost = () => {
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-xl">
      <div
        className="relative h-[450px] lg:h-[550px] xl:h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder-blog-image.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        <div className="absolute top-8 right-8 z-10">
          <button className="px-6 py-3 bg-black text-white font-bold text-sm tracking-wider rounded-full hover:bg-gray-800 transition-colors flex items-center gap-3 group">
            <span>EXPLORE</span>
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center flex-shrink-0 group-hover:bg-gray-100 transition-colors">
              <ArrowUpRightIcon className="h-5 w-5" />
            </div>
          </button>
        </div>

        <div className="absolute bottom-8 left-8 right-8 lg:right-auto lg:max-w-lg z-10">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-[1.2] tracking-tight">
              Tips : "Vacationing can be peaceful with money managed"
            </h3>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0 overflow-hidden ring-2 ring-white dark:ring-gray-700">
                  <img
                    src="/placeholder-avatar.jpg"
                    alt="Lala syafarla"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-base mb-0.5">
                    Lala syafarla
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Copy Writer Omula
                  </div>
                </div>
              </div>
              
              <button className="w-12 h-12 rounded-full border-2 border-gray-900 dark:border-gray-100 bg-white dark:bg-gray-800 text-gray-900 dark:text-white flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-lg">
                <ArrowUpRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogPost;

