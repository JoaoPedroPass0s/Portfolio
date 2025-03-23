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

document.addEventListener("DOMContentLoaded", () => {
  const mediaSets = {
      section1: [
          { type: "image", src: "./images/Prototype1.png" },
          { type: "video", src: "./videos/video1.mp4" },
          { type: "video", src: "./videos/video2.mp4" }
      ],
      section2: [
          { type: "image", src: "./images/Prototype2.png" },
          { type: "video", src: "./videos/video3.mp4" },
          { type: "video", src: "./videos/video4.mp4" }
      ]
  };

  const currentIndex = {
      section1: 0,
      section2: 0
  };

  // Initialize first media for each section
  Object.keys(mediaSets).forEach((sectionId) => {
      updateMedia(sectionId);
  });

});

// Move this function outside so it is accessible globally
function changeMedia(direction, sectionId) {
  const mediaSets = {
      section1: [
          { type: "image", src: "./images/Prototype1.png" },
          { type: "video", src: "./videos/video1.mp4" },
          { type: "video", src: "./videos/video2.mp4" }
      ],
      section2: [
          { type: "image", src: "./images/Prototype2.png" },
          { type: "video", src: "./videos/video3.mp4" },
          { type: "video", src: "./videos/video4.mp4" }
      ]
  };

  const currentIndex = window.currentIndex || { section1: 0, section2: 0 };

  currentIndex[sectionId] += direction;

  if (currentIndex[sectionId] < 0) {
      currentIndex[sectionId] = mediaSets[sectionId].length - 1;
  } else if (currentIndex[sectionId] >= mediaSets[sectionId].length) {
      currentIndex[sectionId] = 0;
  }

  window.currentIndex = currentIndex;
  updateMedia(sectionId);
}

function updateMedia(sectionId) {
  const mediaSets = {
      section1: [
          { type: "image", src: "./images/Prototype.png" },
          { type: "video", src: "./videos/video1.mp4" },
          { type: "video", src: "./videos/video2.mp4" }
      ],
      section2: [
          { type: "gif", src: "./gifs/gif1.gif" },
          { type: "gif", src: "./gifs/gif2.gif" },
          { type: "gif", src: "./gifs/gif3.gif" }
      ]
  };

  const currentIndex = window.currentIndex || { section1: 0, section2: 0 };
  const currentMedia = mediaSets[sectionId][currentIndex[sectionId]];
  const mediaPlayer = document.getElementById(`mediaPlayer${sectionId.slice(-1)}`);
  const mediaImage = document.getElementById(`mediaImage${sectionId.slice(-1)}`);

  if (currentMedia.type === "video") {
      mediaPlayer.style.display = "block";
      mediaImage.style.display = "none";
      mediaPlayer.src = currentMedia.src;
      mediaPlayer.play();
  } else if (currentMedia.type === "gif") {
      mediaPlayer.style.display = "none";
      mediaImage.style.display = "block";
      mediaImage.src = currentMedia.src;
  } else {
      mediaPlayer.style.display = "none";
      mediaImage.style.display = "block";
      mediaImage.src = currentMedia.src;
  }
}

