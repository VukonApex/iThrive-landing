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

// subscription - username modal
let selectedPlan = null;

window.requestUsernameThenStartPayment = function (plan) {
  selectedPlan = plan;

  setTimeout(() => {
    document.getElementById("usernameModal").classList.add("active");
  }, 0);
};

function closeModal() {
  document.getElementById("usernameModal").classList.remove("active");
  document.getElementById("usernameInput").value = "";
}

function submitUsername() {
  const username = document.getElementById("usernameInput").value.trim();

  if (!username) {
    alert("Molimo unesi korisničko ime pre nastavka.");
    return;
  }

  if (!selectedPlan) {
    alert("Nije odabran plan pretplate.");
    return;
  }

  closeModal();

  fetch("https://api.ithrive.rs/api/payment/initialize-web", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      plan: selectedPlan,
      username: username,
    }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.success && data.message) {
        const checkoutId = encodeURIComponent(data.message);
        // 🔁 Direktno preusmeravanje korisnika na novu stranicu (nema više popupa!)
        window.location.href = `/payment-popup.html?checkoutId=${checkoutId}`;
      } else {
        alert(data.message || "Plaćanje nije moglo da se pokrene.");
      }
    })
    .catch(err => {
      console.error("Greška:", err);
      alert("Došlo je do greške prilikom pokretanja plaćanja.");
    });
}

function closeUsernameModal() {
  const modal = document.getElementById("usernameModal");
  modal.classList.remove("active");
}

// Klik van modala zatvara
document.addEventListener("click", function (e) {
  const modal = document.getElementById("usernameModal");

  const clickedInsideModal = e.target.closest(".modal-box");

  if (!clickedInsideModal && modal.classList.contains("active")) {
    closeUsernameModal();
  }
});
