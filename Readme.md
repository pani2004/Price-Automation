# Price Automation

Price Automation is a web application that searches for products across different e-commerce websites and displays product details and pricing information. The application utilizes the Google Search API to retrieve shopping links, scrapes product details using Playwright, and stores the results in MongoDB for quick retrieval.

## Project Structure

The project directory is organized as follows:
- `client`: Contains the frontend code built with React.
- `server`: Contains the backend code built with Node.js, Express, and Playwright for web scraping.

## Features

- Search for product details across multiple websites.
- View product information including title, price, and description.
- Caches results in MongoDB to minimize repeated scraping.

---

## Installation Guide

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v14 or later)
- [MongoDB](https://www.mongodb.com/try/download/community) (local or hosted instance)
- Google API Key and Search Engine ID for Google Custom Search API (used in the server to fetch shopping links).

### Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/price-automation.git
   cd price-automation
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
Set Up Environment Variables

In the server folder, create a .env file with the following values:
GOOGLE_API_KEY=your_google_api_key
GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id
MONGODB_URI=your_mongodb_connection_string

Run the Application

Use the following commands to start both the client and server in development mode:

# Start the server
cd server
npm run dev

# Start the client
cd ../client
npm run dev

