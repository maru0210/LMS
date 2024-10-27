import {HTMLInputAutoCompleteAttribute} from "react";

export default function AuthFormInput(
  props: {label: string, id: string, autoComplete: HTMLInputAutoCompleteAttribute | undefined},
) {
  const {label, id, autoComplete} = props;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="ml-0.5">{label}</label>
      <input
        id={id} name={id} type={id} required autoComplete={autoComplete}
        className="block w-full rounded-lg border-0 px-4 py-2.5 shadow-sm ring-2 ring-inset ring-gray-200 focus:ring-2 focus:ring-indigo-800"
      />
    </div>
  )
}