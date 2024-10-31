import axios, { AxiosError } from "axios";
import checkNetwork from "../helpers/checkNetwork";
import HttpErrorMessage from "../constants/objects/httpErrorObj";
import { instanceOfWhoisInfo } from "../typing/guard/WhoisInfo";
import { instanceOfAxiosResponse } from "../typing/guard/Responses";

export default function getDomainInfo() {
    const requestError = new AxiosError();
    const timeout = 10000;

    return async (domainName: string) => {
        try {
            const abortController = new AbortController();

            // check for internet connection
            // add properties to customError if needed
            const { isOnline, status } = checkNetwork();
            if (!isOnline && status) {
                requestError.status = status;
                throw requestError; // throw error after adding "custom" status to customError
            }

            // create request to the server
            const request = axios.get(`${import.meta.env.VITE_LOCALHOST_PORT}/${domainName}`, {
                signal: abortController.signal,
            });

            // craete a promise for aborting/canceling and "timing out" the request
            const timeoutRequest = new Promise((_, reject) => {
                setTimeout(() => {
                    abortController.abort();
                    reject();
                }, timeout);
            }).catch(() => {
                requestError.status = 408;
                throw requestError;
            });

            // Promise.race to abort/cancel request if the request to the server exceeds given timeout
            const result = await Promise.race([request, timeoutRequest]);

            // check if result is an axios response and if data recieved is valid Whois API data
            if (!instanceOfAxiosResponse(result) || !instanceOfWhoisInfo(result.data)) {
                requestError.status = 500;
                throw requestError;
            }

            return result.data;
        } catch (error) {
            // return error message that is appropriate for the status
            if (error instanceof AxiosError) {
                switch (error.status) {
                    case 401: // will be using this error for authentication/authorization errors since other error types are not within scope
                        return HttpErrorMessage[401];
                    case 404:
                        return HttpErrorMessage[404];
                    case 408:
                        return HttpErrorMessage[408];
                    case 430: // use unassigned status code just for connection issues
                        return HttpErrorMessage[430];
                    case 504:
                        return HttpErrorMessage[504];
                    default:
                        return HttpErrorMessage[500];
                }
            }
        }
    };
}
