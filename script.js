document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for anchor links
  const smoothScroll = (target) => {
    target.scrollIntoView({ behavior: 'smooth' });
  };

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScroll(document.querySelector(anchor.getAttribute('href')));
    });
  });

  // Add hover animation to features
  const features = document.getElementsByClassName('feature');
  
  features.forEach(feature => {
    feature.addEventListener('mouseenter', () => {
      feature.style.transform = 'translateY(-5px)';
      feature.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    feature.addEventListener('mouseleave', () => {
      feature.style.transform = 'translateY(0)';
    });
  });

  // Update the download button click tracking to work with multiple buttons
  const downloadLinks = document.getElementsByClassName('download-link');
  downloadLinks.forEach(button => {
    button.addEventListener('click', (e) => {
      // Add click effect
      button.style.transform = 'scale(0.98)';
      setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 100);
      
      // Log download event
      console.log('Download started:', button.textContent.trim());
    });
  });

  // Add intersection observer for fade-in animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });

  // Observe features
  features.forEach(feature => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateY(20px)';
    feature.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(feature);
  });

  // Add FAQ accordion functionality
  function toggleFAQ(item) {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = question.querySelector('i');
    
    // Close other open items
    document.querySelectorAll('.faq-item').forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.querySelector('.faq-answer').style.maxHeight = null;
        otherItem.querySelector('.faq-question i').className = 'fas fa-plus';
      }
    });
    
    // Toggle current item
    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
      icon.className = 'fas fa-plus';
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
      icon.className = 'fas fa-minus';
    }
  }

  document.addEventListener('click', (e) => {
    if (e.target.matches('.faq-question')) {
      toggleFAQ(e.target.closest('.faq-item'));
    }
  });

  // Slider functionality
  const slider = {
    currentSlide: 0,
    slides: document.querySelectorAll('.slide'),
    slidesContainer: document.querySelector('.slides'),
    dots: document.querySelectorAll('.dot'),
    
    init() {
      this.updateSlider();
      
      // Previous button
      document.querySelector('.prev-button').addEventListener('click', () => {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateSlider();
      });
      
      // Next button
      document.querySelector('.next-button').addEventListener('click', () => {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlider();
      });
      
      // Dot navigation
      this.dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          this.currentSlide = index;
          this.updateSlider();
        });
      });

      // Auto advance slides
      setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlider();
      }, 5000);
    },
    
    updateSlider() {
      this.slidesContainer.style.transform = `translateX(-${this.currentSlide * 100}%)`;
      
      // Update dots
      this.dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === this.currentSlide);
      });
    }
  };

  slider.init();
});