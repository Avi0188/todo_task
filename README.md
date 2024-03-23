# todo_task
This is the backend component of the Task Management App, which provides RESTful APIs for managing users and todos. The backend is built using Express.js and MongoDB with Mongoose.

## Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies:**

   ```bash
   cd backend
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and define the following variables:

   ```plaintext
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   ```

4. **Start the server:**

   ```bash
   npm start
   ```

   The server will start running at `http://localhost:8000`.

## API Endpoints

### User Routes

- **POST /user/register**: Register a new user.
  - Request Body:
    ```json
    {
      "username": "example",
      "email": "example@example.com",
      "password": "password"
    }
    ```
  - Response: New user object with a JWT token.

- **POST /user/login**: Log in an existing user.
  - Request Body:
    ```json
    {
      "email": "example@example.com",
      "password": "password"
    }
    ```
  - Response: JWT token for authentication.

- **GET /user/:id**: Get user details by ID.
  - Response: User object without password.

### Todo Routes

- **POST /todo**: Create a new todo.
  - Request Body:
    ```json
    {
      "title": "Task Title",
      "task": "Task description",
      "description": "Task details",
      "author": "user-id"
    }
    ```
  - Response: New todo object.

- **GET /todo**: Get all todos.
  - Response: Array of todo objects.

- **GET /todo/:id**: Get todo by ID.
  - Response: Todo object.

- **PUT /todo/:id**: Update todo by ID.
  - Request Body: Updated todo data.
  - Response: Updated todo object.

- **DELETE /todo/:id**: Delete todo by ID.
  - Response: Success message.

