import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { classNames } from "src/global/functions";
import { Bars3Icon, BellIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { DocumentDuplicateIcon, UsersIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { setUser } from "src/store/global";

const MainMenu = ({ setSidebarOpen }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userNavigation = [{ name: "Dil nga aplikacioni", href: "#" }];
  const user = useSelector((state) => state.global.user);
  const [name, setName] = useState("");

  useEffect(() => {
    setName(user?.name);
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/");
    dispatch(setUser(null));
  };

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6">
        {/* <form className="relative flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                />
              </form> */}
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button> */}
          <div className="sm:flex hidden justify-end">
            {/* <a
              href="#"
              className="mr-4 flex items-center gap-x-1 rounded-md border bg-[#111827] text-white px-3 py-2 text-sm font-semibold shadow-sm"
            >
              <UsersIcon className="-ml-1.5 h-5 w-5 text-white" aria-hidden="true" />
              Shto Klientin
            </a> */}
            <a
              href="#"
              onClick={() => router.push("/shto-faturen")}
              className="flex items-center gap-x-1 rounded-md border bg-[#111827] text-white px-3 py-2 text-sm font-semibold shadow-sm"
            >
              <DocumentDuplicateIcon className="-ml-1.5 h-5 w-5 text-white" aria-hidden="true" />
              Shto Faturen
            </a>
          </div>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full bg-gray-50"
                src="https://q-reviews.com/wp-content/uploads/2022/08/Profile_avatar_placeholder_large.png"
                alt=""
              />

              <span className="hidden lg:flex lg:items-center">
                <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                  {name}
                </span>
                <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2.5 w-36 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <Menu.Item>
                  <a
                    onClick={() => handleLogout()}
                    className={"cursor-pointer hover:bg-gray-50 block px-3 py-1 text-sm leading-6 text-gray-900"}
                  >
                    Dil nga aplikacioni
                  </a>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
