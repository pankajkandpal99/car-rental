# Car Rental Admin Dashboard (Next.js + TypeScript)

### 1. Login Page
![Login Page](/Screenshot%202025-07-12%20001547.png)

### 2. Dashboard View
![Dashboard](/Screenshot%202025-07-12%20002321.png)

### 3. Listings Management
![Listings](/Screenshot%202025-07-12%20002434.png)

A complete admin dashboard built with Next.js, TypeScript, Zod validation and Redux for managing car rental listings with JWT authentication and audit logging.

## Key Features

- 🔐 **JWT Authentication** - Secure admin login/logout
- 🚗 **Listing Management** - Approve/Reject/Edit car listings
- 📊 **Redux State Management** - Predictable state with Thunk middleware
- 📝 **Audit Trail** - Track all admin actions
- 💅 **Responsive UI** - Built with TailwindCSS
- 🛠 **Type-Safe** - Full TypeScript support

## Tech Stack

| Category           | Technology               |
|--------------------|--------------------------|
| Framework          | Next.js 14 (App Router)  |
| Language           | TypeScript               |
| State Management   | Redux Toolkit + Thunk    |
| Database           | SQLite (via Prisma)      |
| Authentication     | JWT                      |
| Styling           | TailwindCSS              |
| Mock Data          | JSON mock dataset        |
| Audit Logging      | localStorage             |

## Setup Instructions

### 1. Prerequisites

- Node.js v18+
- npm or yarn
- SQLite3

### 2. Installation

```bash
# Clone repository
git clone https://github.com/pankajkandpal99/car-rental.git 
cd car-rental

# Install dependencies
npm install

# Setup environment
cp .env.example .env

3. Configure Environment
Edit .env:
JWT_SECRET=your-secure-key-here
NODE_ENV=development
NEXT_PUBLIC_BASE_URL=http://localhost:3000

Running the Application
Development Mode:
npm run dev

Production Build:
npm run build
npm start

Deployment
https://vercel.com/button

Manual Deployment:

Push code to GitHub repository

Create new Vercel project

Add environment variables

Deploy!

Assessment Requirements Checklist
    Next.js with TypeScript
    JWT Authentication
    SQLite Database
    Redux State Management
    Mock Data Integration
    Audit Logging (localStorage)
    Paginated Listings Table
    Approve/Reject/Edit Actions
    Responsive Design

Known Limitations
    Audit logs persist only in browser localStorage
    Mock data resets on server restart
    zod form validation implemented