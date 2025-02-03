//defining consts for my api
const BASE_URL = "https://fr24api.flightradar24.com/api";

const ENDPOINT = "/live/flight-positions/full";

/* const TOKEN =
  "hidden"; */

const fetchFlights = () => {
  fetch(`${BASE_URL}${ENDPOINT}?airports=both:ESSA`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      "Accept-Version": "v1",
    },
  })
    .then((res) => {
      if (!res.ok) {
        console.log("Houston, we got a problem!", res);
        throw new Error(`HTTP error! ojojStatus ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("Data", data);
      // flights arriving at ESSA with an ETA
      const flights = data.data || [];

      // create a blob with the json data
      const blob = new Blob([JSON.stringify(flights, null, 2)], {
        type: "application/json",
      });

      saveAs(blob, "flights.json");

      document.getElementById("app").innerHTML = `
        <h1>Airline info!</h1>
        <p>Flights data has been saved to a file.</p>
        
        `;
    })
    .catch((error) => console.error("Fetch error:", error));
};
/* fetchFlights();
 */
