"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CalendarIcon, CircleUserRound, MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

import Link from "next/link";
import SideMenu from "./side-menu";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { signIn } from "next-auth/react";

const Header = () => {
  const handleLoginClick = () => signIn("google");

  return (
    <header>
      <Card>
        <CardContent className="p-5 justify-between items-center flex flex-row">
          <Link href="/">
            <Image src="/logo.png" alt="FSW Barber" height={18} width={120} />
          </Link>
          <div className="hidden md:flex ml-auto items-center">
            <div className="mr-4">
              <Link href="/bookings">
                <div className="flex items-center font-semibold text-xs">
                  <CalendarIcon size={18} className="mr-2" />
                  Agendamentos
                </div>
              </Link>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <CircleUserRound size={18} className="mr-2" />
                  Perfil
                </Button>
              </DialogTrigger>

              <DialogContent className="w-[30%]">
                <div className="flex flex-col items-center ">
                  <h1 className=" text-xl font-bold">Faça login</h1>
                  <h3 className="text-sm text-gray-400 mb-3">
                    Conecte-se usando sua conta do Google.
                  </h3>
                  <Button
                    variant="secondary"
                    className="w-40 justify-center"
                    onClick={handleLoginClick}
                  >
                    Google
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <MenuIcon size={16} />
                </Button>
              </SheetTrigger>

              <SheetContent className="p-0">
                <SideMenu />
              </SheetContent>
            </Sheet>
          </div>
        </CardContent>
      </Card>
    </header>
  );
};

export default Header;
