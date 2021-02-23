var slides = document.querySelectorAll(".login-slider .slider-slide");
var currentSlide = 0;
var slideInterval = setInterval(nextSlide, 60000);

function nextSlide() {
  slides[currentSlide].className = "slider-slide";
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].className = "slider-slide is-visible";
}
