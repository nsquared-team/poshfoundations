(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const slides = Array.from(document.querySelectorAll('section > article'));
  let currentIndex = -1;

  if (slides.length < 1) {
    return;
  }

  const navContainer = document.createElement('nav');
  navContainer.setAttribute('aria-label', 'Slide navigation');
  navContainer.style.position = 'fixed';
  navContainer.style.bottom = '1.5rem';
  navContainer.style.right = '1.5rem';
  navContainer.style.zIndex = '999';
  navContainer.style.display = 'flex';
  navContainer.style.gap = '0.5rem';

  const backButton = document.createElement('button');
  backButton.textContent = 'Back';

  const nextButton = document.createElement('button');
  nextButton.textContent = 'Next';

  const topButton = document.createElement('button');
  topButton.textContent = 'Top';

  navContainer.appendChild(topButton);
  navContainer.appendChild(backButton);
  navContainer.appendChild(nextButton);
  document.body.appendChild(navContainer);

  function scrollToSlide(index) {
    if (index >= 0 && index < slides.length) {
      slides[index].scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
      currentIndex = index;
    }
  }

  backButton.addEventListener('click', () => scrollToSlide(currentIndex - 1));
  nextButton.addEventListener('click', () => scrollToSlide(currentIndex + 1));

  topButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
    currentIndex = 0; // Reset currentIndex so Next/Back work correctly after jumping to top
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        currentIndex = slides.indexOf(entry.target);
      }
    });
  }, { threshold: 0.6 });

  slides.forEach(slide => observer.observe(slide));
})();