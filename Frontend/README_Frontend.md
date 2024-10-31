# Domain Info Finder

## Overview

This frontend is a simple React application that allows users to input a domain name and retrieve detailed domain and contact information.

## Important Notes

-   This README_Frontend is more or less a summary for the Backend. Please refer to the README in the root of the repository.

-   This frontend web app has limited responsiveness in its design.
-   This frontend application is designed to work exclusively with the backend server included in this repository. Please ensure that the backend is running and accessible for the application to function correctly.

## Table of Contents

-   [Features](#features)
-   [Technologies](#technologies)
-   [Getting Started](#getting-started)
-   [Usage](#usage)

## Features

-   Input a domain name to fetch domain information.
-   View details associated with the domain.

## Technologies

This project is built with the following technologies:

-   [React](https://reactjs.org/) - JavaScript library for building user interfaces.
-   [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript.
-   [Axios](https://axios-http.com/) - Promise-based HTTP client for making requests.
-   [Vite](https://vitejs.dev/) - Build tool that provides a fast development experience.

## Getting Started

To get started with the application, follow these steps:

1. **Install dependencies:**

    ```bash
    npm install
    ```

2. **Set up .env file:**

    - In the root directory of Frontend, there should be a .env.example.
    - Rename .env.example to .env.
    - Update the PORT variable in the .env file to match your backend server's port if you decide to change the PORT of the backend server.
    - Default of backend is 5500

3. **Change PORT of frontend (optional):**

    - Default is 5000
    - Change port on which the app will run on in the vite.config.ts file.

4. **Start the development server:**

    ```bash
    npm run dev
    ```

The application should now be runnig on [http://localhost:5000](http://localhost:5000)

## Usage

-   Enter a domain name in the input field and submit to retrieve the domain and contact information.

-   Examples
    -   google.com
    -   amazon.com
    -   w3schools.com
    -   sourceforge.net
    -   example-domain.com
    -   example-domain.net
