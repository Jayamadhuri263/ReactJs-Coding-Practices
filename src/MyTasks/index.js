import React, { useState, useMemo, useEffect } from "react";
import "./MyTasks.css";

const STORAGE_KEY = "task_list";

const tagsList = [
  { optionId: "HEALTH", displayText: "Health" },
  { optionId: "EDUCATION", displayText: "Education" },
  { optionId: "ENTERTAINMENT", displayText: "Entertainment" },
  { optionId: "SPORTS", displayText: "Sports" },
  { optionId: "TRAVEL", displayText: "Travel" },
  { optionId: "OTHERS", displayText: "Others" },
];

function getFromLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function toTitleCase(str) {
  if (!str) {
    return "";
  }
  return str.replace(/\w\S*/g, (txt) =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

function MyTasks() {
  const [tasksList, setTasksList] = useState(() => getFromLocal());
  const [tempTaskList, setTempTaskList] = useState(() => getFromLocal());
  const [taskInput, setTaskInput] = useState("");
  const [tagSelect, setTagSelect] = useState("default");
  const [taskTouched, setTaskTouched] = useState(false);
  const [tagTouched, setTagTouched] = useState(false);

  const topicHasError = tagSelect === "default";

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksList));
  }, [tasksList]);

  const nextId = useMemo(() => {
    if (tasksList.length === 0) {
      return 1;
    }
    return Math.max(...tasksList.map((t) => Number(t.id) || 0)) + 1;
  }, [tasksList]);

  useEffect(() => {
    const linkId = "font-awesome-my-tasks";
    if (!document.getElementById(linkId)) {
      const link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
      document.head.appendChild(link);
    }
  }, []);

  const taskInvalid = taskInput.trim() === "";
  const formInvalid = taskInvalid || topicHasError;

  const onAddTask = (e) => {
    e.preventDefault();
    setTaskTouched(true);
    setTagTouched(true);
    if (formInvalid) {
      return;
    }
    const newTask = {
      id: nextId,
      task: taskInput.trim(),
      tag: tagSelect,
    };
    const updated = [...tasksList, newTask];
    setTasksList(updated);
    setTempTaskList(updated);
    setTaskInput("");
    setTagSelect("default");
    setTaskTouched(false);
    setTagTouched(false);
  };

  const onDeleteTask = (taskId) => {
    const updated = tasksList.filter((item) => item.id !== taskId);
    setTasksList(updated);
    setTempTaskList((prev) => prev.filter((item) => item.id !== taskId));
  };

  const onFilterTag = (tag) => {
    setTempTaskList(
      tasksList.filter((item) => item.tag === tag.displayText)
    );
  };

  const tasksListLength = tasksList.length;

  return (
    <div className="my-tasks-main-container">
      <div className="my-tasks-sidebar-container">
        <h2>Create a Task!</h2>
        <form onSubmit={onAddTask}>
          <label style={{ color: "#fff", marginBottom: "10px" }}>Task</label>
          <div className="my-tasks-form-group">
            <input
              type="text"
              name="task"
              className={`my-tasks-form-control ${
                taskTouched && taskInvalid ? "is-invalid" : ""
              }`}
              placeholder="Enter the task here"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              onBlur={() => setTaskTouched(true)}
            />
            <small
              className={`my-tasks-text-danger ${
                !taskTouched || !taskInvalid ? "my-tasks-d-none" : ""
              }`}
            >
              Task name is required
            </small>
          </div>
          <label
            style={{
              color: "#fff",
              marginBottom: "10px",
              marginTop: "25px",
              display: "block",
            }}
          >
            Tags
          </label>
          <div
            className="my-tasks-form-group"
            style={{ marginTop: "2px", marginBottom: "0px" }}
          >
            <select
              name="tag"
              className={`my-tasks-form-select ${
                tagTouched && topicHasError ? "is-invalid" : ""
              }`}
              value={tagSelect}
              onChange={(e) => {
                setTagSelect(e.target.value);
                setTagTouched(true);
              }}
              onBlur={(e) => {
                setTagTouched(true);
              }}
            >
              <option value="default">Please select anyone </option>
              {tagsList.map((tag) => (
                <option key={tag.optionId} value={tag.displayText}>
                  {tag.displayText}
                </option>
              ))}
            </select>
            <small
              className={`my-tasks-text-danger ${
                !tagTouched || !topicHasError ? "my-tasks-d-none" : ""
              }`}
            >
              A tag must be selected!
            </small>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="submit"
              className="my-tasks-add-button"
              disabled={formInvalid}
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
      <div className="my-tasks-list-main-container">
        <h3>Tags</h3>
        <div className="my-tasks-list-tags-container">
          {tagsList.map((tag) => (
            <button
              key={tag.optionId}
              type="button"
              className="my-tasks-tag-button"
              onClick={() => onFilterTag(tag)}
            >
              {tag.displayText}
            </button>
          ))}
        </div>
        <h3>Tasks</h3>
        {tasksListLength === 0 ? (
          <h2 style={{ marginTop: "100px" }}>No Tasks added yet</h2>
        ) : null}
        <div className="my-tasks-list-view-container">
          {tempTaskList.map((eachTask) => (
            <div
              key={eachTask.id}
              className="my-tasks-list-task-sub-container"
            >
              <h5>{toTitleCase(eachTask.task)}</h5>
              <div style={{ display: "flex" }}>
                <div className="my-tasks-list-task-view-tag">
                  {eachTask.tag}
                </div>
                <button
                  type="button"
                  className="my-tasks-delete-button"
                  onClick={() => onDeleteTask(eachTask.id)}
                  aria-label="Delete task"
                >
                  <i
                    className="fa fa-trash"
                    style={{
                      color: "#aaa",
                      marginTop: "0px",
                      fontSize: "20px",
                    }}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyTasks;
