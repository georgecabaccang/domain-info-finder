import { IDomainInfo, IInformationTables } from "../interface/IInformation";

export function instanceOfWhoisInfo(object: unknown): object is IInformationTables {
    if (object && typeof object === "object") {
        return "domainInfo" in object;
    }
    return false;
}

export function instanceOfDomainInfo(object: unknown): object is IDomainInfo {
    if (object && typeof object === "object") {
        return "Domain Name" in object;
    }
    return false;
}
