export default function ProgressBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-[2px] w-full overflow-hidden bg-gradient-to-r from-transparent via-white/5 to-transparent">
        <div className="animate-progress-indeterminate h-full w-1/3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.3)]"></div>
      </div>
    </div>
  );
}
