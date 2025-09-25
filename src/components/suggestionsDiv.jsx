import { getLastWord, removeLastWordAndAddNewWord } from "../utils/utlis";
import "./SearchDataSearchBar.css";
import { statements } from "../utils/strings";
import PropTypes from "prop-types";

Suggestions.propTypes = {
  arr: PropTypes.array,
  simpleText: PropTypes.string,
  setSimpleText: PropTypes.func,
  setShowSuggestions: PropTypes.func,
};

export default function Suggestions({
  arr,
  simpleText,
  setSimpleText,
  setShowSuggestions,
}) {
  let lastWord = getLastWord(simpleText);

  function onClickSuggestion(e) {
    e.preventDefault();
    let clickedWord = e.target.innerText;
    let newText = removeLastWordAndAddNewWord(clickedWord, simpleText);
    setSimpleText(newText);
    setShowSuggestions(false);
  }

  return (
    <div className="suggestions-box">
      {!(arr.length === 0) && (
        <div>
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
    </div>
  );
}
