import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "src/components/Loader";

export default function Faturat() {
  const [invoices, setInvoices] = useState([
    // { name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay.walton@example.com", role: "Member" },
    // More people...
  ]);

  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const result = await axios.get("http://localhost:1337/api/invoices?populate=*");
        setInvoices(result.data.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
      setLoadingData(false);
    };

    fetchInvoices();
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Faturat</h1>
          <p className="mt-2 text-sm text-gray-700">Lista e faturave te regjistruara ne sistem.</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Shto Faturen
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky top-[64px] z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                  >
                    Emri i klientit
                  </th>
                  <th
                    scope="col"
                    className="sticky top-[64px] z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    Numri i telefonit
                  </th>
                  <th
                    scope="col"
                    className="sticky top-[64px] z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                  >
                    Tabelat e vetures
                  </th>
                  <th
                    scope="col"
                    className="sticky top-[64px] z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                  >
                    Data e fundit per pagese
                  </th>
                  <th
                    scope="col"
                    className="sticky top-[64px] z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                  >
                    Shuma e papaguar
                  </th>
                  <th
                    scope="col"
                    className="sticky top-[64px] z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                  >
                    <span className="sr-only">Shiko detajet</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* client.fullname client.phone_number plates invoice_due invoice_unpaid */}
                {invoices.map((invoice, index) => (
                  <tr key={invoice.attributes.id}>
                    <td
                      className={classNames(
                        index !== invoices.length - 1 ? "border-b border-gray-200" : "",
                        "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                      )}
                    >
                      {invoice.attributes.client.data.attributes.fullname}
                    </td>
                    <td
                      className={classNames(
                        index !== invoices.length - 1 ? "border-b border-gray-200" : "",
                        "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell"
                      )}
                    >
                      {invoice.attributes.client.data.attributes.phone_number}
                    </td>
                    <td
                      className={classNames(
                        index !== invoices.length - 1 ? "border-b border-gray-200" : "",
                        "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"
                      )}
                    >
                      {invoice.attributes.plates}
                    </td>
                    <td
                      className={classNames(
                        index !== invoices.length - 1 ? "border-b border-gray-200" : "",
                        "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      )}
                    >
                      {invoice.attributes.invoice_due}
                    </td>
                    <td
                      className={classNames(
                        index !== invoices.length - 1 ? "border-b border-gray-200" : "",
                        "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      )}
                    >
                      €{invoice.attributes.invoice_unpaid}
                    </td>
                    <td
                      className={classNames(
                        index !== invoices.length - 1 ? "border-b border-gray-200" : "",
                        "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8"
                      )}
                    >
                      <a href="#" className="text-gray-900 hover:text-gray-500">
                        Shiko detajet<span className="sr-only">, {invoice.attributes.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
