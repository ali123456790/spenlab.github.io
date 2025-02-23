// Handle mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navUl = document.querySelector('#navbar ul');

navToggle.addEventListener('click', () => {
  navUl.classList.toggle('showNav');
});

// Dynamically update the footer year
const yearSpan = document.getElementById('year');
if (yearSpan) {
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;
}
