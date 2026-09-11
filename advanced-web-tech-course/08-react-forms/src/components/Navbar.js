// Navbar.js — receives its title and links through props.

function Navbar({ brand, links }) {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <a className="navbar__brand" href="#top">
        {brand}
      </a>

      <ul className="navbar__links">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
