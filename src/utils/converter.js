/**
 * Convert request filter to object.
 * @param {String} filter
 */
export function convertFilterStringToObject(filter) {
  if (!filter) return {};

  let filterString = filter
    .replace(/([\w|$]+[:])|('[^']+')/g, (expression, group) => {
      if (!group) {
        return expression;
      } else {
        return `"${expression.replace(":", '":')}`;
      }
    })
    .replace(/\'/g, '"');

  return JSON.parse(`{${filterString}}`);
}

export function copyObject(_object) {
  return JSON.parse(JSON.stringify(_object));
}

export function defineObjectProperty(_object, key, value) {
  Object.defineProperty(_object, key, {
    enumerable: true,
    configurable: true,
    writable: true,
    value
  });
}

export function formatDate(date) {
  if (!date) return null;

  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}
