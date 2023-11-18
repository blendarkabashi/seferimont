import { RadioGroup } from "@headlessui/react";
import Dropdown from "src/components/Dropdown";
import Input from "src/components/Input";
import { useEffect, useState } from "react";
import Button from "src/components/Button";
import CreatableSelect from "react-select/creatable";
import Autocomplete from "src/components/Autocomplete";
import { useMemo } from "react";
import axios from "axios";

// import { colourOptions } from '../data';

// export default () => <CreatableSelect isClearable options={colourOptions} />;
const index = () => {
  const [client, setClient] = useState(null);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [plates, setPlates] = useState("");
  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today
    .getDate()
    .toString()
    .padStart(2, "0")}`;
  const [date, setDate] = useState(formattedToday);
  const [products, setProducts] = useState([{ id: 0, product: null, quantity: 1, price: null }]);

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

  useEffect(() => {
    setPaidAmount(invoiceTotal);
  }, [invoiceTotal]);

  const getServices = async () => {
    axios.get("http://localhost:1337/api/products").then((result) => {
      const formattedServices = result.data.data.map((item) => ({
        label: item.attributes.label,
        value: item.id,
      }));
      setServices(formattedServices);
    });
  };
  useEffect(() => {
    getServices();
  }, []);

  const addRow = () => {
    const newProduct = {
      id: products.length,
      product: null,
      quantity: 1,
      price: 0,
      total: 0,
    };
    console.log(newProduct);

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
    setPhoneNumber(values.attributes.phone_number);
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
      const response = await axios.post("http://localhost:1337/api/products", {
        data: productData,
      });
      console.log("Product added:", response.data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //add products to api
    console.log(products);
    let newProducts = products
      .filter((row) => row.product.__isNew__)
      .map((item) => {
        const { __isNew__, ...productWithoutIsNew } = item.product;
        return productWithoutIsNew;
      });
    console.log(newProducts);
    newProducts.forEach((element) => {
      addProductToAPI(element);
    });
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
                      onChange={(event) => setPhoneNumber(event.target.value)}
                      value={phoneNumber}
                      placeholder={"+383 49 488 752"}
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
                      placeholder={"03-773-DI"}
                    />
                  </dd>
                </dl>
                <dl className="grid sm:flex gap-x-3 text-sm items-center">
                  <dt className="min-w-[150px] max-w-[200px] text-gray-500 mb-2 sm:mb-0">Data e fundit per pagese:</dt>
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
              <Button type={"submit"} success label="Ruaj Faturen" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default index;
