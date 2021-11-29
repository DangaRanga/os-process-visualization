/**
 * Creates all permutations of an array
 *
 * Does some javascript gymnastics
 * @param {*} inputArr
 * @returns
 */
export function permutations(inputArr) {
  let result = [];

  // Helper function to perform permutations of inputted array
  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);

        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
}
