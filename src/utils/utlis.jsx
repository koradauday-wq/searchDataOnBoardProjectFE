function debounce(cb, delay) {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

function getLastWord(totalText) {
  return totalText.trim().split(" ").reverse()[0];
}

function removeLastWordAndAddNewWord(newWord, simpleText) {
  let totalText = simpleText;
  totalText = totalText.trim().split(" ");
  totalText.pop();
  totalText = totalText.join(" ");
  totalText += " " + newWord;
  return totalText.trim() + " ";
}

export { debounce, getLastWord, removeLastWordAndAddNewWord };
