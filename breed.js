const API_KEY =
  "live_wfpvyRj5cldavlggdnNnxTose0qr5tCFXU9iMDSsxZETn7tdOXoPJUfkNIlccdIZ";

const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get("breed");
const breedNameFromSlug = slug
  ? decodeURIComponent(slug)
      .replace("/", " ")
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  : "";

document.getElementById("breed-name").textContent =
  breedNameFromSlug || "Breed Details";

if (!slug) {
  document.getElementById("breed-info").innerHTML = "<p>No breed selected.</p>";
} else {
  loadBreedDetails(slug, breedNameFromSlug);
}

async function loadBreedDetails(slug, displayName) {
  document.getElementById("breed-info").innerHTML = "<p>Loading details...</p>";

  try {
    // get metadata from TheDogAPI
    const breedRes = await fetch("https://api.thedogapi.com/v1/breeds", {
      headers: { "x-api-key": API_KEY },
    });

    if (!breedRes.ok) throw new Error("Breeds fetch failed");

    const breeds = await breedRes.json();

    //find matching breed by name
    const breed = breeds.find(
      (b) =>
        b.name.toLowerCase() === displayName.toLowerCase() ||
        b.name.toLowerCase().includes(displayName.toLowerCase().split(" ")[0]),
    );

    let infoHTML = "";
    if (breed) {
      infoHTML = `
          <p><strong>Temperament:</strong> ${breed.temperament || "Unknown"}</p>
          <p><strong>Life Span:</strong> ${breed.life_span || "Unknown"}</p>
          <p><strong>Origin:</strong> ${breed.origin || "Unknown"}</p>
          <p><strong>Breed Group:</strong> ${breed.breed_group || "Not listed"}</p>
          <p><strong>Bred For:</strong> ${breed.breed_for || "Not specified"}</p>
          
        `;
    } else {
      infoHTML =
        "<p>Breed details not found in database. Showing image only.</p>";
    }

    // get fresh image from dog.ceo that matches the breed
    const imgRes = await fetch(
      `https://dog.ceo/api/breed/${slug}/images/random`,
    );
    const { message: imgUrl, status } = await imgRes.json();

    const imgSrc = status === "success" && imgUrl ? imgUrl : "https://via.placeholder.com/400?text=No+Image"; 

    document.getElementById("breed-img").src = imgSrc;
    document.getElementById("breed-img").alt = displayName;
           
    document.getElementById("breed-info").innerHTML = infoHTML;
  } catch (error) {
    console.error("Details load error:", error);
    document.getElementById("breed-info").innerHTML =
      "<p style='color:red;'>Failed to load details. Try again later.</p>";
  }
}


