Todo Task Frontend

A simple Todo Task Manager frontend built with Next.js + TypeScript, styled with Tailwind CSS, and connected to a backend API powered by Express.js, Prisma, and MySQL.

This project allows users to create, read, update, and delete tasks through a clean UI connected to the backend.

🚀 Features

✅ Add new tasks

📋 View task list

✏️ Edit tasks

❌ Delete tasks

🎨 Styled with TailwindCSS

🔗 Connected to backend (Express + Prisma + MySQL)

📦 Tech Stack

Frontend: Next.js (TypeScript), Tailwind CSS

Backend: Express.js, Prisma ORM

Database: MySQL

Getting Started

Follow these steps to run the project locally.

1. Clone the repository
git clone https://github.com/your-username/todo-frontend.git
cd todo-frontend

2. Install dependencies
npm install

3. Set up the backend

This frontend expects an API running on http://localhost:4000.

Clone and set up the backend repository:

git clone https://github.com/your-username/todo-backend.git
cd todo-backend


Install dependencies:

npm install


Create a .env file for the backend:

DATABASE_URL="mysql://username:password@localhost:3306/todo_db"
PORT=4000


Run Prisma migrations:

npx prisma migrate dev --name init


Start the backend server:

npm run dev

4. Configure the frontend

Create a .env.local file in the frontend repo root:

NEXT_PUBLIC_API_URL=http://localhost:4000

5. Run the frontend

From the frontend repo:

npm run dev


The app will be available at:

👉 http://localhost:3000

Database Setup (MySQL)

Install MySQL locally or use Docker:

docker run --name todo-mysql -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=todo_db -p 3306:3306 -d mysql:8


Update the backend .env with the same credentials.

🤝 Contributing

Fork the project

Create a feature branch (git checkout -b feature/awesome-feature)

Commit changes (git commit -m 'Add awesome feature')

Push branch (git push origin feature/awesome-feature)

Open a Pull Request

📜 License

This project is licensed under the MIT License.
