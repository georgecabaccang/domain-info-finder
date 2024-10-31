export interface IDomainInfo {
    ["Domain Name"]: string;
    ["Registrar Name"]: string;
    ["Registration Date"]: string;
    ["Expiration Date"]: string;
    ["Estimated Domain Age"]: number;
    ["Host Names"]: string[];
}

export interface IContactInfo {
    ["Registrant Name"]: string;
    ["Technical Contact Name"]: string;
    ["Administrative Contact Name"]: string;
    ["Contact Email"]: string;
}

export interface IInformationTables {
    domainInfo: IDomainInfo;
    contactInfo: IContactInfo;
}
