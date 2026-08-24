# QuickBite

QuickBite is a React/Vite frontend backed by an Express, MongoDB, and JWT API.

## Requirements

- Node.js 18 or newer
- MongoDB running locally, or a MongoDB Atlas connection string

## Setup

From the `quickbite` directory:

```powershell
npm run install:all
```

The backend reads `backend/.env`. Copy `backend/.env.example` to that file and set:

- `MONGO_URI`: local MongoDB (`mongodb://127.0.0.1:27017/QuickBiteDB`) or an Atlas URI
- `JWT_SECRET`: a long private random value used to sign login tokens
- `PORT`: API port, normally `5000`

The frontend defaults to `http://localhost:5000`. For another API host, copy `frontend/.env.example` to `frontend/.env` and set `VITE_API_URL`.

## Run

From `quickbite`, start both required development servers with:

```powershell
npm run dev
```

This opens the backend on `http://localhost:5000` and the frontend on `http://localhost:5173`.
You can also run `npm run dev:backend` and `npm run dev:frontend` separately when two terminals are preferred.

To load the sample restaurants after MongoDB is available:

```powershell
npm run seed
```

The customer login form creates a customer on first login. Orders require a logged-in customer. The delivery address is collected by the required order form; the exam's specified `Order` entity does not persist it.

If an older database contains the removed `restaurantId` order field, run `npm run cleanup:orders` once from the `quickbite` directory.