# Car Rental Reservation System

## Overview

The Car Rental Reservation System is a comprehensive platform designed for both customers and administrators to browse, book, and manage car rentals. This project features a user-friendly interface, responsive design, and robust functionalities for managing cars, bookings, and user accounts.

## Technologies Used

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Payment Gateway:** AmarPay (local payment methods)
- **Other Libraries:** Redux, React Router, React Icons

## Features

### Public Pages

1. **Home Page**
   - Header with navigation and login/sign-up buttons
   - Hero section with banner image 
   - Featured cars carousel or grid
   - Unique selling points and customer testimonials
   - Footer with social media links and legal information

2. **Car Listing Page**
   - Grid or list view of available cars
   - Filters for car type, price range, and features

3. **Car Details Page**
   - Detailed information, images, and additional features
   - "Book Now" button leading to the booking page

4. **About Us Page**
   - Company history, team profiles, fleet information, and contact details

5. **Error Page**
   - Custom 404 page and error messages for backend API issues
   - Navigation options to return to safe pages

6. **User Authentication Pages**
   - Sign Up: User registration with validation and error handling
   - Sign In: User login with password 

### User Pages

7. **User Dashboard**
   - Overview of personal information and booking history
   - Booking management with modification and cancellation options
   - Payment management for returning cars

### Admin Pages

8. **Admin Dashboard**
   - Summary view with key statistics
   - Manage cars (add, update, delete) with image upload
   - Manage bookings (approve, cancel)
   - Manage returned cars and update availability
   - User management with role and access control options

### Booking Page

9. **Booking Page**
   - Booking form with personal details,Nid and Lisence
   - Booking confirmation page with details review

### Responsive Design & UI/UX

- Fully responsive design for mobile, tablet, and desktop
- Intuitive navigation and consistent branding elements

### Bonus Features

- **Payment System:** Secure payment gateway integration for post-return payments
- **Theme Switcher:** Dark/light/system theme switcher

## Setup & Installation

### Frontend

1. Clone the repository:
    ```bash
    git clone https://github.com/rasel-chowdhury/Car_Rental_Reservation_System-client-.git
    ```
2. Navigate to the frontend directory:
    ```bash
    cd /frontend
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm start
    ```

### Backend

1. Navigate to the backend directory:
    ```bash
    cd car-rental-reservation-system/backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables (refer to `.env.example` for required variables).
4. Start the server:
    ```bash
    npm start
    ```

## Contribution

Contributions are welcome! Please submit a pull request with your proposed changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## References

- [KAYAK Car Rentals](https://www.kayak.com/cars)
- [Convene](https://www.gorentals.co.nz)

For any questions or issues, feel free to open an issue or contact me directly.

