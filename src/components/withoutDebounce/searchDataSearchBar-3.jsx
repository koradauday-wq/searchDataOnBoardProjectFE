import { useRef, useEffect, useState, useCallback } from "react";
import "../SearchDataSearchBar.css";
import getSuggestions from "../getSuggestionsAPI";
import SuggestionsDiv2 from "../suggestionsDiv2";
import { GoSearch } from "react-icons/go";
import { VscClose } from "react-icons/vsc";

import { RiArrowDropDownLine } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";

function debounce(cb, delay) {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

export function getLastWord(totalText) {
  let last_Word = "";
  let n = totalText.length;
  let idx = n - 1;
  while (idx >= 0 && totalText[idx] != " ") {
    last_Word += totalText[idx];
    idx--;
  }
  last_Word = reverseString(last_Word);

  return last_Word;
}
export function reverseString(str) {
  const charArray = str.split("");
  const reversedArray = charArray.reverse();
  const reversedStr = reversedArray.join("");
  return reversedStr;
}

export default function SearchDataSearchBar() {
  const [ShowSuggestionsBool, setShowSuggestionsBool] = useState(false);
  const [clickedSuggestionDiv, setClickedSuggestionDiv] = useState(false);
  const [simpleText, setSimpleText] = useState("");

  const [suggestionsArr, setSuggestionsArr] = useState([]);
  // All the suggestion words getting from the API

  function handleclickForTheSUBMITbutton(e) {
    console.log(simpleText);
  }

  const [promiseRejected, setPromiseRejected] = useState(false);

  let last_Word = "";

  function handleChangeForTheSearchBar(e) {
    console.log("handle change triggered");

    const totalText = e.target.value;
    setSimpleText(totalText);
    if (totalText.length == 0) {
      setShowSuggestionsBool(false);
      return;
    }

    if (e.nativeEvent.data === " ") {
      last_Word = "";
    } else {
      last_Word = getLastWord(totalText);
    }

    if (last_Word.length === 0) {
      setShowSuggestionsBool(false);
    } else {
      console.log("executing API call");

      getSuggestions(last_Word)
        .then((res) => {
          console.log("got some results");

          setShowSuggestionsBool(true);
          setPromiseRejected(false);

          setSuggestionsArr(res);
        })
        .catch((e) => {
          console.log(e);
          setShowSuggestionsBool(true);

          setPromiseRejected(true);
        });
    }
  }

  useEffect(() => {
    try {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } catch (e) {
      console.log(e);
    }
  }, [clickedSuggestionDiv]);

  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef(null);

  return (
    <>
      <div
        className="main"
        style={{
          backgroundColor: !isFocused ? " rgb(251, 250, 250)" : "#d0d1d3ff",
        }}
      >
        <div className="container">
          <button className="dropDown">
            <RxDropdownMenu />
          </button>
          <div className="data-source-selector">Data-source</div>
          <button className="arrowDropDown">
            <RiArrowDropDownLine />
          </button>
          <div className="vertical-hr"></div>

          <div className="search-icon">
            <GoSearch />
          </div>

          <div className="search-bar-and-suggestions">
            <div className="flexDiv">
              <textarea
                type="text"
                ref={inputRef}
                rows={5}
                placeholder="Search Data"
                name="search-bar"
                className="search-bar"
                id="search-bar"
                value={simpleText}
                onChange={(e) => handleChangeForTheSearchBar(e)}
                onFocus={(e) => {
                  setIsFocused(true);
                  handleChangeForTheSearchBar(e);
                }}
                onBlur={() => {
                  console.log("onBlur");
                  const id = setTimeout(() => {
                    setIsFocused(false);
                    setSuggestionsArr([]);
                  }, 10);
                }}
              ></textarea>
              {isFocused && ShowSuggestionsBool && (
                <SuggestionsDiv2
                  arr={suggestionsArr}
                  setClickedSuggestionDiv={setClickedSuggestionDiv}
                  clickedSuggestionDiv={clickedSuggestionDiv}
                  simpleText={simpleText}
                  setSimpleText={setSimpleText}
                  promiseRejected={promiseRejected}
                />
              )}
            </div>
          </div>

          <button
            style={{
              visibility: simpleText.length === 0 ? "hidden" : "visible",
            }}
            onClick={() => setSimpleText("")}
            className="clear-button"
          >
            <VscClose />
          </button>
          <button
            style={{
              color: !isFocused ? "#454545" : "white",
              backgroundColor: !isFocused ? "hsl(0, 1%, 86%)" : "#2770EF",
            }}
            onClick={(e) => handleclickForTheSUBMITbutton(e)}
            className="submit-button"
          >
            Go
          </button>
        </div>
      </div>
    </>
  );
}
