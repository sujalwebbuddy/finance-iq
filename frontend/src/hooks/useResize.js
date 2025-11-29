import React, { useState, useEffect } from 'react';

const useResize = (breakpoint = 768) => {
  const [isBelowBreakpoint, setIsBelowBreakpoint] = useState(
    window.innerWidth < breakpoint
  );

  useEffect(() => {
    const handleResize = () => {
      setIsBelowBreakpoint(window.innerWidth < breakpoint);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isBelowBreakpoint;
};

export default useResize;

