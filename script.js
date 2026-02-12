const breedGrid = document.getElementById("breed-grid");
const searchInput = document.getElementById("search");

let allBreeds = []; // store breeds globally

async function loadBreeds() {
  try {
    const res = await fetch("https://dog.ceo/api/breeds/list/all");
    const { message: breedsObj } = await res.json();

    console.log(breedsObj);

    const breedNames = Object.keys(breedsObj);

    //const breedNamesV = Object.values(breedsObj);

    console.log(breedNames);
    //console.log(breedNamesV);

    allBreeds = breedNames.map((name) => ({
      name,
      slug: getBreedSlug(name),
    }));

    displayBreeds(allBreeds);
  } catch (err) {
    console.error(err);
  }
}

async function displayBreeds(breeds) {
  breedGrid.innerHTML = "<p>Loading breeds...</p>";

  const cards = await Promise.all(
    breeds.map(async (breed) => {
      try {
        const imgRes = await fetch(
          `https://dog.ceo/api/breed/${breed.slug}/images/random`,
        );
        const { message: imageUrl } = await imgRes.json();

        return `
          <div class="card">
            <img src="${imageUrl}" 
                 onclick="goToDetails('${breed.slug}')"/>
            <h3>${breed.name}</h3>
            <button onclick="toggleFavorite('${breed.slug}', '${breed.name}', '${imageUrl}')">
              ❤️ Favorite
            </button>
          </div>
        `;
      } catch {
        return "";
      }
    }),
  );

  breedGrid.innerHTML = cards.join("");
}

searchInput.addEventListener("input", function () {
  const term = this.value.toLowerCase();

  const filtered = allBreeds.filter((b) => b.name.toLowerCase().includes(term));

  if(filtered.length ===0){
    breedGrid.innerHTML = "<p>No breeds found.</p>";
  }else{
     displayBreeds(filtered);
  }

 
});

function toggleFavorite(slug, name, image) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const exists = favorites.find((f) => f.slug === slug);

  if (exists) {
    favorites = favorites.filter((f) => f.slug !== slug);
    alert(slug + " Removed from Favorites");
  } else {
    favorites.push({ slug, name, image });
    
    alert(slug + " Added to Favorites!");
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

//when click the image go to the detail page
function goToDetails(slug) {
  window.location.href = `breeds.html?breed=${encodeURIComponent(slug)}`;
}

// Helper to convert breed name to dog.ceo slug (handles sub-breeds like "german shepherd" → "german/shepherd")
function getBreedSlug(name) {
  const lower = name.toLowerCase();
  // Common sub-breed mappings (add more as you test)
  const subBreedMap = {
    "german shepherd": "german/shepherd",
    "australian shepherd": "australian/shepherd",
    "bernese mountain dog": "mountain/bernese",
    "st. bernard": "stbernard", // no dot, no space
    "pembroke welsh corgi": "corgi/welsh-pembroke",
    "cardigan welsh corgi": "corgi/welsh-cardigan",
    //"bulldog french": "bulldog/french"
  };

  if (subBreedMap[lower]) return subBreedMap[lower];

  // Default: replace spaces with / (for most sub-breeds)
  return lower.replace(/ /g, "/");
}

function isFavorite(slug) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  return favorites.some(f => f.slug === slug);
}


// Start
loadBreeds();
