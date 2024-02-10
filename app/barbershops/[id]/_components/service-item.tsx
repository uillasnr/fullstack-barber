"use client";

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Service } from "@prisma/client";
import { ptBR } from "date-fns/locale/pt-BR";
import { Calendar, Sheet } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { generateDayTimeList } from "./_helpers/hours";
import { addDays } from "date-fns";

interface ServiceItemProps {
  service: Service;
  isAuthenticated: boolean;
}
const ServiceItem = ({ service, isAuthenticated }: ServiceItemProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      return signIn("google");
    }

    //Abrir modal de  agendamento
  };

  const timeList = useMemo(() => {
    return date ? generateDayTimeList(date) : [];
  }, [date]);

  const handleDateClick = (date: Date | undefined) => {
/*     setDate(date);
    setHour(undefined); */
  };

  return (
    <Card>
    <CardContent className="p-3 w-full">
      <div className="flex gap-4 items-center w-full">
        <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
          <Image
            className="rounded-lg"
            src={service.imageUrl}
            fill
            style={{ objectFit: "contain" }}
            alt={service.name}
          />
        </div>

        <div className="flex flex-col w-full">
          <h2 className="font-bold">{service.name}</h2>
          <p className="text-sm text-gray-400">{service.description}</p>

          <div className="flex items-center justify-between mt-3">
            <p className="text-primary text-sm font-bold">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>
            <Sheet /* open={sheetIsOpen} onOpenChange={setSheetIsOpen} */>
              <SheetTrigger asChild>
                <Button variant="secondary" onClick={handleBookingClick}>
                  Reservar
                </Button>
              </SheetTrigger>

              <SheetContent className="p-0">
                <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                  <SheetTitle>Fazer Reserva</SheetTitle>
                </SheetHeader>

                <div className="py-6">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateClick}
                    locale={ptBR}
                    fromDate={addDays(new Date(), 1)}
                    styles={{
                      head_cell: {
                        width: "100%",
                        textTransform: "capitalize",
                      },
                      cell: {
                        width: "100%",
                      },
                      button: {
                        width: "100%",
                      },
                      nav_button_previous: {
                        width: "32px",
                        height: "32px",
                      },
                      nav_button_next: {
                        width: "32px",
                        height: "32px",
                      },
                      caption: {
                        textTransform: "capitalize",
                      },
                    }}
                  />
                </div>

                  {/* Mostrar lista de horários apenas se alguma data estiver selecionada */}
                  {date && (
                    <div className="flex gap-3 overflow-x-auto py-6 px-5 border-t border-solid border-secondary [&::-webkit-scrollbar]:hidden">
                      {timeList.map((time) => (
                        <Button
                         /*  onClick={() => handleHourClick(time)} */
                         /*  variant={hour === time ? "default" : "outline"} */
                          className="rounded-full"
                          key={time}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                {/*   <div className="py-6 px-5 border-t border-solid border-secondary">
                    <BookingInfo
                      booking={{
                        barbershop: barbershop,
                        date:
                          date && hour
                            ? setMinutes(setHours(date, Number(hour.split(":")[0])), Number(hour.split(":")[1]))
                            : undefined,
                        service: service,
                      }}
                    />
                  </div>

                  <SheetFooter className="px-5">
                    <Button onClick={handleBookingSubmit} disabled={!hour || !date || submitIsLoading}>
                      {submitIsLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Confirmar reserva
                    </Button>
                  </SheetFooter> */}
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
