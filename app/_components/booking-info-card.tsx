"use client";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Prisma } from "@prisma/client";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/app/_components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Loader2, Phone } from "lucide-react";
import { cancelBooking } from "../_actions/cancel-booking";
import { useState } from "react";
import Image from "next/image";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

export default function BookingInfoCard({ booking }: BookingItemProps) {
  const isBookingConfirmed = isFuture(booking.date);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleCancelClick = async () => {
    setIsDeleteLoading(true);

    try {
      await cancelBooking(booking.id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <Card className="hidden lg:block">
      <CardContent className="px-5">
        <div className="relative h-[180px] w-full mt-6">
          <Image src="/barbershop-map.png" fill alt={booking.barbershop.name} />
          <div className="w-full absolute bottom-4 left-0 px-5">
            <Card>
              <CardContent className="p-3 flex gap-2">
                <Avatar>
                  <AvatarImage src={booking.barbershop.imageUrl} />
                </Avatar>
                <div>
                  <h2 className="font-bold">{booking.barbershop.name}</h2>
                  <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">
                    {booking.barbershop.address}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-6 w-full">
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

        <Badge
          variant={isBookingConfirmed ? "default" : "secondary"}
          className="w-fit my-3"
        >
          {isBookingConfirmed ? "Confirmado" : "Finalizado"}
        </Badge>

        <Card className="mb-5">
          <CardContent className="p-3 gap-3 flex flex-col">
            <div className="flex justify-between">
              <h2 className="font-bold">{booking.service.name}</h2>
              <h3 className="font-bold text-sm">
                {" "}
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(booking.service.price))}
              </h3>
            </div>

            {booking.date && (
              <>
                <div className="flex justify-between">
                  <h3 className="text-gray-400 text-sm">Data</h3>
                  <h4 className="text-sm">
                    {format(booking.date, "dd 'de' MMMM", {
                      locale: ptBR,
                    })}
                  </h4>
                </div>

                <div className="flex justify-between">
                  <h3 className="text-gray-400 text-sm">Horário</h3>
                  <h4 className="text-sm">{format(booking.date, "hh:mm")}</h4>
                </div>
              </>
            )}

            <div className="flex justify-between">
              <h3 className="text-gray-400 text-sm">Barbearia</h3>
              <h4 className="text-sm">{booking.barbershop.name}</h4>
            </div>
          </CardContent>
        </Card>

        <AlertDialog>
          <AlertDialogTrigger className="w-full">
            <Button
              disabled={!isBookingConfirmed || isDeleteLoading}
              className=" w-full"
              variant="destructive"
            >
              Cancelar Reserva
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="w-[90%]">
            <AlertDialogHeader>
              <AlertDialogTitle>
                Deseja mesmo cancelar essa reserva?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Uma vez cancelada, não será possível reverter essa ação.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-row gap-3">
              <AlertDialogCancel className="w-full mt-0">
                Voltar
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={isDeleteLoading}
                className="w-full"
                onClick={handleCancelClick}
              >
                {isDeleteLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
