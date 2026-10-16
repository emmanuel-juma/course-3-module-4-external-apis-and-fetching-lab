// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const form = document.querySelector("form");
const stateInput = document.querySelector("#state");
const alertsContainer = document.querySelector("#weather-alerts");
const errorMessage = document.querySelector("#error-message");

// Fetch weather alerts for a state
function fetchWeatherAlerts(state) {
  fetch(`https://api.weather.gov/alerts/active?area=${state}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayAlerts(data, state);
    })
    .catch((error) => {
      console.log(error.message);
      showError(error.message);
    });
}

// Display the weather alerts
function displayAlerts(data, state) {
  // Clear previous results and errors
  alertsContainer.innerHTML = "";
  errorMessage.textContent = "";
  errorMessage.hidden = true;

  // Create the summary
  const summary = document.createElement("h2");
  summary.textContent = `${data.title} for ${state}: ${data.features.length}`;

  alertsContainer.appendChild(summary);

  // Create a list of alert headlines
  const alertList = document.createElement("ul");

  data.features.forEach((alert) => {
    const listItem = document.createElement("li");
    listItem.textContent =
      alert.properties.headline || "Headline unavailable";

    alertList.appendChild(listItem);
  });

  alertsContainer.appendChild(alertList);
}

// Display errors
function showError(message) {
  alertsContainer.innerHTML = "";
  errorMessage.textContent = message;
  errorMessage.hidden = false;
}

// Handle form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const state = stateInput.value.trim().toUpperCase();

  // Clear old results and the input field
  alertsContainer.innerHTML = "";
  stateInput.value = "";

  // Validate input
  if (!/^[A-Z]{2}$/.test(state)) {
    showError("Please enter a valid two-letter state abbreviation.");
    return;
  }

  // Hide any previous error
  errorMessage.textContent = "";
  errorMessage.hidden = true;

  fetchWeatherAlerts(state);
});