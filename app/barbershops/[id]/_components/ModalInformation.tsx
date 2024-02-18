import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/_components/ui/dialog";

import { Phone } from "lucide-react";
import { useState } from "react";

const ModalInformation = () => {
  const [showInformation, setShowInformation] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          onClick={() => setShowInformation(!showInformation)}
        >
          Informações
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[90%] sm:w-[60%]">
        <div className="flex flex-col gap-3 mt-2 w-full ">
          <h1 className="font-bold mb-2 mt-2 text-center">SOBRE NÓS</h1>
          <h3 className="text-xs text-gray-400 mb-5">
            Bem-vindo à Vintage Barber, onde tradição encontra estilo. Nossa
            equipe de mestres barbeiros transforma cortes de cabelo e barbas em
            obras de arte. Em um ambiente acolhedor, promovemos confiança,
            estilo e uma comunidade unida.
          </h3>

          <div className="border-t border-solid border-secondary px-5 p-5 gap-5 flex justify-between">
            <div className="text-xs lg:text-base  gap-5 flex items-center justify-start">
              <Phone size={20} /> (11) 99999-0000
              {/* {barbershop.phoneNumber} */}
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
              <strong className="text-xs text-gray-400">Terça-Feira</strong>{" "}
              09:00 - 21:00
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
              <strong className="text-xs text-gray-400">Sexta-Feira</strong>{" "}
              09:00 - 21:00
            </p>
            <p className="text-xs justify-between flex mb-2">
              <strong className="text-xs text-gray-400">Sábado</strong> 08:00 -
              17:00
            </p>
            <p className="text-xs justify-between flex mb-2">
              <strong className="text-xs text-gray-400">Domingo</strong> Fechado
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalInformation;
