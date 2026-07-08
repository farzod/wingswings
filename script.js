const animations = [
  "Wings_1.json",
  "Wings_3.json",
  "Wings_4.json",
  "Wings_5.json",
  "Wings_7.json",
  "Wings_8.json",
  "Wings_10.json",
  "Wings_6.json",
  "Wings_2.json",
  "Wings_9.json",
];

const carousel = document.querySelector("#carousel");
const dots = document.querySelector("#dots");
const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");

let activeIndex = 0;

function scrollToAnimation(index) {
  const wrappedIndex = (index + animations.length) % animations.length;
  carousel.children[wrappedIndex].scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "center",
  });
}

function setActiveIndex(index) {
  activeIndex = index;

  [...dots.children].forEach((dot, dotIndex) => {
    const isSelected = dotIndex === activeIndex;
    dot.setAttribute("aria-selected", String(isSelected));
    dot.tabIndex = isSelected ? 0 : -1;
  });
}

function updateActiveFromScroll() {
  const index = Math.round(carousel.scrollLeft / carousel.clientWidth);
  setActiveIndex(Math.max(0, Math.min(index, animations.length - 1)));
}

animations.forEach((fileName, index) => {
  const slide = document.createElement("section");
  const container = document.createElement("div");
  const dot = document.createElement("button");

  slide.className = "slide";
  slide.setAttribute("aria-label", `Wing animation ${index + 1}`);

  container.className = "animation";
  slide.append(container);
  carousel.append(slide);

  dot.className = "dot";
  dot.type = "button";
  dot.role = "tab";
  dot.setAttribute("aria-label", `Show animation ${index + 1}`);
  dot.addEventListener("click", () => scrollToAnimation(index));
  dots.append(dot);

  lottie.loadAnimation({
    container,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: `./Lotties/${fileName}`,
  });
});

previousButton.addEventListener("click", () => scrollToAnimation(activeIndex - 1));
nextButton.addEventListener("click", () => scrollToAnimation(activeIndex + 1));
carousel.addEventListener("scroll", updateActiveFromScroll, { passive: true });

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    scrollToAnimation(activeIndex - 1);
  }

  if (event.key === "ArrowRight") {
    scrollToAnimation(activeIndex + 1);
  }
});

setActiveIndex(0);
