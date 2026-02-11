const API_KEY =
  "live_wfpvyRj5cldavlggdnNnxTose0qr5tCFXU9iMDSsxZETn7tdOXoPJUfkNIlccdIZ";

const breedSelect = document.getElementById("breed-select");
const dogArea = document.getElementById("dog-area");

let breeds = [];

//load all breeds once
async function loadBreeds() {
  console.log("Fetching breeds ...");

  try {
    const res = await fetch("https://api.thedogapi.com/v1/breeds", {
      headers: { "x-api-key": API_KEY },
    });

    //const data = await res.json();
    breeds = await res.json();
    console.log(breeds);

    breedSelect.innerHTML =
      `<option value="">Choose a breed</option>` +
      breeds.map((b) => `<option value="${b.id}">${b.name}</option>`).join("");
  } catch (error) {
    document.getElementById("error-message").textContent =
      "Couldn't Load breeds";
  }
}

//when breed selected, fetch image
breedSelect.addEventListener("change", async function () {
  const breedId = this.value;
  dogArea.innerHTML = "Loading image";

  console.log("Selected Breed ID:", breedId); // ← Should be 74 for Dalmatian
  console.log(
    "Fetch URL:",
    `https://api.thedogapi.com/v1/images/search?breed_ids=${breedId}&limit=1`,
  );

  if (!breedId) return;

  try {
    const res = await fetch(
      `https://api.thedogapi.com/v1/images/search?breed_ids=${breedId}&limit=1`,
      { headers: { "x-api-key": API_KEY } },
    );

    const data = await res.json();

    console.log("API Response Breed Name:", data[0]?.breeds[0]?.name);  // ← Should say "Dalmatian"
  console.log("Image URL:", data[0]?.url);  // ← Copy this URL and paste in browser to view
    const img = data[0];

    dogArea.innerHTML = `
          <img src="${img.url}" 
               alt="${breeds.find((b) => b.id == breedId)?.name}" 
               onclick="goToDetails(${breedId})" />
        `;
  } catch (error) {
    dogArea.innerHTML = "No image found for this breed.";
  }
});

//when click the image go to the detail page
function goToDetails(breedId) {
  window.location.href = `breeds.html?breedId=${breedId}`;
}

// Start
loadBreeds();
