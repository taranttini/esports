// 1100 -> "18:20"

export function minutesToHourString(minutesAmount: number) {
  const hour = Math.floor(minutesAmount / 60);
  const minute = minutesAmount % 60;

  //return "00:00"
  return [
    String(hour).padStart(2, '0'),
    String(minute).padStart(2, '0')
  ].join(":");
}