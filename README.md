# 📚 OLMS - Online Library Management System

![Project Status](https://img.shields.io/badge/Status-In%20Development-orange?style=flat-square)
![Framework](https://img.shields.io/badge/Framework-Next.js%2014-black?style=flat-square)
![Styling](https://img.shields.io/badge/Styling-Tailwind%20CSS-blue?style=flat-square)

## 📖 Introduction

**OLMS** is a modern, responsive web application designed to streamline the operations of a library. Built with **Next.js**, it separates functionalities into distinct **Admin** and **User** portals, allowing for efficient book management, member tracking, and issue/return cycles.

The system aims to replace manual record-keeping with a digital, automated, and user-friendly interface.

## ✨ Key Features

### 🛡️ Admin Module
* **Dashboard:** Real-time statistics (Total Books, Issued Books, Active Members).
* **Book Management:** Add, Update, and Delete book records (ISBN, Author, Genre).
* **Member Management:** Approve user registrations and manage privileges.
* **Circulation:** Issue and Return books to students/users.
* **Fine Tracking:** Automated calculation of fines for late returns.

### 👤 User/Student Module
* **Book Catalog:** Search and filter books by Title, Author, or Category.
* **Availability Status:** Check if a book is currently available or issued.
* **Borrow History:** View list of previously borrowed and currently held books.
* **Profile Management:** Update personal details and view fines.

### 🎨 General Features
* **Responsive Design:** Optimized for Desktops, Tablets, and Mobile devices.
* **Dark/Light Mode:** Built-in theme switching.
* **Secure Authentication:** Role-based login (Admin vs. User).

---

## 🛠️ Tech Stack

* **Frontend:** Next.js (App Router), React, Lucide Icons.
* **Styling:** Tailwind CSS.
* **Backend (API):** Next.js Server Actions / API Routes.
* **Database:** *[Insert Database here, e.g., MongoDB / PostgreSQL / MySQL]* via Prisma ORM.
* **Authentication:** *[Insert Auth here, e.g., NextAuth.js / Clerk]*.

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
* Node.js (v18.0.0 or later)
* npm or yarn
* Git

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/online-library-management-system.git](https://github.com/your-username/online-library-management-system.git)
    cd online-library-management-system
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory. Add the following variables (update with your actual credentials):

    ```env
    DATABASE_URL="your_database_connection_string"
    NEXTAUTH_SECRET="your_secret_key"
    NEXTAUTH_URL="http://localhost:3000"
    ```

4.  **Run the Development Server**
    ```bash
    npm run dev
    ```

5.  **Access the App**
    Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```text
├── app/
│   ├── admin/           # Admin specific pages & layouts
│   ├── user/            # User specific pages & layouts
│   ├── api/             # Backend API routes
│   ├── layout.js        # Root layout
│   └── page.js          # Landing page (Welcome Screen)
├── components/          # Reusable UI components (Navbar, Cards, Buttons)
├── lib/                 # Utility functions and DB connection
├── public/              # Static assets (Images, SVGs)
└── ...