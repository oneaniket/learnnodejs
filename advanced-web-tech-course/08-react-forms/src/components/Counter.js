// Counter.js — combines local state with the reusable Button component.

import { useState } from "react";
import Button from "./Button";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <p>
        Count: <strong>{count}</strong>
      </p>

      <div className="button-row">
        <Button onClick={() => setCount((current) => current + 1)}>
          Increase
        </Button>
        <Button variant="secondary" onClick={() => setCount(0)}>
          Reset
        </Button>
      </div>
    </div>
  );
}

export default Counter;
