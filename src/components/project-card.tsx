/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import Image from "next/image";
import { Checkbox } from "@/src/components/ui/checkbox";

export function ProjectCard(props: any) {
  return (
    <div className="w-full justify-between rounded-xl cursor-default hover:shadow-md flex p-5 bg-white">
      <div className="flex gap-4">
        <Image
          alt="project"
          src="/img/thumbnail.png"
          // src={props.data.thumbnail}
          width={120}
          height={80}
          className="rounded-xl"
        />
        <div className="h-20 flex items-center">
          <div className="flex h-16 flex-col justify-between">
            <p className="text-lg font-medium">{props.data.name}</p>
            <p
              className={
                props.data.status ? "text-[#2AA200]" : "text-[#DB5D02]"
              }
            >
              {props.data.status ? "● COMPLETED" : "● IN PROGRESS"}
            </p>
          </div>
        </div>
      </div>
      <div className="h-20 flex items-center">
        <div className="h-16 border-x-[1px]"></div>
      </div>
      <div className="h-20 flex items-center">
        <div className="flex flex-col h-16 justify-between">
          <div className="w-full flex items-center gap-2">
            <Checkbox
              className="bg-[#2365C8] disabled:!opacity-100 disabled:!cursor-default text-white rounded-full w-5 h-5"
              checked={props.data.inputForm}
              disabled
            />
            <p>
              Input Form • {props.data.inputForm ? "Completed" : "In Progress"}
            </p>
          </div>
          <div className="w-full flex items-center gap-2">
            <Checkbox
              className="bg-[#2365C8] disabled:!opacity-100 disabled:!cursor-default  text-white rounded-full w-5 h-5"
              checked={props.data.phase1}
              disabled
            />
            <p>Phase 1 • {props.data.phase1 ? "Ordered " : "In Progress"}</p>
          </div>
          <div className="w-full flex items-center gap-2">
            <Checkbox
              className="bg-[#2365C8] disabled:!opacity-100 disabled:!cursor-default  text-white rounded-full w-5 h-5"
              checked={props.data.phase2}
              disabled
            />
            <p>Phase 2 • {props.data.phase2 ? "Ordered" : "In Progress"}</p>
          </div>
        </div>
      </div>
      <div className="h-20 px-10 items-center flex">
        <Link href={`/projects/${props.data.id}`}>
          <Image alt="link" src={"/svg/arrow.svg"} width={26} height={18} />
        </Link>
      </div>
    </div>
  );
}
