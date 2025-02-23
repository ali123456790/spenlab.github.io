// Handle mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navbar = document.getElementById('navbar').querySelector('ul');

navToggle.addEventListener('click', () => {
  navbar.classList.toggle('showNav');
});

// Dynamically update the footer year
const yearSpan = document.getElementById('year');
if (yearSpan) {
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;
}
