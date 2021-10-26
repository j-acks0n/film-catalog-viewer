import { useState } from "react";
import Navigation from "./Navigation";
import Alert from "./Alert";
import { useRouter } from "next/router";

interface MoviesWrapperInterFace {
  numberOfPages: number;
  children: React.ReactNode;
  index: number;
  currentTab: string;
  setIndex: (index: number) => void;
}

const MoviesWrapper = ({
  numberOfPages,
  children,
  index,
  currentTab,
  setIndex,
}: MoviesWrapperInterFace) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const start = index - 1 >= 1 ? index - 1 : index;
  const end = index + 3 <= numberOfPages - 1 ? index + 3 : numberOfPages;
  const paginationArray = Array.from(Array(numberOfPages).keys()).slice(
    start,
    end
  );
  const router = useRouter();
  return (
    <>
      {showAlert && (
        <Alert
          setShowAlert={setShowAlert}
          text={
            "In order to see your favourited movies. You have to be logged in first."
          }
        />
      )}
      <div className="flex-1 flex items-stretch overflow-hidden bg-gray-50">
        <main className="flex-1 overflow-y-auto">
          <div className="pt-8  px-4 sm:px-6 lg:px-8">
            <div className="flex">
              <h1 className="flex-1 text-2xl font-bold text-gray-900">
                Movies
              </h1>
            </div>

            {/* Tabs */}
            <Navigation setShowAlert={setShowAlert} currentTab={currentTab} />

            {/* Movies */}
            {children}

            {currentTab !== "Favourited" && (
              <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0 mb-12">
                <div className="-mt-px w-0 flex-1 flex"></div>
                <div className="md:-mt-px md:flex">
                  {paginationArray.map((number) => {
                    if (number === index) {
                      return (
                        <a
                          key={number}
                          className="border-indigo-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                          aria-current="page"
                        >
                          {number}
                        </a>
                      );
                    } else {
                      return (
                        <a
                          key={number}
                          className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                          onClick={() => {
                            //change it to link
                            if (number !== index) {
                              if (currentTab === "Most Popular") {
                                setIndex(number);
                              } else if (currentTab === "Top Rated") {
                                setIndex(number);
                                router.push(`/top_rated_movies/${number}`);
                              }
                            }
                          }}
                        >
                          {number}
                        </a>
                      );
                    }
                  })}
                </div>
                <div className="-mt-px w-0 flex-1 flex justify-end"></div>
              </nav>
            )}
          </div>
        </main>

        {/* Details sidebar */}
      </div>
    </>
  );
};

export default MoviesWrapper;
