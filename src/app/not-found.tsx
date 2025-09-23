import Image from "next/image";
import error from "@images/errorrrrr.svg";

export default function Notfound() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Image src={error} alt="error" />
    </div>
  );
}