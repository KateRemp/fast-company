export function displayDate(data) {
  const date = new Date(parseInt(data));
  const dateNow = new Date();
  const yearDif = dateNow.getFullYear() - date.getFullYear();
  if (yearDif === 0) {
    const dayDif = dateNow.getDay() - date.getDay();
    if (dayDif === 0) {
      const hourDif = dateNow.getHours() - date.getHours();
      if (hourDif === 0) {
        const minutesDif = dateNow.getMinutes() - date.getMinutes();
        if (minutesDif >= 0 && minutesDif < 5) return '1 min ago';
        if (minutesDif >= 5 && minutesDif < 10) return '5 min ago';
        if (minutesDif >= 10 && minutesDif < 30) {
          return '10 min ago';
        }
        return '30 min ago';
      }
      return `${date.getHours()}:${date.getMinutes()}`;
    }
    return `${date.getDay()}.${date.toLocaleString('default', {
      month: 'long'
    })}`;
  }
  return (
    date.getFullYear() + '.' + (date.getMonth() + 1) + '_' + date.getDate()
  );
}
