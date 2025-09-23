
import { HashLoader  } from 'react-spinners'

export default function Loader() {
  return (
       <div className="flex justify-center items-center h-screen">
      <HashLoader  color="green" size={50} />
    </div>
  )
}
