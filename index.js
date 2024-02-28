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
// Fetch data from the API
fetch("https://podcast-api.netlify.app/shows")
.then(response => response.json())
.then(data => {
  // Iterate through the data and create HTML for each show
  data.forEach(show => {
    const listItem = document.createElement("li");
    listItem.classList.add("item");

    const imgPlayDiv = document.createElement("div");
    imgPlayDiv.classList.add("img-play");

    const img = document.createElement("img");
    img.src = show.image;
    img.alt = "";

    const playIcon = document.createElement("i");
    playIcon.classList.add("bi", "bi-play-circle");
    playIcon.dataset.id = show.id;

    imgPlayDiv.appendChild(img);
    imgPlayDiv.appendChild(playIcon);

    const h5 = document.createElement("h5");
    h5.textContent = show.title;

    const subtitle = document.createElement("p");
    subtitle.classList.add("subtitle");
    subtitle.textContent = show.description;

    const playIconSubtitle = document.createElement("i");
    playIconSubtitle.classList.add("bi", "bi-play-circle");

    subtitle.appendChild(playIconSubtitle);

    h5.appendChild(subtitle);

    listItem.appendChild(imgPlayDiv);
    listItem.appendChild(h5);

    podcastList.appendChild(listItem);
  });
})
.catch(error => {
  console.error("Error fetching data:", error);
});

