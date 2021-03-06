export function createNewTypeObject(type, value) {
  let newValue;
  // eslint-disable-next-line no-restricted-globals
  if (Array.isArray(value)) {
    if( type === 'hobbies'){
      newValue = value.map((v) => parseInt(v, 10));
    }
    newValue = value;
  } else if (!isNaN(parseInt(value, 10))) {
    newValue = parseInt(value, 10);
  } else {
    newValue = value;
  }
  const obj = {};
  obj[type] = newValue;
  return obj;
}
