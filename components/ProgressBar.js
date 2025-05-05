export default function ProgressBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1 w-full overflow-hidden bg-white/10">
        <div className="animate-progress-indeterminate h-full w-1/3 bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500"></div>
      </div>
    </div>
  );
}
