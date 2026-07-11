window.onscroll = function () {
  if (document.documentElement.scrollTop > 0) {
    document.querySelector("header").style.backgroundColor =
      "var(--surface-container-high)";
  } else {
    document.querySelector("header").style.backgroundColor = "";
  }
};

// See https://github.com/material-components/material-web/blob/main/ripple/internal/ripple.ts
(() => {
  let currentRipple = null;
  let rippleTarget = null;
  let pointerDownTime = 0;

  // Extracted core ripple animation logic
  const triggerRipple = (btn, clientX, clientY) => {
    rippleTarget = btn;
    pointerDownTime = Date.now();

    const rect = btn.getBoundingClientRect();
    const INITIAL_ORIGIN_SCALE = 0.2;
    const PADDING = 10;

    const maxDim = Math.max(rect.height, rect.width);
    const initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
    const hypotenuse = Math.sqrt(rect.width ** 2 + rect.height ** 2);
    const maxRadius = hypotenuse + PADDING;
    const softEdgeSize = Math.max(0.35 * maxDim, 75);
    const finalScale = (maxRadius + softEdgeSize) / initialSize;

    const endPoint = { x: (rect.width - initialSize) / 2, y: (rect.height - initialSize) / 2 };

    // If clientX/Y are provided, use pointer coordinates. Otherwise, center it (for keyboard).
    const startPoint = (clientX !== undefined && clientY !== undefined)
        ? { x: (clientX - rect.left) - (initialSize / 2), y: (clientY - rect.top) - (initialSize / 2) }
        : { x: endPoint.x, y: endPoint.y };

    if (currentRipple) currentRipple.remove();

    currentRipple = document.createElement("span");
    currentRipple.classList.add("ripple-layer");
    currentRipple.style.height = `${initialSize}px`;
    currentRipple.style.width = `${initialSize}px`;
    btn.appendChild(currentRipple);

    currentRipple.animate(
        {
          transform: [
            `translate(${startPoint.x}px, ${startPoint.y}px) scale(1)`,
            `translate(${endPoint.x}px, ${endPoint.y}px) scale(${finalScale})`
          ]
        },
        { duration: 450, easing: 'cubic-bezier(0.2, 0, 0, 1)', fill: 'forwards' }
    );
  };

  const handleRelease = () => {
    if (!currentRipple) return;

    const MINIMUM_PRESS_MS = 225;
    const elapsed = Date.now() - pointerDownTime;
    const remainingTime = Math.max(0, MINIMUM_PRESS_MS - elapsed);

    const rippleToFade = currentRipple;
    currentRipple = null;
    rippleTarget = null;

    setTimeout(() => {
      const fadeAnimation = rippleToFade.animate(
          { opacity: [0.12, 0] },
          { duration: 375, easing: 'linear', fill: 'forwards' }
      );
      fadeAnimation.onfinish = () => rippleToFade.remove();
    }, remainingTime);
  };

  document.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;

    const btn = e.target.closest('[data-statelayer]');
    if (!btn) return;

    triggerRipple(btn, e.clientX, e.clientY);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    if (e.repeat) return; // Prevent spamming ripples while holding the key down

    const btn = e.target.closest('[data-statelayer]');
    if (!btn) return;

    // Prevent default scrolling behavior for Spacebar
    if (e.key === " ") e.preventDefault();

    triggerRipple(btn);
  });

  document.addEventListener("pointerup", handleRelease);
  document.addEventListener("pointercancel", handleRelease);
  document.addEventListener("keyup", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleRelease();
    }
  });
})();