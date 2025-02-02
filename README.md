# TechSupport Pro - IT Support Website

![Project Preview](public/images/screenshot.jpg)

A modern, responsive IT support business website with real-time chat, service listings, and contact management. Built for production deployment with scalability in mind.

## Features

- **Responsive Design**: Works flawlessly on all devices
- **Real-time Chat**: Socket.io powered live chat support
- **Service Management**: Detailed service listings with icons
- **Contact System**: Form submission with MongoDB storage
- **Pricing Plans**: Interactive pricing tables with CTAs
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Secure Backend**: Node.js/Express with MongoDB integration

## Technologies Used

**Frontend:**
- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap 5
- Font Awesome Icons
- EJS Templating

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- Socket.io

**DevOps:**
- Environment Variables
- PM2 Process Manager
- Responsive Image Optimization

## Installation

1. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/it-support-website.git
   cd it-support-website

    Install Dependencies
    bash
    Copy

    npm install

    Set Up Environment Variables
    Create .env file:
    env
    Copy

    MONGODB_URI=your_mongodb_connection_string
    PORT=3000

    Database Setup

        Create MongoDB Atlas account

        Whitelist your IP address

        Get connection URI

    Start Development Server
    bash
    Copy

    npm start