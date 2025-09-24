import { useRef, useEffect, useState, useCallback } from "react";
import "./SearchDataSearchBar.css";
import getSuggestions from "./getSuggestionsAPI";
import { GoSearch } from "react-icons/go";
import SubmitButton from "./submitButton";
import { debounce, getLastWord } from "../utils/utlis";
import ClearButton from "./clearButton";
import SearchBarAndSuggestions from "./searchBarAndSuggestions";
import ErrorMsg from "./errorMsg";

export default function SearchBar() {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [simpleText, setSimpleText] = useState("");
  const [promiseRejected, setPromiseRejected] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestionsArr, setSuggestionsArr] = useState([]);
  // All the suggestion words getting from the API

  const inputRef = useRef(null);

  async function handleSearchBarChange(totalText) {
    let lastWord = "";
    if (totalText.length == 0) {
      setShowSuggestions(false);
      return;
    }

    if (totalText[totalText.length - 1] !== " ") {
      lastWord = getLastWord(totalText);
    }

    if (lastWord.length === 0) {
      setShowSuggestions(false);
    } else {
      //Calling the API for suggestions
      await getSuggestions(lastWord)
        .then((res) => {
          setShowSuggestions(true);
          setPromiseRejected(false);
          setSuggestionsArr(res);
        })
        .catch((e) => {
          setShowSuggestions(true);
          setPromiseRejected(true);
        });
    }
  }

  const debounceHandler = useCallback(
    debounce(handleSearchBarChange, 1000),
    []
  );

  return (
    <div
      className={!isFocused ? " white-background-main" : "grey-background-main"}
    >
      <div className="container">
        <button className="dropDown"></button>
        <div className="data-source-selector">Data-source</div>
        <button className="arrowDropDown"></button>
        <div className="vertical-hr"></div>

        <div className="search-icon">
          <GoSearch />
        </div>
        <SearchBarAndSuggestions
          inputRef={inputRef}
          simpleText={simpleText}
          setSimpleText={setSimpleText}
          debounceHandler={debounceHandler}
          setIsFocused={setIsFocused}
          handleSearchBarChange={handleSearchBarChange}
          setSuggestionsArr={setSuggestionsArr}
          isFocused={isFocused}
          showSuggestions={showSuggestions}
          suggestionsArr={suggestionsArr}
          promiseRejected={promiseRejected}
          setPromiseRejected={setPromiseRejected}
          setShowSuggestions={setShowSuggestions}
        />

        <ClearButton
          simpleText={simpleText}
          setSimpleText={setSimpleText}
          setPromiseRejected={setPromiseRejected}
        />
        <SubmitButton
          isFocused={isFocused}
          simpleText={simpleText}
          setPromiseRejected={setPromiseRejected}
        />
      </div>
      {promiseRejected && <ErrorMsg />}
    </div>
  );
}
