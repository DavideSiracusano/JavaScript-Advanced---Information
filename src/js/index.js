import "../css/styles.css";

let newsList = []; // Array to store the list of news
let currentIndex = 0; // Index to keep track of the current batch of news

// Function to fetch the list of new stories from the Hacker News API
async function fetchNews() {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/newstories.json"
  );
  const data = await response.json();
  newsList = data;
  loadMoreNews(); // Load the initial batch of news
}

// Function to load and display the next 10 news
function loadMoreNews() {
  const newsContainer = document.getElementById("news-container");
  const loadMoreBtn = document.getElementById("load-more-btn");

  // Display details of the next 10 news
  for (let i = currentIndex; i < currentIndex + 10; i++) {
    if (i >= newsList.length) {
      loadMoreBtn.style.display = "none"; // Hide the "Load more" button if there are no more news
      break;
    }

    const newsId = newsList[i];
    const newsUrl = `https://hacker-news.firebaseio.com/v0/item/${newsId}.json`;

    fetch(newsUrl)
      .then((response) => response.json())
      .then((news) => {
        // Display news details (title, link, and date) in the container
        const newsDetails = document.createElement("div");
        newsDetails.innerHTML = `<strong>${news.title}</strong> - <a href="${news.url}" target="_blank">Read more</a> - ${new Date(news.time * 1000).toLocaleDateString()}`;
        newsDetails.style.color = "aliceblue";
        newsDetails.style.opacity = 0.8;
        newsContainer.appendChild(newsDetails);
      })
      .catch((error) => console.error("Error fetching news:", error));
  }

  currentIndex += 10; // Move to the next batch
}

// Initialize the app by fetching the initial batch of news
fetchNews();

document
  .getElementById("load-more-btn")
  .addEventListener("click", loadMoreNews);
