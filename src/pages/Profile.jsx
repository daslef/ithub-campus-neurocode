import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("faceAuth")) {
      navigate("/login");
    }

    const { account } = JSON.parse(localStorage.getItem("faceAuth"));
    setAccount(account);
  }, []);

  if (!account) {
    return null;
  }

  return (
    <div className="h-full bg-black pt-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-purple-100 sm:text-4xl mb-12">
          Система контроля доступа
        </h2>
        <div className="text-center mb-12">
          <img
            className="mx-auto mb-8 object-cover h-48 w-48 rounded-full"
            src={`/temp-accounts/${account.picture}`}
            alt={account.fullName}
          />
          <h1
            className="block text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-800"
            style={{
              lineHeight: "1.5",
            }}
          >
            {account?.fullName}
            <button
              className="text-sm text-yellow-300 font-bold ml-1"
              onClick={() => {
                localStorage.removeItem("faceAuth");
                navigate("/");
              }}
            >
              _
            </button>
          </h1>
          <Link
            to="/unlock"
            replace={true}
            className="flex gap-2 mt-12 w-fit mx-auto cursor-pointer z-10 py-3 px-6 rounded-full bg-gradient-to-r from-purple-400 to-purple-600"
          >
            <span className="text-white font-bold">Открыть двери</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-6 h-6 m-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
