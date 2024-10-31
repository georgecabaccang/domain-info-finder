const HttpErrorMessage = {
    401: "The server encountered an issue due to an invalid API key. Please contact support.",
    404: "Domain not found. Please check the URL. (e.g. google.com)",
    408: "Request timed out. Please check your internet connection and try again.",
    430: "No internet connection.",
    504: "The server timed out waiting for a response. Please try again later.",
    500: "Something went wrong on our end. Please try again later.",
};

export default HttpErrorMessage;
