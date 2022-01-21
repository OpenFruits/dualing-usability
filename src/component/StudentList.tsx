import type { VFC } from "react";
import { Card } from "src/component/Card";
import { studentList } from "src/constants/data/studentList";
import { useResult } from "src/state/search";

export const StudentList: VFC = () => {
  const { result } = useResult();
  return (
    <div className="">
      <h1 className="pb-4 text-3xl font-bold border-b border-gray-500">学生一覧</h1>
      <p className="p-2 my-4 text-lg bg-gray-50 rounded">{`検索条件：${result}`}</p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {studentList.map((student) => (
          <Card key={student.uid} student={student} />
        ))}
      </div>
    </div>
  );
};
