export const currentTime = () => {
  let now = new Date();
  let currentYear = now.getFullYear();
  let currentMonth = now.getMonth() + 1;
  let currentDate = now.getDate();
  let week = ["일", "월", "화", "수", "목", "금", "토"];
  let dayofWeek = week[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  return (
    currentYear +
    "년" +
    currentMonth +
    "월" +
    currentDate +
    "일" +
    dayofWeek +
    "요일" +
    hours +
    ":" +
    minutes
  );
};
