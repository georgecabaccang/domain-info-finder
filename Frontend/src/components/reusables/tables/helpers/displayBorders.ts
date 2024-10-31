// handles border of each child of a row in a table
export default function displayBorders(
    index: number,
    length: number,
    borderOfFirstChildStyle: string,
    borderOfLastChildStyle: string
): string {
    if (index === 0) return borderOfFirstChildStyle;
    if (index === length - 1) return borderOfLastChildStyle;
    return "";
}
