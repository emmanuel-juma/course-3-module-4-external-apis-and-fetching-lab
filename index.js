// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

function fetchWeatherAlerts(state) {
  fetch(`https://api.weather.gov/alerts/active?area=${state}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayAlerts(data, state);

      errorMessage.textContent = "";
      errorMessage.classList.add("hidden");
    })
    .catch((error) => {
      console.log(error.message);

      errorMessage.textContent = error.message;
      errorMessage.classList.remove("hidden");
    });
}

function displayAlerts(data, state) {
  // Clear previous alerts
  alertsDisplay.innerHTML = "";

  // Create the summary
  const summary = document.createElement("h2");
  summary.textContent = `Weather Alerts: ${data.features.length}`;
  alertsDisplay.appendChild(summary);

  // Create a list of alert headlines
  const alertList = document.createElement("ul");

  data.features.forEach((alert) => {
    const li = document.createElement("li");
    li.textContent =
      alert.properties.headline || "Headline unavailable";

    alertList.appendChild(li);
  });

  alertsDisplay.appendChild(alertList);
}

fetchButton.addEventListener("click", () => {
  const state = stateInput.value.trim().toUpperCase();

  // Clear the input after clicking
  stateInput.value = "";

  // Clear previous alerts and errors
  alertsDisplay.innerHTML = "";
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");

  // Validate the state abbreviation
  if (!/^[A-Z]{2}$/.test(state)) {
    errorMessage.textContent =
      "Please enter a valid two-letter state abbreviation.";
    errorMessage.classList.remove("hidden");
    return;
  }

  fetchWeatherAlerts(state);
});