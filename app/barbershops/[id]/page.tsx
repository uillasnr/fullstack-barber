
import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import Header from "@/app/_components/header";
import Information from "./_components/information";

interface BarbershopDetailsPageProps {
  params: {
    id?: string;
  };
}
const BarbershopDetailsPage = async ({
  params,
}: BarbershopDetailsPageProps) => {
  const session = await getServerSession(authOptions);

  if (!params.id) {
    //redirecionar para home page
    return null;
  }

  const barbershop = await db.barbershop.findUnique({
    where: { id: params.id },
    include: { services: true },
  });

  if (!barbershop) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="w-full lg:px-10">
        <div className="lg:flex">
          <div className="lg:w-full">
            <BarbershopInfo barbershop={barbershop} />

            <div className="lg:grid lg:grid-cols-2 lg:gap-4 mb-4 p-5">
              {barbershop.services.map((service) => (
                <ServiceItem
                  key={service.id}
                  barbershop={barbershop}
                  service={service}
                  isAuthenticated={!!session?.user}
                />
              ))}
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="lg:flex p-5">
              <Information
                barbershop={barbershop}
                service={barbershop.services[0]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BarbershopDetailsPage;
