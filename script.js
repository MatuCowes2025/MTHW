document.addEventListener("DOMContentLoaded", function () { 
  const toggleButton = document.querySelector(".nav__toggle");
  const menu = document.querySelector(".nav__link");

  /* Al hacer clic en el botón, se muestra u oculta el menú */
  toggleButton.addEventListener("click", function () {
    menu.classList.toggle("nav__link--show");
  });
});

/* Este bloque permite abrir o cerrar el menú al tocar el botón */
document.addEventListener("DOMContentLoaded", function () {
  const carousels = document.querySelectorAll(".carousel-container");

  carousels.forEach((container) => {
    const carousel = container.querySelector(".carousel");
    const items = carousel.querySelectorAll(".carousel-item");
    const itemCount = items.length;

    /* Clonamos el primer y el último ítem para que el carrusel parezca continuo */
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[itemCount - 1].cloneNode(true);

    /* Agregamos los clones al inicio y al final */
    carousel.appendChild(firstClone);
    carousel.insertBefore(lastClone, items[0]);

    const newItems = carousel.querySelectorAll(".carousel-item");
    const totalItems = newItems.length;
    let currentIndex = 1; /* Arrancamos en el primer ítem real */

    /* Mostramos ese primer ítem real */
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

    let isTransitioning = false;

    /* Función para moverse entre ítems */
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

    /* Función para corregir si llegamos al final (y volver al original correspondiente) */
    function handleTransition() {
      carousel.style.transition = "none";

      if (currentIndex === totalItems - 1) {
        currentIndex = 1;
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      }

      if (currentIndex === 0) {
        currentIndex = itemCount;
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      }

      isTransitioning = false;
    }

    /* Botones para moverse a izquierda o derecha */
    container.querySelector(".prev").addEventListener("click", () => moveSlide(-1));
    container.querySelector(".next").addEventListener("click", () => moveSlide(1));
  });
});

(function () {
  emailjs.init("cEnuDBLlc-qW1Akbv"); // tu public key
})();

const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  emailjs
    .sendForm("mthw2025", "template_ei5ud65", this)
    .then(() => {
      formMessage.textContent = "Formulario enviado con éxito, ¡gracias!";
      formMessage.className = "form-message success";
      formMessage.style.display = "block";
      form.reset();

      setTimeout(() => {
        formMessage.style.display = "none";
      }, 4000);
    })
    .catch((error) => {
      formMessage.textContent = "Error al enviar el formulario, por favor intenta de nuevo.";
      formMessage.className = "form-message error";
      formMessage.style.display = "block";
      console.error("EmailJS error:", error);

      setTimeout(() => {
        formMessage.style.display = "none";
      }, 4000);
    });
});
