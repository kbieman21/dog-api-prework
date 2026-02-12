const favGrid = document.getElementById("favorites-grid");

function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    favGrid.innerHTML = "<p>No favorites yet.</p>";
    return;
  }

  favGrid.innerHTML = favorites.map(f => `
    <div class="card">
      <img src="${f.image}" onclick="goToDetails('${f.slug}')"/>
      <h3>${f.name}</h3>
    </div>
  `).join("");
}

loadFavorites();
