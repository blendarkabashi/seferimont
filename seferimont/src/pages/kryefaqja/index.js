import Stats from "src/components/Stats";
import RecentClients from "src/components/RecentClients";
import { UsersIcon, DocumentDuplicateIcon } from "@heroicons/react/20/solid";
const stats = [
  { name: "Totali", value: "€405,091.00" },
  { name: "Fatura te papaguara", value: "€12,787.00" },
  { name: "Fatura te paguara", value: "€245,988.00" },
];
const clients = [
  {
    id: 1,
    name: "Ardit Krasniqi",
    lastInvoice: { date: "December 13, 2022", dateTime: "2022-12-13", amount: "$2,000.00", status: "Papaguar" },
    phone_number: "+383 49 485 253",
  },
  {
    id: 2,
    name: "Besmir Krelani",
    lastInvoice: { date: "January 22, 2023", dateTime: "2023-01-22", amount: "$14,000.00", status: "Papaguar" },
    phone_number: "+383 44 255 253",
  },
  {
    id: 3,
    name: "Kastriot Gashi",
    lastInvoice: { date: "January 23, 2023", dateTime: "2023-01-23", amount: "$7,600.00", status: "Papaguar" },
    phone_number: "+383 44 825 952",
  },
];

export default function Kryefaqja() {
  return (
    <>
      <div className="">
        <Stats stats={stats} />
        <div className="pt-8 sm:hidden flex px-4">
          <a
            href="#"
            className=" min-h-[50px] justify-center w-full mr-4 flex items-center gap-x-1 rounded-md border bg-[#111827] text-white px-3 py-2 text-sm font-semibold shadow-sm"
          >
            <UsersIcon className="-ml-1.5 h-5 w-5 text-white" aria-hidden="true" />
            Shto Klientin
          </a>
          <a
            href="#"
            className=" min-h-[50px] justify-center w-full flex items-center gap-x-1 rounded-md border bg-[#111827] text-white px-3 py-2 text-sm font-semibold shadow-sm"
          >
            <DocumentDuplicateIcon className="-ml-1.5 h-5 w-5 text-white" aria-hidden="true" />
            Shto Faturen
          </a>
        </div>
        <div className="space-y-16 pt-6 xl:space-y-20">
          {/* RecentClients */}
          <RecentClients clients={clients} />
          {/* Table  */}
          {/* <div>
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
                      Recent activity
                    </h2>
                  </div>
                  <div className="mt-6 overflow-hidden border-t border-gray-100">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                        <table className="w-full text-left">
                          <thead className="sr-only">
                            <tr>
                              <th>Amount</th>
                              <th className="hidden sm:table-cell">Client</th>
                              <th>More details</th>
                            </tr>
                          </thead>
                          <tbody>
                            {days.map((day) => (
                              <Fragment key={day.dateTime}>
                                <tr className="text-sm leading-6 text-gray-900">
                                  <th scope="colgroup" colSpan={3} className="relative isolate py-2 font-semibold">
                                    <time dateTime={day.dateTime}>{day.date}</time>
                                    <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                                    <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                                  </th>
                                </tr>
                                {day.transactions.map((transaction) => (
                                  <tr key={transaction.id}>
                                    <td className="relative py-5 pr-6">
                                      <div className="flex gap-x-6">
                                        <div className="flex-auto">
                                          <div className="flex items-start gap-x-3">
                                            <div className="text-sm font-medium leading-6 text-gray-900">
                                              {transaction.amount}
                                            </div>
                                            <div
                                              className={classNames(
                                                statuses[transaction.status],
                                                "rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset"
                                              )}
                                            >
                                              {transaction.status}
                                            </div>
                                          </div>
                                          {transaction.tax ? (
                                            <div className="mt-1 text-xs leading-5 text-gray-500">
                                              {transaction.tax} tax
                                            </div>
                                          ) : null}
                                        </div>
                                      </div>
                                      <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                                      <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                                    </td>
                                    <td className="hidden py-5 pr-6 sm:table-cell">
                                      <div className="text-sm leading-6 text-gray-900">{transaction.client}</div>
                                      <div className="mt-1 text-xs leading-5 text-gray-500">
                                        {transaction.description}
                                      </div>
                                    </td>
                                    <td className="py-5 text-right">
                                      <div className="flex justify-end">
                                        <a
                                          href={transaction.href}
                                          className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                                        >
                                          View<span className="hidden sm:inline"> transaction</span>
                                          <span className="sr-only">
                                            , invoice #{transaction.invoiceNumber}, {transaction.client}
                                          </span>
                                        </a>
                                      </div>
                                      <div className="mt-1 text-xs leading-5 text-gray-500">
                                        Invoice <span className="text-gray-900">#{transaction.invoiceNumber}</span>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </Fragment>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div> */}
        </div>
      </div>
    </>
  );
}
