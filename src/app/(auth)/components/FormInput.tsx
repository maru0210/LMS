import { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from "react";

export const FormInput = ({
  label,
  id,
  type,
  autoComplete,
}: {
  label: string;
  id: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: HTMLInputAutoCompleteAttribute;
}) => (
  <div className="flex w-full flex-col gap-0.5">
    <label className="px-0.5 font-bold" htmlFor={id}>
      {label}
    </label>
    <input
      className="border-b border-neutral-300 p-0.5 transition focus:border-neutral-400"
      id={id}
      name={id}
      type={type}
      autoComplete={autoComplete}
      required={true}
    />
  </div>
);
