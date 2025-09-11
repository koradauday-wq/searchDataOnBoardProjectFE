

export default function SuggestionsDiv({arr,setClickedSuggestionDiv,setClickedWord,clickedSuggestionDiv}){
    



    return(
        <div>
            {arr.map(word=><div key={word}
                onClick={e=>
                {
                    setClickedWord(e.target.innerText);
                    setClickedSuggestionDiv(clickedSuggestionDiv+1);
                    // console.log(word);

                }}>{word}</div>)}
        </div>
        
    );
}