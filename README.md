# Dog Breeds Explorer

A simple web app using TheDogAPI to browse dog breeds and view details.

## Features
- Select a breed from dropdown to see a random image (uses /v1/images/search endpoint)
- Click image to view full breed details: name, temperament, life span, origin (uses /v1/breeds + image endpoint)
- Navigation between pages

## Technologies
- HTML, CSS, JavaScript (vanilla)
- TheDogAPI

## How to Run
1. Clone the repo: `git clone https://github.com/kbieman21/dog-api-prework`
2. Open the folder.
3. Replace `API_KEY` of your own in both JS files; I am using the free api key and I am letting you use mine just for test purpose.
4. Open `index.html` in any modern browser (Chrome, Firefox, etc.) – no server needed.


Note: API key is required for breed data & images. Without it, images may load but breeds won't.

## Endpoints Used
- GET https://api.thedogapi.com/v1/breeds -> list & details
- GET https://api.thedogapi.com/v1/images/search?breed_ids=123 -> breed-specific image

