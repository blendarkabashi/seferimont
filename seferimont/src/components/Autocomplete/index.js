import React, { useEffect, useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import axios from "axios";

export default function Autocomplete() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [filteredClients, setFilteredClients] = useState(null);

  const search = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredClients;

      if (!event.query.trim().length) {
        _filteredClients = [...clients];
      } else {
        _filteredClients = clients.filter((client) => {
          return client.attributes.first_name.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      setFilteredClients(_filteredClients);
    }, 500);
  };

  const getClients = async () => {
    axios.get("http://localhost:1337/api/clients").then((results) => setClients(results.data.data));
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
    return `${client.attributes.first_name} ${client.attributes.last_name}`;
  };

  const valueTemplate = (client) => {
    return client ? `${client.attributes.first_name} ${client.attributes.last_name}` : "";
  };

  return (
    <div className="card flex justify-content-center">
      <AutoComplete
        className="h-[36px] text-sm rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        itemTemplate={clientTemplate}
        value={selectedClient}
        suggestions={filteredClients}
        completeMethod={search}
        onChange={(e) => setSelectedClient(e.value)}
      />
    </div>
  );
}
