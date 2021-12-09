export default function convertHourToMinutes(time: string){

    /* após o split, map vai transformar em numérico */
    const [hour, minutes] = time.split(':').map(Number)

    const timeInMinutes = (hour * 60) + minutes;

    return timeInMinutes;

}    