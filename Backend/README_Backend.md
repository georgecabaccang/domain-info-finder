# Domain Info Finder - Backend

## Overview

This backend application is designed to provide users with comprehensive information about domain names by leveraging the Whois API. The app allows users to query specific domains and retrieve detailed registration data, ownership details, and other relevant metadata.

## Important Notes

-   This README_Backend is more or less a summary for the Backend. Please refer to the README in the root of the repository.
-   You will need a Whois API key for this backend server. Instructions on how to obtain one are included below in the [Instructions to Obtain a Whois API Key](#instructions-to-obtain-a-whois-api-key) section.

## Table of Contents

-   [Features](#features)
-   [Technologies](#technologies)
-   [Instructions to Obtain a Whois API Key](#instructions-to-obtain-a-whois-api-key)
-   [Getting Started](#getting-started)
-   [Usage](#usage)
-   [Contributing](#contributing)
-   [License](#license)

## Features

-   **Domain Lookup**: Users can input a domain name to fetch information such as registration status, expiration date, and registrant details.
-   **Real-Time Data**: The application retrieves up-to-date information from the Whois API, ensuring that users have access to the latest domain records.
-   **Error Handling**: The app includes robust error handling to manage invalid domain queries or API errors gracefully, providing users with clear feedback.
-   **CORS Support**: The application has Cross-Origin Resource Sharing (CORS) enabled, allowing it to be accessed from different origins and making it suitable for integration with frontend applications.

## Technologies

This project is built with the following technologies:

-   [Node.js](https://nodejs.org/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
-   [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript that compiles to plain JavaScript.
-   [Axios](https://axios-http.com/) - Promise-based HTTP client for making requests.
-   [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
-   [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) - Middleware to enable Cross-Origin Resource Sharing.

## Instructions to Obtain a Whois API Key

1. **Go to the Whois API website and Log In or Sign Up**

    - This click the link [Whois API website](https://main.whoisxmlapi.com/login) to log in or sign up if you have not account yet.

2. **Find your API Key**

    - After logging in, click on your avatar with your name beside it, which is located at the upper right side of the web page, and click on the "My Products" option in the drop down list.

        ![my-products-option](../read-me-images/My%20Products.PNG)

3. **Copy your API Key**

    - Copy your API key by clicking on the copy icon or by highlighting and copying the API Key string.

        ![api-key](../read-me-images/API%20Key.PNG)

## Getting Started

To get started with the application, follow these steps:

1. **Install dependencies:**

    ```bash
    npm install
    ```

2. **Set up .env file:**

    - In the root directory, there should be a .env.example.
    - Rename .env.example to .env.
    - Inside the .env file, there should be a variable for your WHOIS_API_KEY without any value. Paste your copied API key after the equal (=) sign. If you still don't have an API key, please follow the instructions on how to obtain one here: [Instructions to Obtain a Whois API Key](#instructions-to-obtain-a-whois-api-key).

3. **Changing PORT of server (optional):**

    - Default is 5500
    - You can change the PORT on which the server will run in the .env file. Change the value of the constant variable PORT to a valid port number of your choosing.
    - If you do change the PORT of the server, please also update the value of the localhost in the .env file of the frontend directory.

4. **Start the development server:**

    ```bash
    npm run server
    ```

The backend application should now be runnig on [http://localhost:5500](http://localhost:5500)

## Usage

This backend application exposes a single endpoint for retrieving domain information.

### Endpoint

**GET** `/:domainName`

### Parameters

-   `domainName` (path parameter): The domain name you want to query. For example, `example.com`.

### Example Request Using Postman

-   http://localhost:5000/example.com
-   Please take note of the port the server is running on.

### Example Response

```{
    "domainInfo": {
        "Domain Name": "example.com",
        "Registrar Name": "Example, Inc.",
        "Registration Date": "Jan 1, 2000",
        "Expiration Date": "Jan 1, 2028",
        "Estimated Domain Age": 27,
        "Host Names": [
            "X.EXAMPLE.COM",
            "Y.EXAMPLE.COM",
        ]
    },
    "contactInfo": {
        "Registrant Name": "Example Person Name",
        "Technical Contact Name": "Example Tech Person Name",
        "Administrative Contact Name": "Example Admin Name",
        "Contact Email": "example@email.com"
    }
}
```

### Error Handling

```
{
    "error": {
        "message": "Unauthorized. (API Key used by server)",
        "statusCode": 401
    }
}
```
