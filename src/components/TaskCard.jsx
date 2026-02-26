export default function TaskCard({ task, onDelete }) {
  return (
    <div className="group flex items-center justify-between gap-4 rounded-xl border border-stone-200 bg-white px-5 py-4 shadow-sm transition-all duration-150 hover:border-stone-300 hover:shadow-md hover:-translate-y-px">

      {/* Left — checkbox + content */}
      <div className="flex min-w-0 items-start gap-3.5">
        {/* Visual checkbox */}
        <div className="mt-0.5 h-[18px] w-[18px] flex-shrink-0 cursor-pointer rounded-[5px] border-2 border-stone-300 transition-colors hover:border-stone-400 hover:bg-stone-50" />

        <div className="min-w-0">
          <h3 className="text-[15px] font-medium leading-snug tracking-tight text-stone-900">
            {task.title}
          </h3>
          {task.description && (
            <p className="mt-0.5 text-[13px] leading-relaxed text-stone-400">
              {task.description}
            </p>
          )}
        </div>
      </div>

      {/* Delete button */}
      <button
        onClick={() => onDelete(task._id)}
        className="flex flex-shrink-0 items-center gap-1.5 rounded-md border border-transparent px-2.5 py-1.5 text-[13px] font-medium text-red-400 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        title="Delete task"
      >
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
          <path d="M2 3.5h10M5.5 3.5V2.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v1M6 6.5v3M8 6.5v3M3 3.5l.667 7.333A.667.667 0 004.333 11.5h5.334a.667.667 0 00.666-.667L11 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Delete
      </button>
    </div>
  );
}