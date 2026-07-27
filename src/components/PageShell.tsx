import type { ReactNode } from "react";

export function PageShell({
  title,
  intro,
  children,
}: {
  title?: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="px-6 pt-10 pb-32 md:px-16 md:pt-28 lg:px-24">
      <div className="max-w-[640px]">
        {title ? (
          <h1 className="font-serif text-[2.35rem] leading-[1.15] font-normal tracking-[-0.015em] md:text-[3rem]">
            {title}
          </h1>
        ) : null}
        {intro ? (
          <p className="mt-4 text-slate-muted">{intro}</p>
        ) : null}
        <div className={`prose-quiet ${title ? 'mt-10' : ''}`}>{children}</div>
      </div>
    </div>
  );
}
