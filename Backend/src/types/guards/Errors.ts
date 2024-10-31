import { IWhoisError } from "../interfaces/WhoisRecordRes";

export function instanceOfWhoisError(error: any): error is IWhoisError {
    return "ErrorMessage" in error;
}
