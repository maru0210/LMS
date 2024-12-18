import {ReactNode} from "react";

export const BackGround = (
  {children}: { children: ReactNode }
) => {
  return (
    <div className="flex h-screen p-32 bg-neutral-50">
      <div className="flex-[3] -ml-32">
        <div className="flex justify-center items-center size-full">
          <div>
            <p className="mb-2 text-xl">学習管理システム</p>
            <p className="text-4xl">手軽にアルゴる</p>
          </div>
        </div>
      </div>

      <div className="flex-1 grid items-center min-w-96">
        <div className="max-h-full overflow-y-auto shadow-xl shadow-neutral-200">
          <div className="bg-white">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}