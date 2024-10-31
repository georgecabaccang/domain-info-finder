import styles from "./NavBar.module.css";

export default function NavBar() {
    return (
        <nav className={styles.nav}>
            <div>
                <h4>Domain Data Checker</h4>
                <p>A simple application</p>
            </div>
        </nav>
    );
}
