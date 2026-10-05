/**
 * Mohammed Faiz R — Portfolio JavaScript
 * Aesthetic: Apple Minimalist & Dynamic Micro-Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSpotlightEffect();
  initHeaderScrollSpy();
  initMobileMenu();
  initAISimulator();
  initProjectFiltersAndModal();
  initContactForm();
  initClipboardHelpers();
  updateCopyrightYear();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('faiz_portfolio_theme');
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    html.setAttribute('data-theme', 'light');
  } else {
    html.setAttribute('data-theme', 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('faiz_portfolio_theme', newTheme);
      showToast(`Switched to Apple ${newTheme === 'dark' ? 'Dark Pro' : 'Light Pro'} Mode`);
    });
  }
}

/* ==========================================================================
   2. Apple Card Spotlight Specular Highlight
   Tracks mouse coordinates on hover to cast radial illumination on cards
   ========================================================================== */
function initSpotlightEffect() {
  const spotlightCards = document.querySelectorAll('.spotlight-card');
  
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   3. Header Sticky Island & Scroll Spy
   ========================================================================== */
function initHeaderScrollSpy() {
  const header = document.getElementById('site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  // Handle header background shadow on scroll
  const handleScroll = () => {
    if (window.scrollY > 30) {
      header?.classList.add('header-scrolled');
    } else {
      header?.classList.remove('header-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Scroll spy with IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   4. Mobile Menu Drawer
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-cta-wrapper a');

  if (!menuBtn || !drawer) return;

  const toggleDrawer = () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
    } else {
      drawer.classList.add('open');
      menuBtn.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
    }
  };

  menuBtn.addEventListener('click', toggleDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
    });
  });

  // Close drawer if clicking outside
  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') && !drawer.contains(e.target) && !menuBtn.contains(e.target)) {
      drawer.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
    }
  });
}

/* ==========================================================================
   5. Interactive AI Crowd Counting Live Simulator
   Simulates real-time edge telemetry, feed switching & density metrics
   ========================================================================== */
function initAISimulator() {
  const feedButtons = document.querySelectorAll('.feed-pill');
  const liveCountEl = document.getElementById('live-count-display');
  const hudLocation = document.getElementById('hud-location');
  const hudTimestamp = document.getElementById('hud-timestamp');
  const hudDensity = document.getElementById('hud-density');
  const simPeak = document.getElementById('sim-peak');
  const simDwell = document.getElementById('sim-dwell');
  const simProgressBar = document.getElementById('sim-progress-bar');
  const simThresholdPct = document.getElementById('sim-threshold-pct');
  const sparklineBars = document.querySelectorAll('.sparkline-bar');

  if (!liveCountEl) return;

  const feedConfigs = {
    feed1: {
      location: 'Karnataka Main Temple Ingress',
      baseCount: 492,
      peak: '614',
      dwell: '08:14 <small>min</small>',
      density: 'OPTIMAL (42% Capacity)',
      densityClass: 'text-emerald',
      threshold: 65,
      thresholdText: '65% Safe'
    },
    feed2: {
      location: 'Tamil Nadu Inner Sanctum Corridor',
      baseCount: 738,
      peak: '890',
      dwell: '14:20 <small>min</small>',
      density: 'MODERATE (68% Capacity)',
      densityClass: 'text-amber',
      threshold: 82,
      thresholdText: '82% High Flow'
    },
    feed3: {
      location: 'Courtyard Plaza & Assembly Zone',
      baseCount: 312,
      peak: '450',
      dwell: '05:10 <small>min</small>',
      density: 'LOW (24% Capacity)',
      densityClass: 'text-emerald',
      threshold: 38,
      thresholdText: '38% Low Flow'
    }
  };

  let currentFeed = 'feed1';
  let liveCount = feedConfigs[currentFeed].baseCount;

  // Feed Switcher Click Handlers
  feedButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      feedButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      currentFeed = btn.getAttribute('data-feed') || 'feed1';
      const config = feedConfigs[currentFeed];

      // Update HUD & Stats
      if (hudLocation) hudLocation.textContent = config.location;
      if (hudDensity) {
        hudDensity.textContent = config.density;
        hudDensity.className = `hud-val ${config.densityClass}`;
      }
      if (simPeak) simPeak.textContent = config.peak;
      if (simDwell) simDwell.innerHTML = config.dwell;
      if (simProgressBar) simProgressBar.style.width = `${config.threshold}%`;
      if (simThresholdPct) simThresholdPct.textContent = config.thresholdText;

      liveCount = config.baseCount;
      liveCountEl.textContent = liveCount;

      showToast(`Switched feed to: ${config.location}`);
    });
  });

  // Live Jitter Simulation (Update every 2.5s)
  setInterval(() => {
    const config = feedConfigs[currentFeed];
    // Fluctuate count by -4 to +5
    const delta = Math.floor(Math.random() * 10) - 4;
    liveCount = Math.max(50, liveCount + delta);
    liveCountEl.textContent = liveCount;

    // Update real-time timestamp
    if (hudTimestamp) {
      const now = new Date();
      hudTimestamp.textContent = now.toTimeString().split(' ')[0] + ' IST';
    }

    // Sparkline animation
    sparklineBars.forEach((bar, idx) => {
      if (idx !== sparklineBars.length - 1) {
        const randHeight = Math.floor(Math.random() * 55) + 30;
        bar.style.height = `${randHeight}%`;
      }
    });
  }, 2500);
}

