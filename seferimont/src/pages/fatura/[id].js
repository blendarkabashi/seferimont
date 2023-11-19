import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDateString } from "src/global/functions";
const index = () => {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState({});

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const result = await axios.get(`http://localhost:1337/api/invoices/${id}?populate=*`);
        setInvoice(result.data.data.attributes);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchInvoice();
    }
  }, [router.query]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div class="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
          <div class="mb-5 pb-5 flex justify-between items-center border-b border-gray-200 ">
            <div>
              <h2 class="text-2xl font-semibold text-gray-800 ">Fatura #{id}</h2>
            </div>

            <div class="inline-flex gap-x-2">
              <a
                class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
                href="#"
              >
                <svg
                  class="flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Shkarko PDF
              </a>
              <a
                class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                href="#"
              >
                <svg
                  class="flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect width="12" height="8" x="6" y="14" />
                </svg>
                Printo
              </a>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-3">
            <div>
              <div class="grid space-y-3">
                <dl class="grid sm:flex gap-x-3 text-sm">
                  <dt class="min-w-[150px] max-w-[200px] text-gray-500">Fature per:</dt>
                  <dd class="text-gray-800 ">
                    <span class="block font-semibold">{invoice.client.data.attributes.fullname}</span>
                  </dd>
                </dl>

                <dl class="grid sm:flex gap-x-3 text-sm">
                  <dt class="min-w-[150px] max-w-[200px] text-gray-500">Numri i telefonit:</dt>
                  <dd class="text-gray-800 ">
                    <span class="block font-semibold">{invoice.client.data.attributes.phone_number}</span>
                  </dd>
                </dl>
                <dl class="grid sm:flex gap-x-3 text-sm">
                  <dt class="min-w-[150px] max-w-[200px] text-gray-500">Targat:</dt>
                  <dd class="text-gray-800 ">
                    <span class="block font-semibold">{invoice.plates}</span>
                  </dd>
                </dl>
              </div>
            </div>

            <div>
              <div class="grid space-y-3">
                <dl class="grid sm:flex gap-x-3 text-sm">
                  <dt class="min-w-[150px] max-w-[200px] text-gray-500">Numri i fatures:</dt>
                  <dd class="font-medium text-gray-800 ">{id}</dd>
                </dl>

                <dl class="grid sm:flex gap-x-3 text-sm">
                  <dt class="min-w-[150px] max-w-[200px] text-gray-500">Data e pageses:</dt>
                  <dd class="font-medium text-gray-800 ">{formatDateString(invoice.invoice_due)}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div class="mt-6 border border-gray-200 p-4 rounded-lg space-y-4 ">
            <div class="hidden sm:grid sm:grid-cols-5">
              <div class="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">Produkti</div>
              <div class="text-start text-xs font-medium text-gray-500 uppercase">Sasia</div>
              <div class="text-start text-xs font-medium text-gray-500 uppercase">Cmimi</div>
              <div class="text-end text-xs font-medium text-gray-500 uppercase">Totali</div>
            </div>

            <div class="hidden sm:block border-b border-gray-200 "></div>

            {invoice.invoice_items.map((item) => (
              <>
                <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  <div class="col-span-full sm:col-span-2">
                    <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Produkti</h5>
                    <p class="font-medium text-gray-800 ">{item.product.label}</p>
                  </div>
                  <div>
                    <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Sasia</h5>
                    <p class="text-gray-800 ">{item.quantity}</p>
                  </div>
                  <div>
                    <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Cmimi</h5>
                    <p class="text-gray-800 ">${item.price}</p>
                  </div>
                  <div>
                    <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Totali</h5>
                    <p class="sm:text-end text-gray-800 ">${item.price * item.quantity}</p>
                  </div>
                </div>

                {invoice.invoice_items.length != index && <div class="sm:hidden border-b border-gray-200 "></div>}
              </>
            ))}
          </div>

          <div class="mt-8 flex sm:justify-end">
            <div class="w-full max-w-2xl sm:text-end space-y-2">
              <div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                <dl class="grid sm:grid-cols-5 gap-x-3 text-sm">
                  <dt class="col-span-3 text-gray-500">Totali:</dt>
                  <dd class="col-span-2 font-medium text-gray-800 ">$2750.00</dd>
                </dl>

                <dl class="grid sm:grid-cols-5 gap-x-3 text-sm">
                  <dt class="col-span-3 text-gray-500">E paguar:</dt>
                  <dd class="col-span-2 font-medium text-gray-800 ">$2700.00</dd>
                </dl>

                <dl class="grid sm:grid-cols-5 gap-x-3 text-sm">
                  <dt class="col-span-3 text-gray-500">Borxhi:</dt>
                  <dd class="col-span-2 font-medium text-gray-800 ">$50.00</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default index;
