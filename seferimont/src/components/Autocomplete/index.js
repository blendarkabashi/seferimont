import React, { useEffect, useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import axios from "axios";
import api from "src/api/axios";

export default function Autocomplete({ required, selectedClient, setSelectedClient, onSelect }) {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState(null);

  const search = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredClients;

      if (!event.query.trim().length) {
        _filteredClients = [...clients];
      } else {
        _filteredClients = clients.filter((client) => {
          return client.fullname.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      setFilteredClients(_filteredClients);
    }, 500);
  };

  const getClients = async () => {
    api.get("/client").then((results) => setClients(results.data.clients));
  };

  useEffect(() => {
    getClients();
    // setCountries([
    //   { name: "United States", code: "USA" },
    //   { name: "Argentina", code: "ARG" },
    //   { name: "England", code: "ENG" },
    // ]);
  }, []);

  const clientTemplate = (client) => {
    return `${client.fullname}`;
  };

  const valueTemplate = (client) => {
    return client ? `${client.fullname}` : "";
  };

  return (
    <div className="card flex justify-content-center">
      <AutoComplete
        // placeholder="Shkruaj emrin apo zgjedh nje nga opsionet"
        placeholder="Shkruaj emrin e klientit"
        required={required}
        title="Shkruaj emrin apo zgjedh nje nga opsionet qe shfaqen"
        className="w-full sm:w-auto h-[36px] text-sm rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        itemTemplate={clientTemplate}
        value={selectedClient}
        suggestions={filteredClients}
        completeMethod={search}
        onChange={(event) => setSelectedClient(event.value)}
        valueTemplate={valueTemplate}
        field="fullname"
        onSelect={onSelect}
        showEmptyMessage={true}
        emptyMessage="Nuk ka klient te regjistruar me kete emer"
      />
    </div>
  );
}
