import { useState, useEffect } from "react";
import axios from "axios";
import withAuth from "src/components/withAuth";
import AddClient from "src/components/Overlay/add-client";

import { useRouter } from "next/router";
import Input from "src/components/Input";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Pagination from "src/components/Pagination";
import api from "src/api/axios";
const Klientet = () => {
  const router = useRouter();
  const [clientsOriginal, setClientsOriginal] = useState([]);
  const [clients, setClients] = useState([
    // { name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay.walton@example.com", role: "Member" },
    // More people...
  ]);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(20);
  const [total, setTotal] = useState(10);

  const [addClientLoading, setAddClientLoading] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [searchValue, setSearchValue] = useState("");

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const fetchClients = async () => {
    let apiUrl = `/client?page=${page}&limit=${offset}`;
    if (searchKey && searchValue) {
      const filters = { [searchKey]: searchValue };
      apiUrl = `/client?page=${page}&limit=${offset}&filters=${encodeURIComponent(
        JSON.stringify(filters)
      )}`;
    }
    try {
      const result = await api.get(apiUrl);
      setClients(result.data.clients);
      setClientsOriginal(result.data.clients);
      setTotal(result.data.total);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  useEffect(() => {
    if (searchValue === "") fetchClients();
  }, [page, searchValue]);

  useEffect(() => {
    let timer;
    if (searchKey && searchValue) {
      timer = setTimeout(() => {
        fetchClients();
      }, 2000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [searchKey, searchValue]);

  //useEffect(() => {
  //  let filteredClients = clientsOriginal.filter(
  //    (client) =>
  //      client.fullname.toLowerCase().includes(searchKey.toLowerCase()) ||
  //      client.phone_number.includes(searchKey)
  //  );
  //  setClients(filteredClients);
  //}, [searchKey]);

  const addClient = async (client) => {
    try {
      setAddClientLoading(true);
      await api.post("/client", {
        fullname: client.fullname,
        phone_number: client.phone_number,
        email: client.email,
      });
      fetchClients();
      setShowAddClient(false);
      setAddClientLoading(false);
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };
  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Klientet
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Lista e te gjithe klienteve qe jane te regjistruar ne sistem.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => setShowAddClient(true)}
          >
            Shto Klient
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-between mt-5">
        <Input
          label="Key"
          onChange={(event) => {
            setSearchKey(event.target.value);
          }}
          value={searchKey}
          className="w-[200px] mt-2"
          type="dropdown"
          placeholder={"Kerko klientin"}
          options={[
            { key: "phone_number", value: "Phone number" },
            { key: "email", value: "Email" },
            { key: "fullname", value: "Full Name" },
          ]}
        />
        <Input
          label="Value"
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
          value={searchValue}
          iconBefore={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
          className="w-[280px]"
          placeholder={"Kerko klientin"}
          disabled={!searchKey}
        />
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
                {clients
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((client, index) => (
                    <tr
                      key={client.email}
                      className="hover:bg-blue-50 cursor-pointer"
                      onClick={() => router.push(`/klientet/${client._id}`)}
                    >
                      <td
                        className={classNames(
                          index !== clients.length - 1
                            ? "border-b border-gray-200"
                            : "",
                          "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                        )}
                      >
                        {client.fullname}
                      </td>
                      <td
                        className={classNames(
                          index !== clients.length - 1
                            ? "border-b border-gray-200"
                            : "",
                          "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell"
                        )}
                      >
                        {client.phone_number}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {total > offset && (
              <Pagination
                offset={offset}
                page={page}
                setPage={setPage}
                total={total}
              />
            )}
          </div>
        </div>
      </div>
      {showAddClient && (
        <AddClient
          loading={addClientLoading}
          onSubmit={addClient}
          open={showAddClient}
          setOpen={setShowAddClient}
        />
      )}
    </div>
  );
};

export default withAuth(Klientet);
