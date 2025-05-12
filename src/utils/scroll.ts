export const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Get the navbar height for offset
  const navbar = document.querySelector('nav');
  const offset = navbar ? navbar.offsetHeight : 0;

  // Check if native smooth scrolling is supported
  if ('scrollBehavior' in document.documentElement.style) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  } else {
    // Fallback smooth scrolling for browsers that don't support scrollBehavior
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800; // milliseconds
    let start: number | null = null;

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);

      window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }
};

// Enhanced easing function for smoother animation
const easeInOutCubic = (t: number): number => {
  return t < 0.5 
    ? 4 * t * t * t 
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

// Detect if the browser supports smooth scrolling
export const supportsNativeSmoothScroll = () => {
  return 'scrollBehavior' in document.documentElement.style;
};

// Handle smooth scroll for all anchor links
export const initSmoothScroll = () => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a[href^="#"]');
    
    if (anchor) {
      e.preventDefault();
      const id = anchor.getAttribute('href')?.slice(1);
      if (id) {
        scrollToElement(id);
      }
    }
  });
};