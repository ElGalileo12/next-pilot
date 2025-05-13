"use client";

import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import Image from "next/image";
import { PowerIcon } from "@heroicons/react/24/outline";
import { useUser } from "@stackframe/stack";
import { getTeamUserData } from "@/app/lib/actions";
import { useEffect, useState } from "react";

interface TeamData {
  profile_image_url?: string;
  display_name?: string;
  id?: string;
  created_at_millis?: number;
}

export default function SideNav() {
  const user = useUser();
  const [teamData, setTeamData] = useState<TeamData>({});

  useEffect(() => {
    if (!user?.id) return;
    const fetchTeamData = async () => {
      const response = await getTeamUserData(user.id);
      setTeamData(response);
    };
    fetchTeamData();
  }, [user?.id]);

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="mb-2 flex items-center justify-center rounded-md bg-gray-50 p-1.5">
        <div className="w-32 text-white md:w-40">
          <Image
            width={150}
            height={150}
            src={teamData?.profile_image_url || "/default-team-logo.png"}
            alt="Team Logo"
            className="object-cover rounded-md"
          />
        </div>
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form>
          <button
            onClick={() => user?.signOut()}
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
