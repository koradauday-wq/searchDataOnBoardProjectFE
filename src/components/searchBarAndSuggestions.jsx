import Suggestions from "./suggestionsDiv";
import PropTypes from "prop-types";

SearchBarAndSuggestions.propTypes = {
  inputRef: PropTypes.shape({
    current: PropTypes.instanceOf(HTMLInputElement),
  }),
  simpleText: PropTypes.string,
  setSimpleText: PropTypes.func,
  debounceHandler: PropTypes.func,
  setIsFocused: PropTypes.func,
  handleSearchBarChange: PropTypes.func,
  setSuggestionsArr: PropTypes.func,
  isFocused: PropTypes.bool,
  showSuggestions: PropTypes.bool,
  suggestionsArr: PropTypes.array,
  promiseRejected: PropTypes.bool,
  setShowSuggestions: PropTypes.func,
  setPromiseRejected: PropTypes.func,
};

export default function SearchBarAndSuggestions({
  inputRef,
  simpleText,
  setSimpleText,
  debounceHandler,
  setIsFocused,
  handleSearchBarChange,
  setSuggestionsArr,
  isFocused,
  showSuggestions,
  suggestionsArr,
  promiseRejected,
  setShowSuggestions,
  setPromiseRejected,
}) {
  return (
    <div className="search-bar-and-suggestions">
      <div className="flexDiv">
        <textarea
          ref={inputRef}
          placeholder="Search Data"
          name="search-bar"
          className="search-bar"
          id="search-bar"
          value={simpleText}
          onChange={(e) => {
            const totalText = e.target.value;
            setSimpleText(totalText);
            debounceHandler(totalText);
          }}
          onFocus={() => {
            setIsFocused(true);

            handleSearchBarChange(simpleText);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            setPromiseRejected(false);
            setSuggestionsArr([]);
            setShowSuggestions(false);
          }}
        ></textarea>
        {isFocused && showSuggestions && !promiseRejected && (
          <Suggestions
            arr={suggestionsArr}
            simpleText={simpleText}
            setSimpleText={setSimpleText}
            setShowSuggestions={setShowSuggestions}
          />
        )}
      </div>
    </div>
  );
}
