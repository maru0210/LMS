import {HTMLInputAutoCompleteAttribute, useState} from "react";

type Props = {
  label: string;
  id: string;
  autoComplete: HTMLInputAutoCompleteAttribute;
  keepValue?: boolean;
  defaultValue?: string;
}

export default function Input(
  {label, id, autoComplete, keepValue = true, defaultValue = ""} : Props,
) {
  const [state, setState] = useState(defaultValue)

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="ml-0.5">{label}</label>

      {keepValue
        ? (
          <input
            id={id} name={id} type={id} required autoComplete={autoComplete}
            value={state} onChange={(e) => setState(e.currentTarget.value)}
            className="block w-full rounded-lg border-0 px-4 py-2.5 shadow-sm ring-2 ring-inset ring-gray-200 focus:ring-2 focus:ring-indigo-800"
          />
        )
        : (
          <input
            id={id} name={id} type={id} required autoComplete={autoComplete}
            className="block w-full rounded-lg border-0 px-4 py-2.5 shadow-sm ring-2 ring-inset ring-gray-200 focus:ring-2 focus:ring-indigo-800"
          />
        )
      }
    </div>
  )
}