import {
  getLastWord,
  reverseString,
} from "./withDebounce/searchDataSearchBarDebounceWorking";
import "./SearchDataSearchBar.css";

export default function SuggestionsDiv2({
  arr,
  setClickedSuggestionDiv,

  clickedSuggestionDiv,

  simpleText,
  setSimpleText,

  promiseRejected,
}) {
  let total_Text = simpleText;

  let lastWord = getLastWord(total_Text);
  console.log("entered suggestions div");
  // const normalStyle = {
  //   // fontWeight: isMatchedWithLastWord ? "bold" : "normal",
  //   // backgroundColor: "rgb(32, 100, 201)",
  //   color: "#454545",
  //   margin: "3px",
  //   backgroundColor: "#dfe0e0ff",
  //   borderRadius: "7px",
  //   width: "450px",
  //   maxWidth: "fitContent",
  // };
  // const hoverstyle = {
  //   // fontWeight: isMatchedWithLastWord ? "bold" : "normal",
  //   // backgroundColor: "rgb(32, 100, 201)",
  //   color: "#454545",
  //   margin: "3px",
  //   backgroundColor: "#dfe0e0ff",
  //   borderRadius: "7px",
  //   width: "450px",
  //   maxWidth: "fitContent",
  // };

  // still in making of the functionality of "wanted to make the suggestion word bigger than usual while hovering
  // on the word using conditional styling.."

  return (
    <div
      className="suggestions-box"
      // style={{
      //   width: !(!(arr.length === 0) && !promiseRejected)
      //     ? "500px"
      //     : "fitContent",
      // }}
    >
      {!(arr.length === 0) && !promiseRejected && (
        <div>
          {arr.map((word) => {
            let isMatchedWithLastWord = false;
            if (lastWord === word) {
              isMatchedWithLastWord = true;
            } else {
              isMatchedWithLastWord = false;
            }

            return (
              <div
                key={word}
                className="suggestions-div"
                style={{
                  fontWeight: isMatchedWithLastWord ? "bold" : "normal",

                  color: "#454545",
                  margin: "3px",
                  backgroundColor: "rgba(239, 240, 240, 1)",
                  borderRadius: "7px",
                  width: "30vw",
                  maxWidth: "fitContent",
                }}
                onClick={(e) => {
                  let clicked_word = e.target.innerText;
                  console.log(e.target.innerText);

                  let totalText = total_Text;
                  let last_Word = lastWord;

                  console.log(`clicked:${word}`);
                  let n = last_Word.length;
                  while (n > 0) {
                    last_Word = last_Word.slice(0, -1);

                    totalText = totalText.slice(0, -1);
                    n--;
                  }

                  totalText += clicked_word;
                  totalText += " ";
                  setSimpleText(totalText);
                  setTimeout(() => {
                    setClickedSuggestionDiv(!clickedSuggestionDiv);
                  }, 10);
                }}
              >
                {word}
              </div>
            );
          })}
        </div>
      )}

      {arr.length === 0 && !promiseRejected && (
        <div className="empty-suggestions-msg">
          <p>suggestions are empty</p>
        </div>
      )}

      {promiseRejected && (
        <div className="rejection-msg">
          <p>Something went Wrong...</p>
        </div>
      )}
    </div>
  );
}
