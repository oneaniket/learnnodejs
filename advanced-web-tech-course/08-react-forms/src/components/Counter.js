import { useState } from "react";
import Button from "./Button";

function Counter() {
  // count is this component's memory. The screen updates when setCount runs.
  const [count, setCount] = useState(0);

  function increaseCount() {
    setCount((currentCount) => currentCount + 1);
  }

  function resetCount() {
    setCount(0);
  }

  return (
    <div className="counter">
      <p>
        Count: <strong>{count}</strong>
      </p>

      <div className="button-row">
        <Button onClick={increaseCount}>Increase</Button>
        <Button variant="secondary" onClick={resetCount}>Reset</Button>
      </div>
    </div>
  );
}

export default Counter;
