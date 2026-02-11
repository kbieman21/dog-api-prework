const API_KEY = "live_wfpvyRj5cldavlggdnNnxTose0qr5tCFXU9iMDSsxZETn7tdOXoPJUfkNIlccdIZ";

const urlParams = new URLSearchParams(window.location.search);
const breedId = urlParams.get("breedId");

if(!breedId){
  document.body.innerHTML = "<p>No breed selected.</p>";
}else{
  loadBreed(breedId)
}

async function loadBreed(id) {
   console.log("Fetching breeds ...");
  try {
    //get breed data
    const breedRes = await fetch("https://api.thedogapi.com/v1/breeds", {
          headers: { "x-api-key": API_KEY }});

    const breeds = await breedRes.json();
    const breed = breeds.find(b => b.id == id);

    if(!breed){
      document.body.innerHTML = "<p>Breed not found.</p>";
      return;
    }

    //get image
    const imgRes = await fetch(`https://api.thedogapi.com/v1/images/search?breed_ids=${id}&limit=1`,
          { headers: { "x-api-key": API_KEY }});

          const imgData = await imgRes.json();
          const imgUrl = imgData[0]?.url || "Image not found";

          document.getElementById("breed-name").textContent = breed.name;
          document.getElementById("breed-img").src = imgUrl;
          document.getElementById("breed-img").alt = breed.name;

          document.getElementById("breed-info").innerHTML = `
          <p><strong>Temperament:</strong> ${breed.temperament || "Unknown"}</p>
          <p><strong>Life Span:</strong> ${breed.life_span || "Unknown"}</p>
          <p><strong>Origin:</strong> ${breed.origin || "Unknown"}</p>
          <p><strong>Breed Group:</strong> ${breed.breed_group || "Not listed"}</p>
        `;
  } catch (error) {
    document.getElementById("breed-info").innerHTML = "<p>Failed to load details.</p>";
  }
}