import { RadioGroup } from "@headlessui/react";
import Dropdown from "src/components/Dropdown";
import Input from "src/components/Input";
import { useState } from "react";
import Button from "src/components/Button";
import CreatableSelect from "react-select/creatable";
// import { colourOptions } from '../data';

// export default () => <CreatableSelect isClearable options={colourOptions} />;
const index = () => {
  const services = [
    { value: 1, label: "Nderrim i vajit" },
    { value: 2, label: "Bosh Pumpa" },
    { value: 3, label: "Motorri" },
  ];
  const [selectedService, setSelectedService] = useState(services[0]);
  const [addedRows, setAddedRows] = useState([]);

  const addRow = () => {
    setAddedRows([...addedRows, "row"]);
  };
  const removeRow = () => {
    setAddedRows(addedRows.slice(0, -1));
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      position: "relative",
      minHeight: "36px !important",
      height: "36px !important",
      borderRadius: "0.375rem", // equivalent to rounded-md in Tailwind
      border: "1px solid #D1D5DB",
      paddingTop: "0.375rem", // equivalent to py-1.5 in Tailwind
      paddingBottom: "0.375rem",
      color: "#1F2937", // equivalent to text-gray-900 in Tailwind
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)", // equivalent to shadow-sm in Tailwind
      ringWidth: "1px", // equivalent to ring-1 in Tailwind
      ringInset: "inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)", // equivalent to ring-inset in Tailwind
      ringColor: "#D1D5DB", // equivalent to ring-gray-300 in Tailwind
    }),
    valueContainer: (provided) => ({
      ...provided,
      position: "absolute",
      fontSize: "14px",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    }),
    input: (base) => ({
      ...base,
      input: {
        fontSize: "14px !important",
        borderColor: "transparent !important",
        "&:focus": {
          borderColor: "transparent !important",
          boxShadow: "none !important",
          "--tw-ring-color": "transparent !important",
        },
      },
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      position: "absolute",
      right: 0,
      top: 0,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9CA3AF", // equivalent to text-gray-400 in Tailwind
      fontSize: "14px",
    }),
    menuList: (provided) => ({
      ...provided,
      fontSize: "14px",
    }),
    // Add other custom styles if needed
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-6 relative">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-lg font-semibold leading-6 text-gray-900">Shto faturen</h1>
          <p className="mt-2 text-sm text-gray-700">Ploteso fushat poshte dhe krijo nje fature.</p>
        </div>
      </div>
      <div class="my-4">
        <div class="grid md:grid-cols-2 gap-3 border-t border-gray-200 pt-5">
          <div>
            <div class="grid space-y-3">
              <dl class="grid sm:flex gap-x-3 text-sm items-center">
                <dt class="min-w-[150px] max-w-[200px] text-gray-500">Fature per:</dt>
                <dd class="text-gray-800">
                  <Input placeholder={"Bashkim Krasniqi"} />
                </dd>
              </dl>

              <dl class="grid sm:flex gap-x-3 text-sm items-center">
                <dt class="min-w-[150px] max-w-[200px] text-gray-500">Numri i telefonit:</dt>
                <dd class="text-gray-800 ">
                  <Input placeholder={"+383 49 488 752"} />
                </dd>
              </dl>
            </div>
          </div>

          <div>
            <div class="grid space-y-3">
              <dl class="grid sm:flex gap-x-3 text-sm items-center">
                <dt class="min-w-[150px] max-w-[200px] text-gray-500">Targat:</dt>
                <dd class="text-gray-800 ">
                  <Input placeholder={"03-773-DI"} />
                </dd>
              </dl>
              <dl class="grid sm:flex gap-x-3 text-sm items-center">
                <dt class="min-w-[150px] max-w-[200px] text-gray-500">Data e fundit e pageses:</dt>
                <Input type="date" placeholder={"10 Jan 2023"} />
              </dl>
            </div>
          </div>
        </div>

        <div class="mt-6 border border-gray-200 p-4 rounded-lg space-y-4 ">
          <div class="hidden sm:grid sm:grid-cols-5">
            <div class="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">Produkti</div>
            <div class="text-start text-xs font-medium text-gray-500 uppercase">Sasia</div>
            <div class="text-start text-xs font-medium text-gray-500 uppercase">Cmimi</div>
            <div class="text-end text-xs font-medium text-gray-500 uppercase">Totali</div>
          </div>

          <div class="hidden sm:block border-b border-gray-200 "></div>

          <div class="grid grid-cols-1 sm:grid-cols-5 gap-2">
            <div class="col-span-full sm:col-span-2">
              <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Produkti</h5>
              <CreatableSelect
                placeholder="Selekto apo krijo nje opsion"
                isClearable
                options={services}
                styles={customStyles}
                formatCreateLabel={(inputValue) => `Krijo opsionin "${inputValue}"`}
              />
              {/* data={services} selected={selectedService} setSelected={setSelectedService} /> */}
            </div>
            <div>
              <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Sasia</h5>
              <Input placeholder={1} />
            </div>
            <div>
              <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Cmimi</h5>
              <Input type="currency" placeholder={500} />
            </div>
            <div className="justify-end items-center flex">
              <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase mr-2">Totali</h5>
              <p class="sm:text-end text-gray-800 ">€500.00</p>
            </div>
          </div>
          <div class="sm:hidden border-b border-gray-200 "></div>
          {addedRows.map((row) => (
            <>
              <div class="grid grid-cols-1 sm:grid-cols-5 gap-2">
                <div class="col-span-full sm:col-span-2">
                  <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Produkti</h5>
                  <CreatableSelect
                    placeholder="Selekto apo krijo nje opsion"
                    isClearable
                    options={services}
                    styles={customStyles}
                    formatCreateLabel={(inputValue) => `Krijo opsionin "${inputValue}"`}
                  />
                </div>
                <div>
                  <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Sasia</h5>
                  <Input placeholder={1} />
                </div>
                <div>
                  <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Cmimi</h5>
                  <Input type="currency" placeholder={500} />
                </div>
                <div className="justify-end items-center flex">
                  <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase mr-2">Totali</h5>
                  <p class="sm:text-end text-gray-800 ">€500.00</p>
                </div>
              </div>

              <div class="sm:hidden border-b border-gray-200 "></div>
            </>
          ))}
          <div className="flex items-center sm:max-w-fit">
            <Button className="mr-2" onClick={() => addRow()} label="Shto nje produkt" />
            {addedRows.length >= 1 && <Button secondary onClick={() => removeRow()} label="Largo nje produkt" />}
          </div>
        </div>

        <div class="mt-8 flex sm:justify-end">
          <div class="w-full max-w-2xl sm:text-end space-y-2">
            <div class="grid grid-cols-1 sm:grid-cols-1 gap-3 sm:gap-2">
              <dl class="grid sm:grid-cols-5 gap-x-3 text-sm text-right sm:text-left grid-cols-1">
                <dt class="col-span-3 text-gray-500">Totali:</dt>
                <dd class="col-span-3 sm:col-span-2 font-medium text-gray-800 ">€2750.00</dd>
              </dl>

              <dl class="grid sm:grid-cols-5 gap-x-3 text-sm text-right sm:text-left grid-cols-1 items-center">
                <dt class="col-span-3 text-gray-500">E paguar:</dt>
                <dd class="col-span-3 sm:col-span-2">
                  <Input type="currency" inline className="text-right" placeholder="2500" />
                </dd>
              </dl>

              <dl class="grid sm:grid-cols-5 gap-x-3 text-sm text-right sm:text-left grid-cols-1">
                <dt class="col-span-3 text-gray-500">Borxhi:</dt>
                <dd class="col-span-3 sm:col-span-2 font-medium text-gray-800 ">€50.00</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className=" mt-16 flex justify-center">
          <div className="sm:w-[300px] w-full">
            <Button success label="Ruaj Faturen" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
