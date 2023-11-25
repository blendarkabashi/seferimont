import React from "react";
import { formatDateString } from "src/global/functions";

const PrintableInvoice = ({ invoice }) => {
  return (
    <div id="hiddenInvoice" className="absolute left-[-1999px]">
      <div class="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl w-full">
        <div class="flex justify-between">
          <div>
            <h1 class="mt-2 text-lg md:text-xl font-semibold text-blue-600 ">Seferimont</h1>
          </div>

          <div class="text-end">
            <h2 class="text-2xl md:text-3xl font-semibold text-gray-800 ">Fatura #</h2>
            <span class="mt-1 block text-gray-500">{invoice.id}</span>

            <address class="mt-4 not-italic text-gray-800 ">
              Rruga UCK, Nr 55
              <br />
              Peje, Kosove, 30000
            </address>
          </div>
        </div>

        <div class="mt-8 grid sm:grid-cols-2 gap-3">
          <div>
            <h3 class="text-lg font-semibold text-gray-800 ">Emri i klientit:</h3>
            <h3 class="text-lg font-semibold text-gray-800 ">{invoice.client.data.attributes.fullname}</h3>
          </div>

          <div class="sm:text-end space-y-2">
            <div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
              <dl class="grid sm:grid-cols-5 gap-x-3">
                <dt class="col-span-3 font-semibold text-gray-800 ">Data e fundit per pagese:</dt>
                <dd class="col-span-2 text-gray-500">{formatDateString(invoice.invoice_due)}</dd>
              </dl>
              <dl class="grid sm:grid-cols-5 gap-x-3">
                <dt class="col-span-3 font-semibold text-gray-800 ">Numri i telefonit:</dt>
                <dd class="col-span-2 text-gray-500">{invoice.client.data.attributes.phone_number}</dd>
              </dl>
              {invoice.plates && (
                <dl class="grid sm:grid-cols-5 gap-x-3">
                  <dt class="col-span-3 font-semibold text-gray-800 ">Tabelat e vetures:</dt>
                  <dd class="col-span-2 text-gray-500">{invoice.plates ? invoice.plates : "-"}</dd>
                </dl>
              )}
            </div>
          </div>
        </div>

        <div class="mt-6">
          <div class="border border-gray-200 p-4 rounded-lg space-y-4 ">
            <div class="hidden sm:grid sm:grid-cols-5">
              <div class="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">Produkti</div>
              <div class="text-start text-xs font-medium text-gray-500 uppercase">Sasia</div>
              <div class="text-start text-xs font-medium text-gray-500 uppercase">Cmimi</div>
              <div class="text-end text-xs font-medium text-gray-500 uppercase">Totali</div>
            </div>

            <div class="hidden sm:block border-b border-gray-200 "></div>

            {invoice.invoice_items.map((item, index) => (
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
                    <p class="text-gray-800 ">€{parseFloat(item.price)}</p>
                  </div>
                  <div>
                    <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Totali</h5>
                    <p class="sm:text-end text-gray-800 ">€{item.price * item.quantity}</p>
                  </div>
                </div>

                {invoice.invoice_items.length != index && <div class="sm:hidden border-b border-gray-200 "></div>}
              </>
            ))}
          </div>
        </div>

        <div class="mt-8 flex sm:justify-end">
          <div class="w-full max-w-2xl sm:text-end space-y-2">
            <div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
              <dl class="grid sm:grid-cols-5 gap-x-3">
                <dt class="col-span-3 font-semibold text-gray-800 ">Totali:</dt>
                <dd class="col-span-2 text-gray-500">€{invoice.invoice_total}</dd>
              </dl>

              <dl class="grid sm:grid-cols-5 gap-x-3">
                <dt class="col-span-3 font-semibold text-gray-800 ">E paguar:</dt>
                <dd class="col-span-2 text-gray-500">€{invoice.invoice_paid}</dd>
              </dl>

              <dl class="grid sm:grid-cols-5 gap-x-3">
                <dt class="col-span-3 font-semibold text-gray-800 ">Borxhi:</dt>
                <dd class="col-span-2 text-gray-500">€{invoice.invoice_unpaid}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div class="mt-8 sm:mt-72">
          <h4 class="text-lg font-semibold text-gray-800 ">Faleminderit!</h4>
          <p class="text-gray-500">Nese keni ndonje pyetje rreth kesaj fature na kontaktoni ne numrin me poshte:</p>
          <div class="mt-2">
            <p class="block text-sm font-medium text-gray-800 ">+383-44-250-280</p>
          </div>
        </div>

        <p class="mt-5 text-sm text-gray-500">© {new Date().getFullYear()} Seferimont</p>
      </div>
    </div>
  );
};

export default PrintableInvoice;
