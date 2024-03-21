import Stats from "src/components/Stats";
import RecentClients from "src/components/RecentClients";
import { UsersIcon, DocumentDuplicateIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { Dialog } from "@headlessui/react";
import Overlay from "src/components/Overlay";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatCurrency } from "src/global/functions";
import withAuth from "src/components/withAuth";
import Loader from "src/components/Loader";
import Input from "src/components/Input";
import { useSelector } from "react-redux";
import api from "src/api/axios";
import { useRouter } from "next/router";

const Kryefaqja = () => {
  const router = useRouter();
  const user = useSelector((state) => state.global.user);
  const [stats, setStats] = useState();
  const [dueInvoices, setDueInvoices] = useState([]);
  const [dueInvoicesOriginal, setDueInvoicesOriginal] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const calculateInvoiceTotals = (invoices) => {
    let invoiceTotal = 0;
    let invoiceUnpaid = 0;
    let invoicePaid = 0;

    invoices.forEach((invoice) => {
      invoiceTotal += invoice.total;
      invoiceUnpaid += invoice.unpaid;
      invoicePaid += invoice.paid;
    });

    setStats([
      { name: "Totali", value: formatCurrency(invoiceTotal) },
      { name: "Fatura te pa paguara", value: formatCurrency(invoiceUnpaid) },
      { name: "Fatura te paguara", value: formatCurrency(invoicePaid) },
    ]);
  };
  const filterUnpaidInvoices = (invoices) => {
    const today = new Date();

    const dueInvoices = invoices.filter((invoice) => {
      const dueDate = new Date(invoice.due);
      const unpaidAmount = invoice.unpaid;

      return dueDate <= today && unpaidAmount !== 0;
    });

    setDueInvoices(dueInvoices);
    setDueInvoicesOriginal(dueInvoices);
  };
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const result = await api.get(`/invoice`);
        setInvoices(result.data.invoices);
        calculateInvoiceTotals(result.data.invoices);
        filterUnpaidInvoices(result.data.invoices);
        setLoadingData(false);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    let filteredInvoices = dueInvoicesOriginal.filter((invoice) =>
      invoice.client.fullname.toLowerCase().includes(searchKey.toLowerCase())
    );
    setDueInvoices(filteredInvoices);
  }, [searchKey]);

  return (
    <>
      {loadingData ? (
        <div>Loader...</div>
      ) : (
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
            <RecentClients searchKey={searchKey} setSearchKey={setSearchKey} invoices={dueInvoices} />
          </div>
        </div>
      )}
    </>
  );
};

export default withAuth(Kryefaqja);
