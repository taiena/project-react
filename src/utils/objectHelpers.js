// универсальная функция, помогает изменить в массиве какой-то объект
// если найдет совпадение по айди, создаст копию объекта
// и заменит стейт и старые свойства деструктуризацией

export const updateObjectInArray = (
  // получаем массив items,
  items,

  // значение на сравнение по айди itemId
  itemId,

  // имя свойства objPropName, обращаемся не точнчной нотацией,
  // а через скобки item[objPropName],
  objPropName,

  // свойства объекта, которые нужно поменять newObjProps
  newObjProps
) => {
  return items.map((item) => {
    if (item[objPropName] === itemId) {
      // делаем деструктуризацию newObjProps (там может быть несколько свойств)
      return { ...item, ...newObjProps };
    }
    return item;
  });
};
