/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

const videos = [
    "./images/Prototype.png",
    "./videos/video2.mp4",
    "./videos/video3.mp4"
];

document.addEventListener("DOMContentLoaded", () => {
  const mediaPlayer = document.getElementById("mediaPlayer"); // Video element
  const mediaImage = document.getElementById("mediaImage"); // Image element

  if (!mediaPlayer || !mediaImage) {
      console.error("Media elements not found!");
      return;
  }

  // Image first, then video1, then video2
  const mediaFiles = [
      { type: "image", src: "./images/Prototype.png" },
      { type: "video", src: "./videos/video1.mp4" },
      { type: "video", src: "./videos/video2.mp4" }
  ];

  let currentIndex = 0;

  function changeMedia(direction) {
      currentIndex += direction;
      if (currentIndex < 0) {
          currentIndex = mediaFiles.length - 1;
      } else if (currentIndex >= mediaFiles.length) {
          currentIndex = 0;
      }

      const currentMedia = mediaFiles[currentIndex];

      if (currentMedia.type === "video") {
          mediaPlayer.style.display = "block";
          mediaImage.style.display = "none";

          mediaPlayer.src = currentMedia.src;
          mediaPlayer.play(); // Auto-play video
      } else {
          mediaPlayer.style.display = "none";
          mediaImage.style.display = "block";

          mediaImage.src = currentMedia.src;
      }
  }

  // Assign event listeners to buttons
  document.querySelector(".prev").addEventListener("click", () => changeMedia(-1));
  document.querySelector(".next").addEventListener("click", () => changeMedia(1));
});
