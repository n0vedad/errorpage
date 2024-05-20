
# errorpage - A custom error page app

This project demonstrates an [Express.js](https://expressjs.com/de/) application that serves custom error pages for different HTTP status codes. The application includes a home page with links to various HTTP status codes for a better [Demo](https://errorpages-ecffa63ea903.herokuapp.com/).

## Getting started

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/n0vedad/errorpage.git
   cd errorpage
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

### Running the application

#### Development mode

To run the application in development mode with hot-reloading:

```sh
npm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the landing page.

#### Production mode

To build and run the application in production mode:

1. Build the application:

   ```sh
   npm run build
   ```

2. Start the application:

   ```sh
   npm start
   ```

Add the App to your webserver configuration to display the custom errorpage.

## Project structure

### `public/`

Contains static files including the custom error page HTML, styles, and scripts. The [script.js](/public/script.js) contains the text and the main logic, feel free to edit.

### `Procfile`

A file which is needed for the [Demo](https://errorpages-ecffa63ea903.herokuapp.com/).

### `server.ts`

This is the main file which serves the app to a given enviroment.


## Custom error pages

The application includes custom error pages for the following HTTP status codes:

- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 405 Method Not Allowed
- 408 Request Timeout
- 409 Conflict
- 413 Payload Too Large
- 429 Too Many Requests
- 500 Internal Server Error
- 502 Bad Gateway
- 503 Service Unavailable
- 504 Gateway Timeout

Each error page displays the status code and a description of the error. Feel free to add more! 

## License

This project is licensed under the MIT License. See the [LICENSE](/LICENSE) for details.


