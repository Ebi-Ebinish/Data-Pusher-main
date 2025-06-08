# Data Pusher


# 📘 System Installation & Setup Guide

## 🔧 Prerequisites

- **Node.js** (v18.12.0)
- **npm** 8.19.2
- **MySQL** (or compatible DB)
- **Git** (optional)
- **Postman** or **Swagger** for API testing

## 🗂️ 1. download

ebinesh-accounts-master zip

## ⚙️ 2. Install Dependencies

```bash
npm install
# or
yarn install
```

## 🔐 3. Configure Environment Variables

Create a `.env` file in the root directory with the following:

```env
PORT=3000
DB_HOST=localhost
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
```

## 🗃️ 4. Setup the Database

### a. Create a database in MySQL:

```sql
CREATE DATABASE dev_accounts;
CREATE DATABASE test_accounts;
CREATE DATABASE prod_accounts;
```

### b. Run Sequelize Migrations
DEV:$env:NODE_ENV="development";
DEV:$env:NODE_ENV="test";
DEV:$env:NODE_ENV="tesproduction

change db password at src\config\config.json
```bash
npx sequelize-cli db:migrate
```

### c. Seed default roles (Admin, Normal user)

```bash
npx sequelize-cli db:seed:all
```

## 🏁 5. Start the Application

```bash
npm start
# or
npm run dev
# or
yarn start
```

## 🔐 6. Authentication & Roles

- New users are assigned the **Admin** role by default.
- JWT is issued upon login.
- Use `Authorization: Bearer <token>` in headers for protected routes.

## 📦 7. API Endpoints

### 🔐 Auth

- `POST /auth/register`
- `POST /auth/login`

### 🧾 Accounts

- `GET /accounts`
- `GET /accounts/filter`
- `POST /accounts`
- `PUT /accounts/:id`
- `DELETE /accounts/:id`

### 🎯 Destinations

- `GET /destinations`
- `GET /destinations/filter`
- `POST /destinations`
- `PUT /destinations/:id`
- `DELETE /destinations/:id`

### 👥 Account Members

- `POST /account-members`
- `GET /account-members`
- `PUT /account-members/:id`
- `DELETE /account-members/:id`

### 🧾 Logs

- `GET /logs`
- `GET /logs/filter`

## ✅ 8. Input Validation

Used `express-validator` for all relevant fields:
- `email`, `password` during auth
- Required fields in accounts, destinations, logs

## 🔐 9. Authorization (RBAC)

Implemented using middleware:
- Admins: Full access (CRUD, logs)
- Normal Users: Read/Update only

```js
app.use('/logs', authorize(['Admin', 'Normal user']), logRoutes);
```

## 🧪 10. Testing (Unit & Integration)

- Testing Framework: `Jest` + `Supertest`

Run tests:

```bash
npm test
```

Tests available for:
- Auth
- Logs
- Role assignment
- Duplicate user check
- Token validation

## 📑 11. API Documentation (Swagger)

Accessible at:  
➡️ `http://localhost:3000/api-docs`

Uses:
- `swagger-jsdoc`
- `swagger-ui-express`

```js
const { swaggerUi, specs } = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
```

Add route annotations in `routes/*.js` like:

```js
/**
 * @swagger
 * /accounts:
 *   get:
 *     summary: Retrieve all accounts
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of accounts
 */
```

## 📁 Folder Structure

```
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── tests/
├── validators/
├── swagger.js
├── .env
├── app.js
```

## ✨ Future Enhancements

- Add pagination & sorting
- Export logs as CSV
- Email notifications on critical failures
- Docker & CI/CD
