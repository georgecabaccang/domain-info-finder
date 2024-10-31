export default function checkNetwork() {
    const isOnline = navigator.onLine;
    let status: number | null = null;

    if (!isOnline) {
        status = 430; // use unassigned status code just for connection issues.
    }

    return { isOnline, status };
}
