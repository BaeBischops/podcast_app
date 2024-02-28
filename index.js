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

function fetchAndDisplaySeasons(id) {
  fetch(`https://podcast-api.netlify.app/id/${id}/seasons`)
  .then(response => response.json())
  .then(data => {
      // Assuming the seasons data is an array of objects with season information
      // You can adjust this part according to the actual structure of your data
      const seasons = data.seasons;
      console.log(data);

      const seasonsList = document.createElement("ul");
      seasonsList.classList.add("seasons-list");

      seasons.forEach(season => {
        const seasonItem = document.createElement("li");
        seasonItem.classList.add("item");
        seasonItem.id = season.id; // Assuming season.id is the ID for the item
    
        const seasonNumber = season.number < 10 ? `0${season.number}` : season.number; // Add leading zero if necessary
        const seasonNumberSpan = document.createElement("span");
        seasonNumberSpan.textContent = seasonNumber;
        seasonItem.appendChild(seasonNumberSpan);
    
        const seasonImage = document.createElement("img");
        seasonImage.src = season.image; // Assuming season.image contains the image URL
        seasonImage.alt = "";
        seasonItem.appendChild(seasonImage);
    
        const seasonTitle = document.createElement("h5");
        seasonTitle.textContent = season.title;
        const subtitle = document.createElement("p");
        subtitle.classList.add("subtitle");
        const playIcon = document.createElement("i");
        playIcon.classList.add("bi", "bi-play-circle");
        subtitle.appendChild(playIcon);
        seasonTitle.appendChild(subtitle);
        seasonItem.appendChild(seasonTitle);
    
        seasonsList.appendChild(seasonItem);
    });    

      // Assuming you have a container element where you want to append the seasons list
      const seasonsContainer = document.getElementById("seasons-container");
      seasonsContainer.innerHTML = ""; // Clear previous content
      seasonsContainer.appendChild(seasonsList);
  })
  .catch(error => {
      console.error("Error fetching seasons:", error);
  });
}

