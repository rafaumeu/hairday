import dayjs from 'dayjs';
import { openingHours } from '../../utils/opening-hours';


const hours = document.getElementById('hours')
export function hoursLoad({ date }) {
  const opening = openingHours.map(hour => {
    const [scheduleHour, ] = hour.split(':');
    const isHourPast = dayjs(date).add(scheduleHour, "hour").isAfter(dayjs());
    return{
      hour,
      available: isHourPast
    }
  })
  opening.forEach(({ hour, available }) => {
    const li = document.createElement('li');
    li.classList.add('hour', available ? 'hour-available' : 'hour-unavailable');
    li.textContent = hour;
    hours.append(li);
  })
}
