
import { PropagateLoader  } from 'react-spinners'

export default function Loader() {
  return (
       <div className="flex justify-center items-center h-screen">
      <PropagateLoader  color="green" size={16} />
    </div>
  )
}
