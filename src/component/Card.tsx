import { BookmarkIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import type { VFC } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import type { Student } from "src/constants/types";

type Props = {
  student: Student;
};

export const Card: VFC<Props> = (props) => {
  const router = useRouter();
  const [isBookmark, setIsBookmark] = useState(false);

  // 保存or保存の削除
  const bookmark = async () => {
    setIsBookmark(!isBookmark);
    if (!isBookmark) toast.success("保存しました");
    if (isBookmark) toast.success("保存済みから削除しました");
  };

  return (
    <div className="overflow-hidden bg-white rounded border">
      <div
        className="relative w-full h-52 bg-cover cursor-pointer"
        style={{ backgroundImage: `url(/student.jpg)` }}
        onClick={() => router.push(`/student/${props.student.uid}`)}
      >
        {props.student.relation === "scout" && (
          <div className="absolute top-0 right-0 p-2 m-2 text-sm font-bold text-white bg-green-500 rounded-full">
            スカウト中
          </div>
        )}
        {props.student.relation === "match" && (
          <div className="absolute top-0 right-0 p-2 m-2 text-sm font-bold bg-yellow-300 rounded-full">マッチング</div>
        )}
        {props.student.relation === "match" && (
          <div className="absolute top-0 left-0 p-2 m-2 text-sm font-bold bg-gray-200 rounded">
            {`${props.student.firstName} ${props.student.lastName}`}
          </div>
        )}
        <div className="absolute right-0 bottom-0 p-2 text-xl font-bold bg-white border-b">
          {`${props.student.university} ${props.student.department}`}
        </div>
      </div>
      <div className="py-1 px-2 border-b">
        <span className="text-xs font-bold">会社選びの軸：</span>
        {props.student.important.map((item: string, index: number) => (
          <span
            key={`important_${index}`}
            className="inline-block py-1 px-2 mr-2 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full"
          >
            {`${item}`}
          </span>
        ))}
      </div>
      <div className="py-1 px-2 border-b">
        <span className="text-xs font-bold">業界：</span>
        {props.student.industries.map((item: string, index: number) => (
          <span
            key={`industry_${index}`}
            className="inline-block py-1 px-2 mr-2 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full"
          >
            {`${item}`}
          </span>
        ))}
      </div>
      <div className="py-1 px-2 border-b">
        <span className="text-xs font-bold">職種：</span>
        {props.student.occupations.map((item: string, index: number) => (
          <span
            key={`occupation_${index}`}
            className="inline-block py-1 px-2 mr-2 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full"
          >
            {`${item}`}
          </span>
        ))}
      </div>
      <div className="py-1 px-2 border-b">
        <span className="text-xs font-bold">希望勤務地：</span>
        {props.student.locations.map((item: string, index: number) => (
          <span
            key={`location_${index}`}
            className="inline-block py-1 px-2 mr-2 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full"
          >
            {`${item}`}
          </span>
        ))}
      </div>
      <div className="py-1 px-2 border-b">
        <span className="text-xs font-bold">強み：</span>
        {props.student.advantages.map((item: string, index: number) => (
          <span
            key={`advantage_${index}`}
            className="inline-block py-1 px-2 mr-2 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full"
          >
            {`${item}`}
          </span>
        ))}
      </div>
      <div className="flex justify-start p-2">
        <Link href={`/student/${props.student.uid}`}>
          <a className="mr-2">
            {props.student.relation === "no" && (
              <button className="p-2 m-auto text-xs font-bold tracking-wider text-center text-white bg-blue-500 hover:bg-blue-400 rounded focus:outline-none cursor-pointer lg:mx-0 lg:text-sm">
                詳細・スカウト画面へ
              </button>
            )}
            {props.student.relation === "scout" && (
              <button className="p-2 m-auto text-xs font-bold tracking-wider text-center text-white bg-blue-500 hover:bg-blue-400 rounded focus:outline-none cursor-pointer lg:mx-0 lg:text-sm">
                詳細画面へ
              </button>
            )}
            {props.student.relation === "match" && (
              <button className="p-2 m-auto text-xs font-bold tracking-wider text-center text-white bg-blue-500 hover:bg-blue-400 rounded focus:outline-none cursor-pointer lg:mx-0 lg:text-sm">
                詳細・チャット画面へ
              </button>
            )}
          </a>
        </Link>
        <button
          onClick={bookmark}
          className="flex pr-2 m-auto text-xs font-bold tracking-wider text-center text-white bg-blue-500 hover:bg-blue-400 rounded focus:outline-none cursor-pointer lg:mx-0 lg:text-sm"
        >
          <BookmarkIcon className="m-1 w-6 h-6" />
          {isBookmark ? <p className="py-2">保存済み</p> : <p className="py-2">保存して後で見る</p>}
        </button>
      </div>
    </div>
  );
};
