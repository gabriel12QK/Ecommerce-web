let menu = document.querySelector(".header .menu");
let navgation = document.querySelector(".header .main-navgation");
let links = document.querySelectorAll(".header .main-navgation a");
let overlay = document.querySelector(".overlay");

// Open Navgation Links For Tablets And Mobile.
function openMobileNavgation() {
  menu.classList.add("open"); // Open Menu
  navgation.classList.add("fade-in"); // Open Mobile Navgation
  controlOverlay("open"); // Open Overlay
}

// Close Navgation Links For Tablets And Mobile.
function closeMobileNavgation() {
  menu.classList.remove("open"); // Close Menu
  navgation.classList.remove("fade-in"); // Close Mobile Navgation
  controlOverlay("!open"); // Close Overlay
}

menu.addEventListener("click", () => {
  if (menu.classList.contains("open")) {
    closeMobileNavgation();
  } else {
    openMobileNavgation();
  }
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileNavgation();
  });
});

// Reset To Bars Icon Shape IF Width >= 1024px
window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024 && menu.classList.contains("open")) {
    // Close Menu & Mobile Navgation & Overlay
    closeMobileNavgation();
  }
});

// Control [ Open || Close ] Overlay Function.
function controlOverlay(status) {
  /// status:
  /// open => Open Overlay
  /// anything else open => close Overlay
  if (status == "open") {
    overlay.classList.add("fade-in");
    overlay.classList.remove("fade-out");
  } else {
    overlay.classList.add("fade-out");
    overlay.classList.remove("fade-in");
  }
}
