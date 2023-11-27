import React, { useState } from "react";
import Overlay from "../index";
import Input from "src/components/Input";
import ExclamationTriangleIcon from "@heroicons/react/20/solid/ExclamationTriangleIcon";
import { Dialog } from "@headlessui/react";
import Button from "src/components/Button";

const AddClient = ({ onSubmit, open, setOpen, loading }) => {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  return (
    <Overlay open={open} setOpen={setOpen}>
      <div className="">
        <div className="mt-3 text-center sm:mt-0 sm:text-left">
          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
            Shto klientin
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm">Shkruaj detajet me poshte per te shtuar klientin</p>
            <form className="grid grid-cols-1 gap-4 mt-6">
              <Input
                required
                label="Emri dhe mbiemri i klienti*"
                onChange={(event) => setFullName(event.target.value)}
                value={fullName}
                placeholder={"Shkruaj emrin e plote te klientit"}
              />
              <Input
                label="Emaili i klientit"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                placeholder={"Shkruaj emailin e klientit"}
              />
              <Input
                required
                label="Numri i telefonit te klientit*"
                id="phone_number"
                onChange={(event) => setPhoneNumber(event.target.value)}
                value={phoneNumber}
                placeholder={"Shkruaj numrin e telefonit"}
              />
            </form>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button className="inline-flex w-full sm:w-auto sm:ml-3" loading={loading} success onClick={onSubmit}>
          Shto klientin
        </Button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={() => setOpen(false)}
        >
          Anulo
        </button>
      </div>
    </Overlay>
  );
};

export default AddClient;
