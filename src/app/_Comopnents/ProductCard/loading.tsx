
import { ClipLoader } from 'react-spinners'

export default function Loader() {
  return (
       <div className="flex justify-center items-center ">
      <ClipLoader color="green" size={80} />
    </div>
  )
}
