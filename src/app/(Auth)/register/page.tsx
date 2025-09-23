import RegisterForm from './RegisterForm';
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["900"], 
});

export default function Register() {

  return (

    <div className=" bg-gray-50 mx-auto mt-16">
    
      <h1 className={`${playfair.className} font-bold text-5xl text-green-600 mt-2 ps-4`}>Became a fresh-cart user</h1>

      <RegisterForm/>


      </div>


  )
}
