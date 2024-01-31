import "../css/styles.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhZeDo3aGNoA0V9UTGk7EsMR3utGY9CZw",
  authDomain: "sirdavjavadvs2i.firebaseapp.com",
  projectId: "sirdavjavadvs2i",
  storageBucket: "sirdavjavadvs2i.appspot.com",
  messagingSenderId: "544181314677",
  appId: "1:544181314677:web:e8c78571865de25a08c43c",
  measurementId: "G-Q2J61JTK4B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

let newsList = [];
let currentIndex = 0;
const newsContainer = document.getElementById("news-container");
const loadMoreBtn = document.getElementById("load-more-btn");
const loadOneBtn = document.getElementById("load-one-btn");

async function fetchNews() {
  try {
    const response = await fetch(
      "https://hacker-news.firebaseio.com/v0/newstories.json"
    );
    newsList = await response.json();
    loadMoreNews();
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

async function loadNews(quantity) {
  try {
    for (let i = currentIndex; i < currentIndex + quantity; i++) {
      if (i >= newsList.length) {
        loadMoreBtn.style.display = "none";
        loadOneBtn.style.display = "none";
        break;
      }
      const newsId = newsList[i];
      const newsUrl = `https://hacker-news.firebaseio.com/v0/item/${newsId}.json`;
      const response = await fetch(newsUrl);
      const news = await response.json();
      displayNews(news);
    }
    currentIndex += quantity;
  } catch (error) {
    console.error("Error loading news:", error);
  }
}

function displayNews(news) {
  const newsDetails = document.createElement("div");
  newsDetails.innerHTML = `<strong>${news.title}</strong> - <a href="${news.url}" target="_blank">Read more</a> - ${new Date(
    news.time * 1000
  ).toLocaleDateString()}`;
  newsDetails.style.color = "aliceblue";
  newsDetails.style.opacity = 0.8;
  newsContainer.appendChild(newsDetails);
}

function loadMoreNews() {
  loadNews(10);
}

function loadOneNews() {
  loadNews(1);
}

fetchNews();

loadMoreBtn.addEventListener("click", loadMoreNews);
loadOneBtn.addEventListener("click", loadOneNews);
