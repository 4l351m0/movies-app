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
