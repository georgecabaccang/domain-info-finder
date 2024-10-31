import "dotenv/config";
import fs from "fs";
import path from "path";

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { getDomainInfo } from "./controllers/whoisController";

const PORT = 5500;

const app = express();

const envFilePath = path.join(__dirname, "..", ".env");

// Check if .env file exists
if (!fs.existsSync(envFilePath)) {
    console.error(
        `Error: .env is missing. Please also make sure that you have a Whois API Key. Please restart app after.`
    );
    process.exit(1); // stop backend app from starting
}

// check if WHOIS_API_KEY is supplied
if (!process.env.WHOIS_API_KEY) {
    console.error(`Error: Please supply your WHOIS_API_KEY in the .env file.`);
    process.exit(1); // stop backend app from starting
}

// even in simplest form, use cors for good practice
app.use(cors());

// bodyParser to parse body of incoming request
app.use(bodyParser.json());

// single and main endpoint
app.use("/:domainName", getDomainInfo);

// listen to given the port in the .env file
// and log a message to indicate on what port the app is on.
app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`);
});
