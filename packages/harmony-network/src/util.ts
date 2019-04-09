/**
 * @function getResultForData
 * @description get result for data by default
 * @param  {any} data - object get from provider
 * @return {any} data result or data
 */
export function getResultForData(data: any): any {
  if (data.result) {
    return data.getResult;
  }
  if (data.error) {
    return data.getError;
  }
  return data.getRaw;
}
