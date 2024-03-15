import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Script from "next/script";
const Input = ({
  iconBefore,
  readonly,
  required,
  onChange,
  inline,
  label,
  placeholder,
  type,
  name,
  id,
  className,
  value,
  options = [],
}) => {
  const currencyInput = () => {
    return (
      <div>
        {label && (
          <label
            htmlFor={name}
            className="block text-left text-sm font-medium leading-6 text-gray-900"
          >
            {label}
          </label>
        )}
        <div
          className={`relative rounded-md shadow-sm ${
            inline && "sm:inline-block"
          }`}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">€</span>
          </div>
          <input
            readonly={readonly}
            required={required}
            value={value}
            name={name}
            id={id}
            className={`${className} block w-full rounded-md border-0 py-1.5 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6`}
            placeholder={0}
            onChange={onChange}
          />
        </div>
      </div>
    );
  };
  if (type == "currency") return currencyInput();
  if (type === "dropdown")
    return (
      <div>
        {label && (
          <label
            htmlFor={name}
            className="block text-left text-sm font-medium leading-6 text-gray-900"
          >
            {label}
          </label>
        )}
        <select
          readOnly={readonly}
          required={required}
          value={value}
          type={type}
          onChange={onChange}
          name={name}
          id={id}
          className={`${className} ${
            inline ? "inline-block" : "block w-full"
          } ${
            iconBefore && "pl-10"
          } rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6`}
          placeholder={placeholder}
        >
          <option selected>Zgjedhe</option>
          {options.map((option) => (
            <option value={option.key}>{option.value}</option>
          ))}
        </select>
      </div>
    );
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-left text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
      )}
      <div className={`${label && "mt-2"} relative`}>
        {iconBefore && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {iconBefore}
          </div>
        )}
        <input
          readOnly={readonly}
          required={required}
          value={value}
          type={type}
          onChange={onChange}
          name={name}
          id={id}
          className={`${className} ${
            inline ? "inline-block" : "block w-full"
          } ${
            iconBefore && "pl-10"
          } rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6`}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default Input;
