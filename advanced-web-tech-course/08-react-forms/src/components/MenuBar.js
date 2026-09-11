// MenuBar.js — maps an array to buttons and remembers the selected item.

import { useState } from "react";

function MenuBar({ items }) {
  const [activeItem, setActiveItem] = useState(items[0]);

  return (
    <div>
      <div className="menu-bar" role="group" aria-label="Example menu">
        {items.map((item) => (
          <button
            type="button"
            className={item === activeItem ? "menu-item is-active" : "menu-item"}
            key={item}
            onClick={() => setActiveItem(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <p className="selection-message">
        Selected menu item: <strong>{activeItem}</strong>
      </p>
    </div>
  );
}

export default MenuBar;
