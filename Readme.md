# Movies Recommendation Application

## Overview

This Movies Recommendation Application fetches and displays a list of popular movies from **The Movie Database (TMDb) API**. Users can search for movies and view trailers for the selected movies. The app is hosted on two web servers with load balancing for better scalability and performance.

## Features

- Displays popular movies fetched from **The Movie Database (TMDb) API**.
- Allows users to search for movies by title.
- Users can watch movie trailers directly via YouTube links.
- The application is deployed on two web servers with a load balancer to handle traffic efficiently.

## API Used

- **The Movie Database (TMDb) API**  
  Base URL: `https://api.themoviedb.org/3`  
  - **Endpoints Used**:
    - `GET /movie/popular` - Fetches a list of popular movies.
    - `GET /search/movie` - Searches for movies based on a query.
    - `GET /movie/{movieId}/videos` - Fetches trailers for a movie by ID.
  
  You can find more about this API and its features in the official documentation: [TMDb API Documentation](https://www.themoviedb.org/documentation/api)

## Installation Instructions

### 1. Clone the repository:

```bash
git clone https://github.com/Kodedbykenzie/Movies-recommendation.git
cd Movies-recommendation
```

### 2. Set up environment variables:

Create a `.env` file in the root directory and add your **TMDb API key** as follows:

```plaintext
API_KEY=your_api_key_here
```

You can obtain your **TMDb API key** by signing up at [TMDb](https://www.themoviedb.org/) and navigating to your account settings.

### 3. Install dependencies:

```bash
npm install
```

### 4. Run the application locally:

To run the application locally, use the following command:

```bash
npm start
```

This will start the app at `http://localhost:3000`.

---

## Deployment

The application is deployed on two web servers, Web01 and Web02, with a load balancer (Lb01) managing the traffic between them for better scalability. The web servers are configured to handle incoming requests and serve the application efficiently.

- **Web01**: `http://54.90.179.62:3000/`
- **Web02**: `http://18.214.99.45:3000/`

### 1. **Web Servers Deployment**

- We deployed the application on **Web01** and **Web02** using standard web server configurations.
- Both servers run the application on port `3000`, ensuring consistency across instances.

### 2. **Load Balancer Configuration**

The **Load Balancer (Lb01)** is configured to distribute incoming traffic between the two web servers based on the round-robin method. The load balancer ensures that traffic is evenly distributed, improving the application's reliability and performance.


**Steps to configure the load balancer:**
1. Set up the load balancer to forward requests to both Web01 and Web02.
2. The load balancer uses the round-robin algorithm to direct traffic to both servers.

Once configured, users can access the application via the load balancer, and requests will be distributed seamlessly between the two servers.

---

## How the Application Works

### 1. **Fetching Popular Movies**

When the app loads, it fetches a list of popular movies using the **`/movie/popular`** endpoint from the TMDb API:

```js
const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
```

This data is displayed in a grid format, including the movie title, poster, and rating.

### 2. **Search for Movies**

Users can search for specific movies by entering a movie name in the search bar. When the search button is clicked, the **`/search/movie`** API endpoint is called with the user's query:

```js
const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`;
```

This allows users to find movies based on their search terms.

### 3. **Watch Movie Trailers**

Each movie in the list has a **"Watch Trailer"** button. When clicked, the application fetches the trailer for that specific movie using the **`/movie/{movieId}/videos`** API:

```js
const url = `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`;
```

If a trailer is found, it opens in a new tab.

---

## How to Access the Application

Once deployed, the application is accessible through the following URLs:

- Web Server 1: [http://54.90.179.62:3000](http://54.90.179.62:3000/)
- Web Server 2: [http://18.214.99.45:3000](http://18.214.99.45:3000/)

---

## Demo Video

Here is a short demo video showcasing how to use the application both locally and through the load balancer. It demonstrates the following:

- How to search for movies.
- How to view movie details and trailers.
- How the application is accessible through the load balancer.

[Demo Video](https://www.loom.com/share/b088221b2cf24626a3e8aff72771706c?sid=6f508820-2e59-4f9b-9c2e-38d5b1a4341c)

---

## Challenges Faced

During the development of this application, the following challenges were encountered:

1. **Handling API Rate Limits**: TMDb API has rate limits, and managing these efficiently was critical for the app's stability.
2. **Server Deployment**: Configuring the load balancer to distribute traffic between the two web servers was a learning curve.
3. **Handling API Errors**: I implemented error handling to manage scenarios such as API downtime or invalid responses.

---

## Credits

- **TMDb API**: [The Movie Database API](https://www.themoviedb.org/documentation/api) for providing the movie data.
- **Web Hosting**: Deployed on AWS EC2 instances Web01 and Web02, with a load balancer (Lb01) to handle traffic.

---
