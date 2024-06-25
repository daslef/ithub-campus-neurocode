import { useState, useEffect } from "react";

export default function Input({
  correctAnswer,
  selected,
  setSelected,
  navigate,
}) {
  const [isLockActivated, activate] = useState(false);
  const [currentIx, setCurrentIx] = useState(0);

  useEffect(() => {
    if (correctAnswer[currentIx] === selected) {
      setCurrentIx((currentIx) => currentIx + 1);
      setSelected(null);
    }
  }, [selected]);

  useEffect(() => {
    if (isLockActivated) {
      const delay = setTimeout(() => {
        navigate("/success");
      }, 2000);
      return () => {
        clearTimeout(delay);
      };
    }
  }, [isLockActivated]);

  if (currentIx == correctAnswer.length) {
    return (
      <>
        <div
          id="lock"
          className={isLockActivated ? "open" : "closed"}
          onClick={() => activate(true)}
        ></div>
      </>
    );
  }

  return (
    <section>
      <div className="form flex flex-col items-center">
        <h4 className="w-fit py-1 px-4 rounded-md mb-4 bg-white font-bold select-none">
          Вопрос {currentIx + 1}
        </h4>
        <div className="flex justify-center mb-3">
          {correctAnswer.map((value, ix) => (
            <input
              key={`answer_${ix}`}
              type="text"
              maxLength={1}
              className={
                ix < currentIx
                  ? "form-control rounded-xl bg-gradient-to-r from-purple-400 to-purple-600"
                  : ix === currentIx
                  ? "form-control rounded-xl border-purple-400 border-2 bg-transparent"
                  : "form-control rounded-xl bg-transparent"
              }
              readOnly
            />
          ))}
        </div>
      </div>
    </section>
  );
}
