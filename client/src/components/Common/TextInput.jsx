import { forwardRef } from "react";

const TextInput = forwardRef(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className={className}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
          block w-full rounded-lg border px-3 py-2 text-sm
          placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500
          ${error ? "border-red-300 text-red-900" : "border-gray-300"}
        `}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
