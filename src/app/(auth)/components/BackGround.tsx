import { ReactNode } from "react";

export const BackGround = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen bg-neutral-50 p-16 2xl:px-32">
      <div className="-ml-16 flex-[3] 2xl:-ml-32">
        <div className="flex size-full items-center justify-center">
          <div>
            <p className="mb-2 text-xl">学習管理システム</p>
            <p className="text-4xl">手軽にアルゴる</p>
          </div>
        </div>
      </div>

      <div className="grid min-w-96 flex-1 items-center">
        <div className="max-h-full overflow-y-auto shadow-xl shadow-neutral-200">
          <div className="bg-white">{children}</div>
        </div>
      </div>
    </div>
  );
};
