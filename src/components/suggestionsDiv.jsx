import { getLastWord, removeLastWordAndAddNewWord } from "../utils/utlis";
import "./SearchDataSearchBar.css";
import { statements } from "../utils/strings";
export default function Suggestions({
  arr,
  setClickedSuggestion,
  clickedSuggestion,
  simpleText,
  setSimpleText,
  // promiseRejected,
  // suggestionsRef,
  setShowSuggestions,
}) {
  let lastWord = getLastWord(simpleText);

  function onClickSuggestion(e) {
    e.preventDefault();
    let clickedWord = e.target.innerText;
    // console.log("clicked");
    let newText = removeLastWordAndAddNewWord(clickedWord, simpleText);
    setSimpleText(newText);
    setClickedSuggestion(!clickedSuggestion);
    setShowSuggestions(false);
  }

  return (
    <div className="suggestions-box">
      {!(arr.length === 0) && (
        <div
        // ref={suggestionsRef}
        >
          {arr.map((word) => {
            const isMatchedWithLastWord = lastWord === word;

            return (
              <div
                key={word}
                className={
                  isMatchedWithLastWord
                    ? "bold-suggestions-word"
                    : "normal-suggestions-word"
                }
                // style={{
                //   fontWeight: isMatchedWithLastWord ? "bold" : "normal",

                //   color: "#454545",
                //   margin: "3px",
                //   backgroundColor: "rgba(239, 240, 240, 1)",
                //   borderRadius: "7px",
                //   width: "30vw",
                //   maxWidth: "fitContent",
                //   textAlign: "center",
                // }}
                onMouseDown={onClickSuggestion}
              >
                {word}
              </div>
            );
          })}
        </div>
      )}

      {arr.length === 0 && (
        <div className="empty-suggestions-msg">
          <p>{statements.EmptySuggestions}</p>
        </div>
      )}

      {/* {promiseRejected && (
        <div className="rejection-msg">
          <p>{statements.SomethingWentWrong}</p>
        </div>
      )} */}
    </div>
  );
}
