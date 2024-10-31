import { ReactNode } from "react";
import styles from "./Table.module.css";
import "./Table.module.css";
import TableHead from "../head/TableHead";
import TableBody from "../body/TableBody";

export default function Table({ children }: { children: ReactNode }) {
    return <table className={styles.table}>{children}</table>;
}

Table.Header = TableHead;
Table.Body = TableBody;
