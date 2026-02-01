// script.js

// Wait until the page and animations are done
window.addEventListener('load', () => {
    // Delay the confetti start until the cake/candle animations are finished
    setTimeout(() => {
        startConfetti();
    }, 5000); // Adjust delay if animations are longer
});



function startConfetti() {
    const container = document.createElement('div');
    container.id = 'confetti-container';
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        overflow: hidden;
        z-index: 9999;
    `;
    document.body.appendChild(container);

    const colors = ['#f2d74e', '#95c3de', '#ff9a91', '#a4ffc4', '#ffffff'];

    // Create hundreds of confetti dots
    for (let i = 0; i < 200; i++) {
        const dot = document.createElement('div');
        const size = Math.random() * 8 + 4;
        const delay = Math.random() * 5; // stagger start
        dot.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -20px;
            left: ${Math.random() * 100}vw;
            border-radius: 50%;
            opacity: ${Math.random()};
            transform: translateY(0) rotate(${Math.random() * 360}deg);
            animation: confettiFall ${Math.random() * 3 + 3}s linear ${delay}s infinite;
        `;
        container.appendChild(dot);
    }

    // Add CSS for the fall animation dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes confettiFall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(110vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}
// ===== RSVP + WHATSAPP =====

// Send YES / NO to backend (Vercel API)
function sendResponse(type) {
  fetch("/api/rsvp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ response: type })
  }).catch(err => console.error(err));
}

// WhatsApp YES
function openWhatsAppYes() {
  sendResponse("yes");

  const phone = "919670625342"; // 👈 apna number daalo
  const message = encodeURIComponent(
    "HAA Bhai aa rha 🙏\nI will surely attend it🎉💖"
  );

  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}

// WhatsApp NO
function openWhatsAppNo() {
  sendResponse("no");

  const phone = "919670625342"; // 👈 same number
  const message = encodeURIComponent(
    "Hello 🙏\nI won’t be able to attend, but sending my best wishes 💐"
  );

  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}
