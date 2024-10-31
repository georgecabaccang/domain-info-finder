export default function formatDate(date: Date) {
    // format date into a date string
    const dateStringCopy = date.toDateString();

    // split dateString to an array
    const splitString = dateStringCopy.split(" ");

    // remove first element of array, which is the day (Mon, Tue, Wed, ...)
    splitString.shift();

    // add comma at the end of the date (e.g. 12,)
    splitString[1] = splitString[1] + ",";

    // join array into a string and return
    return splitString.join(" ");
}
