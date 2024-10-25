import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const nameRef = useRef();
  const addressRef = useRef();
  const formRef = useRef();
  const navigate = useNavigate();

  const handleCheck = (e) => {
    e.preventDefault();
    formRef.current.reset();
    navigate("/order");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
          Checkout Information
        </h2>
        <form
          onSubmit={handleCheck}
          ref={formRef}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              ref={nameRef}
              type="text"
              id="name"
              className="py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="address" className="text-gray-700 dark:text-gray-300">
              Address
            </label>
            <input
              ref={addressRef}
              type="text"
              id="address"
              className="py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              placeholder="Enter your address"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
          >
            PLACE YOUR ORDER
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
