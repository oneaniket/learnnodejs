// A reusable button.
// The parent decides the text, style, click action, and HTML type through props.
function Button({ children, variant = "primary", onClick, type = "button" }) {
  return (
    <button
      type={type} // "button" by default; use "submit" inside a form
      className={`button button--${variant}`} // primary or secondary CSS style
      onClick={onClick} // run the function supplied by the parent
    >
      {children} {/* whatever is written between <Button>...</Button> */}
    </button>
  );
}

export default Button;
