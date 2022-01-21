import { BellIcon } from "@heroicons/react/outline";
import { MailIcon } from "@heroicons/react/outline";
import { MailOpenIcon } from "@heroicons/react/outline";
import { ExclamationIcon } from "@heroicons/react/outline";
import type { VFC } from "react";
import { useEffect, useState } from "react";
import { Button } from "src/component/Button";
import { Drawer } from "src/component/Drawer";
import { noticeList } from "src/constants/data/noticeList";
import type { Notice } from "src/constants/types";

export const Inform: VFC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const notices: Notice[] = noticeList;
  const [numberOfUnread, setNumberOfUnread] = useState(0);
  const [drawerBody, setDrawerBody] = useState("index");

  useEffect(() => {
    setNumberOfUnread(noticeList.filter((notice) => !notice.isRead).length);
  }, []);

  return (
    <div>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title={drawerBody === "index" ? "通知一覧" : "通知詳細"} isFromLeft>
        <div>
          {drawerBody === "index" ? (
            <div>
              {notices.length === 0 ? (
                <p>通知がありません。</p>
              ) : (
                <ul className="border-b border-gray-300">
                  {notices.map((notice) => (
                    <li
                      key={notice.id}
                      onClick={() => setDrawerBody(notice.id)}
                      className="flex items-center p-2 hover:bg-gray-100 border-t border-gray-300 cursor-pointer"
                    >
                      {notice.isRead ? (
                        <MailOpenIcon className="mr-2 w-5 h-5" />
                      ) : (
                        <div className="relative">
                          <MailIcon className="mr-2 w-5 h-5" />
                          <div className="absolute top-0 right-2 w-2 h-2 bg-red-600 rounded-full animate-ping" />
                        </div>
                      )}
                      <p className="truncate">{notice.title}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div>
              <div className="text-right">
                <Button className="my-3" onClick={() => setDrawerBody("index")}>
                  一覧に戻る
                </Button>
              </div>
              {drawerBody !== "index" ? (
                <article
                  className="pt-10 prose"
                  dangerouslySetInnerHTML={{
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    __html: `
                      <p>本田 圭佑さんがスカウトを承認しました。</p>
                      <p>チャット画面からメッセージを送信してください。</p>
                      <a class="text-blue-600" href="/student/1">
                        本田 圭佑さんの詳細画面
                      </a>
                    `,
                  }}
                />
              ) : (
                <div />
              )}
            </div>
          )}
        </div>
      </Drawer>
      通知
      <div
        onClick={onOpen}
        className="flex justify-center items-center py-2 mb-4 hover:bg-gray-100 border cursor-pointer"
      >
        {numberOfUnread ? (
          <div className="flex items-center">
            <ExclamationIcon className="m-1 w-4 h-4 text-red-500" />
            <span className="mr-2">{`${numberOfUnread}件の未読があります`}</span>
          </div>
        ) : (
          <span className="mr-2">通知一覧</span>
        )}
        <div className="relative">
          <BellIcon
            onClick={onOpen}
            className="p-1 w-8 h-8 text-theme-dark hover:bg-gray-100 rounded-full border cursor-pointer"
          />
          {numberOfUnread > 0 && (
            <div className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full animate-ping" />
          )}
        </div>
      </div>
    </div>
  );
};
