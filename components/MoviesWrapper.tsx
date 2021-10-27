import { useState } from "react";
import Navigation from "./Navigation";
import Alert from "./Alert";
import Pagination from "./Pagination";
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
              <Pagination
              numberOfPages={numberOfPages}
                index={index}
                currentTab={currentTab}
                setIndex={setIndex}
              />
            )}
          </div>
        </main>

        {/* Details sidebar */}
      </div>
    </>
  );
};

export default MoviesWrapper;
