# Price Automation

A web application that fetches and displays product details and prices from various shopping sites. This project is divided into two main parts: the client and the server.

---

## Prerequisites

Ensure you have the following installed on your machine:
- Node.js and npm
- MongoDB

---

## Project Structure

The project directory (`price-automation`) contains two main folders:
- `client` - The frontend built with React.
- `server` - The backend built with Node.js and Express.

---

## **Abstract**

MarketScout addresses the challenges of procurement by automating price benchmarking. It gathers and analyzes data from various sources, including e-commerce platforms, government procurement portals, and public databases. Using tools like Kafka, Redis, and Nginx, it ensures high throughput, quick response times, and efficient load balancing. This application supports decision-making, cost savings, and equitable opportunities, particularly for smaller vendors.

---

## Installation Guide

### Step 1: Install Dependencies

Navigate to each folder (`client` and `server`) and install dependencies.

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

```bash
# Start the server
cd server
npm run dev

# Start the client
cd ../client
npm run dev
```

```bash
#sample .env file
MONGO_URL =
DB_NAME = ""
JWT_SECRET=""
PORT=5000
```


## **Key Features**

### **Core Functionalities**
1. **Automated Data Collection**  
   - Sources include e-commerce platforms, government portals, and public databases.
2. **Real-Time Price Comparison**  
   - Provides accurate and up-to-date pricing insights.  
3. **Decision-Making Support**  
   - Comprehensive tools for analyzing market trends and fluctuations. 

### **Technical Features**
4. **High-Throughput Management**  
   - **Kafka** ensures scalable and fault-tolerant data streaming.  
5. **Caching for Speed**  
   - **Redis** reduces query response time by caching frequently accessed data.  
6. **Load Balancing**  
   - **Nginx** balances requests across backend servers.  

### **User-Focused Features**
7. **User-Friendly Interface**  
   - Built with **ReactJS** and **TailwindCSS** for an intuitive design.  
8. **Scalability**  
   - Handles increasing data and user demands efficiently.  
9. **Historical Data Access**  
   - Provides historical price trends for informed decisions.  

---

## **Technologies Used**

- **Frontend**: ReactJS, TailwindCSS  
- **Backend**: Node.js, Express  
- **Database**: MongoDB  
- **Additional Tools**: Kafka, Redis, Nginx  

---

## **Purpose**

MarketScout is designed to:
1. Improve decision-making with accurate and real-time price comparisons.  
2. Promote transparency and fairness in procurement.  
3. Optimize budgets and reduce overpayment.  
4. Foster inclusivity for smaller vendors.  
5. Automate processes for better efficiency.

