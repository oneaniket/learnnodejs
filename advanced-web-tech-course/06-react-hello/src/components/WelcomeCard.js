// WelcomeCard.js — a component that COMPOSES another component (Greeting).
// This shows how small components build up into bigger ones.

import Greeting from "./Greeting";

function WelcomeCard() {
  return (
    <div className="card">
      {/* Reusing the Greeting component inside this one. */}
      <Greeting />
      <p>Welcome to your first React app, built with components.</p>
    </div>
  );
}

export default WelcomeCard;
