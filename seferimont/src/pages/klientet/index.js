import { useState, useEffect } from "react";
import axios from "axios";
import withAuth from "src/components/withAuth";
import AddClient from "src/components/Overlay/add-client";

const Klientet = () => {
  const [clients, setClients] = useState([
    // { name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay.walton@example.com", role: "Member" },
    // More people...
  ]);

  const [showAddClientInvoice, setShowAddClientInvoice] = useState(false);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const result = await axios.get("http://localhost:1337/api/clients");
        setClients(result.data.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);
  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Klientet</h1>
          <p className="mt-2 text-sm text-gray-700">Lista e te gjithe klienteve qe jane te regjistruar ne sistem.</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => setShowAddClientInvoice(true)}
          >
            Shto Klientin
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
                    Emri
                  </th>
                  <th
                    scope="col"
                    className="sticky top-[64px] z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    Numri i telefonit
                  </th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, index) => (
                  <tr key={client.email}>
                    <td
                      className={classNames(
                        index !== clients.length - 1 ? "border-b border-gray-200" : "",
                        "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                      )}
                    >
                      {client.attributes.fullname}
                    </td>
                    <td
                      className={classNames(
                        index !== clients.length - 1 ? "border-b border-gray-200" : "",
                        "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell"
                      )}
                    >
                      {client.attributes.phone_number}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showAddClientInvoice && <AddClient open={showAddClientInvoice} setOpen={setShowAddClientInvoice} />}
    </div>
  );
};

export default withAuth(Klientet);
