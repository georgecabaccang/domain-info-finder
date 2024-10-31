import { IAxiosResponse } from "../interfaces/IAxiosResponse";
import { IWhois } from "../interfaces/WhoisRecordRes";

export function instanceOfAxiosResponse(object: any): object is IAxiosResponse {
    return "data" in object;
}

export function instanceOfWhoisRecord(object: any): object is IWhois {
    return "WhoisRecord" in object;
}
