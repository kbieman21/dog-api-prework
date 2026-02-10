
const button = document.getElementById("load-dog");
const dogContainer = document.getElementById("dog-container");



button.addEventListener("click", fetchAnyDog);


async function fetchAnyDog() {
    console.log("Fetching dog...");
    try {
        const res = await fetch(
            "https://api.thedogapi.com/v1/images/search?has_breeds=1&limit=1", {headers: {"x-api-key": API_KEY}}
        );

        const data = await res.json();
       
          console.log("API response:", data);

           displayDog(data[0])
        
    } catch (error) {
        showError("Failed to load dog image");
        //console.error("Failed to load dog", error);
    }
}


function displayDog(dog) {
  const breed = dog.breeds && dog.breeds.length > 0
    ? dog.breeds[0]
    : null;

  if (!breed) {
    dogContainer.innerHTML = `
      <div class="dog-card">
        <img src="${dog.url}" alt="Random dog" />
        <p>Breed information not available</p>
      </div>
    `;
    return;
  }

  dogContainer.innerHTML = `
    <div class="dog-card">
      <img src="${dog.url}" alt="${breed.name}" />
      <h3>${breed.name}</h3>
      <p><strong>Temperament:</strong> ${breed.temperament}</p>
      <p><strong>Life Span:</strong> ${breed.life_span}</p>
      <p><strong>Origin:</strong> ${breed.origin || "Unknown"}</p>
       <a href="breeds.html?breedId=${breed.id}">
        View more about ${breed.name}
      </a>
    </div>
  `;
}


function showError(message) {
  document.getElementById("error-message").textContent = message;
}


