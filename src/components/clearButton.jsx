export default function ClearButton({
  simpleText,
  setSimpleText,
  setPromiseRejected,
}) {
  return (
    <button
      // style={{
      //   visibility: simpleText.length === 0 ? "hidden" : "visible",
      // }}
      className={
        simpleText.length === 0 ? "clear-button-hidden" : "clear-button-visible"
      }
      onClick={() => {
        setSimpleText("");
        setPromiseRejected(false);
      }}
      // className="clear-button"
    ></button>
  );
}
