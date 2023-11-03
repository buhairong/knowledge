import * as dayjs from 'dayjs';

export function getCurrentTime() {
  const date = new Date();
  return dayjs(date).format('YYYY年MM月DD日 HH:mm:ss');
}
