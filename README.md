# Dog Breeds Explorer

A simple web app using TheDogAPI and dog.ceo/dog-api to browse dog breeds and view details.

## Features
- Select a breed from the list populated from the Dog CEO API
- Clicking the image navigates to a details page showing breed metadata
- Breed details (temperament, life span, origin, breed group, etc.) fetched from The Dog API
- Clean navigation between the main page and breed details page and favorite page
- Responsive and user-friendly design with error handling

## Technologies
- HTML, CSS, JavaScript (vanilla)
- TheDogAPI
- dog.ceo/dog-api

## How to Run
1. Clone the repo: `git clone https://github.com/kbieman21/dog-api-prework`
2. Open the folder.
3. Replace `API_KEY` of your own in the breed.js file; I am using the free api key and I am letting you use mine just for test purpose.
4. Open `index.html` in any modern browser (Chrome, Firefox, etc.) – no server needed.


# public access
- if you like to access this in public this is the address - https://dog-api-prework.netlify.app/


Note: API key is required for breed data in the TheDogAPI. Without it, images may load but breeds and detail info won't.

## Endpoints Used
- GET `https://dog.ceo/api/breeds/list/all` and `https://dog.ceo/api/breed/${slug}/images/random` - for breed list and random images
- GET `https://api.thedogapi.com/v1/breeds` - for Breed metadata (temperament, etc.)

