# TicketTime - Online Ticket Booking Platform (Frontend)

## Project Overview

**TicketTime** is a fully responsive **Online Ticket Booking Platform** built using the **MERN stack frontend (React.js)**.  
The platform allows users to discover, book, and manage travel tickets (Bus, Train, Launch, Plane, etc.) with a modern, intuitive UI.  
This frontend project is designed to demonstrate my **React skills**, **UI/UX design sense**, and **integration with APIs & authentication**.

---

## Live Demo

# TicketBari – Online Ticket Booking Platform (Backend)

- Check out the backend repo Github: [Live Site](https://github.com/Shagor-Mia/TicketTime-server)

- frontend-client-link
  Check out the live version here: [Live Site](https://ticket-time-dcb40.web.app/)

- backend-server-link
  Check out the live version here: [Live Site](https://ticket-time.vercel.app/)

## Key Features

### General

- Fully responsive design for **mobile, tablet, and desktop**.
- Clean and modern UI with **proper spacing, color contrast, and alignment**.
- **Dark/Light mode toggle** for user convenience.
- Single **MainLayout** component wrapping Navbar, content, and Footer.
- Navbar with **dynamic menu items** depending on login state.
- Footer with **4 columns**: Logo & description, Quick Links, Contact Info, Payment Methods.

### Authentication

- User **Registration** with password validation:
  - Must include uppercase & lowercase letters.
  - Minimum 6 characters.
- User **Login** with:
  - Email/Password
  - Google OAuth login
  - Error handling & toast notifications
- Protected routes with **Firebase token** authentication.
- Session persistence across page reloads for logged-in users.

### Home Page

- Hero banner/slider using **Swiper.js**.
- Advertisement section displaying **exactly 6 tickets** chosen by admin.
- Latest tickets section showing **6 recently added tickets**.
- Additional sections done ( Popular Routes, Why Choose Us?).
- Ticket cards displaying:
  - Image, Title, Price, Quantity, Transport type, Perks, “See details” button.

### All Tickets Page

- Display **admin-approved tickets** only.
- Filter by **transport type**.
- Pagination (6 tickets per page).
- Search functionality integrated.

### Ticket Details Page

- Full ticket information.
- Countdown timer based on **departure date/time**.
- “Book Now” button opens a modal for ticket quantity input.
- Disabled booking for:

  - Sold-out tickets
  - Past departure date/time

  ### Payment with Stripe

- After Book now click, if vendor then a pay now button will show , clicking this button this will redirect to stripe payment after successful payment. paid will show.

### Dashboard Features

- **User Dashboard**:
  - Profile page showing user info.
  - My Booked Tickets with status and countdown.
  - Transaction history integrated with Stripe.
- **Vendor Dashboard**:
  - Add Ticket form with image upload (imgbb) & perks checkboxes.
  - My Added Tickets section with Update/Delete buttons.
  - Requested Bookings table with Accept/Reject functionality.
  - Revenue overview with charts.
- **Admin Dashboard**:
  - Manage Tickets (Approve/Reject)
  - Manage Users (Make Admin/Vendor, Mark as Fraud)
  - Advertise Tickets section (Homepage advertisement toggle).

---

## Challenge Features Implemented

- **Search & Filter** tickets on “All Tickets” page.
- **Pagination** implemented.
- **JWT/Firebase token** protected API integration.
- **Dark/Light mode toggle**.

---

## Optional Features

- **React Hook Form** used for all forms.
- **Swiper.js** implemented for homepage slider.

---

## Tech Stack & Libraries

- **Frontend:** React.js, React Router, Tailwind CSS, Framer Motion
- **State Management & Data Fetching:** React Query, Context API, Axios, Hooks etc
- **Form Handling:** React Hook Form
- **Authentication:** Firebase Authentication (Email/Password & Google)
- **UI Enhancements:** Swiper.js, React Icons
- **Payment Icons:** Stripe, Visa, Mastercard
- **Animations:** Framer Motion
- **Environment Variables:** `.env` for API keys & Firebase config

---
