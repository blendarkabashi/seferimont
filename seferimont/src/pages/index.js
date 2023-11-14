import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
 import axios from 'axios';
 import { useDispatch } from 'react-redux';
import { setUser } from 'src/store/global';

export default function Home() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [identifier, setIdentifier] = useState()
  const [password, setPassword] = useState()
  const handleSubmit = async(e) => {
    e.preventDefault()
     try {
       const response = await axios.post('http://localhost:1337/api/auth/local', {
         identifier: identifier,
         password: password,
       });
       dispatch(setUser(response.data.user))
       localStorage.setItem('user', response.data.user)
       router.push('/kryefaqja')
     } catch (error) {
       console.log(error);
     }
  }
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Kycu ne llogarine tuaj</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email adresa ose username</label>
            <div className="mt-2">
              <input onInput={(event)=> setIdentifier(event.target.value)} id="email" name="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Fjalekalimi</label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Keni harruar fjalekalimin?</a>
              </div>
            </div>
            <div className="mt-2">
              <input onInput={(event)=> setPassword(event.target.value)} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <button onClick={handleSubmit} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Kycu</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Nuk keni llogari?
          {' '}<a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Regjistrohu</a>
        </p>
      </div>
    </div>
  );
}
