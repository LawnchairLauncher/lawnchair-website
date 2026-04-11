const toc = document.getElementById("toc");
if (toc) {
  const tocToggle = toc.querySelector("button");
  if (tocToggle) {
    tocToggle.addEventListener("click", () => {
      if (toc.classList.contains("collapsed")) {
        toc.classList.remove("collapsed");
        tocToggle.textContent = "Hide";
      } else {
        toc.classList.add("collapsed");
        tocToggle.textContent = "Show";
      }
    });
  }
}
