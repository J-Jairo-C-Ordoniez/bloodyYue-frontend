"use client"
function Checkbox({
  className, label,
  ...props
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
        {...props}
      />
      {label && <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>}
    </label>
  );
}

export { Checkbox }
export default Checkbox
