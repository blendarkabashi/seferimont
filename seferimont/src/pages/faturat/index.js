import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "src/components/Loader";
import { formatDateString } from "src/global/functions";
import { useRouter } from "next/router";
import withAuth from "src/components/withAuth";
import TrashIcon from "@heroicons/react/20/solid/TrashIcon";
import DeleteInvoice from "src/components/Overlay/delete-invoice";
import { useSelector } from "react-redux";

const Faturat = () => {
  const router = useRouter();
  const [invoices, setInvoices] = useState([
    // { name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay.walton@example.com", role: "Member" },
    // More people...
  ]);
  const user = useSelector((state) => state.global.user);
  const [showDeleteInvoiceDialog, setShowDeleteInvoiceDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);

  const [loadingData, setLoadingData] = useState(true);

  const fetchInvoices = async () => {
    try {
      const result = await axios.get(`http://localhost:9001/invoice`);
      setInvoices(result.data.reverse());
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
    setLoadingData(false);
  };
  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleDeleteInvoice = async () => {
    setDeleting(true);
    await axios.delete(`http://localhost:9001/invoice/${invoiceToDelete}`);
    setDeleting(false);
    setShowDeleteInvoiceDialog(false);
    fetchInvoices();
  };
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
        <div className="block sm:hidden mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
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
                    Nr. rendor
                  </th>
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
                    className="sticky top-[64px] z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                  >
                    Shuma totale
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
                  <tr
                    key={invoice._id}
                    className="hover:bg-blue-50 cursor-pointer"
                    onClick={() => router.push(`/faturat/${invoice._id}`)}
                  >
                    <td
                      className={classNames(
                        index !== invoices.length - 1 ? "border-b border-gray-200" : "",
                        "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6 lg:pl-8"
                      )}
                    >
                      {index + 1}
                    </td>
                    <td
                      className={classNames(
                        index !== invoices.length - 1 ? "border-b border-gray-200" : "",
                        "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                      )}
                    >
                      {invoice.client.fullname}
                    </td>
                    <td
                      className={classNames(
                        index !== invoices.length - 1 ? "border-b border-gray-200" : "",
                        "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell"
                      )}
                    >
                      {invoice.client.phone_number}
                    </td>
                    <td
                      className={classNames(
                        index !== invoices.length - 1 ? "border-b border-gray-200" : "",
                        "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"
                      )}
                    >
                      {invoice.plates ? invoice.plates : "-"}
                    </td>
                    <td
                      className={classNames(
                        index !== invoices.length - 1 ? "border-b border-gray-200" : "",
                        "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      )}
                    >
                      {formatDateString(invoice.due)}
                    </td>
                    <td
                      className={classNames(
                        index !== invoices.length - 1 ? "border-b border-gray-200" : "",
                        `whitespace-nowrap px-3 py-4 text-sm ${invoice.unpaid > 0 ? "text-red-500" : "text-green-500"}`
                      )}
                    >
                      €{invoice.unpaid}
                    </td>
                    <td
                      className={classNames(
                        index !== invoices.length - 1 ? "border-b border-gray-200" : "",
                        "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      )}
                    >
                      €{invoice.total}
                    </td>
                    <td
                      className={classNames(
                        index !== invoices.length - 1 ? "border-b border-gray-200" : "",
                        "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8"
                      )}
                    >
                      {/* <a
                        onClick={() => router.push(`/faturat/${invoice.id}`)}
                        className="text-indigo-600 hover:text-indigo-500 cursor-pointer"
                      >
                        Shiko detajet<span className="sr-only">, {invoice.attributes.name}</span>
                      </a> */}
                      <a
                        onClick={(event) => {
                          event.stopPropagation();
                          setInvoiceToDelete(invoice._id);
                          setShowDeleteInvoiceDialog(true);
                        }}
                        className="text-red-600 hover:text-red-500 cursor-pointer"
                      >
                        Fshij Faturen<span className="sr-only">, {invoice.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showDeleteInvoiceDialog && (
        <DeleteInvoice
          loading={deleting}
          onSubmit={handleDeleteInvoice}
          open={showDeleteInvoiceDialog}
          setOpen={setShowDeleteInvoiceDialog}
        />
      )}
    </div>
  );
};

export default withAuth(Faturat);
