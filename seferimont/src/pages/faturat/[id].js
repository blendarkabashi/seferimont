import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDateString } from "src/global/functions";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const index = () => {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState({});
  const printInvoice = () => {
    const invoiceContent = document.getElementById("hiddenInvoice").innerHTML;
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write("<html><head><title>Print Invoice</title>");
    // Include styles or links to stylesheets if necessary
    printWindow.document.write("</head><body >");
    printWindow.document.write(invoiceContent);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };
  const downloadPdfDocument = () => {
    const input = document.getElementById("hiddenInvoice");

    const canvasOptions = {
      useCORS: true,
      scale: 1.5,
      width: input.offsetWidth,
      windowWidth: input.scrollWidth,
      windowWidth: input.scrollWidth,
    };

    html2canvas(input, canvasOptions)
      .then((canvas) => {
        // Create the PDF with the width set to fit the content
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [canvas.width, canvas.height], // Set the PDF format to match the canvas size
        });

        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save("invoice.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF", error);
      });
  };

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
                class=" cursor-pointer py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
                onClick={downloadPdfDocument}
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
                class=" cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                onClick={printInvoice}
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
                {invoice.plates && (
                  <dl class="grid sm:flex gap-x-3 text-sm">
                    <dt class="min-w-[150px] max-w-[200px] text-gray-500">Targat:</dt>
                    <dd class="text-gray-800 ">
                      <span class="block font-semibold">{invoice.plates}</span>
                    </dd>
                  </dl>
                )}
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

          <div class="mt-8 flex sm:justify-end">
            <div class="w-full max-w-2xl sm:text-end space-y-2">
              <div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                <dl class="grid sm:grid-cols-5 gap-x-3 text-sm">
                  <dt class="col-span-3 text-gray-500">Totali:</dt>
                  <dd class="col-span-2 font-medium text-gray-800 ">€{invoice.invoice_total}</dd>
                </dl>

                <dl class="grid sm:grid-cols-5 gap-x-3 text-sm">
                  <dt class="col-span-3 text-gray-500">E paguar:</dt>
                  <dd class="col-span-2 font-medium text-gray-800 ">€{invoice.invoice_paid}</dd>
                </dl>

                <dl class="grid sm:grid-cols-5 gap-x-3 text-sm">
                  <dt class="col-span-3 text-gray-500">Borxhi:</dt>
                  <dd class="col-span-2 font-medium text-gray-800 ">€{invoice.invoice_unpaid}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      )}

      <div id="hiddenInvoice" className="absolute left-[-9999px]">
        <div class="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl">
          <div class="flex justify-between">
            <div>
              <svg
                class="w-10 h-10"
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 26V13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13C25 19.6274 19.6274 25 13 25H12"
                  class="stroke-blue-600 "
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  d="M5 26V13.16C5 8.65336 8.58172 5 13 5C17.4183 5 21 8.65336 21 13.16C21 17.6666 17.4183 21.32 13 21.32H12"
                  class="stroke-blue-600 "
                  stroke="currentColor"
                  stroke-width="2"
                />
                <circle cx="13" cy="13.0214" r="5" fill="currentColor" class="fill-blue-600 " />
              </svg>

              <h1 class="mt-2 text-lg md:text-xl font-semibold text-blue-600 ">Preline Inc.</h1>
            </div>

            <div class="text-end">
              <h2 class="text-2xl md:text-3xl font-semibold text-gray-800 ">Invoice #</h2>
              <span class="mt-1 block text-gray-500">3682303</span>

              <address class="mt-4 not-italic text-gray-800 ">
                45 Roker Terrace
                <br />
                Latheronwheel
                <br />
                KW5 8NW, London
                <br />
                United Kingdom
                <br />
              </address>
            </div>
          </div>

          <div class="mt-8 grid sm:grid-cols-2 gap-3">
            <div>
              <h3 class="text-lg font-semibold text-gray-800 ">Bill to:</h3>
              <h3 class="text-lg font-semibold text-gray-800 ">Sara Williams</h3>
              <address class="mt-2 not-italic text-gray-500">
                280 Suzanne Throughway,
                <br />
                Breannabury, OR 45801,
                <br />
                United States
                <br />
              </address>
            </div>

            <div class="sm:text-end space-y-2">
              <div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                <dl class="grid sm:grid-cols-5 gap-x-3">
                  <dt class="col-span-3 font-semibold text-gray-800 ">Invoice date:</dt>
                  <dd class="col-span-2 text-gray-500">03/10/2018</dd>
                </dl>
                <dl class="grid sm:grid-cols-5 gap-x-3">
                  <dt class="col-span-3 font-semibold text-gray-800 ">Due date:</dt>
                  <dd class="col-span-2 text-gray-500">03/11/2018</dd>
                </dl>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <div class="border border-gray-200 p-4 rounded-lg space-y-4 ">
              <div class="hidden sm:grid sm:grid-cols-5">
                <div class="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">Item</div>
                <div class="text-start text-xs font-medium text-gray-500 uppercase">Qty</div>
                <div class="text-start text-xs font-medium text-gray-500 uppercase">Rate</div>
                <div class="text-end text-xs font-medium text-gray-500 uppercase">Amount</div>
              </div>

              <div class="hidden sm:block border-b border-gray-200 "></div>

              <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
                <div class="col-span-full sm:col-span-2">
                  <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Item</h5>
                  <p class="font-medium text-gray-800 ">Design UX and UI</p>
                </div>
                <div>
                  <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Qty</h5>
                  <p class="text-gray-800 ">1</p>
                </div>
                <div>
                  <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Rate</h5>
                  <p class="text-gray-800 ">5</p>
                </div>
                <div>
                  <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Amount</h5>
                  <p class="sm:text-end text-gray-800 ">$500</p>
                </div>
              </div>

              <div class="sm:hidden border-b border-gray-200 "></div>

              <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
                <div class="col-span-full sm:col-span-2">
                  <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Item</h5>
                  <p class="font-medium text-gray-800 ">Web project</p>
                </div>
                <div>
                  <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Qty</h5>
                  <p class="text-gray-800 ">1</p>
                </div>
                <div>
                  <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Rate</h5>
                  <p class="text-gray-800 ">24</p>
                </div>
                <div>
                  <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Amount</h5>
                  <p class="sm:text-end text-gray-800 ">$1250</p>
                </div>
              </div>

              <div class="sm:hidden border-b border-gray-200 "></div>

              <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
                <div class="col-span-full sm:col-span-2">
                  <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Item</h5>
                  <p class="font-medium text-gray-800 ">SEO</p>
                </div>
                <div>
                  <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Qty</h5>
                  <p class="text-gray-800 ">1</p>
                </div>
                <div>
                  <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Rate</h5>
                  <p class="text-gray-800 ">6</p>
                </div>
                <div>
                  <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Amount</h5>
                  <p class="sm:text-end text-gray-800 ">$2000</p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 flex sm:justify-end">
            <div class="w-full max-w-2xl sm:text-end space-y-2">
              <div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                <dl class="grid sm:grid-cols-5 gap-x-3">
                  <dt class="col-span-3 font-semibold text-gray-800 ">Subtotal:</dt>
                  <dd class="col-span-2 text-gray-500">$2750.00</dd>
                </dl>

                <dl class="grid sm:grid-cols-5 gap-x-3">
                  <dt class="col-span-3 font-semibold text-gray-800 ">Total:</dt>
                  <dd class="col-span-2 text-gray-500">$2750.00</dd>
                </dl>

                <dl class="grid sm:grid-cols-5 gap-x-3">
                  <dt class="col-span-3 font-semibold text-gray-800 ">Tax:</dt>
                  <dd class="col-span-2 text-gray-500">$39.00</dd>
                </dl>

                <dl class="grid sm:grid-cols-5 gap-x-3">
                  <dt class="col-span-3 font-semibold text-gray-800 ">Amount paid:</dt>
                  <dd class="col-span-2 text-gray-500">$2789.00</dd>
                </dl>

                <dl class="grid sm:grid-cols-5 gap-x-3">
                  <dt class="col-span-3 font-semibold text-gray-800 ">Due balance:</dt>
                  <dd class="col-span-2 text-gray-500">$0.00</dd>
                </dl>
              </div>
            </div>
          </div>

          <div class="mt-8 sm:mt-12">
            <h4 class="text-lg font-semibold text-gray-800 ">Thank you!</h4>
            <p class="text-gray-500">
              If you have any questions concerning this invoice, use the following contact information:
            </p>
            <div class="mt-2">
              <p class="block text-sm font-medium text-gray-800 ">example@site.com</p>
              <p class="block text-sm font-medium text-gray-800 ">+1 (062) 109-9222</p>
            </div>
          </div>

          <p class="mt-5 text-sm text-gray-500">© 2022 Preline.</p>
        </div>
      </div>
    </>
  );
};

export default index;
