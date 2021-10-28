import Link from "next/link";

type AlertType = {
  setShowAlert: (showAlert: boolean) => void;
  text: string;
};

const Alert = ({ setShowAlert, text }: AlertType) => {
  return (
    <>
      {/* <div className="bg-white shadow sm:rounded-lg absolute left-2/4 alertTransform z-20"> */}
      {/* <div className="bg-white shadow sm:rounded-lg absolute left-2/4 alertTransform z-20 "> */}

      <div className="absolute top-0 left-0 w-full h-full z-200  max-h-screen max-w-screen">
        <div className="bg-white shadow sm:rounded-lg absolute centralise z-20 ">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Login required
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>{text}</p>
            </div>
            <div className="mt-5">
              <button
                type="button"
                className="inline-flex mr-2 items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                onClick={() => {
                  setShowAlert(false);
                }}
              >
                Close
              </button>
              <Link href="/api/auth/login" passHref>
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-green-700 bg-green-100 hover:bg-gr-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
                >
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 z-10 w-full h-full bg-black opacity-70" />
      </div>
    </>
  );
};

export default Alert;
