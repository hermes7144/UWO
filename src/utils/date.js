// import { format, register } from 'timeago.js';
// import koLocale from 'timeago.js/lib/lang/ko';

// register('ko', koLocale);

// export function formatAgo(date, lang = 'en_US') {
//   return format(date, lang);
// }

export function formatDate(rawDate) {
  const date = new Date(rawDate);
  const year = date.getFullYear().toString().slice(-2); // 연도에서 뒤의 두 자리만 추출
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // 월을 두 자리 숫자로 변환
  const day = ('0' + date.getDate()).slice(-2); // 일을 두 자리 숫자로 변환
  return `${year}/${month}/${day}`;
}