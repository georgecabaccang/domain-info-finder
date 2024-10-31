export default function ComplexButton({
    label,
    style,
    clickFunction,
}: {
    label: string;
    style: string;
    clickFunction: (() => void) | null;
}) {
    return (
        <button className={style} onClick={clickFunction || (() => {})}>
            {label}
        </button>
    );
}
