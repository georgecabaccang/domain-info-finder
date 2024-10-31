import { useContext, useEffect, useState } from "react";
import Table from "../../reusables/tables/table/Table";
import { IContactInfo, IDomainInfo } from "../../../typing/interface/IInformation";

import styles from "./Result.module.css";
import InfoContext from "../../../store/InfoContext";
import { instanceOfDomainInfo } from "../../../typing/guard/WhoisInfo";
import ButtonGroup from "../../reusables/buttons/simple/group/ButtonGroup";

const DOMAIN_INFO = "domain_info";
const CONTACT_INFO = "contact_info";

export default function Result() {
    const [infoToShow, setInfoToShow] = useState<IDomainInfo | IContactInfo | null>(null);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const maxStringLengthForTruncation = 25;

    const { info } = useContext(InfoContext);

    function changeDisplay(toDisplay: string) {
        // check if info in context is null, return if true
        if (!info) return;

        return toDisplay === DOMAIN_INFO
            ? setInfoToShow(info.domainInfo)
            : setInfoToShow(info.contactInfo);
    }

    function toggleTruncate() {
        setIsExpanded((prev) => !prev);
    }

    useEffect(() => {
        // check if info in context is null, return if true
        if (!info) return;

        // set domain info as intial display to user
        setInfoToShow(info.domainInfo);
        setIsExpanded(false);
    }, [info]);

    if (!infoToShow) return;

    const keysAndValues = Object.entries(infoToShow); // create array out of data's properties/entries

    // to be added to the table title
    const currentDomainSearched = `for ${info?.domainInfo["Domain Name"]}`;
    // condition for what title to display
    const tableTitleToShow = instanceOfDomainInfo(infoToShow)
        ? `Domain Information ${currentDomainSearched}`
        : `Contact Information ${currentDomainSearched}`;

    return (
        <div className={styles.result_container}>
            <h3>{tableTitleToShow}</h3>
            <Table>
                <Table.Header
                    entries={keysAndValues}
                    buttonFunction={toggleTruncate}
                    buttonTexts={{ primary: "Collapse", secondary: "Expand" }}
                    condition={isExpanded}
                    conditionalKeyForButton="Host Names"
                />
                <Table.Body
                    entries={keysAndValues}
                    modifiedAndModifier={[{ modified: "Estimated Domain Age", modifier: "years" }]}
                    maxStringLengthForTruncation={maxStringLengthForTruncation}
                    isValueExpanded={isExpanded}
                />
            </Table>
            <ButtonGroup groupClassName={styles.result__button_container}>
                <ButtonGroup.Button
                    className={styles.result__button}
                    clickFunction={() => changeDisplay(DOMAIN_INFO)}
                >
                    Domain Info
                </ButtonGroup.Button>
                <ButtonGroup.Button
                    className={styles.result__button}
                    clickFunction={() => changeDisplay(CONTACT_INFO)}
                >
                    Contact Info
                </ButtonGroup.Button>
            </ButtonGroup>

            {/* Give the complex one a try :D */}
            {/* Both ComplexButton and ComplexButtonGroup are in the same folder */}
            {/* <ComplexButtonGroup
                labels={["Domain Info", "Contact Info"]}
                groupClassName={styles.result__button_container}
                buttonStyles={styles.result__button}
                buttonFunctions={[
                    { for: "Domain Info", function: () => changeDisplay(DOMAIN_INFO) },
                    { for: "Contact Info", function: () => changeDisplay(CONTACT_INFO) },
                ]}
            /> */}
        </div>
    );
}
