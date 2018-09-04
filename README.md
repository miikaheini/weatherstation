# WeatherStation
WeatherStation is a web application for storing weather observations in selected cities.

## Requirements
Following requirements were set for the application:
* There is no need to be able to log in to the application
* All users can submit observations to all locations
* Adding of new locations doesn't need to possible from the application
* All observations are viewable by all users
* Most important information
  * Current temperature based on most recent observation
  * Highest and lowest temperature during last 24 hours
* All submitted observations should be validated
* Information need to be permanently stored

### Observation points
Following observation locations were set:
* Tokio: 35.6584421,139.7328635
* Helsinki: 60.1697530,24.9490830
* New York: 40.7406905,-73.9938438
* Amsterdam: 52.3650691,4.9040238
* Dubai: 25.092535,55.1562243

## Implementation
Web application was implemented using following components and libraries:
* [Node.js](https://nodejs.org/) server side runtime environment for JavaScript backend
* [Express.js](https://expressjs.com/) as a web application framework
* [MongoDB](https://www.mongodb.com) as a database for data persistence
* [Semantic UI](https://semantic-ui.com) as a user interface framework
* [Moment.js](https://momentjs.com) for time stamp handling
* [Chart.js](https://www.chartjs.org) for visualising observed temperatures over time

## To do
1. Server side validation of user input
2. Pagination to observations table
3. Figure out meaningful use for location coordinates
