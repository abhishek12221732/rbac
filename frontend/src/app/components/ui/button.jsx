export function Button({ children, ...props }) {
  return (
    <button
      className="w-full bg-slate-900 text-white py-2 px-4 rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 transition ease-in-out duration-150"
      {...props}
    >
      {children}
    </button>
  );
}