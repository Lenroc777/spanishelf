# :closed_book:  SpaniShelf - Online Library Website 

SpaniShelf is an online library website that provides a wide collection of books related to Spanish culture, cuisine, and history. It offers an easy and interactive way for users to explore, borrow, and engage with Spanish literature. The backend is built with Spring Boot, the frontend uses React and TypeScript, and user authentication and authorization are managed through Okta. Payment processing is handled by Stripe, and the database is powered by MySQL. 

## 📑 Table of Contents 
- [Stack](#stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Features](#features)
  - [Browsing Books](#browsing-books)
  - [User Authentication](#user-authentication)
  - [Book Checkout](#book-checkout)
  - [Extending Checkout](#extending-checkout)
  - [Fees and Payments](#fees-and-payments)
  - [Reviews](#reviews)
  - [Currently Checked Out Books](#currently-checked-out-books)
  - [Messaging Admin](#messaging-admin)
  - [Admin Functions](#admin-functions)
- [Contributing](#contributing)
- [License](#license)

## :gear: Stack
Technologies used in this project:
### Backend
- :coffee: Spring Boot - A Java-based framework for building robust and scalable backend services. (Sprind Data JPA, Spring Data REST)
### Frontend
- :globe_with_meridians: React - A JavaScript library for building user interfaces.
- :label: TypeScript - A statically typed superset of JavaScript for improved code quality.
- :art: CSS - For styling the frontend and ensuring an engaging user interface.
### Database
- :floppy_disk: MySQL - A relational database management system for efficient data storage and retrieval.
### User Authentication and Authorization
- :key: Okta - A secure identity and access management platform for user authentication and authorization.
### Payment Processing
- :money_with_wings: Stripe - A payment processing platform for handling book rental fees and payments.
### Version Control
- :octocat: GitHub - A web-based platform for version control and collaborative development.


## 🚀 Getting Started 

### 📋 Prerequisites 

Before you begin, ensure you have the following components and accounts set up:
- Node.js
- Java 17
- MySQL database
- Okta account for user authentication and authorization
- Stripe account for payment processing

### 🛠️ Installation 
1. **Clone the Repository:**

```   git clone https://github.com/Lenroc777/spanishelf.git ```

2. **Backend Setup:**
- Create database and run database.sql script to import necessary tables and data
-  Configure database connection in properties.yaml
-  Set your personal okta issuer and client-id in properties.yaml
-  Set your secret stripe key in properties.yaml

Now you can start the backend application.

3. **Frontend Setup:**
- go to client directory and run:
``` npm run ```
- after installing all modules, make sure the backend app is running and start the react application:
``` npm start ```
4. **To authenticate user use:**
  test@gmail.com/admin@gmail.com
  Q@wertyuiop

## :sparkles: Features 

Explore the key features of SpaniShelf:

#### :books: Browsing Books

- As a guest user, you can browse the extensive collection of books, view book details, and read reviews.

#### :iphone: Responsive Design

- SpaniShelf features a responsive design, ensuring that the website adapts seamlessly to various screen sizes and devices, providing an optimal user experience on both desktop and mobile platforms.

#### :key: User Authentication

- User authentication and authorization are handled by Okta, ensuring secure access to user-specific features. 

#### :bookmark: Book Checkout

- Authenticated users can borrow (add to the shelf) a book for 7 days, subject to availability and current amount of books checked out (user cannot borrow a new book if any of books on it's shelf is overdue).

#### :clock1: Extending Checkout

- Users can extend the book checkout period if the book is not overdue.

#### :money_with_wings: Fees and Payments

- Overdue books accumulate fees, which users can pay using the Stripe payment system. Fees must be paid before any new checkout. The payment process is handled by Stripe and the payments can be seen in Stripe dashboard.

#### :pencil2: Reviews

- Authenticated users can share their thoughts by leaving reviews for books they've read.

#### :notebook: Checked Out Books

- Logged-in users can view a list of books they are currently checking out or has checked in the past.

#### :envelope: Messaging Admin

- Users can communicate with administrators by sending messages/questions.
- Users can see history of their messages

#### :gear: Admin Functions
Admins have exclusive privileges, including:
  - Adding new books to the collection.
  - Removing existing books.
  - Adjusting the quantity of available books.

Additionally, admin can see unread messages and send a response.

