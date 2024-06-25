import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import CypherRing from "../components/CypherRing";

export default function Unlock() {
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
      <div className="mx-auto max-w-7xl flex flex-col items-center">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-purple-100 sm:text-4xl mb-12">
          Открыть двери
        </h2>

        <CypherRing
          // correctAnswer={[
          //   "Lynx",
          //   "Serpens",
          //   "Canis",
          //   "Lynx",
          //   "Triangulum",
          //   "Leo",
          //   "Canis",
          //   "Serpens",
          //   "Triangulum",
          //   "Capricornus",
          //   "Virgo",
          //   "Leo",
          //   "Virgo",
          //   "Taurus",
          //   "Pegasus",
          //   "Capricornus",
          // ]}
          correctAnswer={["Lynx"]}
          navigate={navigate}
        ></CypherRing>
      </div>
    </div>
  );
}
