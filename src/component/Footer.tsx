/* eslint-disable @typescript-eslint/no-empty-function */
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import type { VFC } from "react";
import { Fragment } from "react";
import { useCallback, useState } from "react";
import { Button } from "src/component/Button";
import { corporateURL, googleFormUrl } from "src/constants/externalLink";

export const Footer: VFC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const logout = () => {};

  const deleteAccount = () => {};

  const ConfirmModalBody: VFC = () => {
    const [email, setEmail] = useState("");

    const inputEmail = useCallback(
      (event) => {
        setEmail(event.target.value);
      },
      [setEmail]
    );

    return (
      <div className="pb-2">
        <p className="font-bold">⚠️ 以下の処理を行います</p>
        <ul>
          <li>・アカウントの削除</li>
          <li>・ログイン機能の停止</li>
        </ul>
        <p className="py-1">再入会を希望の際は再度新規登録を行う必要があります</p>
        <div className="my-2 border border-gray-300">
          <p className="px-2 pt-2 text-xs">ご登録のメールアドレスを入力し、退会処理を続行してください。</p>
          <div className="m-2">
            <input
              type="text"
              id="email"
              value={email}
              className="p-1 w-full h-8 text-xs bg-white rounded border border-gray-300"
              onChange={inputEmail}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button variant="solid-red" className="mt-2 text-sm rounded" disabled onClick={deleteAccount}>
            退会処理を続行
          </Button>
        </div>
      </div>
    );
  };

  return (
    <footer className="flex absolute bottom-0 justify-around py-3 w-full font-bold text-white bg-theme-dark sm:justify-end">
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
                  退会処理
                </Dialog.Title>
                {<ConfirmModalBody />}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <ul className="text-sm">
        <li className="mb-1 sm:mx-3">
          <Link href={googleFormUrl}>
            <a>お問い合わせ</a>
          </Link>
        </li>
        <li className="mb-1 cursor-pointer sm:mx-3" onClick={logout}>
          ログアウト
        </li>
        <li className="mb-1 cursor-pointer sm:mx-3" onClick={onOpen}>
          退会
        </li>
      </ul>
      <ul className="text-sm">
        <li className="mb-1 sm:mx-3">
          <Link href="/support/terms">
            <a>利用規約</a>
          </Link>
        </li>
        <li className="mb-1 sm:mx-3">
          <Link href="/support/privacy-policy">
            <a>プライバシーポリシー</a>
          </Link>
        </li>
        <li className="mb-1 sm:mx-3">
          <Link href={corporateURL}>
            <a>運営会社</a>
          </Link>
        </li>
      </ul>
    </footer>
  );
};
