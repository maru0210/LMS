import {HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute} from "react";

export function Input(
  {label, id, type, placeholder, autoComplete, disabled = false}:
  {
    label: string,
    id: string,
    type: HTMLInputTypeAttribute,
    placeholder: string,
    autoComplete?: HTMLInputAutoCompleteAttribute,
    disabled?: boolean,
  }
) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center">
        <label htmlFor={id} className="w-48">{label}</label>

        <div className={"flex-1 max-w-96 flex gap-2 text-sm"}>
          <input
            id={id} name={id} type={type} placeholder={placeholder}
            autoComplete={autoComplete} required={true} disabled={disabled}
            className="flex-1 block rounded-lg h-8 px-2 ring-1 ring-inset ring-gray-300 shadow-sm focus:shadow-md transition
                       disabled:bg-white disabled:placeholder:text-neutral-900 disabled:ring-0 disabled:shadow-none"
          />

          {!disabled &&
              <button className="flex items-center h-8 px-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
                  変更
              </button>
          }
        </div>
      </div>
    </div>
  )
}