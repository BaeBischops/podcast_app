const scrollRightBtn = document.getElementById("scroll-right");
const scrollLeftBtn = document.getElementById("scroll-left");
const popPodcast = document.querySelector(".pop-podcast");

scrollRightBtn.addEventListener("click", function() {
  // Scroll the pop-podcast element to the right by 100px
  popPodcast.scrollLeft += 100;
});

scrollLeftBtn.addEventListener("click", function() {
  // Scroll the pop-podcast element to the left by 100px
  popPodcast.scrollLeft -= 100;
});

const popPod = document.getElementById("pop-pod");

const podcastList = document.getElementById("podcast-list");