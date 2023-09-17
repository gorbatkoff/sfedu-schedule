export const VPKSort = (a: { name: string }, b: { name: string }) => {
  // Разделяем строки "name" по "-" и получаем части с номерами ВПК
  const aParts = a.name.split(" ");
  const bParts = b.name.split(" ");

  // Парсим номера ВПК как целые числа
  const aVpkNumber = parseInt(aParts[1]);
  const bVpkNumber = parseInt(bParts[1]);

  // Сравниваем номера ВПК
  if (aVpkNumber < bVpkNumber) {
    return -1;
  } else if (aVpkNumber > bVpkNumber) {
    return 1;
  } else {
    // Если номера ВПК одинаковые, сравниваем полные названия
    return a.name.localeCompare(b.name);
  }
};
