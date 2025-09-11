import React, { useRef } from "react";

function MyComponent() {
  const inputRef = useRef(null);

  const startTime = Date.now();
  console.log(startTime);
  console.log(Date.now());
  setTimeout(() => {
    console.log(Date.now() - startTime);
    console.log(Date.now());
  }, 1000);

  const handleFocusButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleFocusButtonClick}>Focus Input</button>
    </div>
  );
}

export default MyComponent;
