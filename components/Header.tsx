import { SearchIcon } from "@heroicons/react/solid";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";

interface HeaderInterface {
  setShowSearch: (showSearch: boolean) => void;
}
const Header = ({ setShowSearch }: HeaderInterface) => {
  const { user } = useUser();

  return (
    <header className="w-full">
      <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
        <div className="flex px-4 sm:px-6 w-full justify-around md:justify-between">
          <div className="flex">
            <button
              type="button"
              className="inline-flex items-center py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md"
              onClick={() => {
                setShowSearch(true);
              }}
            >
              <SearchIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              <span className="font-normal text-base">Search</span>
            </button>
          </div>
          <div className=" flex items-center space-x-4 sm:ml-6 sm:space-x-6 text-lg">
            Movie Catalog Viewer
          </div>
          <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
            {/* Profile dropdown */}
            {user ? (
              <Link href="/api/auth/logout">
                <a className="text-lg">Logout</a>
              </Link>
            ) : (
              <Link href="/api/auth/login">
                <a className="text-lg">Login</a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
