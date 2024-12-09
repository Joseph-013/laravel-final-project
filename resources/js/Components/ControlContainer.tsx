import { PropsWithChildren } from 'react';

export default function ControlContainer({ children }: PropsWithChildren) {
    return (
        <div className="fixed bottom-5 right-5 flex flex-col gap-2 rounded-lg bg-[#b8cce5] p-2 shadow-md sm:flex-row">
            {children}
        </div>
    );
}
