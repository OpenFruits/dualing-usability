import { Dialog, Transition } from "@headlessui/react";
import { BookmarkIcon } from "@heroicons/react/solid";
import Vimeo from "@u-wave/react-vimeo";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "src/component/Button";
import { Chat } from "src/component/company/Chat";
import { Header } from "src/component/Header";
import { studentList } from "src/constants/data/studentList";
import type { Student } from "src/constants/types";

const StudentId: NextPage = () => {
  const router = useRouter();
  const id = router.query.id;
  const [isLoading, setIsLoading] = useState(true);
  const loaded = () => setIsLoading(false);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const student: Student = studentList[Number(id) - 1];
  const [isBookmark, setIsBookmark] = useState(false);

  const currentUser = { name: "株式会社サンプル" };

  const scout = async () => {
    onClose();
  };

  const deleteScout = async () => {
    onClose();
  };

  const bookmark = async () => {
    setIsBookmark(!isBookmark);
    if (!isBookmark) toast.success("保存しました");
    if (isBookmark) toast.success("保存済みから削除しました");
  };

  return (
    <>
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
              <div className="inline-block overflow-hidden px-6 my-20 w-full max-w-sm text-left align-middle bg-white rounded-2xl transition-all">
                <Dialog.Title as="h3" className="py-4 text-lg font-bold leading-6 text-gray-900">
                  {student?.relation === "scout"
                    ? `${student?.firstName}${student?.lastName}さんへのスカウトは送信済みです。`
                    : `${student?.firstName}${student?.lastName}さんにスカウトを送信します。`}
                </Dialog.Title>
                {student?.relation === "scout" ? (
                  <div>
                    学生がスカウトを「承認」した場合、チャットが可能となり、
                    「見送り」した場合その学生が一覧に表示されなくなります。
                    <div className="py-2" />
                    スカウトを取り消したい場合は、以下のボタンで取消を行います。
                    <div className="flex justify-end my-4 space-x-3 sm:space-x-4">
                      <Button variant="solid-blue" className="rounded-lg" onClick={deleteScout}>
                        スカウト取消
                      </Button>
                      <Button variant="solid-gray" className="rounded-lg" onClick={onClose}>
                        閉じる
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    学生がスカウトを「承認」した場合、チャットが可能となり、
                    「見送り」した場合その学生が一覧に表示されなくなります。
                    <div className="py-2" />
                    以下のボタンからスカウトを送信してください。
                    <div className="flex justify-end my-4 space-x-3 sm:space-x-4">
                      <Button variant="solid-blue" className="rounded-lg" onClick={scout}>
                        スカウト送信
                      </Button>
                      <Button variant="solid-gray" className="rounded-lg" onClick={onClose}>
                        キャンセル
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <Header pageTitle="学生詳細ページ" />
      <div className="flex">
        <aside className="fixed top-14 left-0 p-4 w-72 h-screen border-r">
          <h2 className="pb-2 mb-4 text-2xl border-b">{`${currentUser?.name} 様`}</h2>
          <Link href={`/`}>
            <a>
              <button className="p-2 m-auto text-sm font-bold tracking-wider text-center text-white bg-blue-500 hover:bg-blue-400 rounded focus:outline-none cursor-pointer lg:mx-0">
                一覧に戻る
              </button>
            </a>
          </Link>
        </aside>
        <main className="ml-72 w-screen bg-theme-light">
          <div className="py-10 px-14 divide-y divide-gray-500">
            <h1 className="mb-4 text-3xl font-bold">学生詳細</h1>
            <div className="py-10 w-[600px] xl:w-[800px]">
              <div className="flex justify-between items-center">
                <div>
                  {student ? (
                    <div>
                      <p className="text-sm">{`${student.firstKana} ${student.lastKana}`}</p>
                      <h2 className="mb-2 text-2xl font-bold">{`${student.firstName} ${student.lastName}`}</h2>
                      <h2 className="mb-4 text-2xl font-bold">{`(${student.university} ${student.department})`}</h2>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-theme-light">{` - `}</p>
                      <h2 className="mb-4 text-2xl font-bold text-theme-light">{` - `}</h2>
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  {student?.relation === "scout" && (
                    <button
                      onClick={onOpen}
                      className="p-2 my-1 ml-2 w-44 h-10 text-sm font-bold tracking-wider text-center text-white bg-gray-500 hover:bg-gray-300 rounded focus:outline-none cursor-pointer"
                    >
                      スカウト済み
                    </button>
                  )}
                  {student?.relation === "no" && (
                    <button
                      onClick={onOpen}
                      className="p-2 my-1 ml-2 w-44 h-10 text-sm font-bold tracking-wider text-center text-white bg-blue-500 hover:bg-blue-400 rounded focus:outline-none cursor-pointer"
                    >
                      スカウトを送る
                    </button>
                  )}
                  <button
                    onClick={bookmark}
                    className="flex justify-center items-center p-2 my-1 ml-2 w-44 h-10 text-sm font-bold tracking-wider text-white bg-blue-500 hover:bg-blue-400 rounded focus:outline-none cursor-pointer"
                  >
                    <BookmarkIcon className="m-1 w-6 h-6" />
                    {isBookmark ? <p className="py-2 mr-4">保存済み</p> : <p className="py-2 mr-2">保存して後で見る</p>}
                  </button>
                </div>
              </div>
              {student?.relation === "match" && <Chat studentName={`${student?.firstName} ${student?.lastName}`} />}
              {isLoading && (
                <div className="aspect-video grid place-items-center m-2 text-2xl text-gray-800 bg-gray-400">
                  Loading...
                </div>
              )}
              {student && (
                <Vimeo
                  video={student.vimeoUrl}
                  responsive
                  onLoaded={loaded}
                  className={isLoading ? "hidden" : "my-4"}
                />
              )}
              <table className="my-4 w-[600px] text-sm bg-white border border-gray-300 xl:w-[800px] xl:text-lg">
                <tbody>
                  <tr className="border border-gray-300">
                    <td className="p-3 w-1/4 bg-gray-100">強み、長所</td>
                    <td className="p-3">{student?.advantages.join(", ")}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 bg-gray-100">企業選びの軸</td>
                    <td className="p-3">{student?.important.join(", ")}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 bg-gray-100">部活、サークル</td>
                    <td className="p-3">{student?.club}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 bg-gray-100">興味のある業界</td>
                    <td className="p-3">{student?.industries.join(", ")}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 bg-gray-100">興味のある職種</td>
                    <td className="p-3">{student?.occupations.join(", ")}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 bg-gray-100">希望勤務地</td>
                    <td className="p-3">{student?.locations?.join(", ")}</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="p-3 bg-gray-100">ひとことPR</td>
                    <td className="p-3 whitespace-pre-wrap">{student?.comment}</td>
                  </tr>
                </tbody>
              </table>
              <Link href={`/`}>
                <a>
                  <button className="p-2 m-auto text-sm font-bold tracking-wider text-center text-white bg-blue-500 hover:bg-blue-400 rounded focus:outline-none cursor-pointer lg:mx-0">
                    一覧に戻る
                  </button>
                </a>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default StudentId;
