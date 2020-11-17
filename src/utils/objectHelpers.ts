// universal function for changing objects in an array
// creates a copy of the object if it finds a match by ID
// and will replace the state and old properties

export const updateObjectInArray = (
  // get an array,
  items: any,

  // value for comparison by ID
  itemId: any,

  // name of properties
  objPropName: any,

  // object properties to be changed
  newObjProps: any
) => {
  return items.map((item: any) => {
    if (item[objPropName] === itemId) {
      // destructuring newObjProps (there may be several properties)
      return { ...item, ...newObjProps };
    }
    return item;
  });
};
