import * as Carousel from "./Carousel.js";
import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
infoDump.style.display = "none";
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");
document.getElementById("fav-p").style.display = "none";
// Step 0: Store your API key here for reference and easy access.
const API_KEY =
  "live_VK9v9Y7A19F4Eqlo3fNyWAQ8iaY1dhKu3Lvg4ImOoygZPAp5oit1zOe7r4POvWc3";
axios.defaults.baseURL = "https://api.thecatapi.com/v1";
axios.defaults.headers.common["x-api-key"] = API_KEY;

/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */
// (async function initalLoad() {
//   const response = await fetch(
//     `https://api.thecatapi.com/v1/breeds?api_key=${API_KEY}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     },
//   );
//   handleResponse(response);
//   retrieveData();
// })();

// const handleResponse = async (response) => {
//   if (response.ok) {
//     const breeds = await response.json();

//     breeds.forEach((breed) => {
//       const option = document.createElement("option");
//       option.text = breed.name;
//       option.value = breed.id;
//       breedSelect.appendChild(option);
//     });
//   } else {
//     console.log(response.status);
//     return response.status;
//   }
// };

/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */

// async function retrieveData() {
//   const value = breedSelect.value;
//   try {
//     const response = await fetch(
//       `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${value}&api_key=${API_KEY}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//     );
//     handlelListOfImgs(response);
//   } catch (err) {
//     console.error(err);
//   }
// }

// const handlelListOfImgs = async (response) => {
//   if (response.ok) {
//     Carousel.clear();
//     const elements = await response.json();
//     elements.forEach((elem) => {
//       const child = Carousel.createCarouselItem(
//         elem.url,
//         elem.breeds.name,
//         elem.id,
//       );
//       Carousel.appendCarousel(child);
//     });
//     Carousel.start();
//     showInfo(elements[0].breeds[0]);
//   } else {
//     console.log(response.status);
//   }
// };

// const showInfo = (breed) => {
//   const table = infoDump.querySelector("table");
//   const data = table.querySelectorAll("td");
//   infoDump.style.display = "block";

//   table.querySelector("caption").textContent = breed.name;

//   data.forEach((d, index) => {
//     switch (index) {
//       case 0:
//         d.textContent = breed.affection_level;
//         break;
//       case 1:
//         d.textContent = breed.child_friendly;
//         break;
//       case 2:
//         d.textContent = breed.dog_friendly;
//         break;
//       case 3:
//         d.textContent = breed.hypoallergenic;
//         break;
//       case 4:
//         d.textContent = breed.social_needs;
//         break;
//       case 5:
//         d.textContent = breed.life_span;
//         break;
//       default:
//         d.textContent = "";
//         break;
//     }
//   });
// };

// breedSelect.addEventListener("change", retrieveData);

/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */

(async function initalLoad() {
  try {
    const response = await axios.get("/breeds");
    const breeds = response.data;
    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    handleResponse(breeds);
  } catch (err) {
    console.error(err);
  }
  retrieveData();
})();

const handleResponse = (breeds) => {
  breeds.forEach((breed) => {
    const option = document.createElement("option");
    option.text = breed.name;
    option.value = breed.id;
    breedSelect.appendChild(option);
  });
};

async function retrieveData() {
  const value = breedSelect.value;
  try {
    const response = await axios.get(
      `/images/search?limit=10&breed_ids=${value}`,
      {
        onDownloadProgress: updateProgress,
      },
    );

    if (!response.data[0]) {
      infoDump.style.display = "none";
      document.getElementById("fav-p").style.display = "block";
      document.getElementById("fav-p").textContent = "Not data provided";
      Carousel.clear();
      throw new Error("No data provided.");
    } else {
      const elements = response.data;
      handleAppendingCarousel(elements);
    }

    // const { data, durationInMS } = await axios(
    //   `/images/search?limit=10&breed_ids=${value}`,
    // );
  } catch (err) {
    console.error(err);
  }
}

const handleAppendingCarousel = (elements) => {
  document.getElementById("fav-p").style.display = "none";
  Carousel.clear();
  elements.forEach((elem) => {
    const child = Carousel.createCarouselItem(
      elem.url,
      breedSelect.value,
      elem.id,
    );
    Carousel.appendCarousel(child);
  });
  Carousel.start();
  showInfo(elements[0].breeds[0]);
};

const showInfo = (breed) => {
  const table = infoDump.querySelector("table");
  const data = table.querySelectorAll("td");
  infoDump.style.display = "block";
  table.querySelector("caption").textContent = breed.name;
  data.forEach((d, index) => {
    switch (index) {
      case 0:
        d.textContent = breed.affection_level;
        break;
      case 1:
        d.textContent = breed.child_friendly;
        break;
      case 2:
        d.textContent = breed.dog_friendly;
        break;
      case 3:
        d.textContent = breed.hypoallergenic;
        break;
      case 4:
        d.textContent = breed.social_needs;
        break;
      case 5:
        d.textContent = breed.life_span;
        break;
      default:
        d.textContent = "";
        break;
    }
  });
};

breedSelect.addEventListener("change", retrieveData);
/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

axios.interceptors.request.use((request) => {
  document.body.style.cursor = "progress";
  progressBar.style.width = "0%";
  //console.log("Request started");
  request.metadata = request.metadata || {};
  request.metadata.startTime = new Date().getTime();
  return request;
});

axios.interceptors.response.use(
  (response) => {
    //console.log("Request ended");
    document.body.style.cursor = "default";
    response.config.metadata.endTime = new Date().getTime();
    response.durationInMS =
      response.config.metadata.endTime - response.config.metadata.startTime;
    console.log(`Request took ${response.durationInMS}`);
    return response;
  },
  (error) => {
    error.config.metadata.endTime = new Date().getTime();
    error.durationInMS =
      error.config.metadata.endTime - error.config.metadata.startTime;
    console.log(`Request took ${response.durationInMS}`);
    throw error;
  },
);
/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */

function updateProgress(ProgressEvent) {
  //console.log(ProgressEvent.progress);
  const percentage = Math.round(ProgressEvent.progress * 100);
  setTimeout(() => {
    progressBar.style.width = `${percentage}%`;
  }, 500);
  progressBar.style.transition = "width ease 1s";
}

/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */
/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */
export async function favourite(imgId) {
  let requestBody = { image_id: imgId };
  const isExisting = await axios.get(`/favourites?image_id=${imgId}`);
  console.log(isExisting);

  if (isExisting.data[0]) {
    //console.log(isExisting.data[0]);
    await axios.delete(`/favourites/${isExisting.data[0].id}`);
    console.log("Delete img with id");
  } else {
    await axios.post("/favourites", requestBody);
    console.log("Added img");
  }
}

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */
async function getFavourites() {
  const getFav = await axios.get(`/favourites`);
  const elements = getFav.data;
  Carousel.clear();
  elements.forEach((elem) => {
    const child = Carousel.createCarouselItem(
      elem.image.url,
      breedSelect.value,
      elem.image.id,
    );
    Carousel.appendCarousel(child);
  });
  Carousel.start();
  document.getElementById("fav-p").style.display = "block";
  document.getElementById("fav-p").textContent = "Your saved favourites";
  infoDump.style.display = "none";
}

getFavouritesBtn.addEventListener("click", getFavourites);
/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */
