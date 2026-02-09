
async function fetchAnyDog() {
    try {
        const res = await fetch(
            "https://api.thedogapi.com/v1", {headers: {"dog-api-key": API_KEY}}
        );

        const data = await res.json();
        displayDog(data[0])
    } catch (error) {
        showError("Failed to load dog image");
    }
}



async function fetchSpecificBreed() {
    try {
        const res = await fetch(
             "https://api.thedogapi.com/v1", {headers: {"dog-api-key": API_KEY}}
        )
    } catch (error) {
        
    }
}