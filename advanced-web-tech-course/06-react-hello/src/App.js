// App.js — the ROOT component. Every other component lives inside this tree.

import WelcomeCard from "./components/WelcomeCard";

// A component is a function that returns JSX (the UI to display).
function App() {
  // You can run normal JavaScript before the return.
  const courseName = "Advanced Web Technologies";

  return (
    <div className="app">
      {/* Use {} to embed a JavaScript value inside JSX. */}
      <h2>{courseName}</h2>

      {/* Reuse another component by writing it like an HTML tag. */}
      <WelcomeCard />
    </div>
  );
}

export default App;
