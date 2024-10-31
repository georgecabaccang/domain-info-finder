export interface IWhois {
    WhoisRecord: IWhoisRecord;
}

export interface IWhoisError {
    ErrorMessage: { errorCode: string; msg: string };
}

export interface IWhoisRecord {
    administrativeContact: { name: string; organization: string };
    contactEmail: string;
    estimatedDomainAge: number;
    technicalContact: { name: string; organization: string };
    registrant: { name: string; organization: string };
    registrarName: string;
    registryData: {
        domainName: string;
        createdDateNormalized: string;
        expiresDateNormalized: string;
        nameServers: { hostNames: string[] };
    };
    dataError: string;
}
