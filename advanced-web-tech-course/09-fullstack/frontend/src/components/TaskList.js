// TaskList.js — renders the list of tasks (list + props, Module 7).
// Each row has a checkbox (toggle) and a delete button; both call callbacks
// passed down from App.

function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty">No tasks yet. Add one above.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        // key = the MongoDB _id (a real, stable unique id)
        <li key={task._id} className={task.completed ? "done" : ""}>
          <label>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task)} // toggle done
            />
            <span>{task.title}</span>
          </label>
          <button className="delete" onClick={() => onDelete(task._id)}>
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
