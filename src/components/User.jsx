import { RadioGroup } from "@headlessui/react";

function User({ user, type }) {
  return (
    <RadioGroup.Option
      key={user.id}
      value={user}
      className={({ checked }) =>
        `${
          checked ? "bg-purple-300 bg-opacity-75" : "bg-white"
        } relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
      }
    >
      {({ checked }) => (
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <div className="text-2xl">
              <RadioGroup.Label
                as="div"
                className={`flex items-center gap-x-8 font-bold ${
                  checked ? "text-black" : "text-gray-300"
                }`}
              >
                <img
                  className="object-cover h-20 w-20 rounded-full"
                  src={`/temp-accounts/${user.picture}`}
                  alt={user.fullName}
                />
                {user.fullName}
              </RadioGroup.Label>
            </div>
          </div>
          {checked && (
            <div className="shrink-0">
              <CheckIcon className="h-12 w-12 m-0" />
            </div>
          )}
        </div>
      )}
    </RadioGroup.Option>
  );
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default User;
