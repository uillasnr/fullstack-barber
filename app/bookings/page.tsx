import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";
import { authOptions } from "../_lib/auth";
import BookingInfoCard from "../_components/booking-info-card";

const BookingsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
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
    }),
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          lt: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
  ]);

  // Renderizar o primeiro card de confirmedBookings com Information, se houver pelo menos um confirmedBooking
  const firstConfirmedBooking = confirmedBookings[0];

  return (
    <>
      <Header />

      <div className="lg:px-40 px-5 py-6 flex">
        <div className="w-full pr-4">
          <h1 className="text-xl font-bold mb-6">Agendamentos</h1>

          <div>
            {confirmedBookings.length > 0 && (
              <>
                <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">
                  CONFIRMADOS
                </h2>
                <div className="flex flex-col gap-3">
                  {confirmedBookings.map((booking) => (
                    <BookingItem key={booking.id} booking={booking} />
                  ))}
                </div>
              </>
            )}

            {finishedBookings.length > 0 && (
              <>
                <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">
                  Finalizados
                </h2>

                <div className="flex flex-col gap-3">
                  {finishedBookings.map((booking) => (
                    <BookingItem key={booking.id} booking={booking} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Renderizar o primeiro card de confirmedBookings com Information */}
        {firstConfirmedBooking && (
          <div className="w-full pl-4 mt-20 hidden lg:block ">
            <div className="flex w-full flex-col">
              <BookingInfoCard booking={firstConfirmedBooking} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingsPage;
