export function DateFormatter(date: string){
    let DATE = {
        year: date.substring(0, 4),
        moth: date.substring(5, 7),
        day: date.substring(8, 10),
    };
    return `${DATE.day}.${DATE.moth}.${DATE.year}`;
}