import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { classNames, formatCurrency, formatDateString } from "src/global/functions";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import Input from "../Input";
const RecentClients = ({ invoices, searchKey, setSearchKey, searchDueInvoices }) => {
  const router = useRouter();
  const statuses = {
    Paguar: "text-green-700 bg-green-50 ring-green-600/20",
    Papaguar: "text-red-700 bg-red-50 ring-red-600/10",
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Klientet me borxhe</h2>
          {/* <a href="#" className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        View all<span className="sr-only">, clients</span>
                      </a> */}
          <div className="">
            <Input
              onChange={(event) => {
                setSearchKey(event.target.value);
                searchDueInvoices();
              }}
              value={searchKey}
              className="w-80"
              placeholder={"Kerko fature specifike"}
            />
          </div>
        </div>
        <ul role="list" className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
          {invoices.reverse().map((invoice) => (
            <li key={invoice._id} className="overflow-hidden rounded-xl border border-gray-200">
              <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 px-6 py-3">
                <div className="text-sm font-medium leading-6 text-gray-900">
                  {invoice.client.fullname}
                  {/* add full client object here  */}
                </div>
                <Menu as="div" className="relative ml-auto">
                  <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Open options</span>
                    <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => router.push(`/faturat/${invoice.id}`)}
                            className={classNames(
                              active ? "bg-gray-50" : "",
                              "cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900"
                            )}
                          >
                            Shiko detajet<span className="sr-only">, {invoice._id}</span>
                          </a>
                        )}
                      </Menu.Item>
                      {/* <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-50" : "",
                              "block px-3 py-1 text-sm leading-6 text-gray-900"
                            )}
                          >
                            Edito<span className="sr-only">, {invoice.id}</span>
                          </a>
                        )}
                      </Menu.Item> */}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500">Data e fatures</dt>
                  <dd className="text-gray-700">
                    <time>{formatDateString(invoice.due)}</time>
                  </dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500">Shuma</dt>
                  <dd className="flex items-start gap-x-2">
                    <div className="font-medium text-gray-900">{formatCurrency(invoice.unpaid)}</div>
                    <div
                      className={
                        "text-red-700 bg-red-50 ring-red-600/10 rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset"
                      }
                    >
                      E papaguar
                    </div>
                  </dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500">Numri i telefonit</dt>
                  <dd className="text-gray-700">{invoice.client.phone_number}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentClients;