/* ==========================================================================
   6. Project Filters & Interactive Keynote Modal
   ========================================================================== */
const projectsData = {
  p1: {
    title: 'AI Crowd Counting System',
    category: 'AI & Computer Vision',
    location: 'Major Temples in Karnataka & Tamil Nadu',
    deliverables: 'Computer Vision &bull; Real-time Video Analytics',
    client: 'Temple Trusts & Pilgrimage Board Authorities',
    image: 'assets/images/ai_crowd_counting.jpg',
    overview: 'Pioneered an edge-deployed computer vision platform leveraging custom convolutional neural networks for large-scale density estimation and pedestrian tracking. Designed to safeguard millions of pilgrims visiting historic temples during major festivals.',
    specifications: [
      'Edge inference computing at 30 FPS with zero cloud dependency during network outages',
      'Continuous density heatmapping with automatic crowd choke-point detection',
      'Integration with public address speakers for automated crowd flow guidance',
      'Over 99.4% counting accuracy validated across day, night, and heavy monsoon downpours'
    ],
    impact: 'Effectively eliminated human stampede risks, enabled temple security staff to preemptively redirect queue lines, and provided real-time command dashboards to police superintendents.'
  },
  p2: {
    title: 'Safe City Surveillance Project',
    category: 'Mega Smart City Surveillance',
    location: 'Bengaluru, Karnataka',
    deliverables: 'Executed 7,000 Cameras Turnkey Design, Implementation & Maintenance',
    client: 'Karnataka Police & Municipal Urban Governance',
    image: 'assets/images/safe_city.jpg',
    overview: 'A flagship national security initiative engineering urban surveillance across 7,000 high-definition camera installations. Encompasses traffic junctions, women-safety hotspots, market zones, and integrated command and control centers (ICCC).',
    specifications: [
      'Turnkey survey, optical path calculation, pole erection, and fiber termination for 7,000 cameras',
      'Integration with unified Police Command and Control room for multi-operator video wall streaming',
      'Automatic Number Plate Recognition (ANPR) and facial identification integration',
      'High-reliability SLA maintenance ensuring 99.8% continuous uptime'
    ],
    impact: 'Dramatically enhanced crime detection rates, reduced emergency response dispatch times to under 7 minutes, and established Bengaluru as one of India’s premier smart, secure cities.'
  },
  p3: {
    title: 'CSITMS City Surveillance System',
    category: 'Integrated City Security & ICCC',
    location: 'Bagalkot District, Karnataka',
    deliverables: 'District-wide Surveillance Infrastructure & Centralized Command',
    client: 'Bagalkot District Administration & Police Department',
    image: 'assets/images/csitms_bagalkot.jpg',
    overview: 'Designed and deployed the Comprehensive City Surveillance and Intelligent Traffic Management System (CSITMS), establishing district-wide optical surveillance, speed enforcement, and central command control.',
    specifications: [
      'Optical fiber backbone linking all major district entry and exit checkpoints',
      'Zoned control center with modular video walls and uninterrupted UPS storage arrays',
      'Automated traffic violation monitoring with automated e-challan generation capabilities',
      'Integrated public address loudspeakers at 18 major district junctions'
    ],
    impact: 'Transformed law enforcement mobility and traffic discipline across Bagalkot district with unified 24/7 telemetry.'
  },
  p4: {
    title: 'Police Training School',
    category: 'Defense & Police Infrastructure',
    location: 'Bengaluru Rural, Karnataka',
    deliverables: 'CCTV & Advanced Audio-Visual System Integration',
    client: 'Karnataka State Police Training Department',
    image: 'assets/images/police_training_school.jpg',
    overview: 'Equipped the State Police Training Academy with high-security perimeter monitoring, classroom broadcasting systems, and state-of-the-art audiovisual simulation facilities for cadet instruction.',
    specifications: [
      'Perimeter CCTV cameras with night vision and smart intrusion detection',
      'Acoustic-engineered lecture auditoriums with wireless microphone arrays and laser projection',
      'Centralized CCTV playback console for tactical debriefs and training reviews'
    ],
    impact: 'Modernized cadet training infrastructure and hardened academy grounds against unauthorized intrusion.'
  },
  p5: {
    title: 'Directorate of Health & Family Welfare',
    category: 'Government Healthcare',
    location: 'Govt of Karnataka',
    deliverables: 'Camera Surveillance System Across Key Facilities',
    client: 'Directorate of Health & Family Welfare Services',
    image: 'assets/images/directorate_of_health.jpg',
    overview: 'Engineered an IP-based camera surveillance system securing critical medical supplies, cold-chain warehouses, and administrative headquarters of the Directorate of Health.',
    specifications: [
      'High-definition IP dome and bullet cameras with motion triggering',
      'Centralized storage with redundant RAID backup ensuring 90-day archive compliance',
      'Secure web-based remote audit access for health ministry inspectors'
    ],
    impact: 'Guaranteed supply chain security for essential medicines, prevented pilferage, and ensured hospital hygiene protocols.'
  },
  p6: {
    title: 'Police Welfare Hospital',
    category: 'Fire & Life Safety',
    location: 'Karnataka',
    deliverables: 'Fire Detection & Automated Suppression System',
    client: 'Police Welfare Department',
    image: 'assets/images/police_welfare_hospital.jpg',
    overview: 'Designed and commissioned a life-critical addressable fire alarm and clean agent fire suppression system across hospital wards, ICUs, and electrical server rooms.',
    specifications: [
      'Multi-sensor optical smoke and heat detectors meeting National Building Code (NBC) standards',
      'Microprocessor-based addressable fire alarm control panels (FACP)',
      'Gas suppression systems protecting server and pharmacy storage rooms'
    ],
    impact: 'Achieved complete life-safety compliance, ensuring round-the-clock protection for patients, doctors, and critical hospital assets.'
  },
  p7: {
    title: 'Wisdom International School',
    category: 'Educational Campus',
    location: 'Karnataka',
    deliverables: 'CCTV Surveillance & IP School Broadcasting System',
    client: 'Wisdom Education Trust',
    image: 'assets/images/wisdom_school.jpg',
    overview: 'Comprehensive campus security and communication infrastructure connecting administrative offices, 60+ classrooms, sports grounds, and school buses.',
    specifications: [
      'Campus-wide IP CCTV cameras covering corridors, playgrounds, and gates',
      'Smart IP-based broadcasting system with scheduled automatic bell alerts and paging',
      'Parent-accessible entrance monitoring and visitor pass tracking'
    ],
    impact: 'Maximized student safety, simplified daily school assembly management, and eliminated manual bell ringing.'
  },
  p8: {
    title: 'Vasavi International School',
    category: 'Educational Campus',
    location: 'Pondicherry',
    deliverables: 'CCTV & IP-Based School Broadcasting',
    client: 'Vasavi Educational Society',
    image: 'assets/images/vasavi_school.jpg',
    overview: 'Turnkey IP surveillance setup combined with a zoned IP-based acoustic broadcasting system for real-time announcements and emergency evacuation protocols.',
    specifications: [
      'Weatherproof bullet cameras for perimeter and sports facilities',
      'Multi-zone network audio decoders with digital amplifiers in every classroom block',
      'Two-way emergency call points stationed in labs and security gates'
    ],
    impact: 'Streamlined daily operations and earned the institution recognition for student safety standards in Pondicherry.'
  },
  p9: {
    title: 'Mannapuram CCTV Project',
    category: 'Financial Enterprise',
    location: 'India (National Footprint)',
    deliverables: 'Comprehensive CCTV Surveillance Network',
    client: 'Mannapuram Finance Limited',
    image: 'assets/images/mannapuram_cctv.jpg',
    overview: 'Enterprise-wide branch surveillance hardening across banking counters, strong rooms, customer lounges, and vault perimeters across multiple branches.',
    specifications: [
      'Tamper-proof dome cameras with covert pinhole camera options in vaults',
      'Centralized NVR storage with remote health monitoring and offline auto-reconnect',
      'Integration with vibration sensors and silent intrusion alarm dialers'
    ],
    impact: 'Protected high-value collateral, fortified branch operations against robbery, and met rigorous RBI audit standards.'
  },
  p10: {
    title: 'Ginegera Lake Public Safety',
    category: 'Public Space & Recreation',
    location: 'Karnataka',
    deliverables: 'Perimeter CCTV & Long-Range Public Address System',
    client: 'Tourism & District Lake Development Authority',
    image: 'assets/images/ginegera_lake.jpg',
    overview: 'Outdoor security deployment spanning the expansive Ginegera Lake perimeter, walking tracks, and public boating docks.',
    specifications: [
      'Long-distance PTZ optical zoom cameras with infrared illumination up to 150 meters',
      'Heavy-duty public address horn speakers covering the entire reservoir perimeter',
      'Solar-backed wireless transmission nodes linking remote perimeter posts'
    ],
    impact: 'Prevented accidental drownings, curbed trespassing during closed hours, and enabled park rangers to broadcast visitor advisories.'
  }
};

