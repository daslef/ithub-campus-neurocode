import React, { useState } from "react";
import User from "../components/User";
import { RadioGroup } from "@headlessui/react";
import { Link } from "react-router-dom";

const accounts = [
  {
    id: "374ed1e4-481b-4074-a26e-6137657c6e35",
    fullName: "Dietrich",
    picture: "374ed1e4-481b-4074-a26e-6137657c6e35/1.jpg",
  },
  {
    id: "43332f46-89a4-435c-880e-4d72bb51149a",
    fullName: "Alcyon",
    picture: "43332f46-89a4-435c-880e-4d72bb51149a/1.jpg",
  },
];

function UserSelect() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-[24px] w-full max-w-[720px] mx-auto">
      <h1 className="text-3xl font-semibold text-purple-100">
        Выберите пользователя
      </h1>
      <div className="w-full p-4 text-right">
        <div className="mx-auto w-full max-w-md">
          <RadioGroup value={selected} onChange={setSelected}>
            <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
            <div className="space-y-4">
              {accounts.map((account) => (
                <User key={account.id} user={account} />
              ))}
            </div>
          </RadioGroup>

          <Link to="/login" state={{ account: selected }}>
            <button
              className="mt-4 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm disabled:bg-slate-200 bg-purple-800 hover:bg-purple-600"
              disabled={!selected}
            >
              Продолжить
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="m-0 ml-1.5 h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserSelect;
