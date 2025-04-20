const form = document.getElementById("waitlistForm");
const message = document.getElementById("waitlistMessage");

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  // simulacija uspešnog zahteva
  form.style.display = "none";
  message.innerHTML = "✅ Uspešno ste se prijavili! Proverite svoj email.";
});


function launchConfetti() {
    const duration = 1.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };
  
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
  
    const interval = setInterval(() => {
      if (Date.now() > animationEnd) {
        clearInterval(interval);
        return;
      }
  
      const particleCount = 40;
      confetti({
        particleCount,
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        ...defaults,
      });
    }, 200);
  }
  
  // Hook za submit forme
  const waitlistForm = document.getElementById("waitlistForm");
  const waitlistMessage = document.getElementById("waitlistMessage");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
  
    waitlistForm.style.display = "none";
    waitlistMessage.innerHTML = "✅ Uspešno ste se prijavili! Proverite svoj email.";
  
    launchConfetti();
  });
  

const steps = document.querySelectorAll('.journey__step');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

steps.forEach(step => observer.observe(step));
