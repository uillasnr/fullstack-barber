import { Badge } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function BookingItem() {
  return (
    <Card>
      <CardContent className="p-5 flex justify-between py-0">
        <div className="flex flex-col gap-2 py-5">
          <Badge className=" w-fit bg-[#221C3D] text-primary hover:bg-[#221C3D]">
            Confirmado
          </Badge>
          <h2 className="font-bold">Corte de cabelo</h2>

          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://cdn.awsli.com.br/299/299243/arquivos/capa%20goku.jpeg" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>

            <h3 className="text-sm">Vintage Barber</h3>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border-solid border-l px-3 border-secondary">
            <p className="text-sm">Fevereiro</p>
            <p className="text-2xl">06</p>
            <p className="text-sm">09:45</p>
        </div>
      </CardContent>
    </Card>
  );
}