function initProjectFiltersAndModal() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('project-modal');
  const backdrop = document.getElementById('modal-backdrop');
  const closeBtn = document.getElementById('modal-close-btn');

  // Filter Buttons
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterVal = pill.getAttribute('data-filter') || 'all';

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterVal === 'all' || categories.includes(filterVal)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // Modal Open Handlers
  document.querySelectorAll('.project-modal-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = trigger.closest('.project-card');
      const pId = card?.getAttribute('data-project-id');
      if (pId && projectsData[pId]) {
        openProjectModal(projectsData[pId]);
      }
    });
  });

  // Card click opens modal too
  projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger if clicked a link or button
      if (e.target.closest('a') || e.target.closest('button')) return;
      const pId = card.getAttribute('data-project-id');
      if (pId && projectsData[pId]) {
        openProjectModal(projectsData[pId]);
      }
    });
  });

  // Modal Close Handlers
  const closeModal = () => {
    modal?.classList.remove('active');
    modal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      closeModal();
    }
  });

  // Inquire from modal
  const modalInquireBtn = document.getElementById('modal-inquire-btn');
  modalInquireBtn?.addEventListener('click', () => {
    closeModal();
  });
}

function openProjectModal(data) {
  const modal = document.getElementById('project-modal');
  const modalCategory = document.getElementById('modal-category');
  const modalTitle = document.getElementById('modal-title');
  const modalLocText = document.getElementById('modal-location-text');
  const modalBody = document.getElementById('modal-body-content');

  if (!modal || !modalTitle || !modalBody) return;

  if (modalCategory) modalCategory.textContent = data.category;
  modalTitle.textContent = data.title;
  if (modalLocText) modalLocText.textContent = data.location;

  // Build body content
  let specsHtml = data.specifications.map(s => `<li>${s}</li>`).join('');
  const imgBanner = data.image ? `<img src="${data.image}" alt="${data.title}" class="modal-img-banner">` : '';

  modalBody.innerHTML = `
    ${imgBanner}
    <p>${data.overview}</p>

    <div class="modal-meta-grid">
      <div class="modal-meta-item">
        <span class="meta-k">Client / Authority</span>
        <span class="meta-v">${data.client}</span>
      </div>
      <div class="modal-meta-item">
        <span class="meta-k">System Deliverables</span>
        <span class="meta-v">${data.deliverables}</span>
      </div>
    </div>

    <h4>Key Engineering Specifications</h4>
    <ul>${specsHtml}</ul>

    <h4>Operational Impact</h4>
    <p>${data.impact}</p>
  `;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

/* ==========================================================================
   7. Interactive Consultation Request Form
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('consultation-form');
  const submitBtn = document.getElementById('submit-btn');
  const feedback = document.getElementById('form-feedback');

  if (!form || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset previous errors
    form.querySelectorAll('.form-group').forEach(grp => grp.classList.remove('has-error'));
    if (feedback) feedback.style.display = 'none';

    let hasError = false;

    // Validate Name
    const nameInput = document.getElementById('form-name');
    if (!nameInput.value.trim()) {
      nameInput.closest('.form-group')?.classList.add('has-error');
      hasError = true;
    }

    // Validate Phone
    const phoneInput = document.getElementById('form-phone');
    const phoneVal = phoneInput.value.trim();
    if (!phoneVal || phoneVal.length < 8) {
      phoneInput.closest('.form-group')?.classList.add('has-error');
      hasError = true;
    }

    // Validate Email
    const emailInput = document.getElementById('form-email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      emailInput.closest('.form-group')?.classList.add('has-error');
      hasError = true;
    }

    // Validate Message
    const msgInput = document.getElementById('form-message');
    if (!msgInput.value.trim() || msgInput.value.trim().length < 5) {
      msgInput.closest('.form-group')?.classList.add('has-error');
      hasError = true;
    }

    if (hasError) return;

    // Simulate Apple-style submission animation
    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spinner-svg" viewBox="0 0 24 24" style="width:18px;height:18px;animation:spin 1s linear infinite;" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-opacity="0.9"></path>
      </svg>
      <span>Processing Request...</span>
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;

      if (feedback) {
        feedback.className = 'form-feedback success';
        feedback.innerHTML = `
          <strong>Thank you, ${escapeHtml(nameInput.value.trim())}!</strong><br>
          Your consultation inquiry has been registered. Mohammed Faiz R or our technical desk at Paras Technologies will contact you directly within 24 hours.
        `;
        feedback.style.display = 'block';
      }

      form.reset();
      showToast('Consultation request sent successfully!');
    }, 1200);
  });
}

function escapeHtml(string) {
  const div = document.createElement('div');
  div.textContent = string;
  return div.innerHTML;
}

/* ==========================================================================
   8. Clipboard Helpers (Address, Phone, Email)
   ========================================================================== */
function initClipboardHelpers() {
  const copyAddressBtn = document.getElementById('copy-address-btn');
  const copyBtnText = document.getElementById('copy-btn-text');

  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', () => {
      const addressText = "No: 9-5-450/861, MAA KI DUA BUILDING, GROUND FLOOR, OPP LAKSHMI TEMPLE, CB NAGAR, KINNAL ROAD, KOPPAL – 583231 KARNATAKA INDIA";
      
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(addressText).then(() => {
          if (copyBtnText) copyBtnText.textContent = "Copied!";
          showToast("Address copied to clipboard!");
          setTimeout(() => {
            if (copyBtnText) copyBtnText.textContent = "Copy Address";
          }, 2500);
        }).catch(() => {
          fallbackCopyText(addressText);
        });
      } else {
        fallbackCopyText(addressText);
      }
    });
  }
}

function fallbackCopyText(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast("Address copied to clipboard!");
  } catch (err) {
    showToast("Unable to copy to clipboard.");
  }
  document.body.removeChild(textArea);
}

/* ==========================================================================
   9. Toast Notification System
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-dot"></span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => {
      toast.remove();
    }, 280);
  }, 3200);
}

/* ==========================================================================
   10. Current Year Auto-updater
   ========================================================================== */
function updateCopyrightYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
