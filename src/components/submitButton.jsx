import PropTypes from "prop-types";

SubmitButton.propTypes = {
  isFocused: PropTypes.bool,
  simpleText: PropTypes.string,
  setPromiseRejected: PropTypes.func,
};

export default function SubmitButton({
  isFocused,
  simpleText,
  setPromiseRejected,
}) {
  function handleSubmitClick() {
    console.log(simpleText);
    setPromiseRejected(false);
  }
  return (
    <button
      className={
        !isFocused
          ? "text-bar-focused-submit-button"
          : "text-bar-not-focused-submit-button"
      }
      onClick={handleSubmitClick}
    >
      Go
    </button>
  );
}
