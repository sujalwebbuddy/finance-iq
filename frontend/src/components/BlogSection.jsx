import React from 'react';
import BlogHeader from './blog/BlogHeader';
import FeaturedBlogPost from './blog/FeaturedBlogPost';

const BlogSection = () => {
  return (
    <section className="py-24 px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <BlogHeader />
        <FeaturedBlogPost />
      </div>
    </section>
  );
};

export default BlogSection;

