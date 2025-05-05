
import NProgress from 'nprogress';

export default function ProgressBar() {
  NProgress.start();

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-indigo-600 h-1 w-full" />
    </div>
  );
}
    