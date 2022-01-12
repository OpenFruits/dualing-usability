import Link from "next/link";
import type { VFC } from "react";
import type { Company } from "src/constants/types";

type Props = {
  company: Company;
};

export const MatchingCompany: VFC<Props> = (props) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-sm">{props.company.name}</p>
        <Link href={`/mypage/chat/${props.company.id}`}>
          <a>
            <button className="p-2 w-32 text-xs font-bold tracking-wider text-center text-white bg-blue-500 hover:bg-blue-400 rounded focus:outline-none cursor-pointer">
              詳細・チャット
            </button>
          </a>
        </Link>
      </div>
    </div>
  );
};
