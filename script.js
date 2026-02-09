


const button = document.getElementById("load-dog");
const dogContainer = document.getElementById("dog-container");
const breedContainer = document.getElementById("breeds-container");


button.addEventListener("click", fetchAnyDog);





async function fetchAnyDog() {
    console.log("Fetching dog...");
    try {
        const res = await fetch(
            "https://api.thedogapi.com/v1/images/search", {headers: {"x-api-key": API_KEY}}
        );

        const data = await res.json();
       
          console.log("API response:", data);

           displayDog(data[0])
        
    } catch (error) {
        //showError("Failed to load dog image");
        console.error("Failed to load dog", error);
    }
}





function displayDog(dog){
    dogContainer.innerHTML = `<img src="${dog.url}" alt="Random dog" />`;
}

