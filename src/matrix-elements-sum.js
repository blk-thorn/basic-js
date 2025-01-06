const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given matrix, a rectangular matrix of integers,
 * just add up all the values that don't appear below a "0".
 *
 * @param {Array<Array>} matrix
 * @return {Number}
 *
 * @example
 * matrix = [
 *  [0, 1, 1, 2],
 *  [0, 5, 0, 0],
 *  [2, 0, 3, 3]
 * ]
 *
 * The result should be 9
 */
function getMatrixElementsSum(matrix) {
  let totalSum = 0;
  const rows = matrix.length;
  const cols = matrix[0].length;
  const canAdd = Array(cols).fill(true);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!canAdd[j]) {
        continue;
      }
      if (matrix[i][j] === 0) {
        canAdd[j] = false;
      } else {
        totalSum += matrix[i][j];
      }
    }
  }

  return totalSum;
}

module.exports = {
  getMatrixElementsSum
};
