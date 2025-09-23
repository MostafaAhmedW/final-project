import amazon from '@images/Amazon_Pay_logo.png';
import mastercard from '@images/MasterCard-Logo.png';
import paypal from '@images/PayPal.png';
import dawnload from '@images/download.png';
import android from '@images/download_android.png';
import Image from 'next/image';

export default function Footer() {
  return (

 <div>
  <main >

    <div className="bg-gray-100 dark:bg-black mt-6 py-8 mb-0">
  <div className="container mx-auto text-center md:text-left">
    <h1 className="text-2xl md:text-4xl font-bold text-green-600">Get the FreshCart app</h1>
    <p className="text-gray-600 dark:text-gray-200 text-base md:text-xl mt-2.5">
      We will send you a link, open it on your phone to download the app
    </p>
  </div>


  <div className="container mx-auto mt-6">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="md:col-span-9">
        <input
          type="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="your email"
        />
      </div>

      <div className="md:col-span-3 flex md:block justify-center">
        <button
          type="button"
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 
                     hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 
                     dark:focus:ring-green-800 font-medium rounded-lg px-6 py-2 mt-3 md:mt-0 
                     w-fit text-md whitespace-nowrap"
        >
          Share App Link
        </button>
      </div>
    </div>
  </div>


  <div className="container mx-auto">
    <hr className="border border-gray-300 my-8" />
  </div>


  <div className="container mx-auto py-5">
    <div className="flex flex-col md:flex-row justify-between items-center gap-6">

      <div className="flex flex-col md:flex-row items-center gap-4">
        <p className="font-medium text-lg text-gray-500">Payment Partners</p>
        <div className="flex items-center gap-3">
          <Image src={amazon} alt="amazon" width={60} height={40} />
          <Image src={mastercard} alt="mastercard" width={60} height={40} />
          <Image src={paypal} alt="paypal" width={60} height={40} />
        </div>
      </div>


      <div className="flex flex-col md:flex-row items-center gap-4">
        <p className="font-medium text-lg text-gray-500">Get deliveries with FreshCart</p>
        <div className="flex items-center gap-3">
          <Image src={dawnload} alt="download" width={120} height={50} />
          <Image src={android} alt="android" width={120} height={40} />
        </div>
      </div>
    </div>
  </div>

  <div className="container mx-auto">
    <hr className="border border-gray-300 mt-6" />
  </div>
</div>

  </main>

</div>

  )
}
