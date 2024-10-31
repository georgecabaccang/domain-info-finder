import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./SeachBar.module.css";
import { IInformationTables } from "../../../typing/interface/IInformation";

export default function SearchBar({
    placeHolder,
    requestFunction,
    storeFunction,
    setIsLoading,
}: {
    placeHolder?: string;
    requestFunction: (value: string) => Promise<IInformationTables | string | undefined>;
    storeFunction: (value: IInformationTables) => void;
    setIsLoading: (value: boolean) => void;
}) {
    const [searchValue, setSearchValue] = useState("");
    const [error, setError] = useState<string | null>(null);

    function handleInput(event: ChangeEvent<HTMLInputElement>) {
        setSearchValue(event.target.value);
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        // validation for user input
        if (!searchValue || !searchValue.trim())
            return setError("Please enter a valid domain name.");

        setIsLoading(true);

        // make request and wait for the result
        const result = await requestFunction(searchValue);

        // if result (error message) is a string, update error state with the result
        if (typeof result === "string") {
            setError(result);
        }
        // else, store the data recieved to the store and set error to null to remove error message
        else {
            storeFunction(result!);
            setError(null);
        }
        setIsLoading(false);
    }

    return (
        <form className={styles.form} onSubmit={(event: FormEvent) => handleSubmit(event)}>
            <div className={styles.form__input_container}>
                <input
                    className={styles.form__input}
                    placeholder={placeHolder}
                    value={searchValue}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleInput(event)}
                />
                <button className={styles.form__button} type="submit">
                    Search
                </button>
            </div>
            <span className={styles.form__error_message}>{error}</span>
        </form>
    );
}
