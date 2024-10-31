export default function formatValueToBeDisplayed(
    key: string,
    valuesToBeFormatted: unknown,
    toBeModified: { key: string; stringModifier: unknown } | null,
    maxStringLengthForTruncation: number,
    isValueExpanded: boolean
) {
    // check if valuesToBeFormatted is typeof string or number.
    // in this case, every valuesToBeFormatted would be a string or number except for the hostNames array
    if (typeof valuesToBeFormatted === "string" || typeof valuesToBeFormatted === "number") {
        if (toBeModified && key === toBeModified.key) {
            return `${valuesToBeFormatted} ${toBeModified.stringModifier}`; // coerce it to a string and add "years" and return
        }
        return valuesToBeFormatted;
    }

    // NOTE: no need to check for a type check, but for the sake of completeness and good practice, just do it
    // check if valuesToBeFormatted is an array
    if (Array.isArray(valuesToBeFormatted)) {
        // add ",\n" for a comma and line break for each element
        // without mutating the original array using .map().
        const updatedHostNames = valuesToBeFormatted.map((value, index) => {
            return index === valuesToBeFormatted.length - 1 ? value : `${value},\n`;
        });

        // join elements and convert to lowercase characters
        const expanded = updatedHostNames.join("").toLowerCase();

        // truncate joined at the maxStringLengthForTruncation of string and replace succeeding characters with "..."
        const collapsed = expanded.slice(0, maxStringLengthForTruncation) + "...";

        // asign expanded or collapsed hostNames depending on isHostNamesExpanded state
        const formatToDisplay = isValueExpanded ? expanded : collapsed;

        // return a paragraph with the combined elements to be displayed
        return <span style={{ wordBreak: "normal" }}>{formatToDisplay}</span>;
    }
}
