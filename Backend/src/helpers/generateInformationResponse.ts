import { IInformationTables } from "../types/interfaces/IInformationTables";
import { IWhoisRecord } from "../types/interfaces/WhoisRecordRes";
import formatDate from "./formatDate";

export default function generateInformationResponse(whoisData: IWhoisRecord) {
    const organization = {
        // NOTE: For each of the properties except for contactEmail //
        // check if whois api provided name of registrant name, technicalContact name, and administrativeContact name
        // if whois did not provide, use the organization provided instead of name
        // if both are not provided, use "Not Available"
        registrant: whoisData.registrant?.name
            ? whoisData.registrant.name
            : whoisData.registrant?.organization
            ? `${whoisData.registrant.organization} (Organization Name)`
            : "Not Available",
        technicalContact: whoisData.technicalContact?.name
            ? whoisData.technicalContact.name
            : whoisData.technicalContact?.organization
            ? `${whoisData.technicalContact.organization} (Organization Name)`
            : "Not Available",
        administrativeContact: whoisData.administrativeContact?.name
            ? whoisData.administrativeContact.name
            : whoisData.administrativeContact?.organization
            ? `${whoisData.administrativeContact.organization} (Organization Name)`
            : "Not Available",
        contactEmail: whoisData.contactEmail || "Not Available",
    };

    const responseData: IInformationTables = {
        domainInfo: {
            ["Domain Name"]: whoisData.registryData.domainName,
            ["Registrar Name"]: whoisData.registrarName,
            ["Registration Date"]: formatDate(
                new Date(whoisData.registryData.createdDateNormalized)
            ),
            ["Expiration Date"]: formatDate(new Date(whoisData.registryData.expiresDateNormalized)),
            ["Estimated Domain Age"]: Math.floor(whoisData.estimatedDomainAge / 365),
            ["Host Names"]: whoisData.registryData.nameServers.hostNames,
        },
        contactInfo: {
            ["Registrant Name"]: organization.registrant,
            ["Technical Contact Name"]: organization.technicalContact,
            ["Administrative Contact Name"]: organization.administrativeContact,
            ["Contact Email"]: organization.contactEmail,
        },
    };

    return responseData;
}
