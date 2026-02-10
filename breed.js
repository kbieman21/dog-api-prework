
const breedContainer = document.getElementById("breeds-container");
const button = document.getElementById("load-breed");

button.addEventListener("click", fetchSpecificBreed);

async function fetchSpecificBreed() {
    try {
         console.log("Fetching breeds...");
        const res = await fetch(
            "https://api.thedogapi.com/v1/breeds", {headers: {"x-api-key": API_KEY}}
        )
        const data = await res.json();
        
        console.log(data);

        displayBreeds(data)
    } catch (error) {
        showError("Failed to load breeds");
        //console.error("Failed to load dog", error);
    }
}


function displayBreeds(breeds){
   //breedContainer.innerHTML = `<img src="${dog.url}" alt="Random dog" />`;
   //breedContainer.innerHTML = `<p>Some detail</p>`
   breedContainer.innerHTML = breeds.slice(0, 10).map(breed => `<div class="breed-card">
          <h3>${breed.name}</h3>
          <p><strong>Temperament:</strong> ${breed.temperament || "N/A"}</p>
          <p><strong>Life Span:</strong> ${breed.life_span}</p>
        </div>`).join("");
}

function showError(message) {
  document.getElementById("error-message").textContent = message;
}
