"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/Components/ui/Button';
import ImagemSenai from "@/assets/SENAI-SP.jpg";
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
        <div className='bg-[#F1F1F1] rounded-2xl w-[90vw] h-[90vh] flex flex-row items-center pr-3'>
          <section className='sidebar flex flex-col w-[15vw] rounded-2xl items-center bg-white shadow-black  h-[90vh] p-7 z-1'>
            <Image src={ImagemSenai} alt="Senai" width={100} height={37.5} />

            <Button variant='danger' className='mb-3 mt-3 text-center w-[11vw] h-[7vh]'>Reg. Entradas</Button>

            <Button variant='ghost' className='mb-3 text-center border w-[11vw]  h-[7vh]'>Lista De Alunos</Button>



          </section>
          <section className='flex flex-col w-[75vw] h-[90vh] z-0l rounded-2xl'>
            <div className='flex flex-row justify-center items-center h-[10vh]'>
              <div className="search w-[40vw] bg-white shadow-black h-[7vh] mr-[3vw] rounded-4xl"></div>
              <div className="inbox h-[7vmin] w-[10vw] rounded-4xl shadow-black bg-white mr-[3vw]"></div>
              <div className="profile flex flex-col flex-wrap justify-center gap-1.5 w-[10vw] h-[10vh] ">
                <div className="avatar h-[7vmin] w-[7vmin] rounded-4xl shadow-black bg-white"></div>
                <span className="avatartext font-bold text-[1vw] mb-0.5">Jonas Luis Olivera</span>
                <span className="avatartext font-bold text-[0.8vw] mb-0.5 text-zinc-400">gmail.com@algo</span>
              </div>
            </div>
            <div className='flex flex-col'>
              <div> <table></table></div>
              
            </div>

          </section>
        </div>

      </main>
    </>
  );
}
