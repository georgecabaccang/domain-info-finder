import { createContext } from "react";
import { IInformationTables } from "../typing/interface/IInformation";

interface IContextProvider {
    info: IInformationTables | null;
    handleStateUpdate: (value: IInformationTables | null) => void;
}

// use explicitly stringed key names by using brackets for easy displaying of table headers.
const initialValues: IInformationTables = {
    domainInfo: {
        ["Domain Name"]: "",
        ["Registrar Name"]: "",
        ["Registration Date"]: "",
        ["Expiration Date"]: "",
        ["Estimated Domain Age"]: 0,
        ["Host Names"]: [],
    },
    contactInfo: {
        ["Registrant Name"]: "",
        ["Technical Contact Name"]: "",
        ["Administrative Contact Name"]: "",
        ["Contact Email"]: "",
    },
};

const InfoContext = createContext<IContextProvider>({
    info: initialValues,
    handleStateUpdate: () => {},
});

export default InfoContext;
