import React, { useState } from "react";
import "./index.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({ name: "", date: "", desc: "" });

  const add = (e) => {
    e.preventDefault();

    if (form.name && form.date) {
      setTasks([...tasks, { ...form, done: false }]);
      setForm({ name: "", date: "", desc: "" });
    }
  };

  const toggle = (i) => {
    setTasks(
      tasks.map((t, j) =>
        j === i ? { ...t, done: !t.done } : t
      )
    );
  };

  const filteredTasks = tasks.filter(
    (t) =>
      filter === "all" ||
      (filter === "done" && t.done) ||
      (filter === "notdone" && !t.done)
  );

  return (
    <div className="app">
      <h1>Reminder App</h1>

      <form onSubmit={add}>
        {["name", "date", "desc"].map((k) => (
          <input
            key={k}
            type={k === "date" ? "date" : "text"}
            placeholder={k}
            value={form[k]}
            onChange={(e) =>
              setForm({ ...form, [k]: e.target.value })
            }
          />
        ))}
        <button type="submit">Add</button>
      </form>

      <div className="filters">
        {["all", "done", "notdone"].map((v) => (
          <button key={v} onClick={() => setFilter(v)}>
            {v}
          </button>
        ))}
      </div>

      <ul>
        {filteredTasks.map((t, i) => (
          <li
            key={i}
            onClick={() => toggle(i)}
            className={t.done ? "done" : ""}
          >
            <b>{t.name}</b> - {t.date}{" "}
            {t.desc && `| ${t.desc}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
