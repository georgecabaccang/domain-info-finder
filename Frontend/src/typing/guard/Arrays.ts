import { HostNames } from "../type/HostNamesType";

export function instanceOfHostNamesArray(object: unknown): object is HostNames {
    if (Array.isArray(object)) {
        return typeof object[0] === "string";
    }
    return false;
}
