// App.js — the root component. Loads the data and passes it to UserList.

import users from "./data";
import UserList from "./components/UserList";

function App() {
  return (
    <div className="app">
      <h1>Course Members</h1>
      <p className="subtitle">{users.length} people</p>

      {/* Pass the data array down as a prop. */}
      <UserList users={users} />
    </div>
  );
}

export default App;
