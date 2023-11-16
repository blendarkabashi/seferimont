import Stats from "src/components/Stats";
import RecentClients from "src/components/RecentClients";
import { UsersIcon, DocumentDuplicateIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import Overlay from "src/components/Overlay";
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
  const [addClientOverlay, setAddClientOverlay] = useState(false);
  return (
    <>
      <div className="">
        <Stats stats={stats} />
        <div className="pt-8 sm:hidden flex px-4">
          {/* <a
            onClick={() => setAddClientOverlay(true)}
            className=" min-h-[50px] justify-center w-full mr-4 flex items-center gap-x-1 rounded-md border bg-[#111827] text-white px-3 py-2 text-sm font-semibold shadow-sm"
          >
            <UsersIcon className="-ml-1.5 h-5 w-5 text-white" aria-hidden="true" />
            Shto Klientin
          </a> */}
          <a
            href="#"
            onClick={() => router.push("/shto-faturen")}
            className=" min-h-[50px] justify-center w-full flex items-center gap-x-1 rounded-md border bg-[#111827] text-white px-3 py-2 text-sm font-semibold shadow-sm"
          >
            <DocumentDuplicateIcon className="-ml-1.5 h-5 w-5 text-white" aria-hidden="true" />
            Shto Faturen
          </a>
        </div>
        <div className="space-y-16 pt-6 xl:space-y-20">
          {/* RecentClients */}
          <RecentClients clients={clients} />
        </div>
      </div>
    </>
  );
}
