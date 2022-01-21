import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { VFC } from "react";
import { Fragment, useState } from "react";
import { Button } from "src/component/Button";
import { Layout } from "src/component/Layout";
import { studentList } from "src/constants/data/studentList";

export const Profile: VFC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const profileItems: { head: string; data: string }[] = [
    {
      head: "大学・学部",
      data: `${studentList[0]?.university} ${studentList[0]?.department}`,
    },
    { head: "部活", data: studentList[0]?.club },
    { head: "企業選びの軸", data: studentList[0]?.important.join(", ") },
    { head: "興味のある業界", data: studentList[0]?.industries.join(", ") },
    { head: "興味のある職種", data: studentList[0]?.occupations.join(", ") },
    { head: "希望勤務地", data: studentList[0]?.locations?.join(", ") },
    { head: "強み、長所", data: studentList[0]?.advantages.join(", ") },
    { head: "ひとことアピール", data: studentList[0]?.comment },
  ];

  return (
    <Layout>
      <div className="flex justify-between items-center">
        {studentList[0] && (
          <div>
            <p className="text-sm">{`${studentList[0]?.firstKana} ${studentList[0]?.lastKana}`}</p>
            <h2 className="pb-2 text-3xl font-bold">{`${studentList[0]?.firstName} ${studentList[0]?.lastName}`}</h2>
            <p>{`${studentList[0]?.university} ${studentList[0]?.department}`}</p>
          </div>
        )}
        <div className="m-2 space-y-2">
          <div>
            <button
              onClick={onOpen}
              className="p-2 m-auto w-40 text-sm font-bold tracking-wider text-center text-white bg-blue-500 hover:bg-blue-400 rounded focus:outline-none cursor-pointer lg:mx-0"
            >
              プレビュー表示
            </button>
          </div>
          <div>
            <Link href={`/mypage/edit`}>
              <a>
                <button className="p-2 m-auto w-40 text-sm font-bold tracking-wider text-center text-white bg-blue-500 hover:bg-blue-400 rounded focus:outline-none cursor-pointer lg:mx-0">
                  プロフィール編集
                </button>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="overflow-y-auto fixed inset-0 z-10" onClose={onClose}>
          <div className="px-4 min-h-screen text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block overflow-hidden px-6 my-20 w-full max-w-sm text-left align-middle bg-white rounded-2xl shadow-md transition-all">
                <Dialog.Title as="h3" className="py-4 text-lg font-bold leading-6 text-gray-900">
                  プロフィール
                </Dialog.Title>
                <div>
                  <div className="space-y-2 text-sm">
                    {profileItems.map((item) => (
                      <div key={item.head} className="border border-gray-300">
                        <p className="py-1 px-2 bg-gray-100">{item.head}</p>
                        <p className="py-1 px-2 whitespace-pre-wrap">{item.data}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end my-4 space-x-3 sm:space-x-4">
                    <Button variant="solid-blue" className="rounded-lg" onClick={() => router.push(`/mypage/edit`)}>
                      編集する
                    </Button>
                    <Button variant="solid-gray" className="rounded-lg" onClick={onClose}>
                      閉じる
                    </Button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Layout>
  );
};
