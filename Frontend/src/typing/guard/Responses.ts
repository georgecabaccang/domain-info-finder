import { IAxiosResponse } from "../interface/IAxiosResponse";

export function instanceOfAxiosResponse(object: unknown): object is IAxiosResponse {
    if (object && typeof object === "object") {
        return "data" in object;
    }
    return false;
}
