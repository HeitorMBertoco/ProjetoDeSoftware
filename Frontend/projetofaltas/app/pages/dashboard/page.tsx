"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/Components/ui/Button';
import ImagemSenai from '@/assets/SENAI-SP.jpg'
import Image from 'next/image';

interface Usuario {
  nome: string;
  email: string;
}

export default function HomeDashboard() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const dadosGravados = localStorage.getItem('usuario_logado');

    if (!dadosGravados) {
      router.push('/');
      return;
    }

    setUsuario(JSON.parse(dadosGravados));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('usuario_logado');
    router.push('/');
  };

  if (!usuario) {
    return null;
  }

  return (
    <>
      <main className='root flex flex-row'>
        <div className='bg-white rounded-2xl w-[90vw] h-[90vh] flex flex-row items-center pr-3'>
          <section className='sidebar flex flex-col w-[15vw] rounded-2xl items-center shadow-black  h-[90vh] p-7 z-1'>
            <Image src={ImagemSenai} alt="Senai" width={100} height={37.5} />

            <Button variant='danger' className='mb-3 mt-3 text-center w-[11vw] h-[7vh]'>Reg. Entradas</Button>

            <Button variant='ghost' className='mb-3 text-center border w-[11vw]  h-[7vh]'>Lista De Alunos</Button>



          </section>
          <section className='flex flex-col bg-white w-[75vw] h-[90vh] z-0 rounded-2xl'>
            <div className='flex flex-row'>
              <div className="search "></div>
              <div className="inbox"></div>
              <div className="profile">
                <div className="avatar"></div>
              </div>
            </div>
            <div className='flex flex-col'>
              <div></div>
              <div></div>
            </div>

          </section>
        </div>

      </main>
    </>
  );
}
