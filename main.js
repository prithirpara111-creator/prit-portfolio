/**
 * PRIT HIRPARA - PORTFOLIO INTERACTION LOGIC
 * High-performance, zero-dependency vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. DOM Element References
  // --------------------------------------------------------------------------
  const header = document.getElementById('header');
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const contactForm = document.getElementById('contact-form');
  const backToTopBtn = document.getElementById('back-to-top');
  const projectModal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBodyContent = document.getElementById('modal-body-content');
  const modalTriggers = document.querySelectorAll('.project-modal-trigger');

  // --------------------------------------------------------------------------
  // 2. Project Data Dictionary (For Deep-Dive Modals)
  // --------------------------------------------------------------------------
  const projectsData = {
    hospital: {
      category: 'Full-Stack Healthcare System',
      title: 'Hospital Appointment Management System',
      description: 'A comprehensive medical appointment scheduling platform that automates doctor availability, patient booking, and outpatient department administration.',
      problemStatement: 'Manual queueing and fragmented paper logs led to double-bookings, prolonged patient wait times, and miscommunication between doctors and clinic desks.',
      solutionArchitecture: 'Designed a 3-tier web architecture with secure PHP backend session authentication and a 3rd Normal Form (3NF) MySQL relational database.',
      technologies: ['PHP', 'MySQL', 'JavaScript (ES6)', 'HTML5', 'CSS3 (Flexbox/Grid)', 'Apache / XAMPP'],
      databaseSchema: [
        { table: 'tbl_doctors', purpose: 'Stores doctor profile, specialization, department ID, and consultation fee.' },
        { table: 'tbl_patients', purpose: 'Manages patient demographics, contact info, and medical case history references.' },
        { table: 'tbl_schedules', purpose: 'Defines available day/time slots, doctor shift timings, and maximum capacity.' },
        { table: 'tbl_appointments', purpose: 'Tracks booking status (Pending, Confirmed, Cancelled, Completed) with foreign keys.' }
      ],
      keyHighlights: [
        'Real-time collision prevention preventing multiple bookings for identical timeslots.',
        'Patient dashboard for viewing past visits, booking new consults, and cancellation alerts.',
        'Administrative dashboard to manage doctor rosters and daily clinic capacity.'
      ]
    },
    society: {
      category: 'Residential Automation & Grievance Portal',
      title: 'Society Complaint Management System',
      description: 'An automated complaint ticketing and management portal for residential housing societies, promoting accountability between committee members and residents.',
      problemStatement: 'Residents faced dropped maintenance requests, verbal disputes regarding pending repairs, and zero transparency into task ownership.',
      solutionArchitecture: 'Implemented a state-machine complaint lifecycle with categorized ticketing, automated status progressions, and an audit trail.',
      technologies: ['PHP / Python', 'MySQL', 'JavaScript', 'HTML5', 'CSS3', 'XAMPP / Apache'],
      databaseSchema: [
        { table: 'tbl_residents', purpose: 'Stores flat number, resident credentials, contact information, and wing details.' },
        { table: 'tbl_categories', purpose: 'Categorizes grievances into Plumbing, Electrical, Security, Elevator, and Sanitation.' },
        { table: 'tbl_complaints', purpose: 'Core ticketing entity recording description, urgency priority, and current state.' },
        { table: 'tbl_resolution_logs', purpose: 'Historical audit trail recording admin remarks, resolution timestamp, and technician assigned.' }
      ],
      keyHighlights: [
        'Dynamic priority escalation algorithm highlighting high-urgency maintenance issues.',
        'Real-time progress tracker enabling residents to follow ticket status from review to closure.',
        'Historical reporting module for monthly committee meetings and society audits.'
      ]
    }
  };

  // --------------------------------------------------------------------------
  // 3. Header Elevation & Active Section ScrollSpy
  // --------------------------------------------------------------------------
  const handleScroll = () => {
    const scrollY = window.pageYOffset;

    // Header shadow toggle
    if (scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // ScrollSpy active link detection
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (matchingLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          matchingLink.classList.add('active');
        } else {
          matchingLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --------------------------------------------------------------------------
  // 4. Mobile Navigation Drawer Toggle
  // --------------------------------------------------------------------------
  const toggleMobileMenu = () => {
    const isOpen = navMenu.classList.contains('open');
    if (isOpen) {
      navMenu.classList.remove('open');
      navToggle.classList.remove('active');
      mobileOverlay.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      navMenu.classList.add('open');
      navToggle.classList.add('active');
      mobileOverlay.classList.add('active');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  };

  navToggle.addEventListener('click', toggleMobileMenu);
  mobileOverlay.addEventListener('click', toggleMobileMenu);

  // Close mobile drawer when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  });

  // --------------------------------------------------------------------------
  // 5. Toast Notification Utility
  // --------------------------------------------------------------------------
  let toastTimer = null;
  const showToast = (message) => {
    if (toastTimer) clearTimeout(toastTimer);
    toastMessage.textContent = message;
    toast.classList.add('show');
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  };

  // --------------------------------------------------------------------------
  // 6. Copy-To-Clipboard Email Feature
  // --------------------------------------------------------------------------
  const copyChipBtn = document.getElementById('copy-chip-btn');
  const copyEmailToClipboard = async () => {
    const emailElem = document.getElementById('user-email-text');
    const emailText = emailElem ? emailElem.textContent.trim() : 'prithirpara111@gmail.com';
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(emailText);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = emailText;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      showToast('Email address copied to clipboard!');
    } catch (err) {
      showToast('Direct email: ' + emailText);
    }
  };

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', (e) => {
      // If clicking the mailto link directly, allow standard link navigation
      if (e.target.closest('#user-email-text') || e.target.closest('.method-icon')) {
        return;
      }
      copyEmailToClipboard();
    });
  }

  if (copyChipBtn) {
    copyChipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      copyEmailToClipboard();
    });
  }

  // --------------------------------------------------------------------------
  // 7. Interactive Contact Form Submission Handler
  // --------------------------------------------------------------------------
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById('form-submit-btn');
      const originalBtnHTML = submitBtn.innerHTML;

      // Button processing state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span>Sending Message...</span>
        <svg class="spin-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
        showToast('Thank you! Your message has been sent successfully.');
        contactForm.reset();
      }, 1200);
    });
  }

  // --------------------------------------------------------------------------
  // 8. Project Detail Modal Handler
  // --------------------------------------------------------------------------
  const openProjectModal = (projectId) => {
    const data = projectsData[projectId];
    if (!data) return;

    modalBodyContent.innerHTML = `
      <div class="modal-header-pill">${data.category}</div>
      <h3 class="modal-title">${data.title}</h3>
      <p class="modal-desc">${data.description}</p>

      <div class="project-insight-box">
        <div class="insight-row">
          <span class="insight-label">Problem:</span>
          <span class="insight-text">${data.problemStatement}</span>
        </div>
        <div class="insight-row">
          <span class="insight-label">Architecture:</span>
          <span class="insight-text">${data.solutionArchitecture}</span>
        </div>
      </div>

      <h4 class="modal-section-title">Relational Database Entities & Schema:</h4>
      <div class="modal-db-grid">
        ${data.databaseSchema.map(item => `
          <div class="modal-db-item">
            <span class="modal-db-table">${item.table}</span>
            <span class="modal-db-purpose">${item.purpose}</span>
          </div>
        `).join('')}
      </div>

      <h4 class="modal-section-title">Key Engineering Accomplishments:</h4>
      <ul class="features-checklist" style="margin-bottom: 1.5rem;">
        ${data.keyHighlights.map(highlight => `
          <li>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6600" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>${highlight}</span>
          </li>
        `).join('')}
      </ul>

      <div class="modal-section-title">Technologies Used:</div>
      <div class="project-tech-tags" style="margin-top: 0.5rem;">
        ${data.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
      </div>
    `;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const projectId = trigger.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // --------------------------------------------------------------------------
  // 9. Back To Top Smooth Scroll
  // --------------------------------------------------------------------------
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 10. Scroll-Triggered Reveal Animations (IntersectionObserver)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-fade-up');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    revealElements.forEach(el => el.classList.add('revealed'));
  }

});
