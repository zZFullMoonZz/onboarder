# OnBoarDer

A sample system for employee onboarding.  
Supports **Login** and **Register** features.

---

## Features

- Login
- Register
- Connects to PostgreSQL database using Prisma

---

## Tech Stack

- **Frontend & Backend:** Next.js
- **Database:** PostgreSQL
- **ORM:** Prisma

---

## Prerequisites

Before starting, install these programs:

1. [Node.js](https://nodejs.org/) (recommended v18+)
2. [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
3. [PostgreSQL](https://www.postgresql.org/download/)
4. Git

---

## Getting Started

### 1. Clone the project

```
- git clone https://github.com/zZFullMoonZz/onboarder.git
- cd onboarder
```

---

### 2. Install dependencies

```
- npm install
```

---

### 3. Set Environment Variables

```
Create a .env file in the root folder and add the following:

- DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
- NEXT_PUBLIC_WEB_URL="http://localhost:3000"
- NEXTAUTH_URL="http://localhost:3000"
- NEXTAUTH_SECRET="some-random-secret"
```

- DATABASE_URL → Replace username, password, and dbname with your PostgreSQL credentials

- NEXTAUTH_SECRET → A random string for encrypting NextAuth sessions

---

### 4. Prepare the Database (Prisma)

**1. Generate Prisma Client:**

```
npx prisma generate
```

**2. Run migration to create tables in the database:**

```
npx prisma migrate dev --name init
```

**3. Inspect the database with Prisma Studio (optional):**

```
npx prisma studio
```

---

### Run the Project

```
npm run dev
```
