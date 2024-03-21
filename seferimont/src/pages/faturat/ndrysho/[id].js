import { RadioGroup } from "@headlessui/react";
import Dropdown from "src/components/Dropdown";
import Input from "src/components/Input";
import { useEffect, useState } from "react";
import Button from "src/components/Button";
import CreatableSelect from "react-select/creatable";
import Autocomplete from "src/components/Autocomplete";
import { useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import withAuth from "src/components/withAuth";
import api from "src/api/axios";

// import { colourOptions } from '../data';

// export default () => <CreatableSelect isClearable options={colourOptions} />;
const index = () => {
  const router = useRouter();
  const { id } = router.query;

  const [client, setClient] = useState("");

  const [loadingInvoice, setLoadingInvoice] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [plates, setPlates] = useState("");
  const [date, setDate] = useState();
  const [products, setProducts] = useState([{ id: 0, product: "", quantity: 1, price: 0 }]);

  const [services, setServices] = useState([
    // { value: 1, label: "Nderrim i vajit" },
    // { value: 2, label: "Bosh Pumpa" },
    // { value: 3, label: "Motorri" },
  ]);
  const [paidAmount, setPaidAmount] = useState(0);
  const invoiceTotal = useMemo(() => {
    return products.reduce(
      (accumulator, product) => accumulator + parseFloat(product.price) * parseFloat(product.quantity),
      0
    )
      ? products.reduce(
          (accumulator, product) => accumulator + parseFloat(product.price) * parseFloat(product.quantity),
          0
        )
      : 0;
  }, [products]);

  // useEffect(() => {
  //   setPaidAmount(invoiceTotal);
  // }, [invoiceTotal]);

  useEffect(() => {
    if (phoneNumber && client && date) {
      const areAllProductsValid = products.every((product) => product.quantity && product.price && product.product);
      setIsFormValid(areAllProductsValid);
    } else {
      setIsFormValid(false);
    }
  }, [client, phoneNumber, date, products]);

  const getServices = async () => {
    api.get("/product").then((result) => {
      const formattedServices = result.data.map((item) => ({
        label: item.label,
        value: item._id,
      }));
      setServices(formattedServices);
    });
  };
  useEffect(() => {
    getServices();
  }, []);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const result = await api.get(`/invoice/${id}`);
        let data = result.data;
        setClient(data.client);
        setPhoneNumber(data.client.phone_number);
        setPlates(data.client.plates);
        setDate(data.due.slice(0, 10));
        setProducts(data.items);
        setPaidAmount(data.paid);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      } finally {
      }
    };

    if (id) {
      fetchInvoice();
    }
  }, [router.query]);

  const addRow = () => {
    const newProduct = {
      id: products.length,
      product: "",
      quantity: 1,
      price: 0,
    };

    setProducts([...products, newProduct]);
    console.log(products);
  };

  const removeRow = () => {
    setProducts(products.slice(0, -1));
  };

  const handleProductChange = (item, index) => {
    const updatedProducts = products.map((product, i) => {
      if (i === index) {
        return { ...product, product: item };
      }
      return product;
    });
    setProducts(updatedProducts);

    if (item?.__isNew__) {
      const newOption = { label: item.label, value: item.value };
      setServices([...services, newOption]);
    }
  };

  const handleInputChange = (e, index, field) => {
    const updatedProducts = products.map((product, i) => {
      if (i === index) {
        return { ...product, [field]: e.target.value };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const handleSelect = (values) => {
    setPhoneNumber(values.phone_number);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      position: "relative",
      minHeight: "36px !important",
      height: "36px !important",
      borderRadius: "0.375rem", // equivalent to rounded-md in Tailwind
      border: "1px solid #D1D5DB",
      paddingTop: "0.375rem", // equivalent to py-1.5 in Tailwind
      paddingBottom: "0.375rem",
      color: "#1F2937", // equivalent to text-gray-900 in Tailwind
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)", // equivalent to shadow-sm in Tailwind
      ringWidth: "1px", // equivalent to ring-1 in Tailwind
      ringInset: "inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)", // equivalent to ring-inset in Tailwind
      ringColor: "#D1D5DB", // equivalent to ring-gray-300 in Tailwind
    }),
    valueContainer: (provided) => ({
      ...provided,
      position: "absolute",
      fontSize: "14px",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    }),
    input: (base) => ({
      ...base,
      input: {
        fontSize: "14px !important",
        borderColor: "transparent !important",
        "&:focus": {
          borderColor: "transparent !important",
          boxShadow: "none !important",
          "--tw-ring-color": "transparent !important",
        },
      },
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      position: "absolute",
      right: 0,
      top: 0,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9CA3AF", // equivalent to text-gray-400 in Tailwind
      fontSize: "14px",
    }),
    menuList: (provided) => ({
      ...provided,
      fontSize: "14px",
    }),
    // Add other custom styles if needed
  };
  const addProductToAPI = async (productData) => {
    try {
      const response = await api.post("/product", {
        label: productData.label,
      });
      console.log("Product added:", response.data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const getClient = async (clientId) => {
    try {
      const response = api.get(`/client/${clientId}`);
      return response;
    } catch (error) {
      console.error("Error getting client:", error);
    }
  };

  const updateClient = (clientId, invoices) => {
    try {
      const response = api.put(`/client/${clientId}`, {
        invoices: invoices,
      });
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  const addClient = async (clientName, phone) => {
    try {
      const response = await api.post("/client", {
        fullname: clientName,
        phone_number: phone,
      });
      return response.data._id;
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  const addInvoice = async (data) => {
    try {
      const response = await api.post("/invoice", data);
      setLoadingInvoice(false);
      router.push("/faturat");
      toast.success(`Fatura u shtua me sukses!`);
      return response.data;
    } catch (error) {
      toast.success(`Ka nje problem ne sistem. Fatura nuk eshte shtuar, provojeni prape me vone!`);
      console.error("Error adding invoice:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let newProducts = products
      .filter((row) => row.product.__isNew__)
      .map((item) => {
        const { __isNew__, ...productWithoutIsNew } = item.product;
        return productWithoutIsNew;
      });
    newProducts.forEach((element) => {
      addProductToAPI(element);
    });

    let clientId = client._id ? client._id : null;
    if (!client._id) {
      clientId = await addClient(client, phoneNumber);
    }

    let clientObject = await getClient(clientId);

    let invoiceData = {
      client: clientId,
      plates: plates,
      items: products,
      due: date,
      paid: paidAmount,
      total: invoiceTotal,
      unpaid: invoiceTotal - paidAmount,
    };

    setLoadingInvoice(true);
    let addedInvoice = await addInvoice(invoiceData);
    clientObject.data.invoices.push(addedInvoice._id);
    let invoices = clientObject.data.invoices;
    updateClient(clientId, invoices);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-6 relative">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-lg font-semibold leading-6 text-gray-900">Shto faturen</h1>
          <p className="mt-2 text-sm text-gray-700">Ploteso fushat poshte dhe krijo nje fature.</p>
        </div>
      </div>
      <div className="my-4">
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="grid md:grid-cols-2 gap-3 border-t border-gray-200 pt-5">
            <div>
              <div className="grid space-y-3">
                <dl className="grid sm:flex gap-x-3 text-sm items-center">
                  <dt className="min-w-[150px] max-w-[200px] text-gray-500 mb-2 sm:mb-0">Fature per:</dt>
                  <dd className="text-gray-800">
                    <Autocomplete
                      required
                      selectedClient={client}
                      setSelectedClient={setClient}
                      onSelect={(event) => handleSelect(event.value)}
                    />
                    {/* <Input value={client.first_name + " " + client.last_name} placeholder={"Bashkim Krasniqi"} /> */}
                  </dd>
                </dl>

                <dl className="grid sm:flex gap-x-3 text-sm items-center">
                  <dt className="min-w-[150px] max-w-[200px] text-gray-500 mb-2 sm:mb-0">Numri i telefonit:</dt>
                  <dd className="text-gray-800">
                    <Input
                      id="phone_number"
                      readonly={client.id ? true : false}
                      onChange={(event) => setPhoneNumber(event.target.value)}
                      value={phoneNumber}
                      placeholder={"Shkruaj numrin e telefonit"}
                    />
                  </dd>
                </dl>
              </div>
            </div>

            <div>
              <div className="grid space-y-3">
                <dl className="grid sm:flex gap-x-3 text-sm items-center">
                  <dt className="min-w-[150px] max-w-[200px] text-gray-500 mb-2 sm:mb-0">Targat:</dt>
                  <dd className="text-gray-800 ">
                    <Input
                      onChange={(event) => setPlates(event.target.value)}
                      value={plates}
                      placeholder={"Shkruaj targat e makines"}
                    />
                  </dd>
                </dl>
                <dl className="grid sm:flex gap-x-3 text-sm items-center">
                  <dt className="min-w-[150px] max-w-[200px] text-gray-500 mb-2 sm:mb-0">Data e pageses:</dt>
                  <Input
                    required
                    onChange={(event) => setDate(event.target.value)}
                    value={date}
                    type="date"
                    placeholder={"10 Jan 2023"}
                  />
                </dl>
              </div>
            </div>
          </div>

          <div className="mt-6 border border-gray-200 p-4 rounded-lg space-y-4 ">
            <div className="hidden sm:grid sm:grid-cols-5">
              <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">Produkti</div>
              <div className="text-start text-xs font-medium text-gray-500 uppercase">Sasia</div>
              <div className="text-start text-xs font-medium text-gray-500 uppercase">Cmimi</div>
              <div className="text-end text-xs font-medium text-gray-500 uppercase">Totali</div>
            </div>

            <div className="hidden sm:block border-b border-gray-200 "></div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              <div className="col-span-full sm:col-span-2">
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase mb-2 sm:mb-0">Produkti</h5>
                <CreatableSelect
                  required
                  placeholder="Selekto apo krijo nje opsion"
                  isClearable
                  onChange={(item) => handleProductChange(item, 0)}
                  value={products[0].product}
                  options={services}
                  styles={customStyles}
                  formatCreateLabel={(inputValue) => `Krijo opsionin "${inputValue}"`}
                />
                {/* data={services} selected={selectedService} setSelected={setSelectedService} /> */}
              </div>
              <div>
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase mb-2 sm:mb-0">Sasia</h5>
                <Input
                  required
                  onChange={(event) => handleInputChange(event, 0, "quantity")}
                  value={products[0].quantity}
                  placeholder={1}
                />
              </div>
              <div>
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase mb-2 sm:mb-0">Cmimi</h5>
                <Input
                  required
                  onChange={(event) => handleInputChange(event, 0, "price")}
                  value={products[0].price}
                  type="currency"
                  placeholder={0}
                />
              </div>
              <div className="justify-end items-center flex">
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase mr-2">Totali</h5>
                <p className="sm:text-end text-gray-800 ">€{products[0].price * products[0].quantity}</p>
              </div>
            </div>
            <div className="sm:hidden border-b border-gray-200 "></div>
            {products.slice(1).map((row, index) => (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  <div className="col-span-full sm:col-span-2">
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase mb-2 sm:mb-0">Produkti</h5>
                    <CreatableSelect
                      required
                      placeholder="Selekto apo krijo nje opsion"
                      isClearable
                      onChange={(item) => handleProductChange(item, index + 1)}
                      value={products[index + 1].product}
                      options={services}
                      styles={customStyles}
                      formatCreateLabel={(inputValue) => `Krijo opsionin "${inputValue}"`}
                    />
                  </div>
                  <div>
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase mb-2 sm:mb-0">Sasia</h5>
                    <Input
                      required
                      value={products[index + 1].quantity}
                      onChange={(event) => handleInputChange(event, index + 1, "quantity")}
                      placeholder={1}
                    />
                  </div>
                  <div>
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase mb-2 sm:mb-0">Cmimi</h5>
                    <Input
                      required
                      value={products[index + 1].price}
                      onChange={(event) => handleInputChange(event, index + 1, "price")}
                      type="currency"
                      placeholder={0}
                    />
                  </div>
                  <div className="justify-end items-center flex">
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase mr-2">Totali</h5>
                    <p className="sm:text-end text-gray-800 ">
                      €{products[index + 1].quantity * products[index + 1].price}
                    </p>
                  </div>
                </div>

                <div className="sm:hidden border-b border-gray-200 "></div>
              </>
            ))}
            <div className={`flex items-center ${products.length >= 2 ? "sm:max-w-[320px]" : "sm:max-w-fit"} `}>
              <Button className="mr-2" onClick={() => addRow()} label="Shto nje produkt" />
              {products.length >= 2 && <Button secondary onClick={() => removeRow()} label="Largo nje produkt" />}
            </div>
          </div>

          <div className="mt-8 flex sm:justify-end">
            <div className="w-full max-w-2xl sm:text-end space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 sm:gap-2">
                <dl className="grid sm:grid-cols-5 gap-x-3 text-sm text-center sm:text-right grid-cols-1">
                  <dt className="col-span-3 text-gray-500 mb-2 sm:mb-0">Totali:</dt>
                  <dd className="col-span-3 sm:col-span-2 font-medium text-gray-800 ">€{invoiceTotal}</dd>
                </dl>
                <dl className="grid sm:grid-cols-5 gap-x-3 text-sm text-center sm:text-right grid-cols-1 items-center">
                  <dt className="col-span-3 text-gray-500 mb-2 sm:mb-0">E paguar:</dt>
                  <dd className="col-span-3 sm:col-span-2">
                    <Input
                      onChange={(event) => setPaidAmount(event.target.value)}
                      value={paidAmount}
                      type="currency"
                      inline
                      className="sm:text-right text-center"
                      placeholder="2500"
                    />
                  </dd>
                </dl>

                <dl className="grid sm:grid-cols-5 gap-x-3 text-sm text-center sm:text-right grid-cols-1">
                  <dt className="col-span-3 text-gray-500 mb-2 sm:mb-0">Borxhi:</dt>
                  <dd className="col-span-3 sm:col-span-2 font-medium text-gray-800 ">€{invoiceTotal - paidAmount}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className=" mt-16 flex justify-center">
            <div className="sm:w-[300px] w-full">
              <Button disabled={!isFormValid} loading={loadingInvoice} type={"submit"} success label="Ruaj Faturen" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withAuth(index);
