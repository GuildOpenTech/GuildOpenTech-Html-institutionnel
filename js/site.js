"use strict";

$(document).ready(function () {
  /* Video Lightbox */
  if (!!$.prototype.simpleLightboxVideo) {
    $(".video").simpleLightboxVideo();
  }

  /*ScrollUp*/
  if (!!$.prototype.scrollUp) {
    $.scrollUp();
  }

  /*Responsive Navigation*/
  $("#nav-mobile").html($("#nav-main").html());
  $("#nav-trigger span").on("click", function () {
    if ($("nav#nav-mobile ul").hasClass("expanded")) {
      $("nav#nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
      $(this).removeClass("open");
    } else {
      $("nav#nav-mobile ul").addClass("expanded").slideDown(250);
      $(this).addClass("open");
    }
  });

  $("#nav-mobile").html($("#nav-main").html());
  $("#nav-mobile ul a").on("click", function () {
    if ($("nav#nav-mobile ul").hasClass("expanded")) {
      $("nav#nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
      $("#nav-trigger span").removeClass("open");
    }
  });

  /* Sticky Navigation */
  if (!!$.prototype.stickyNavbar) {
    $("#banner").stickyNavbar();
  }
});

/* Preloader and animations */
$(window).load(function () {
  // makes sure the whole site is loaded
  $("#status").fadeOut(); // will first fade out the loading animation
  $("#preloader").delay(350).fadeOut("slow"); // will fade out the white DIV that covers the website.
  $("body").delay(350).css({ "overflow-y": "visible" });

  /* WOW Elements */
  if (typeof WOW == "function") {
    new WOW().init();
  }

  /* Parallax Effects */
  if (!!$.prototype.enllax) {
    $(window).enllax();
  }
});

/* Ajout Js Angèle */

document.addEventListener("DOMContentLoaded", () => {
  const link = document.getElementById("link-unscribe");
  const divUnscribe = document.getElementById("text-unscribe");
  const btn = document.getElementById("btn-closed");

  link.addEventListener("click", function () {
    divUnscribe.classList.remove("unscribe");
    divUnscribe.classList.add("unscribe-display");
  });

  btn.addEventListener("click", () => {
    divUnscribe.classList.remove("unscribe-display");
    divUnscribe.classList.add("unscribe");
  })
});

// Comportement des ronds dans la navbar et du lien GOT Connexion
document.addEventListener("DOMContentLoaded", function () {
  function updateSpanColors() {
    var links = document.querySelectorAll("#nav-main li a, #nav-mobile li a");

    links.forEach(function (link) {
      var svg = link.previousElementSibling;

      if (link.classList.contains("active")) {
        if (svg && svg.classList.contains("highlight-icon")) {
          // Change la couleur du contour du cercle
          svg.querySelector("circle").style.stroke = "#2ab8cd";
          // Remplit le cercle avec une couleur
          svg.querySelector("circle").style.fill = "#2ab8cd";
          svg.style.filter = `
          drop-shadow(0 0 5px #2AB8CD)
          drop-shadow(0 0 10px #2AB8CD)
          drop-shadow(0 0 20px #2AB8CD)
          drop-shadow(0 0 40px #2AB8CD)
          drop-shadow(0 0 80px #2AB8CD)
          drop-shadow(0 0 120px #2AB8CD)
    `;
        }
      } else {
        if (svg && svg.classList.contains("highlight-icon")) {
          svg.querySelector("circle").style.fill = "transparent";
          svg.querySelector("circle").style.stroke = "#f6a316";
          svg.style.filter = "none";
        }
      }
    });
  }

  updateSpanColors();

  window.addEventListener("scroll", updateSpanColors);

  // Attacher les événements mouseenter et mouseleave à chaque lien
  var links = document.querySelectorAll("#nav-main li a");
  links.forEach(function (link) {
    link.addEventListener("mouseenter", function () {
      var svg = link.previousElementSibling;
      if (svg && svg.classList.contains("highlight-icon")) {
        svg.querySelector("circle").style.stroke = "#f6a316";
        svg.querySelector("circle").style.fill = "#f6a316";
      }
    });

    link.addEventListener("mouseleave", function () {
      updateSpanColors();
    });
  });

  const sectionsAExclure = document.querySelectorAll("section");

  if (sectionsAExclure) {
    sectionsAExclure.forEach(function (section) {
      section.removeAttribute("tabindex");
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const burgerIcone = document.getElementById("burger");
  const navMobile = document.querySelector("nav#nav-mobile ul");

  window.addEventListener("scroll", () => {
    if (navMobile.classList.contains("expanded")) {
      navMobile.classList.remove("expanded");
      navMobile.style.display = "none";
      burgerIcone.classList.remove("open");
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("#nav-main a, #nav-mobile a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      const target = link.getAttribute("href");

      // Vérifie si le lien est un ID (scroll vers une section)
      if (target.startsWith("#")) {
        event.preventDefault();
        const section = document.querySelector(target);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        window.location.href = target;
      }
    });
  });
});

// Compteur pour section GOT-Ame
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  const updateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const current = +counter.innerText;
    const increment = target / 200;

    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      setTimeout(() => updateCounter(counter), 20);
    } else {
      counter.innerText = target;
    }
  };

  const onIntersect = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        updateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(onIntersect, {
    threshold: 0.5,
  });

  counters.forEach((counter) => {
    observer.observe(counter);
  });
});

/* Carousel */
// Fonction générique pour gérer les événements de clic
function setupCarousel(
  gallerySelector,
  rightArrowSelector,
  leftArrowSelector,
  visibleCards
) {
  const galleryDivs = document.querySelectorAll(gallerySelector);
  const slideToRight = document.getElementById(rightArrowSelector);
  const slideToLeft = document.getElementById(leftArrowSelector);
  let startIndex = 0;

  // Initialisation de la galerie
  updateGallery(galleryDivs, startIndex, visibleCards);

  // Événement pour la flèche de droite
  slideToRight.addEventListener("click", function () {
    if (startIndex + visibleCards < galleryDivs.length) {
      startIndex++;
      updateGallery(galleryDivs, startIndex, visibleCards);
    }

    // Afficher la flèche de gauche
    if (startIndex > 0) {
      slideToLeft.classList.remove("hidden");
      slideToLeft.classList.add("arrow-left");
    }

    // Masquer la flèche de droite si c'est la fin
    if (startIndex + visibleCards >= galleryDivs.length) {
      slideToRight.classList.add("hidden");
    }
  });

  // Événement pour la flèche de gauche
  slideToLeft.addEventListener("click", function () {
    if (startIndex > 0) {
      startIndex--;
      updateGallery(galleryDivs, startIndex, visibleCards);
    }

    // Afficher la flèche de droite
    if (startIndex + visibleCards < galleryDivs.length) {
      slideToRight.classList.remove("hidden");
    }

    // Masquer la flèche de gauche si c'est le début
    if (startIndex === 0) {
      slideToLeft.classList.add("hidden");
    }
  });
}

// Fonction pour mettre à jour le carrousel en fonction de la taille de l'écran
function updateCarouselSettings() {
  let visibleCardsFirstCarousel = 3; // Valeur par défaut pour le premier carrousel
  let visibleCardsSecondCarousel = 3; // Valeur par défaut pour le second carrousel

  // Si l'écran est plus petit ou égal à 768px, ajuster les valeurs
  if (window.matchMedia("(max-width: 768px)").matches) {
    visibleCardsFirstCarousel = 1;
    visibleCardsSecondCarousel = 1;
  } else if (window.matchMedia("(max-width: 1024px)").matches) {
    visibleCardsFirstCarousel = 2;
    visibleCardsSecondCarousel = 2;
  }

  // Réinitialiser les carrousels avec le nombre d'éléments visibles mis à jour
  setupCarousel(
    ".card-gallery",
    "right-arrow-1",
    "left-arrow-1",
    visibleCardsFirstCarousel
  );
  setupCarousel(
    ".cards-testimonials .classic",
    "right-arrow-2",
    "left-arrow-2",
    visibleCardsSecondCarousel
  );
}

// Initialisation au chargement de la page
updateCarouselSettings();

// Réagir aux changements de taille de l'écran
window.addEventListener("resize", updateCarouselSettings);

// Fonction pour mettre à jour l'affichage de la galerie
function updateGallery(galleryDivs, startIndex, visibleCards) {
  // Logique de mise à jour de la galerie (par exemple, masquer/afficher des éléments)
  galleryDivs.forEach((div, index) => {
    if (index >= startIndex && index < startIndex + visibleCards) {
      div.style.display = "flex"; // Afficher les éléments dans la plage
    } else {
      div.style.display = "none"; // Masquer les autres éléments
    }
  });
}
