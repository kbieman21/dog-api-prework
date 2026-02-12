const breedSelect = document.getElementById("breed-select");
const dogArea = document.getElementById("dog-area");

// Helper to convert breed name to dog.ceo slug (handles sub-breeds like "german shepherd" → "german/shepherd")
function getBreedSlug(name) {
  const lower = name.toLowerCase();
  // Common sub-breed mappings (add more as you test)
  const subBreedMap = {
    "german shepherd": "german/shepherd",
    "australian shepherd": "australian/shepherd",
    "bernese mountain dog": "mountain/bernese",
    "st. bernard": "stbernard",  // no dot, no space
    "pembroke welsh corgi": "corgi/welsh-pembroke",
    "cardigan welsh corgi": "corgi/welsh-cardigan",
    //"bulldog french": "bulldog/french" 
  };

  if (subBreedMap[lower]) return subBreedMap[lower];

  // Default: replace spaces with / (for most sub-breeds)
  return lower.replace(/ /g, "/");
}

//load all breeds once
async function loadBreeds() {
  console.log("Fetching breeds ...");

  try {
    const breedsRes = await fetch("https://dog.ceo/api/breeds/list/all");

    if(!breedsRes.ok) throw new Error(`HTTP ${breedsRes.status}`);

    const {message:breedsObj, status} = await breedsRes.json();

    console.log("status" ,status);
     console.log("message" ,breedsObj[0]);
    
    if(status !== "success") throw new Error("API Error");

    const breedList = Object.keys(breedsObj).map(name => ({name, slug: getBreedSlug(name)}));
    console.log("breed list", breedList);

    // sort by display name
    breedList.sort((a,b) => a.name.localeCompare(b.name));

    breedSelect.innerHTML =
      `<option value="">Choose a breed</option>` +
      breedList.map((b) => `<option value="${b.slug}">${b.name}</option>`).join("");

      console.log(`Loaded ${breedList.length} breeds`);
  } catch (error) {
    console.error("Breed load failed:", error);
    document.getElementById("error-message").textContent =
      "Couldn't Load breeds";
  }
}

//when breed selected, fetch image
breedSelect.addEventListener("change", async function () {
  const slug = this.value;
  dogArea.innerHTML = ""; // clear

  if (!slug) return;

  dogArea.innerHTML = "<p>Loading image...</p>";

 
    try {
        const imgRes = await fetch(`https://dog.ceo/api/breed/${slug}/images/random`);

        if (!imgRes.ok){
            throw new Error(`Image fetch failed: ${imgRes.status}`);
        }

        const { message: url, status } = await imgRes.json();
        if (status !== "success" || !url) throw new Error("No image");

        dogArea.innerHTML = `<img src="${url}" alt="${slug.replace("/", " ")}" onclick="goToDetails('${encodeURIComponent(slug)}')"/>`;



       
    } catch (error) {
        console.error("Image error:", error);
        dogArea.innerHTML = `<p style="color:red;">No image available right now. Try another breed.</p>`;
    }
 
});

//when click the image go to the detail page
function goToDetails(slug) {
  window.location.href = `breeds.html?breed=${encodeURIComponent(slug)}`;
}

// Start
loadBreeds();
