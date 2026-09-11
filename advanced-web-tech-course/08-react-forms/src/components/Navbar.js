function Navbar({ brand, links }) {
  return (
    <nav className="navbar" aria-label="Main navigation">
      {/* The brand is supplied by App through props. */}
      <a className="navbar__brand" href="#top">
        {brand}
      </a>

      <ul className="navbar__links">
        {/* Convert every link object into one list item. */}
        {links.map((navigationLink) => (
          <li key={navigationLink.href}>
            <a href={navigationLink.href}>{navigationLink.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
