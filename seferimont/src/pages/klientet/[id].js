import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { formatCurrency, formatDateString } from "src/global/functions";
import { classNames } from "primereact/utils";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalInvoices, setTotalInvoices] = useState(null);
  const [paidInvoices, setPaidInvoices] = useState(null);
  const [unpaidInvoices, setUnpaidInvoices] = useState(null);
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const result = await axios.get(`http://localhost:1337/api/clients/${id}?populate=*`);
        setClient(result.data.data.attributes);
        calculateInvoiceTotals(result.data.data.attributes.invoices.data);
      } catch (error) {
        console.error("Error fetching client:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchClient();
    }
  }, [router.query]);

  const calculateInvoiceTotals = (invoices) => {
    let invoiceTotal = 0;
    let invoiceUnpaid = 0;
    let invoicePaid = 0;

    invoices.forEach((invoice) => {
      invoiceTotal += invoice.attributes.invoice_total;
      invoiceUnpaid += invoice.attributes.invoice_unpaid;
      invoicePaid += invoice.attributes.invoice_paid;
    });

    setTotalInvoices(formatCurrency(invoiceTotal));
    setPaidInvoices(formatCurrency(invoicePaid));
    setUnpaidInvoices(formatCurrency(invoiceUnpaid));
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div class="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
          <div class="mb-5 pb-5 flex justify-between items-center border-b border-gray-200 ">
            <div>
              <h2 class="text-2xl font-semibold text-gray-800 ">{client.fullname}</h2>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-3">
            <div>
              <div class="grid space-y-3">
                <dl class="grid sm:flex gap-x-3 text-sm">
                  <dt class="min-w-[150px] max-w-[200px] text-gray-500">Numri i telefonit:</dt>
                  <dd class="text-gray-800 ">
                    <span class="block font-semibold">{client.phone_number}</span>
                  </dd>
                </dl>
                <dl class="grid sm:flex gap-x-3 text-sm">
                  <dt class="min-w-[150px] max-w-[200px] text-gray-500">Fatura ne total:</dt>
                  <dd class="text-gray-800 ">
                    <span class="block font-semibold">{client.invoices.data.length}</span>
                  </dd>
                </dl>
                <dl class="grid sm:flex gap-x-3 text-sm">
                  <dt class="min-w-[150px] max-w-[200px] text-gray-500">Shuma totale e papaguar:</dt>
                  <dd class="text-red-500 ">
                    <span class="block font-semibold">{unpaidInvoices}</span>
                  </dd>
                </dl>
                <dl class="grid sm:flex gap-x-3 text-sm">
                  <dt class="min-w-[150px] max-w-[200px] text-gray-500">Shuma totale e paguar:</dt>
                  <dd class="text-green-500 ">
                    <span class="block font-semibold">{paidInvoices}</span>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          {!client.invoices.data.length ? (
            <div className="rounded-md bg-blue-50 p-4 mt-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                </div>
                <div className="ml-3 flex-1 md:flex md:justify-between">
                  <p className="text-sm text-blue-700">Nuk ka fatura te regjistruara ne sistem per kete klient</p>
                </div>
              </div>
            </div>
          ) : (
            <table className="min-w-full border-separate border-spacing-0 -mx-4 sm:-mx-6 lg:-mx-8 mt-6">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky top-[64px] z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                  >
                    Nr. unik i fatures
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
                {client.invoices.data.map((invoice, index) => (
                  <tr
                    key={invoice.attributes.id}
                    className="hover:bg-blue-50 cursor-pointer"
                    onClick={() => router.push(`/faturat/${invoice.id}`)}
                  >
                    <td
                      className={classNames(
                        index !== client.invoices.data.length - 1 ? "border-b border-gray-200" : "",
                        "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6 lg:pl-8"
                      )}
                    >
                      {invoice.id}
                    </td>
                    <td
                      className={classNames(
                        index !== client.invoices.data.length - 1 ? "border-b border-gray-200" : "",
                        "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"
                      )}
                    >
                      {invoice.attributes.plates ? invoice.attributes.plates : "-"}
                    </td>
                    <td
                      className={classNames(
                        index !== client.invoices.data.length - 1 ? "border-b border-gray-200" : "",
                        "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      )}
                    >
                      {formatDateString(invoice.attributes.invoice_due)}
                    </td>
                    <td
                      className={classNames(
                        index !== client.invoices.data.length - 1 ? "border-b border-gray-200" : "",
                        `whitespace-nowrap px-3 py-4 text-sm ${
                          invoice.attributes.invoice_unpaid > 0 ? "text-red-500" : "text-green-500"
                        }`
                      )}
                    >
                      €{invoice.attributes.invoice_unpaid}
                    </td>
                    <td
                      className={classNames(
                        index !== client.invoices.data.length - 1 ? "border-b border-gray-200" : "",
                        "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      )}
                    >
                      €{invoice.attributes.invoice_total}
                    </td>
                    <td
                      className={classNames(
                        index !== client.invoices.data.length - 1 ? "border-b border-gray-200" : "",
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
                          setInvoiceToDelete(invoice.id);
                          setShowDeleteInvoiceDialog(true);
                        }}
                        className="text-red-600 hover:text-red-500 cursor-pointer"
                      >
                        Fshij Faturen<span className="sr-only">, {invoice.attributes.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
};

export default index;
