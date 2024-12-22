export const SuccessIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
       className="size-5">
    <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
  </svg>
)

export const WarningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
       className="size-5">
    <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
  </svg>
)

export const DangerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
       className="size-5">
    <path strokeLinecap="round" strokeLinejoin="round"
          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
  </svg>
)

export const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
       className="size-5">
    <path strokeLinecap="round" strokeLinejoin="round"
          d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/>
  </svg>
)

export const ProcessingIcon = () => (
  <div className="flex items-center justify-center size-5">
    <svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg" className="size-4">
      <g fill="none" fillRule="evenodd">
        <g transform="translate(2 1)" stroke="#FFF" strokeWidth="1.5">
          <circle cx="42.601" cy="11.462" r="5" fillOpacity="1" fill="#fff">
            <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="1;0.2;0.2;0.2;0.2;0.2;0.2;0.2" calcMode="linear"
                     repeatCount="indefinite"/>
          </circle>
          <circle cx="49.063" cy="27.063" r="5" fillOpacity="0" fill="#fff">
            <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0.2;1;0.2;0.2;0.2;0.2;0.2;0.2;" calcMode="linear"
                     repeatCount="indefinite"/>
          </circle>
          <circle cx="42.601" cy="42.663" r="5" fillOpacity="0" fill="#fff">
            <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0.2;0.2;1;0.2;0.2;0.2;0.2;0.2;" calcMode="linear"
                     repeatCount="indefinite"/>
          </circle>
          <circle cx="27" cy="49.125" r="5" fillOpacity="0" fill="#fff">
            <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0.2;0.2;0.2;1;0.2;0.2;0.2;0.2;" calcMode="linear"
                     repeatCount="indefinite"/>
          </circle>
          <circle cx="11.399" cy="42.663" r="5" fillOpacity="0" fill="#fff">
            <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0.2;0.2;0.2;0.2;1;0.2;0.2;0.2;" calcMode="linear"
                     repeatCount="indefinite"/>
          </circle>
          <circle cx="4.938" cy="27.063" r="5" fillOpacity="0" fill="#fff">
            <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0.2;0.2;0.2;0.2;0.2;1;0.2;0.2;" calcMode="linear"
                     repeatCount="indefinite"/>
          </circle>
          <circle cx="11.399" cy="11.462" r="5" fillOpacity="0" fill="#fff">
            <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0.2;0.2;0.2;0.2;0.2;0.2;1;0.2;" calcMode="linear"
                     repeatCount="indefinite"/>
          </circle>
          <circle cx="27" cy="5" r="5" fillOpacity="0" fill="#fff">
            <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0.2;0.2;0.2;0.2;0.2;0.2;0.2;1;" calcMode="linear"
                     repeatCount="indefinite"/>
          </circle>
        </g>
      </g>
    </svg>
  </div>
)
