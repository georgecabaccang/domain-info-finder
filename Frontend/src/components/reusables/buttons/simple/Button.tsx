import { ReactNode } from "react";

export default function Button({
    children,
    className,
    clickFunction,
}: {
    children: ReactNode;
    className: string;
    clickFunction: (() => void) | null;
}) {
    return (
        <button className={className} onClick={clickFunction || (() => {})}>
            {children}
        </button>
    );
}
