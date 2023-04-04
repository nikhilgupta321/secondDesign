import React, { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"

export default function Flash(props) {
  const { flash, closeFlash } = useContext(GlobalContext);

  return (
    flash.msg &&
    <div className="z-20 absolute top-0 left-0 h-screen bg-opacity-50 w-full flex bg-black justify-center">
      <div className="min-w-80 z-30 p-3 h-fit mt-32 rounded-lg shadow-lg bg-white">
        <div className="p-5 h-fit">
          <div>
            {flash.success && <div className="text-green-700">{flash.msg}</div>}
            {flash.error && <div className="text-red-700">{flash.msg}</div>}
            {flash.normal && flash.msg}
          </div>
        </div>
        <div className="flex mt-6 justify-end"><div onClick={closeFlash} className="border rounded px-4 cursor-pointer text-white p-1 bg-sky-600">Close</div></div>
      </div>
    </div>
  )
}