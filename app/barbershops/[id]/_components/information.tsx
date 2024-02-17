"use client";
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Barbershop, Service } from "@prisma/client";
import { Phone } from "lucide-react";
import Image from "next/image";

interface InformationProps {
  service: Service;
  barbershop: Barbershop;
}

const Information = ({ service, barbershop }: InformationProps) => {
  return (
    <Card className="  hidden lg:flex">
      <div className="border-b border-solid border-secondary">
        <div className="px-5">
          <div className="relative h-[180px] w-full mt-6">
            <Image src="/barbershop-map.png" fill alt={service.name} />

            <div className="w-full absolute bottom-4 left-0 px-5">
              <Card>
                <CardContent className="p-3 flex gap-2">
                  <Avatar>
                    <AvatarImage src={service.imageUrl} />
                  </Avatar>

                  <div>
                    <h2 className="font-bold">{service.name}</h2>
                    <h3 className="text-xs text-gray-400 overflow-hidden text-nowrap text-ellipsis">
                      {barbershop.address}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <h1 className="font-bold mb-2 mt-2">SOBRE NÓS</h1>
          <h3 className="text-xs text-gray-400 mb-5">
            Bem-vindo à Vintage Barber, onde tradição encontra estilo. Nossa
            equipe de mestres barbeiros transforma cortes de cabelo e barbas em
            obras de arte. Em um ambiente acolhedor, promovemos confiança,
            estilo e uma comunidade unida.
          </h3>
        </div>

        <div className="border-t border-solid border-secondary px-5 p-5 gap-5 flex justify-between">
          <div className="text-xs lg:text-base  gap-5 flex items-center justify-start">
            <Phone size={20} /> (11) 99999-0000{/* {barbershop.phoneNumber} */}
          </div>
          <Button variant="secondary" className="flex justify-end">
            {" "}
            Copiar{" "}
          </Button>
        </div>

        <div className="border-t border-solid border-secondary px-5 p-5">
          <p className="text-xs justify-between flex mb-2">
            <strong className="text-xs text-gray-400">Segunda</strong> Fechado
          </p>
          <p className="text-xs justify-between flex mb-2">
            <strong className="text-xs text-gray-400">Terça-Feira</strong> 09:00
            - 21:00
          </p>
          <p className="text-xs justify-between flex mb-2">
            <strong className="text-xs text-gray-400">Quarta-Feira</strong>{" "}
            09:00 - 21:00
          </p>
          <p className="text-xs justify-between flex mb-2">
            <strong className="text-xs text-gray-400">Quinta-Feira</strong>{" "}
            09:00 - 21:00
          </p>
          <p className="text-xs justify-between flex mb-2">
            <strong className="text-xs text-gray-400">Sexta-Feira</strong> 09:00
            - 21:00
          </p>
          <p className="text-xs justify-between flex mb-2">
            <strong className="text-xs text-gray-400">Sábado</strong> 08:00 -
            17:00
          </p>
          <p className="text-xs justify-between flex mb-2">
            <strong className="text-xs text-gray-400">Domingo</strong> Fechado
          </p>
        </div>

        <div className="border-t border-solid border-secondary flex justify-between p-5">
        <p className="text-sm mb-2 mt-2">Em parceria com</p>
        <Image src="/logo.png" alt="FSW Barber" height={22} width={130} />
        </div>
      </div>
    </Card>
  );
};

export default Information;
