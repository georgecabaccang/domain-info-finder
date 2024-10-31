import { ReactNode } from "react";
import Button from "../Button";

export default function ButtonGroup({
    children,
    groupClassName,
}: {
    children: ReactNode;
    groupClassName: string;
}) {
    return <div className={groupClassName}>{children}</div>;
}

ButtonGroup.Button = Button;
