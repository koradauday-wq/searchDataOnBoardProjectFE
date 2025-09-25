import { statements } from "../utils/strings";

export default function ErrorMsg() {
  return (
    <div className="rejection-msg">
      <p>{statements.SomethingWentWrong}</p>
    </div>
  );
}
