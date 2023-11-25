import React from "react";
import Overlay from "../index";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Button from "src/components/Button";
const DeleteInvoice = ({ onSubmit, open, setOpen, loading }) => {
  return (
    <Overlay open={open} setOpen={setOpen}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
            Fshij Faturen
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              A jeni i sigurt qe doni te fshini kete fature? Ky veprim eshte i pakthyeshem, nese e fshini faturen, nuk
              do te mund ta riktheni prape ne sistem
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        {/* <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          onClick={onSubmit}
        >
          Fshij Faturen
        </button> */}
        <Button inline className="sm:ml-3" loading={loading} secondary onClick={onSubmit}>
          Fshij Faturen
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

export default DeleteInvoice;
