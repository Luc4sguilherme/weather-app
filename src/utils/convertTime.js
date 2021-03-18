import moment from 'moment';

export default function convertTime(timestamp, timezone = 0) {
  const time = moment(timestamp * 1000);
  const date = moment(time).utcOffset(timezone / 60);
  const hour = Number(date.format('H'));

  return {
    horary: hour >= 18 || hour < 6 ? 'night' : 'day',
    date,
  };
}
