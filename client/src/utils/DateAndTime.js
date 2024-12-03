export const fetchTime = (info) => {
    const dateObj = new Date(info);

    // Get UTC time first
    let hours = dateObj.getUTCHours();
    let minutes = dateObj.getUTCMinutes();

    // Adjust for IST (UTC + 5:30)
    hours += 5;
    minutes += 30;

    // Handle overflow of minutes
    if (minutes >= 60) {
        minutes -= 60;
        hours += 1;
    }

    // Handle overflow of hours if it exceeds 24
    if (hours >= 24) {
        hours -= 24;
    }

    // Format time to always show two digits for minutes
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
}
