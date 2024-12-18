"use client"

import React from "react";

export default function Button(
  {text, className, disabled} : { text: string, className?: string, disabled: boolean }
) {
  return (
    <button
      type="submit" disabled={disabled}
      className={"block w-full rounded-lg py-2.5 hover:opacity-85 transition-opacity " + className}
    >
      {text}
    </button>
  )
}
