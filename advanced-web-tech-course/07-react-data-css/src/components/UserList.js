// UserList.js — takes an array of users and renders a UserCard for each.

import UserCard from "./UserCard";

function UserList({ users }) {
  // Handle the empty case gracefully.
  if (users.length === 0) {
    return <p>No users to show.</p>;
  }

  return (
    <div className="user-grid">
      {/*
        .map() turns each data object into a <UserCard>.
        `key` must be unique + stable so React can track items efficiently.
        We use user.id (a real id), NOT the array index.
      */}
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UserList;
