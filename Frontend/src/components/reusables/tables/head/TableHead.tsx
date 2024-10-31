import displayBorders from "../helpers/displayBorders";
import styles from "./TableHead.module.css";

export default function TableHead({
    entries,
    buttonFunction,
    buttonTexts,
    condition,
    conditionalKeyForButton,
}: {
    entries: [string, unknown][];
    buttonFunction: () => void;
    buttonTexts: { primary: string; secondary: string };
    condition: boolean;
    conditionalKeyForButton: string;
}) {
    return (
        <thead className={styles.table_head}>
            <tr className={styles.table_head__row}>
                {entries.map(([key, value], index) => (
                    <th
                        key={index}
                        className={`${styles.table_head__column} ${displayBorders(
                            index,
                            entries.length,
                            styles.table_head__row__first_child,
                            styles.table_head__row__last_child
                        )}`}
                    >
                        <div className={styles.table_head__column_container}>
                            <span>{key}</span> {/* displays header */}
                            {key === conditionalKeyForButton && Array.isArray(value) && (
                                <button
                                    className={styles.table_head__column_container_button}
                                    onClick={buttonFunction}
                                >
                                    {condition ? buttonTexts.primary : buttonTexts.secondary}
                                </button>
                            )}
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    );
}
