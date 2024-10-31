import axios, { AxiosError } from "axios";
import { Request, Response } from "express";
import { instanceOfWhoisError } from "../types/guards/Errors";
import { instanceOfAxiosResponse, instanceOfWhoisRecord } from "../types/guards/Responses";
import generateInformationResponse from "../helpers/generateInformationResponse";

const DOMAIN_NOT_FOUND = "domain_not_found";
const REQUEST_TIMEOUT = "request_timeout";

export async function getDomainInfo(request: Request, response: Response) {
    const domainNameRequest = request.params.domainName;
    const requestError = new AxiosError();

    // change to preferred timeout in milliseconds
    const timeout = 8000;

    try {
        // create abortController for the case of the API takes too long to respond
        let abortController = new AbortController();

        // create request to Whois API
        const apiRequest = axios.get(
            `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${process.env.WHOIS_API_KEY}&domainName=${domainNameRequest}&outputFormat=JSON`,
            { signal: abortController.signal }
        );

        // craete a promise for aborting/canceling and "timing out" the request
        const timeoutRequest = new Promise((_, reject) => {
            setTimeout(() => {
                abortController.abort();
                reject(new AxiosError(REQUEST_TIMEOUT));
            }, timeout);
        });

        // Promise.race to abort/cancel request if the request to Whois exceeds given timeout
        const result = await Promise.race([apiRequest, timeoutRequest]);

        if (!instanceOfAxiosResponse(result)) throw new AxiosError("server_error");

        const { data } = result;

        if (instanceOfWhoisError(data)) {
            if (data.ErrorMessage.msg.includes("is an invalid domain name")) {
                requestError.message = DOMAIN_NOT_FOUND;
            } else if (data.ErrorMessage.errorCode.includes("API_KEY")) {
                requestError.message = "api_key_authenticate_failed";
            }
            throw requestError;
        }

        if (!instanceOfWhoisRecord(data)) {
            requestError.message = "invalid_data";
            throw requestError;
        }

        if (data.WhoisRecord.dataError) {
            requestError.message = DOMAIN_NOT_FOUND;
            throw requestError;
        }

        const responseData = generateInformationResponse(data.WhoisRecord);

        response.status(200).send(responseData);
    } catch (error) {
        if (error instanceof AxiosError) {
            switch (error.message) {
                case "Request failed with status code 401":
                    response.status(401).send({
                        error: {
                            message: "Unauthorized. (API Key used by server)",
                            statusCode: error.status,
                        },
                    });
                    break;
                case DOMAIN_NOT_FOUND:
                    response
                        .status(404)
                        .send({ error: { message: "Domain not found.", statusCode: 404 } });
                    break;
                case REQUEST_TIMEOUT:
                    response
                        .status(504)
                        .send({ error: { message: "API request timeout.", statusCode: 504 } });
                    break;
                default:
                    response
                        .status(500)
                        .send({ error: { message: "Internal server error.", statusCode: 500 } });
            }
        }
    }
}
