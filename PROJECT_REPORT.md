# E-commerce Application Distributed System Project Report

## Project Overview
This project implements a distributed e-commerce system across two Virtual Machines (VMs) using a microservices architecture. The system consists of a client application and a backend server, each running on separate VMs, demonstrating distributed system concepts and cross-VM communication.

## System Architecture

### 1. Physical Architecture
- **VM1**: Hosts the Client Server (IP: 0.0.0.0:8080)
- **VM2**: Hosts the Backend Server (IP: 192.168.56.5:3000)

### 2. Logical Architecture
The system follows a three-tier architecture:
1. Frontend (Browser)
2. Client Server (Middleware)
3. Backend Server (API Server)

![Architecture Diagram](architecture.mmd)

## Technical Implementation

### 1. Backend Server (VM2)
The backend server implements a RESTful API service running on port 3000.

```javascript
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

const products = [
    { id: 1, name: "Laptop", price: 1000, stock: 5 },
    { id: 2, name: "Smartphone", price: 500, stock: 10 },
    { id: 3, name: "Headphones", price: 100, stock: 20 }
];

app.get("/products", (req, res) => {
    res.json(products);
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
```

Key Features:
- CORS enabled for cross-origin requests
- RESTful API endpoint for product data
- In-memory product database
- JSON response format

### 2. Client Server (VM1)
The client server acts as a middleware between the frontend and backend server, running on port 8080.

```javascript
const express = require("express");
const axios = require("axios");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 8080;
const SERVER_API = "http://192.168.56.5:3000/products";

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.get("/fetch-products", async (req, res) => {
    try {
        const response = await axios.get(SERVER_API);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching products" });
    }
});

app.listen(PORT, () => {
    console.log(`Client server running on http://0.0.0.0:${PORT}`);
});
```

Key Features:
- Static file serving
- Proxy functionality to backend server
- Error handling
- CORS support
- Asynchronous API calls using Axios

## Technologies Used

### Backend Stack:
1. Node.js
2. Express.js
3. CORS middleware

### Client Stack:
1. Node.js
2. Express.js
3. Axios
4. Static file serving
5. CORS middleware

## Communication Flow
1. Browser makes HTTP request to Client Server (VM1)
2. Client Server proxies request to Backend Server (VM2)
3. Backend Server processes request and returns product data
4. Client Server forwards response back to browser

## Security Measures
1. CORS implementation on both servers
2. Error handling for failed requests
3. Separate VMs for isolation
4. No sensitive data exposure

## Network Configuration
- Backend Server: Running on dedicated IP (192.168.56.5)
- Client Server: Bound to all interfaces (192.168.56.4)
- Cross-VM communication via HTTP protocol
- Port configuration:
  - Client: 8080
  - Backend: 3000


## Conclusion
This distributed e-commerce system demonstrates the implementation of microservices architecture across multiple VMs. The separation of concerns between client and server components allows for independent scaling and maintenance while maintaining robust communication through well-defined APIs. 