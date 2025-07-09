# 🎬 Movies API Backend

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="80" alt="NestJS" />
  <img src="https://cdn.worldvectorlogo.com/logos/nextjs-2.svg" width="80" alt="Next.js" />
  <img src="https://cdn-icons-png.flaticon.com/512/5968/5968381.png" width="80" alt="PostgreSQL" />
</p>

## 🚀 Project Architecture

- **NestJS** as the main backend framework.
- **Next.js** as the frontend framework.
- **PostgreSQL** as the relational database.
- **TypeORM** for ORM and migrations.
- **Swagger** for interactive API docs at `/api-docs`.
- **Main modules:**
  - 🎥 **Movies**: Movies and actors management.
  - 👤 **Actors**: Actors management.
  - ⭐ **Ratings**: Movie ratings.
  - 🔐 **Auth**: JWT and API Key authentication.

## 🏗️ Folder Structure

```
backend/
  src/
    modules/
      movies/   # Movies and relations
      actors/   # Actors
      ratings/  # Ratings
      auth/     # Authentication
    common/     # Filters, guards, interceptors
    config/     # Config and env vars
    seeds/      # Database seed
    swagger/    # Swagger schemas
```

## ⚙️ Environment Variables

Create a `.env` file in `backend/` like this:

```env
NODE_ENV=development
PORT=3000
JWT_SECRET=your_jwt_secret
API_SECRET=your_api_secret
DATABASE_TYPE=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=movies_db
```

> **Note:** For Docker, use `.env.docker` with the same fields DATABASE_HOST=db.

## 🏃‍♂️ How to run the backend

### 🔧 Local

```bash
cd backend
npm install
npm run start:dev
```

- API available at [http://localhost:3000](http://localhost:3000)
- Swagger docs: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### 🐳 Docker (recommended)

```bash
docker-compose up -d --build
```
- Brings up database and backend automatically.
- Database seed runs automatically on startup.

## 🌱 Database Seed

- **Local:**
  ```bash
  npm run seed
  ```
- **Docker:** Seed runs automatically when services start.

## 🔑 Security & Authentication

- **API_SECRET:** Protects sensitive routes (see guards in `common/guards`).
- **JWT_SECRET:** For JWT authentication (login and protected routes).
- **Guards:**
  - `ApiKeyGuard`: Checks `x-api-key` header.
  - `LoginGuard`: Protects JWT routes.

## 🧪 Testing

```bash
npm run test       # Unit tests
npm run test:e2e   # End-to-end tests

```

---

## 🎬 Movies App Frontend

<p align="center">
  <img src="https://cdn.worldvectorlogo.com/logos/nextjs-2.svg" width="80" alt="Next.js" />
  <img src="https://cdn-icons-png.flaticon.com/512/5968/5968381.png" width="80" alt="TypeScript" />
  <img src="https://cdn-icons-png.flaticon.com/512/732/732190.png" width="80" alt="React" />
  <img src="https://tailwindcss.com/_next/static/media/social-card-large.6d6e5e5b.jpg" width="80" alt="TailwindCSS" />
</p>

### 🖥️ Tech Stack

- **Next.js** (App Router, React 19)
- **TypeScript** for type safety
- **Axios** for API requests
- **TailwindCSS** for styling
- **Lucide-react** for icons

---

### 🏗️ Folder Structure

```
frontend/
  src/
    app/           # Main pages (movies, actors, auth, detail)
    components/    # Reusable UI components (cards, search, pagination, etc.)
    services/      # API service functions (movies, actors, ratings)
    types/         # TypeScript types for entities and API
    config/        # App configuration (API base URL, env)
    hooks/         # Custom React hooks (if any)
    libs/          # API instance (Axios)
```

---

### 🚀 Main Features

- **Movies List & Detail:**  
  - Paginated list of movies with search and filtering.
  - Movie detail page with full info, actors, and ratings.
  - Add/remove actors to a movie.
  - Rate movies (with average and count shown as stars).

- **Actors List:**  
  - Paginated list of actors with search.
  - Actor cards with basic info.

- **CRUD Operations:**  
  - Delete movies and actors directly from their cards (with confirmation).
  - All actions update the UI instantly.

- **Search:**  
  - Reusable `SearchBar` component for movies and actors.
  - Case-insensitive search.

- **Pagination:**  
  - Reusable `Pagination` component for movies and actors.

- **Authentication:**  
  - Login page (JWT-based).
  - Protected routes for actions like rating and deleting.

- **UI/UX:**  
  - Responsive, modern design with TailwindCSS.
  - Toast notifications for actions (success/error).
  - Icons via `lucide-react`.

---

### ⚙️ Environment Variables

Create a `.env.local` file in `frontend/`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

---

### 🏃‍♂️ How to run the frontend

```bash
cd frontend
npm install
npm run dev
```

- App available at [http://localhost:3001](http://localhost:3001)
- Make sure the backend API is running and accessible at the URL set in `NEXT_PUBLIC_API_BASE_URL`.

---

### 🧩 Main Components

- **MovieCard:** Displays movie info, rating stars, and delete button.
- **ActorCard:** Displays actor info and delete button.
- **SearchBar:** Reusable search input with clear button.
- **Pagination:** Handles paginated navigation.
- **TopBar:** (if present) Navigation and branding.
- **Toast:** For notifications.

---

### 🛠️ API Services

- All API calls are centralized in `src/services/`:
  - `movies/MoviesService.ts`
  - `actors/ActorsService.ts`
  - `ratings/ratings.service.ts`
- Uses a pre-configured Axios instance (`src/libs/api.ts`) with JWT support.

---

### 📝 Type Safety

- All entities and API responses are strongly typed in `src/types/`.

---

### 🧪 Testing & Linting

```bash
npm run lint
```
- Uses ESLint and TypeScript strict mode.

---

### 📦 Build & Deploy

```bash
npm run build
npm start
```
- The app is ready for deployment on Vercel or any Node.js hosting.

---
