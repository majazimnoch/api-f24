const infoFromJson = () => {
  fetch("./flights.json")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      // task 1 - Estimate the total number of flights operating to/from Stockholm Arlanda Airport over a time period of your choice (e.g., an hour, a few days).
      const FlightsToArlanda = data.filter((plane) => {
        const eta = new Date(plane.eta);
        const hour = eta.getUTCHours();
        const timeStart = 19;
        const timeOver = 20;

        return (
          hour >= timeStart && hour < timeOver && plane.dest_icao == "ESSA"
        );
      });
      console.log("Task 1: Flights landing at ESSA", FlightsToArlanda);
      console.log(
        `Task 1:Planes landing at ESSA between 19 and 20 2 Feb 2025: ${FlightsToArlanda.length}`
      );
      // Display all planes landing at ESSA in JSON format
      document.getElementById("allPlanesLanding").textContent = JSON.stringify(
        FlightsToArlanda,
        null,
        2
      );
      const totalFlightsText = `Task 1: Planes landing at ESSA between 19 and 20 (UTC) on 2 Feb 2025: ${FlightsToArlanda.length}`;
      document.getElementById("numberFlights").textContent = totalFlightsText;

      // task 2 - determine the most popular route
      // Map created  to store
      let routeMap = new Map();
      let highestCount = 0;
      let maxRoute = null;

      // iterate over the flights
      data.forEach(({ orig_iata, dest_iata }) => {
        // string representing the route using iata codes
        let route = `${orig_iata} -> ${dest_iata}`;

        // checking if the route already exists in the map
        let currentValue = routeMap.get(route);

        if (currentValue != null) {
          // If the route exists, increment its count by 1
          routeMap.set(route, currentValue + 1);
        }
        // if the route has the highest count, update maxRoute and highestCount
        if (routeMap.get(route) > highestCount) {
          maxRoute = route;
          highestCount = routeMap.get(route);
        } else {
          routeMap.set(route, 1);
        }
      });

      const popularRouteText = `Task 2: Most popular route: ${maxRoute} with ${highestCount} occurances`;
      document.getElementById("popularRoutes").textContent = popularRouteText;

      console.log(
        "Task 2: Popular route map",
        maxRoute,
        "with",
        highestCount,
        "occurances"
      );

      // task 3 - Determine the most frequent airlines operating at Arlanda.
      let airlineMap = new Map();
      let max = 0;
      let maxAirline = null;

      // Iterate over array
      data.forEach((airplane) => {
        let airline = airplane.operating_as;
        let currentValue = airlineMap.get(airline);

        if (currentValue != null) {
          // If the airline already exists, increase its count
          airlineMap.set(airline, currentValue + 1);

          // Check if this airline has the highest occurrence
          if (airlineMap.get(airline) > max) {
            maxAirline = airline;
            max = airlineMap.get(airline);
          }
        } else {
          // If airline doesn't exist, initialize count to 1
          airlineMap.set(airline, 1);
        }
      });

      const popularAirlineText = `Task 3: Most popular airline: ${maxAirline} with ${max} occurances`;
      document.getElementById("popularAirline").textContent =
        popularAirlineText;

      console.log(
        "Task 3: Most popular airline:",
        maxAirline,
        "with",
        max,
        "occurances"
      );
    })
    .catch((error) => {
      console.error("Error loading data", error);
    });
};

infoFromJson();
