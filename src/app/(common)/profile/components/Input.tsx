import { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from "react";

export function Input({
  label,
  id,
  type,
  placeholder,
  autoComplete,
  disabled = false,
}: {
  label: string;
  id: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center">
        <label htmlFor={id} className="w-48">
          {label}
        </label>

        <div className={"flex max-w-96 flex-1 gap-2 text-sm"}>
          <input
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            required={true}
            disabled={disabled}
            className="block h-8 flex-1 rounded-lg px-2 shadow-sm ring-1 ring-inset ring-gray-300 transition focus:shadow-md disabled:bg-white disabled:shadow-none disabled:ring-0 disabled:placeholder:text-neutral-900"
          />

          {!disabled && (
            <button className="flex h-8 items-center rounded-lg bg-gray-100 px-2.5 transition hover:bg-gray-200">
              変更
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
