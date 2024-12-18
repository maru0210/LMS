import {HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute} from "react";

export const FormInput = (
  {label, id, type, autoComplete}: {
    label: string,
    id: string,
    type?: HTMLInputTypeAttribute,
    autoComplete?: HTMLInputAutoCompleteAttribute
  }
) => (
  <div className="flex flex-col w-full gap-0.5">
    <label className="px-0.5 font-bold" htmlFor={id}>{label}</label>
    <input className="p-0.5 border-b border-neutral-300 focus:border-neutral-400 transition"
           id={id} name={id} type={type} autoComplete={autoComplete} required={true}/>
  </div>
)