import { useState } from "react";

function MenuBar({ items }) {
  // Start with the first item selected.
  const [selectedItem, setSelectedItem] = useState(items[0]);

  function selectItem(item) {
    setSelectedItem(item);
  }

  return (
    <div>
      <div className="menu-bar" role="group" aria-label="Example menu">
        {items.map((item) => (
          <button
            type="button"
            className={
              item === selectedItem ? "menu-item is-active" : "menu-item"
            }
            key={item}
            onClick={() => selectItem(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <p className="selection-message">
        Selected menu item: <strong>{selectedItem}</strong>
      </p>
    </div>
  );
}

export default MenuBar;
