import { format } from "date-fns";
import Header from "../_components/header";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../_components/ui/carousel";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [barbershops, recommendedBarbershops, confirmedBookings] =
    await Promise.all([
      db.barbershop.findMany({}),
      db.barbershop.findMany({
        orderBy: {
          id: "asc",
        },
      }),
      session?.user
        ? db.booking.findMany({
            where: {
              userId: (session.user as any).id,
              date: {
                gte: new Date(),
              },
            },
            include: {
              service: true,
              barbershop: true,
            },
          })
        : Promise.resolve([]),
    ]);

  return (
    <div>
      <Header />

      <div className="h-[330px] w-full relative">
        <div className="px-5 pt-5 md:pt-12 md:px-16  relative z-10">
          <h2 className="text-xl font-bold">
            {session?.user
              ? `Olá, ${session.user.name?.split(" ")[0]}!`
              : "Olá! Vamos agendar um corte hoje?"}
          </h2>
          <p className="capitalize text-sm">
            {format(new Date(), "EEEE',' dd 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>

        <div className="md:flex md:gap-0 lg:flex lg:gap-32 mt-5">
          <div className="px-5 mt-6 md:mt-0 md:w-[40%] md:px-16 relative z-10">
            <Search />
          </div>

          <div className="mt-6 md:w-96  xl:w-auto px-5 relative z-10">
            {confirmedBookings.length > 0 && (
              <>
                <h2 className="pl-16 text-xs mb-3 uppercase text-gray-400 font-bold">
                  Agendamentos
                </h2>
                <div className="px-10">
                  <Carousel
                    opts={{
                      align: "center",
                    }}
                    className="w-full px-5 md:min-w-80"
                  >
                    <CarouselContent>
                      {confirmedBookings.map((booking) => (
                        <CarouselItem key={booking.id} className="w-full  ">
                          <div className="p-1">
                            <BookingItem booking={booking} />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="text-[#7c61f0]" />
                    <CarouselNext className="text-[#7c61f0]" />
                  </Carousel>
                </div>
              </>
            )}
          </div>
          <Image
            src="/bg.png"
            alt=""
            style={{
              objectFit: "cover",
              backgroundPosition: 'center',
            }}
            fill
            /*  className="opacity-75" */
          />
        </div>
      </div>

      <div className="mt-6">
        <h2 className="pl-16 text-xs mb-3 uppercase text-gray-400 font-bold">
          Recomendados
        </h2>

        <div className="px-16">
          <Carousel
            opts={{
              align: "center",
            }}
            className=""
          >
            <CarouselContent className="">
              {barbershops.map((barbershop) => (
                <CarouselItem key={barbershop.id} className="pl-1 basis-44">
                  <div className="p-1 ">
                    <BarbershopItem
                      key={barbershop.id}
                      barbershop={barbershop}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-[#7c61f0]" />
            <CarouselNext className="text-[#7c61f0]" />
          </Carousel>
        </div>
      </div>

      <div className="mt-6 mb-[4.5rem]">
        <h2 className="pl-16 text-xs mb-3 uppercase text-gray-400 font-bold">
          Populares
        </h2>

        <div className="px-16">
          <Carousel
            opts={{
              align: "center",
            }}
            className=""
          >
            <CarouselContent className="">
              {recommendedBarbershops.map((barbershop) => (
                <CarouselItem key={barbershop.id} className="pl-1 basis-44">
                  <div className="p-1 ">
                    <BarbershopItem
                      key={barbershop.id}
                      barbershop={barbershop}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-[#7c61f0]" />
            <CarouselNext className="text-[#7c61f0]" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
