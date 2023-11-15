// function for random picking

export function randomArray(array) {
  for (let r = array.length - 1; r > 0; r--) {
    const random = Math.floor(Math.random() * (r + 1));
    [array[r], array[random]] = [array[random], array[r]];
  }
}
