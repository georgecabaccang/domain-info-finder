export interface IInformationTables {
    domainInfo: {
        ["Domain Name"]: string;
        ["Registrar Name"]: string;
        ["Registration Date"]: string;
        ["Expiration Date"]: string;
        ["Estimated Domain Age"]: number;
        ["Host Names"]: string[];
    };
    contactInfo: {
        ["Registrant Name"]: string;
        ["Technical Contact Name"]: string;
        ["Administrative Contact Name"]: string;
        ["Contact Email"]: string;
    };
}
