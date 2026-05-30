import { Link, Outlet } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import { Button } from "@/components/ui/button";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col w-full bg-[#080808] font-[poppins]">
      <Navbar>
        <Link to={"/auth"}>
          <Button className="text-sm font-semibold text-black bg-primary-500 glow-green-sm transition-all duration-200 hover:scale-105">
            Sign In
          </Button>
        </Link>
      </Navbar>
      <main className="mt-18 w-full ">
        <Outlet />
      </main>
    </div>
  );
}
