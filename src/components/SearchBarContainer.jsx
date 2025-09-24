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
  const [clickedSuggestion, setClickedSuggestion] = useState(false);
  const [simpleText, setSimpleText] = useState("");
  const [promiseRejected, setPromiseRejected] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestionsArr, setSuggestionsArr] = useState([]);
  // All the suggestion words getting from the API

  const inputRef = useRef(null);
  // const suggestionsRef = useRef(null);

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
          // console.log("PROMISE accepted");

          setSuggestionsArr(res);
        })
        .catch((e) => {
          setShowSuggestions(true);
          // console.log("PROMISE REJECTED");
          setPromiseRejected(true);
        });
    }
  }

  const debounceHandler = useCallback(
    debounce(handleSearchBarChange, 1000),
    []
  );
  // useEffect(() => {
  //   // console.log(suggestionsArr);
  // });

  // useEffect(() => {
  //   try {
  //     if (inputRef.current) {
  //       inputRef.current.focus();
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, [clickedSuggestion]);

  return (
    <div
      // className="main"
      // style={{
      //   backgroundColor: !isFocused ? " rgb(251, 250, 250)" : "#d0d1d3ff",
      // }}
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
          clickedSuggestion={clickedSuggestion}
          setClickedSuggestion={setClickedSuggestion}
          promiseRejected={promiseRejected}
          setPromiseRejected={setPromiseRejected}
          // suggestionsRef={suggestionsRef}
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
