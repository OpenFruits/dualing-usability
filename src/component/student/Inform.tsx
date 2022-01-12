/* eslint-disable @typescript-eslint/no-unused-vars */
import { BellIcon, MailIcon } from "@heroicons/react/outline";
import { ExclamationIcon, MailOpenIcon } from "@heroicons/react/outline";
import type { VFC } from "react";
import { useEffect, useState } from "react";
import { Button } from "src/component/Button";
import { Drawer } from "src/component/Drawer";
import type { Notice } from "src/constants/types";

const defalutNoticeState: Notice = {
  id: "",
  title: "",
  body: "",
  isRead: false,
};

export const Inform: VFC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [notice, setNotice] = useState<Notice>(defalutNoticeState);
  const [numberOfUnread, setNumberOfUnread] = useState(0);
  const [drawerBody, setDrawerBody] = useState("index");

  // ログインユーザーのnoticeリストを取得しセット
  const getNoticeList = async () => {
    // if (currentUser) {
    //   const ref = collection(db, "users", currentUser.uid, "notices");
    //   const q = query(ref, orderBy("created_at", "desc"));
    //   const snapShot = await getDocs(q);
    //   const _notices = snapShot.docs.map((s) => {
    //     return {
    //       id: s.id,
    //       title: s.get("title"),
    //       body: s.get("body"),
    //       isRead: s.get("isRead"),
    //     };
    //   });
    //   setNotices(_notices);
    // }
  };

  // ログインユーザーの未読数を取得しセット
  const getNumberOfUnread = async () => {
    // if (currentUser) {
    //   const ref = collection(db, "users", currentUser.uid, "notices");
    //   const q = query(ref, where("isRead", "==", false));
    //   const snapShot = await getDocs(q);
    //   setNumberOfUnread(snapShot.docs.length);
    // }
  };

  // ドロワーの表示を切り替え（一覧or詳細）
  const getDrawerBody = async () => {
    if (drawerBody === "index") return;

    // if (currentUser) {
    //   const ref = doc(db, "users", currentUser.uid, "notices", drawerBody);
    //   const docSnap = await getDoc(ref);
    //   setNotice({
    //     id: docSnap.id,
    //     title: String(docSnap.data()?.title),
    //     body: String(docSnap.data()?.body),
    //     isRead: docSnap.data()?.isRead,
    //   });
    //   if (!docSnap.data()?.isRead) {
    //     await updateDoc(ref, { isRead: true }).then(() => {
    //       getNoticeList();
    //       getNumberOfUnread();
    //     });
    //   }
    // }
  };

  // useEffect(() => {
  //   getNoticeList();
  // }, [currentUser]);

  // useEffect(() => {
  //   getNumberOfUnread();
  // }, [currentUser, notices]);

  // useEffect(() => {
  //   getDrawerBody();
  // }, [drawerBody]);

  useEffect(() => {
    !isOpen && setDrawerBody("index");
  }, [isOpen]);

  return (
    <div className="flex justify-end items-center py-2 pr-6 border-b">
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title={drawerBody === "index" ? "通知一覧" : "通知詳細"}>
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
              {notice?.id === drawerBody ? (
                <article
                  className="pt-10 prose"
                  dangerouslySetInnerHTML={{
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    __html: `${notice?.body}`,
                  }}
                />
              ) : (
                <div />
              )}
            </div>
          )}
        </div>
      </Drawer>
      {numberOfUnread ? (
        <div onClick={onOpen} className="flex items-center">
          <ExclamationIcon className="m-1 w-4 h-4 text-red-500" />
          <span className="mr-2 text-sm">{`${numberOfUnread}件の未読があります`}</span>
        </div>
      ) : (
        <span onClick={onOpen} className="mr-2 text-lg">
          通知一覧
        </span>
      )}
      <div className="relative">
        <BellIcon
          onClick={onOpen}
          className="p-1 w-8 h-8 text-theme-dark hover:bg-gray-100 rounded-full border cursor-pointer"
        />
        {numberOfUnread > 0 && <div className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full animate-ping" />}
      </div>
    </div>
  );
};
