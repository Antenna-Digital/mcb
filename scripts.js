document.addEventListener("DOMContentLoaded", function () {
  // Select all wrapper containers
  const testimonialWrappers = document.querySelectorAll(
    ".testimonial-slider_wrapper"
  );

  // Initialize each swiper instance within its wrapper
  testimonialWrappers.forEach((wrapper, index) => {
    // Find the swiper container within the wrapper
    const swiperElement = wrapper.querySelector(".swiper");

    if (swiperElement) {
      new Swiper(swiperElement, {
        // Show only one slide at a time
        slidesPerView: 1,

        // Enable navigation buttons
        navigation: {
          nextEl: wrapper.querySelector(".swiper-arrow-next"),
          prevEl: wrapper.querySelector(".swiper-arrow-prev"),
        },

        // Enable pagination
        pagination: {
          el: wrapper.querySelector(".swiper-pagination"),
          clickable: true,
        },

        // Enable keyboard navigation
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },

        // Enable mouse wheel navigation
        mousewheel: {
          invert: false,
        },

        // Add some space between slides
        spaceBetween: 30,
        speed: 1000,
        autoplay: {
          delay: 5000,
        },

        // Enable smooth transitions
        effect: "slide",

        // Auto height
        autoHeight: true,

        // Loop through slides
        loop: true,

        // Add touch swiping
        touchRatio: 1,
        touchAngle: 45,
        grabCursor: true,
      });
    }
  });

  const wrappers = document.querySelectorAll(".logo-slider_wrapper");

  wrappers.forEach((wrapper) => {
    const swiperElement = wrapper.querySelector(".swiper");

    if (swiperElement) {
      const swiper = new Swiper(swiperElement, {
        // Responsive breakpoints
        breakpoints: {
          // Mobile (320px and up)
          320: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          // Tablet (768px and up)
          768: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          // Desktop (1024px and up)
          1024: {
            slidesPerView: 5,
            spaceBetween: 0,
          },
        },

        slidesPerGroup: 1,

        navigation: {
          nextEl: wrapper.querySelector(".logo-slider_arrow_next"),
          prevEl: wrapper.querySelector(".logo-slider_arrow_prev"),
        },

        pagination: {
          el: wrapper.querySelector(".swiper-pagination"),
          clickable: true,
        },

        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },

        speed: 1000,
        autoplay: {
          delay: 5000,
        },

        effect: "slide",
        autoHeight: true,
        loop: true,
        touchRatio: 1,
        touchAngle: 45,
        grabCursor: true,

        on: {
          init: function () {
            updateSlideBorders(this);
          },
          slideChange: function () {
            updateSlideBorders(this);
          },
          resize: function () {
            updateSlideBorders(this);
          },
          breakpoint: function () {
            updateSlideBorders(this);
          },
        },
      });
    }
  });

  const tabList = document.querySelector(".logo-slider_tabs_navigation");
  const tabs = document.querySelectorAll(".logo-slider_tabs_navigation_text");
  const panels = document.querySelectorAll(".logo-slider_wrapper");

  // Add proper ARIA roles and properties
  tabList.setAttribute("role", "tablist");

  // Ensure first tab is active by default
  if (tabs.length > 0) {
    tabs[0].classList.add("active");
    const firstPanelId = tabs[0].getAttribute("data-tab");
    const firstPanel = document.getElementById(firstPanelId);
    if (firstPanel) {
      panels.forEach((panel) => (panel.style.display = "none"));
      firstPanel.style.display = "block";
    }
  }

  tabs.forEach((tab, index) => {
    // Set tab attributes
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", tab.classList.contains("active"));
    tab.setAttribute("aria-controls", tab.getAttribute("data-tab"));
    tab.setAttribute("id", `tab-${tab.getAttribute("data-tab")}`);
    tab.setAttribute("tabindex", tab.classList.contains("active") ? "0" : "-1");

    // Set panel attributes
    const panel = document.getElementById(tab.getAttribute("data-tab"));
    if (panel) {
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute(
        "aria-labelledby",
        `tab-${tab.getAttribute("data-tab")}`
      );
      panel.setAttribute("tabindex", "0");
      panel.setAttribute("hidden", !tab.classList.contains("active"));
    }

    // Add click handler
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      switchTab(tab);
    });

    // Add keyboard handler
    tab.addEventListener("keydown", (e) => {
      handleTabKeyboard(e, index, tabs);
    });
  });

  function switchTab(newTab) {
    // Update selected tab
    tabs.forEach((tab) => {
      const selected = tab === newTab;
      tab.setAttribute("aria-selected", selected);
      tab.classList.toggle("active", selected);
      tab.setAttribute("tabindex", selected ? "0" : "-1");
    });

    // Update visible panel
    panels.forEach((panel) => {
      const shouldShow = panel.id === newTab.getAttribute("data-tab");
      panel.hidden = !shouldShow;
      // Also update display property
      panel.style.display = shouldShow ? "block" : "none";
    });

    // Focus the selected tab
    newTab.focus();
  }

  function handleTabKeyboard(event, index, tabs) {
    const tabArray = Array.from(tabs);
    let targetTab;

    switch (event.key) {
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        targetTab = tabArray[index - 1] || tabArray[tabArray.length - 1];
        break;
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        targetTab = tabArray[index + 1] || tabArray[0];
        break;
      case "Home":
        event.preventDefault();
        targetTab = tabArray[0];
        break;
      case "End":
        event.preventDefault();
        targetTab = tabArray[tabArray.length - 1];
        break;
      default:
        return;
    }

    switchTab(targetTab);
  }
});

