import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";

const tabs = [
  { name: "Most Popular", href: "/" },
  { name: "Top Rated", href: "/" },
  { name: "Favourited", href: "/" },
];

interface NavigationType {
  setShowAlert: (showAlert: boolean) => void;
  currentTab: string;
}

const Navigation = ({ setShowAlert, currentTab }: NavigationType) => {
  const { user } = useUser();
  const router = useRouter();

  const tabChangeHandler = (newTabName: string) => {
    if (newTabName === "Favourited" && !user) {
      setShowAlert(true);
    } else {
      if (newTabName != currentTab) {
        if (newTabName === "Most Popular") {
          router.push({
            pathname: "/",
          });
        } else if (newTabName === "Top Rated") {
          router.push({
            pathname: "/top_rated_movies/1",
          });
        } else if (newTabName === "Favourited") {
          router.push({
            pathname: "/favourited",
          });
        }
      }

      //Change it to link
      // setCurrentTab(tab.name);
      // if (index !== 1) setIndex(1);
    }
  };
  return (
    <div className="mt-3 sm:mt-2">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          onChange={(event) => {
            //setCurrentTab(event.target.value);
            const value = event.target.value;
            tabChangeHandler(value);
            // if (value === "Favourited" && !user) {
            //   setShowAlert(true);
            // } else {

            //   //Change it to link
            //   // setCurrentTab(value);
            //   // if (index !== 1) setIndex(1);
            // }
          }}
          value={currentTab}
        >
          {/* <option>Most popular</option>
          <option>Top Rated</option>
          <option>Favourited</option> */}
          {tabs.map((tab) => {
            return (
              <option key={`tab.name + ${Math.random()}`} value={tab.name}>
                {tab.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="flex items-center border-b border-gray-200">
          <nav
            className="flex-1 -mb-px flex space-x-6 xl:space-x-8"
            aria-label="Tabs"
          >
            {tabs.map((tab) => {
              return (
                <a
                  key={tab.name}
                  className={`${
                    tab.name === currentTab
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer`}
                  onClick={() => {
                    tabChangeHandler(tab.name);
                  }}
                >
                  {tab.name}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
