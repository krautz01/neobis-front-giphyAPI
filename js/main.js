document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search__input");
  const searchButton = document.getElementById("search__button");

  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== "") {
      searchGIF(searchTerm);
    }
  });
});

function searchGIF(searchTerm) {
  const API_KEY = "AeyUZFfHgPw5xFqf8FGsekW3iP4MIBZs"; // Вставьте свой API ключ GIPHY
  const limit = 6;
  const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=${limit}`;

  fetch(endpoint)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      displayGIFs(data.data);
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}

function displayGIFs(gifsData) {
  const gifContainer = document.getElementById("gif");
  gifContainer.innerHTML = ""; // Очищаем содержимое контейнера перед отображением новых GIF

  gifsData.forEach((gif) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figCaption = document.createElement("figcaption");

    img.src = gif.images.downsized.url;
    img.alt = gif.title;
    figCaption.textContent = gif.title;

    figure.appendChild(img);
    figure.appendChild(figCaption);

    gifContainer.appendChild(figure);
  });
}
