document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".nav__toggle");
  const menu = document.querySelector(".nav__link");

  toggleButton.addEventListener("click", function () {
    menu.classList.toggle("nav__link--show");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const carousels = document.querySelectorAll(".carousel-container");

  carousels.forEach((container, sectionIndex) => {
    const carousel = container.querySelector(".carousel");
    const items = carousel.querySelectorAll(".carousel-item");
    const itemCount = items.length;

    // Clonar primero y último slide
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[itemCount - 1].cloneNode(true);

    carousel.appendChild(firstClone);
    carousel.insertBefore(lastClone, items[0]);

    const newItems = carousel.querySelectorAll(".carousel-item");
    const totalItems = newItems.length;
    let currentIndex = 1;

    // Establecer posición inicial (después del clon inicial)
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Manejo de transición
    let isTransitioning = false;

    function moveSlide(n) {
      if (isTransitioning) return;
      isTransitioning = true;

      currentIndex += n;
      carousel.style.transition = "transform 0.4s ease-in-out";
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

      carousel.addEventListener("transitionend", handleTransition, {
        once: true,
      });
    }

    function handleTransition() {
      carousel.style.transition = "none";

      // Si está en el clon del último, saltar al primero real
      if (currentIndex === totalItems - 1) {
        currentIndex = 1;
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      }

      // Si está en el clon del primero, saltar al último real
      if (currentIndex === 0) {
        currentIndex = itemCount;
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      }

      isTransitioning = false;
    }

    container
      .querySelector(".prev")
      .addEventListener("click", () => moveSlide(-1));
    container
      .querySelector(".next")
      .addEventListener("click", () => moveSlide(1));
  });
});
