import { IChoice } from "/src/features/SearchSchedule";

export function vpkSort(arr: IChoice[]) {
  // Функция для получения порядкового номера из имени
  function getOrderNumber(name: string) {
    const match = name.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  }

  // Функция для сравнения элементов
  function compare(a: IChoice, b: IChoice) {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    // Определяем, является ли элемент ВПК или мВПК
    const isVPK_A = nameA.includes("впк");
    const isVPK_B = nameB.includes("впк");

    // Если оба элемента ВПК или оба элемента мВПК, сравниваем их порядковые номера
    if ((isVPK_A && isVPK_B) || (!isVPK_A && !isVPK_B)) {
      const orderA = getOrderNumber(nameA);
      const orderB = getOrderNumber(nameB);
      return orderA - orderB;
    }

    // Если элементы разных типов, сортируем ВПК перед мВПК
    return isVPK_A ? -1 : 1;
  }

  // Производим сортировку массива с помощью функции сравнения
  arr.sort(compare);

  return arr;
}
