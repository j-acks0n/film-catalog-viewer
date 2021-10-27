import { useRouter } from "next/router";

interface PaginationInterface {
  index: number;
  currentTab: string;
  setIndex: (index: number) => void;
  numberOfPages: number;
}

const Pagination = ({
  numberOfPages,
  index,
  currentTab,
  setIndex,
}: PaginationInterface) => {
  const router = useRouter();
  const start = index - 1 >= 1 ? index - 1 : index;
  const end = index + 3 <= numberOfPages - 1 ? index + 3 : numberOfPages;
  const paginationArray = Array.from(Array(numberOfPages).keys()).slice(
    start,
    end
  );
  return (
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
                    if (currentTab === "Most Popular" || currentTab === "Search") {
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
  );
};

export default Pagination;
