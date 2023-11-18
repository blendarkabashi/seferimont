import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "src/store/global";
import Button from "src/components/Button";
import toast from "react-hot-toast";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [identifier, setIdentifier] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:1337/api/auth/local", {
        identifier: identifier,
        password: password,
      });
      setLoading(false);
      dispatch(setUser(response.data.user));

      let { user, jwt } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", jwt);

      // axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      console.log(axios.defaults.headers);
      toast.success("Jeni kycur me sukses!");
      router.push("/kryefaqja");
    } catch (error) {
      console.log(error);
      toast.error("error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Kycu ne llogarine tuaj
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email adresa ose username
            </label>
            <div className="mt-2">
              <input
                onInput={(event) => setIdentifier(event.target.value)}
                id="email"
                name="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Fjalekalimi
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Keni harruar fjalekalimin?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                onInput={(event) => setPassword(event.target.value)}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <Button onClick={handleSubmit} loading={loading} label="Kycu" />
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Nuk keni llogari?{" "}
          <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Regjistrohu
          </a>
        </p>
      </div>
    </div>
  );
}
