'use client'
import { Button } from '@/components/ui/button'
import React, { useContext } from 'react'
import { removeItemFromWashlist } from './washlist.action'
import { toast } from 'sonner'
import { WashlistContext } from './WashlistContext'

export default function RemoveItemWashlsitBtn({id} : {id:string}) {

    const {updateWashlistCount} = useContext(WashlistContext);

   async function handleRemoveWashlistItem(){
      const outPut = await removeItemFromWashlist(id)

      if(outPut === null){

        toast.error("Error occurred while Remove" , {
          position: "top-right",
          duration: 1500,
          style: {
          color: "red",
          fontWeight: "600",
        },
        });
        

      }
      else{
        
       toast.success("Item Remove Successfully" , {
          position: "top-right",
          duration: 1500,
          style: {
          color: "green",
          fontWeight: "600",
        },
        });
        updateWashlistCount(outPut);

      }
    }

  return (
    <div>
        <Button onClick={handleRemoveWashlistItem} className=" mt-2.5 w-full cursor-pointer" size="sm" variant="destructive">
     Remove
     </Button>
    </div>
  )
}
