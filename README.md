# Product Management System

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/pranavkpv/product_manage_liried.git
```

### 2. Client Setup
Navigate to the client directory and install dependencies:
```bash
cd client
npm install
```

Run the frontend:
```bash
npm run dev
```

### 3. Server Setup
Navigate to the server directory:
```bash
cd server
```

Create a `.env` file in the `server` directory with the following content:
```env
PORT = 3000
DB_HOST = localhost
DB_USER = root
DB_PASSWORD =  //enter your db password 
DB_NAME = product_management_db
DB_PORT = 3306
ACCESS_SECRET = 
REFRESH_SECRET = 
```

Run the backend server:
```bash
node server.js
```
