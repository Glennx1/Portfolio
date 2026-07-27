import { Link } from "@tanstack/react-router";

const items = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "What I'm Up To", to: "/now" },
  { label: "Musings", to: "/musings" },
  { label: "Pictures", to: "/pictures" },
] as const;

export function SideNav() {
  return (
    <nav
      aria-label="Primary"
      className="bg-background md:fixed md:inset-y-0 md:left-0 md:w-[220px] md:shrink-0 md:border-none"
    >
      <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 px-6 pt-8 pb-4 md:flex-col md:items-start md:gap-y-5 md:px-10 md:pt-24">
        {items.map((item) => (
          <li key={item.to} className="relative">
            <Link
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="nav-link block data-[status=active]:text-foreground"
              activeProps={{ className: "before:absolute before:-left-4 before:top-1/2 before:h-px before:w-2 before:-translate-y-1/2 before:bg-rose md:before:block before:hidden" }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
