const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const startDate = new Date("2025-02-03"); // Год-месяц-день
const currentDate = new Date(getCurrentDate()); // Год-месяц-день

// Вычисляем разницу между датами в миллисекундах
const currentWeekDate = +currentDate - +startDate;

// Конвертируем миллисекунды в недели
const supposedWeek = Math.ceil(currentWeekDate / (1000 * 60 * 60 * 24 * 7));
const currentWeek = supposedWeek > 23 ? 22 : supposedWeek;

export default function useCurrentWeek() {
  return { week: currentWeek };
}
