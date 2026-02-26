import { useEffect, useState } from "react";
import API from "../api/axios";
import TaskCard from "../components/TaskCard";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showDescription, setShowDescription] = useState(false);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    const payload = { title };
    if (description.trim() !== "") payload.description = description.trim();
    await API.post("/tasks", payload);
    setTitle("");
    setDescription("");
    setShowDescription(false);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) addTask();
  };

  return (
    <div className="min-h-screen bg-stone-50">

      <div className="mx-auto max-w-2xl px-6 pb-20 pt-12">

        {/* Page Header */}
        <div className="mb-10">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-stone-400">
            Workspace
          </p>
          <h1 className="font-serif text-[32px] font-semibold leading-tight tracking-tight text-stone-900">
            My Tasks
          </h1>
          <p className="mt-1.5 text-sm text-stone-400">
            Stay on top of what matters most.
          </p>
        </div>

        {/* Add Task Card */}
        <div className="mb-8 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-stone-400">
            New Task
          </p>

          {/* Title row */}
          <div className="flex gap-2.5">
            <input
              className="flex-1 rounded-lg border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-[15px] text-stone-900 placeholder-stone-300 outline-none transition-all focus:border-stone-400 focus:bg-white focus:ring-2 focus:ring-stone-900/5"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={addTask}
              className="flex items-center gap-2 rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-semibold text-stone-50 transition-all hover:bg-stone-800 hover:-translate-y-px hover:shadow-lg hover:shadow-stone-900/15 active:translate-y-0"
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Add Task
            </button>
          </div>

          {/* Toggle description */}
          <button
            type="button"
            onClick={() => setShowDescription((v) => !v)}
            className="mt-2.5 flex items-center gap-1.5 text-[12.5px] font-medium text-stone-400 transition-colors hover:text-stone-600"
          >
            <svg
              width="13" height="13" viewBox="0 0 14 14" fill="none"
              className={`transition-transform duration-200 ${showDescription ? "rotate-90" : "rotate-0"}`}
            >
              <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {showDescription ? "Hide description" : "Add description (optional)"}
          </button>

          {/* Description textarea — animated reveal */}
          <div
            className={`overflow-hidden transition-all duration-200 ease-in-out ${
              showDescription ? "mt-2.5 max-h-40 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <textarea
              rows={3}
              className="w-full resize-none rounded-lg border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-[14px] leading-relaxed text-stone-700 placeholder-stone-300 outline-none transition-all focus:border-stone-400 focus:bg-white focus:ring-2 focus:ring-stone-900/5"
              placeholder="Add some details about this task… (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        {/* Task List */}
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
            All Tasks
          </p>
          <span className="rounded-full border border-stone-200 bg-stone-100 px-2.5 py-0.5 text-xs font-semibold text-stone-500">
            {tasks.length}
          </span>
        </div>

        {tasks.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-14 text-center">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="4" width="14" height="11" rx="2" stroke="#A8A09A" strokeWidth="1.4" />
                <path d="M6 4V3a1 1 0 011-1h4a1 1 0 011 1v1" stroke="#A8A09A" strokeWidth="1.4" />
                <path d="M6 9h6M6 12h4" stroke="#A8A09A" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </div>
            <p className="font-serif text-base text-stone-500">No tasks yet</p>
            <p className="mt-1 text-sm text-stone-400">
              Add your first task above to get started.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} onDelete={deleteTask} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}