import React from 'react';

const THRESHOLD_PIXELS = 450;

export function useIsSmallScreen() {
  const [isSmallScreen, setIsSmallScreen] = React.useState(() => {
    return (window.top || window).innerWidth < THRESHOLD_PIXELS;
  });

  React.useEffect(() => {
    const topWindow = window.top || window;

    const checkScreenSize = () => {
      setIsSmallScreen(topWindow.innerWidth < THRESHOLD_PIXELS);
    };

    checkScreenSize();

    topWindow.addEventListener('resize', checkScreenSize);

    return () => {
      topWindow.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return { isSmallScreen };
}
