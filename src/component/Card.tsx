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

  const DETAIL_ITEMS = [
    { label: "会社選びの軸", data: props.student.important, key: "important" },
    { label: "業界", data: props.student.industries, key: "industry" },
    { label: "職種", data: props.student.occupations, key: "occupation" },
    { label: "希望勤務地", data: props.student.locations, key: "location" },
    { label: "強み", data: props.student.advantages, key: "advantage" },
  ];

  return (
    <div className="overflow-hidden bg-white rounded border">
      <div
        className="relative w-full h-52 bg-cover cursor-pointer"
        style={{ backgroundImage: `url(/student.jpg)` }}
        onClick={() => router.push(`/student/${props.student.uid}`)}
      >
        {props.student.relation === "scout" && (
          <div className="absolute top-0 right-0 p-2 m-2 text-sm font-bold text-white bg-emerald-500 rounded-full">
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
      {DETAIL_ITEMS.map((item) => (
        <div key={item.key} className="py-1 px-2 border-b">
          <span className="text-xs font-bold">{`${item.label}：`}</span>
          {item.data.map((data: string, index: number) => (
            <span
              key={`${item.key}_${index}`}
              className="inline-block py-1 px-2 mr-2 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full"
            >
              {`${data}`}
            </span>
          ))}
        </div>
      ))}
      <div className="flex justify-start p-2">
        <Link href={`/student/${props.student.uid}`}>
          <a className="mr-2">
            {props.student.relation === "no" && (
              <button className="p-2 m-auto text-xs font-bold tracking-wider text-center text-white bg-blue-500 hover:bg-blue-400 rounded focus:outline-none cursor-pointer lg:mx-0">
                詳細・スカウト画面へ
              </button>
            )}
            {props.student.relation === "scout" && (
              <button className="p-2 m-auto text-xs font-bold tracking-wider text-center text-white bg-blue-500 hover:bg-blue-400 rounded focus:outline-none cursor-pointer lg:mx-0">
                詳細画面へ
              </button>
            )}
            {props.student.relation === "match" && (
              <button className="p-2 m-auto text-xs font-bold tracking-wider text-center text-white bg-blue-500 hover:bg-blue-400 rounded focus:outline-none cursor-pointer lg:mx-0">
                詳細・チャット画面へ
              </button>
            )}
          </a>
        </Link>
        <button
          onClick={bookmark}
          className="flex pr-2 m-auto text-xs font-bold tracking-wider text-center text-white bg-blue-500 hover:bg-blue-400 rounded focus:outline-none cursor-pointer lg:mx-0"
        >
          <BookmarkIcon className="m-1 w-6 h-6" />
          {isBookmark ? <p className="py-2">保存済み</p> : <p className="py-2">保存して後で見る</p>}
        </button>
      </div>
    </div>
  );
};
