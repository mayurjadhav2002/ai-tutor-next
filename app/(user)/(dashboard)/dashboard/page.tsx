import { Separator } from "@/components/ui/separator";
import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import PrevLearned from "./PrevLearned";
import Link from "next/link";

function page() {
  return (
    <div>
      <div className="flex justify-between items-start">
        <Link href="/Learn"
          className={`flex flex-col gap-2 items-center 
          p-2 rounded-lg bg-gray-200 dark:bg-gray-800
          justify-between 
          hover:bg-blue-gray-50`}
        >
          <CiCirclePlus className={`w-16 h-16 text-dark`} />
          <h1 className="text-md text-semibold">Learn Something New</h1>
        </Link>
      </div>
      <Separator className="my-10"/>
      <PrevLearned />
    </div>
  );
}

export default page;
