import Suggestions from "./suggestionsDiv";
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
  clickedSuggestion,
  setClickedSuggestion,
  promiseRejected,
  // suggestionsRef,
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
            // const totalText = e.target.value;
            // setSimpleText(totalText);
            handleSearchBarChange(simpleText);
          }}
          onBlur={(e) => {
            // if (e.relatedTarget === suggestionsRef.current) {
            //   return;
            // }
            setIsFocused(false);
            setPromiseRejected(false);
            setSuggestionsArr([]);
            setShowSuggestions(false);
          }}
        ></textarea>
        {isFocused && showSuggestions && !promiseRejected && (
          <Suggestions
            arr={suggestionsArr}
            setClickedSuggestion={setClickedSuggestion}
            clickedSuggestion={clickedSuggestion}
            simpleText={simpleText}
            setSimpleText={setSimpleText}
            setShowSuggestions={setShowSuggestions}
            // suggestionsRef={suggestionsRef}
            // promiseRejected={promiseRejected}
          />
        )}
      </div>
    </div>
  );
}
