import displayBorders from "../helpers/displayBorders";
import formatValueToBeDisplayed from "../helpers/formatValueToBeDisplayed";
import styles from "./TableBody.module.css";

export default function TableBody({
    entries,
    modifiedAndModifier,
    maxStringLengthForTruncation,
    isValueExpanded,
}: {
    entries: [string, unknown][];
    modifiedAndModifier: { modified: string; modifier: string }[];
    maxStringLengthForTruncation: number;
    isValueExpanded: boolean;
}) {
    function findToBeModified(key: string): { key: string; stringModifier: unknown } | null {
        const indexOfModifier = modifiedAndModifier.findIndex(
            (modifier) => key === modifier.modified
        );

        if (indexOfModifier >= 0)
            return { key: key, stringModifier: modifiedAndModifier[indexOfModifier].modifier };
        return null;
    }

    return (
        <tbody>
            <tr className={styles.table_body__row}>
                {entries.map(([key, value], index) => {
                    return (
                        <td
                            key={index}
                            className={`${styles.table_body__column} ${displayBorders(
                                index,
                                entries.length,
                                styles.table_body__row__first_child,
                                styles.table_body__row__last_child
                            )} ${
                                // change word-break value in css for emails
                                typeof value === "string" &&
                                value.includes("@") &&
                                styles.table_body__column_email
                            }`}
                        >
                            {formatValueToBeDisplayed(
                                key,
                                value,
                                findToBeModified(key),
                                maxStringLengthForTruncation,
                                isValueExpanded
                            )}
                        </td>
                    );
                })}
            </tr>
        </tbody>
    );
}
