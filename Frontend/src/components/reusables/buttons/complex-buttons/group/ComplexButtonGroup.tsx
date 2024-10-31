import ComplexButton from "../ComplexButton";

export default function ComplexButtonGroup({
    labels,
    groupClassName,
    buttonStyles,
    buttonFunctions,
}: {
    labels: string | string[];
    groupClassName: string;
    buttonStyles: string | { for: string; style: string }[];
    buttonFunctions: (() => void) | { for: string; function: () => void }[];
}) {
    let buttonOutput;

    // if all of the props that can be an array is not an array, return a single <Button />
    if (!Array.isArray(labels) && !Array.isArray(buttonStyles) && !Array.isArray(buttonFunctions)) {
        buttonOutput = (
            <ComplexButton label={labels} style={buttonStyles} clickFunction={buttonFunctions} />
        );
    }

    // if names is an array, map through all elements and return a <Button /> each
    if (Array.isArray(labels)) {
        buttonOutput = labels.map((name, index) => (
            <ComplexButton
                key={index}
                label={name}
                style={getStylesForName(name)}
                clickFunction={getFunctionForName(name)}
            />
        ));
    }

    // if buttonFunctions is not an array, it returns the function as it is.
    // if buttonsFuncions is an array, it finds the function for the corresponding
    // name of the button and returns it.
    // if no function is designated for the name, return null
    function getFunctionForName(name: string): (() => void) | null {
        if (!Array.isArray(buttonFunctions)) return buttonFunctions;

        const buttonFunction = buttonFunctions.find(
            (buttonFunction) => buttonFunction.for === name
        );

        return buttonFunction ? buttonFunction.function : null;
    }

    // if buttonStyles is not an array, it returns the style as it is.
    // if buttonStyles is an array, it finds the style for the corresponding
    // name of the button and returns it.
    // if no style is designated for the name, return an empty string
    function getStylesForName(name: string): string {
        if (!Array.isArray(buttonStyles)) return buttonStyles;

        const buttonStyle = buttonStyles.find((buttonStyle) => buttonStyle.for === name);

        return buttonStyle ? buttonStyle.style : "";
    }

    return <div className={groupClassName}>{buttonOutput}</div>;
}
