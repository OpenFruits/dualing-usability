import { Dialog, Transition } from "@headlessui/react";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import Link from "next/link";
import type { VFC } from "react";
import { Fragment, useState } from "react";
import { Button } from "src/component/Button";
import type { Company } from "src/constants/types";

type Props = {
  company: Company;
};

export const ScoutedCompany: VFC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const matching = async () => {
    // if (confirm(`${props.company.name}とマッチングします。よろしいですか？`)) {
    //   const relationsRef = doc(db, "relations", relationId);
    //   await updateDoc(relationsRef, { condition: "matching" });
    //   const companiesRef = collection(
    //     db,
    //     "companies",
    //     props.company.id,
    //     "notices"
    //   );
    //   await setDoc(doc(companiesRef), {
    //     created_at: FirebaseTimestamp,
    //     title: "学生とマッチングしました",
    //     body: noticeBody,
    //     isRead: false,
    //   }).then(() => {
    //     router.push(`/${currentUser?.uid}/${props.company.id}`);
    //     toast.success(
    //       () => (
    //         <span>
    //           <b>企業とマッチングしました！</b>
    //           <div className="py-1.5" />
    //           企業から最初のメッセージが来るのをお待ちください。
    //         </span>
    //       ),
    //       { duration: 5000 }
    //     );
    //     sendMail(templateParams);
    //   });
    // }
  };

  const passScout = async () => {
    // if (confirm("スカウトを見送ります。よろしいですか？")) {
    //   const relationsRef = doc(db, "relations", relationId);
    //   await updateDoc(relationsRef, { condition: "block" }).then(() => {
    //     toast.success("スカウトを見送りました");
    //   });
    // }
    onClose();
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-sm">{props.company.name}</p>
        <button
          onClick={onOpen}
          className="p-2 w-32 text-xs font-bold tracking-wider text-center text-white bg-blue-500 hover:bg-blue-400 rounded focus:outline-none cursor-pointer"
        >
          詳細・マッチング
        </button>
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
                  {props.company.name}
                </Dialog.Title>
                <div>
                  <div className="space-y-2 text-sm">
                    <div className="border border-gray-300">
                      <p className="py-1 px-2 bg-gray-100">業界</p>
                      <p className="py-1 px-2">{props.company.industry}</p>
                    </div>
                    <div className="border border-gray-300">
                      <p className="py-1 px-2 bg-gray-100">求める職種</p>
                      <p className="py-1 px-2">{props.company.occupations.join(", ")}</p>
                    </div>
                    <div className="border border-gray-300">
                      <p className="py-1 px-2 bg-gray-100">企業サイト</p>
                      <p className="py-1 px-2">
                        <Link href={props.company.corporateUrl}>
                          <a className="flex items-center hover:text-gray-500">
                            <span className="mr-1 ml-2">{props.company.corporateUrl}</span>
                            <ExternalLinkIcon className="w-5 h-5" />
                          </a>
                        </Link>
                      </p>
                    </div>
                    <div className="border border-gray-300">
                      <p className="py-1 px-2 bg-gray-100">採用サイト</p>
                      <p className="py-1 px-2">
                        <Link href={props.company.recruitUrl}>
                          <a className="flex items-center hover:text-gray-500">
                            <span className="mr-1 ml-2">{props.company.recruitUrl}</span>
                            <ExternalLinkIcon className="w-5 h-5" />
                          </a>
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 text-right">
                    <p className="text-sm">企業からのスカウトに返答してください</p>
                    <div className="flex justify-end my-2 space-x-3 sm:space-x-4">
                      <Button variant="solid-blue" className="rounded-lg" onClick={matching}>
                        マッチング
                      </Button>
                      <Button variant="solid-gray" className="rounded-lg" onClick={passScout}>
                        見送る
                      </Button>
                    </div>
                    <p className="m-2 text-xs">※ マッチングすると、選考に進みます</p>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
