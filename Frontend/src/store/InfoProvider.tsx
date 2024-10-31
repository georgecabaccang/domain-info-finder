import { ReactNode, useState } from "react";
import { IInformationTables } from "../typing/interface/IInformation";
import InfoContext from "./InfoContext";

const InfoContextProvider = ({ children }: { children: ReactNode }) => {
    const [info, setInfo] = useState<IInformationTables | null>(null);

    // use this function instead of directly using the setInfo for a value of Provider
    // just in case other logic should go in, not just updating the sate of info
    function handleStateUpdate(info: IInformationTables | null) {
        setInfo(info);
    }

    return (
        <InfoContext.Provider value={{ info, handleStateUpdate }}>{children}</InfoContext.Provider>
    );
};

export default InfoContextProvider;
