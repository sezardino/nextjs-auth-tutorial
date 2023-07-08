import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { type ComponentPropsWithoutRef, type FC } from "react";

const headerLinks = [
  { href: "/", label: "Home" },
  { href: "/admin", label: "Admin" },
  { href: "/admin/panel", label: "AdminPanel" },
];

export interface HeaderProps extends ComponentPropsWithoutRef<"header"> {}

export const Header: FC<HeaderProps> = (props) => {
  const { className, ...rest } = props;
  const { data: session } = useSession();

  return (
    <header
      {...rest}
      className={`container mx-auto py-4 flex items-center gap-4 flex-wrap ${className}`}
    >
      <nav>
        <ul className="flex gap-4">
          {headerLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-xl transition-colors hover:text-blue-700"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="ml-auto flex items-center gap-2">
        {!session?.user ? (
          <Link
            href={"/auth"}
            className="px-4 py-2 border-white border rounded-lg hover:bg-blue-700 hover:text-white transition-colors"
            onClick={(evt) => {
              evt.preventDefault();
              signIn();
            }}
          >
            Login
          </Link>
        ) : (
          <>
            <p>{session?.user?.name}</p>
            <button
              type="button"
              className="px-4 py-2 border-white border rounded-lg hover:bg-blue-700 hover:text-white transition-colors"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};