function updateSlideBorders(swiper) {
  // First, remove all borders
  swiper.slides.forEach((slide) => {
    slide.style.borderLeft = "none";
    slide.style.borderRight = "none";
  });

  // Get number of visible slides based on screen width
  const visibleSlides = swiper.params.slidesPerView;

  // Get real index of active slide
  const activeIndex = swiper.activeIndex;

  // For all visible slides after active
  for (let i = 1; i < visibleSlides; i++) {
    const slideIndex = activeIndex + i;
    const slide = swiper.slides[slideIndex];

    if (slide) {
      if (i === 1) {
        // Second slide (first after active) gets both borders
        slide.style.borderLeft = "1px solid #E5E5E5";
        slide.style.borderRight = "1px solid #E5E5E5";
      } else if (i === visibleSlides - 1) {
        // Last visible slide only gets left border
        slide.style.borderLeft = "1px solid #E5E5E5";
      } else {
        // Middle slides get both borders
        slide.style.borderLeft = "1px solid #E5E5E5";
        slide.style.borderRight = "1px solid #E5E5E5";
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const header = document.querySelector("header");
  const menuItems = document.querySelectorAll(".header_menu_link");
  const menuToggle = document.querySelector(".menu-toggle");
  const menuClose = document.querySelector(".menu_close");
  const headerMenu = document.querySelector(".header_menu");
  const submenuArrows = document.querySelectorAll(
    ".header_menu_link_submenu_arrow"
  );

  // Media Query
  const mediaQuery = window.matchMedia("(min-width: 992px)");

  // Add scroll event listener for sticky header
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });

  // Desktop dropdown menu (above 991px)
  function initDesktopMenu(matches) {
    menuItems.forEach((item) => {
      const submenu = item.querySelector(".header_menu_submenu");
      if (!submenu) return;

      submenu.style.opacity = matches ? "0" : "";
      submenu.style.transition = matches ? "opacity 0.3s ease-in-out" : "";
      submenu.style.pointerEvents = matches ? "none" : "";
      item.setAttribute("aria-expanded", "false");

      if (!matches) {
        item.removeAttribute("role");
        item.removeAttribute("aria-haspopup");
        submenu.removeAttribute("role");
        return;
      }

      item.setAttribute("role", "button");
      item.setAttribute("aria-haspopup", "true");
      submenu.setAttribute("role", "menu");

      const subMenuLinks = submenu.querySelectorAll("a");
      subMenuLinks.forEach((link) => {
        link.setAttribute("role", "menuitem");
        link.setAttribute("tabindex", "-1");
      });

      function showMenu() {
        if (!mediaQuery.matches) return;
        submenu.style.opacity = "1";
        submenu.style.pointerEvents = "auto";
        item.setAttribute("aria-expanded", "true");
      }

      function hideMenu() {
        if (!mediaQuery.matches) return;
        submenu.style.opacity = "0";
        submenu.style.pointerEvents = "none";
        item.setAttribute("aria-expanded", "false");
      }

      item.addEventListener("mouseenter", showMenu);
      item.addEventListener("mouseleave", hideMenu);
      item.addEventListener("keydown", (e) => {
        if (!mediaQuery.matches) return;
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault();
          showMenu();
          subMenuLinks[0]?.focus();
        }
      });

      submenu.addEventListener("keydown", (e) => {
        if (!mediaQuery.matches) return;
        const currentLink = e.target.closest("a");
        const currentIndex = Array.from(subMenuLinks).indexOf(currentLink);

        if (e.key === "ArrowDown") {
          e.preventDefault();
          const nextIndex =
            currentIndex === subMenuLinks.length - 1 ? 0 : currentIndex + 1;
          subMenuLinks[nextIndex].focus();
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          const prevIndex =
            currentIndex === 0 ? subMenuLinks.length - 1 : currentIndex - 1;
          subMenuLinks[prevIndex].focus();
        } else if (e.key === "Escape") {
          e.preventDefault();
          hideMenu();
          item.focus();
        }
      });
    });
  }

  // Mobile menu overlay
  function createOverlay() {
    const overlay = document.createElement("div");
    overlay.className = "menu-overlay";
    header.appendChild(overlay);
    return overlay;
  }

  function toggleMenu() {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !isExpanded);
    document.body.classList.toggle("menu-open");
    headerMenu?.setAttribute("aria-hidden", isExpanded);

    if (!isExpanded) {
      createOverlay();
    } else {
      const overlay = document.querySelector(".menu-overlay");
      overlay?.remove();
    }
  }

  // Mobile submenu functionality
  submenuArrows.forEach((arrow) => {
    arrow.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!mediaQuery.matches) {
        // Only run on mobile
        const menuLink = arrow.closest(".header_menu_link");
        const submenu = menuLink.querySelector(".header_menu_submenu");
        const isExpanded = menuLink.getAttribute("aria-expanded") === "true";

        // Toggle aria-expanded
        menuLink.setAttribute("aria-expanded", !isExpanded);

        // Toggle submenu visibility and arrow rotation
        if (!isExpanded) {
          submenu.style.display = "flex";
          arrow.style.transform = "rotate(180deg)";
          // Use setTimeout to trigger transition
          setTimeout(() => {
            submenu.style.opacity = "1";
          }, 10);
        } else {
          submenu.style.opacity = "0";
          arrow.style.transform = "rotate(0deg)";
          // Wait for transition to complete before hiding
          submenu.addEventListener("transitionend", function hideMenu() {
            submenu.style.display = "none";
            submenu.removeEventListener("transitionend", hideMenu);
          });
        }
      }
    });
  });

  // Add CSS transition for opacity and arrow rotation
  const style = document.createElement("style");
  style.textContent = `
  @media screen and (max-width: 991px) {
    .header_menu_submenu {
      transition: opacity 0.3s ease-in-out;
    }
    .header_menu_link_submenu_arrow {
      transition: transform 0.3s ease-in-out;
    }
  }
`;
  document.head.appendChild(style);

  // Event Listeners
  menuToggle?.addEventListener("click", toggleMenu);
  menuClose?.addEventListener("click", toggleMenu);

  // Initialize menus
  initDesktopMenu(mediaQuery.matches);
  mediaQuery.addEventListener("change", (e) => initDesktopMenu(e.matches));
});
