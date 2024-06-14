import { BackButton } from '@/Components/Buttons'
import React from 'react'
import { MdLockPerson } from "react-icons/md"

type Props = {}

const Unauthorized = (props: Props) => {
  return (
    <main className="h-screen flex flex-col items-center justify-center bg-megb-blue-primary">
        <div className="w-5/12 bg-gray-50 border-2 border-white rounded-md shadow-md">
        <div className="py-10 flex items-center">
            <div className="text-megb-red-primary drop-shadow-sm">
            <MdLockPerson size={200} />
            </div>
            <div className="px-8">
                <h1 className="text-4xl text-center mb-4 uppercase font-bold text-megb-blue-primary">Desculpe!</h1>
                <p className="text-xl text-center text-megb-blue-terciary">Você não têm autorização para acessar esta página. Porfavor cheque suas credenciais de acesso ou entre em contato com o administrador!</p>
            </div>
        </div>
        <div className='flex items-center justify-end pr-4 pb-4'>
        <BackButton label='Home' url={route('dashboard')} />
        </div>
        </div>
    </main>
  )
}

export default Unauthorized