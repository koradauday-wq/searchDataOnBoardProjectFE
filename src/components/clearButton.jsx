import PropTypes from "prop-types";
export default function ClearButton({
  simpleText,
  setSimpleText,
  setPromiseRejected,
}) {
  return (
    <button
      className={
        simpleText.length === 0 ? "clear-button-hidden" : "clear-button-visible"
      }
      onClick={() => {
        setSimpleText("");
        setPromiseRejected(false);
      }}
    ></button>
  );
}

ClearButton.propTypes = {
  simpleText: PropTypes.string,
  setSimpleText: PropTypes.func,
  setPromiseRejected: PropTypes.func,
};
