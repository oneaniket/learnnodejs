// UserCard.js — displays ONE user. Receives the user via props.

// `{ user }` destructures the `user` prop out of the props object.
function UserCard({ user }) {
  // Choose a CSS class based on the data (conditional styling).
  const badgeClass = user.active ? "badge badge-on" : "badge badge-off";

  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p className="email">{user.email}</p>
      <div className="meta">
        {/* an inline style object: outer {} = JS, inner {} = the object */}
        <span style={{ textTransform: "capitalize" }}>{user.role}</span>
        <span className={badgeClass}>
          {user.active ? "Active" : "Inactive"}
        </span>
      </div>
    </div>
  );
}

export default UserCard;
