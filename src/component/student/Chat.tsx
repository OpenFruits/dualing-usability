import clsx from "clsx";
import type { VFC } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Message } from "src/constants/data/chatList";
import { chatList } from "src/constants/data/chatList";
import { studentList } from "src/constants/data/studentList";

type Props = {
  chatId: string;
};

export const Chat: VFC<Props> = (props) => {
  const [comment, setComment] = useState("");
  const index = Number(props.chatId) - 1;
  const [chat, setChat] = useState<Message[]>(chatList[index]?.messages);

  const inputComment = useCallback(
    (event) => {
      setComment(event.target.value);
    },
    [setComment]
  );

  const submit = () => {
    const newMessage: Message = {
      id: chat.length + 1,
      role: "student",
      timestamp: "2021/12/15 16:00",
      message: comment,
    };
    setChat([...chat, newMessage]);
    setComment("");
  };

  // 自動スクロール
  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottomOfList = useCallback(() => {
    messageEndRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messageEndRef]);

  useEffect(() => {
    scrollToBottomOfList();
  }, [chat, scrollToBottomOfList]);

  return (
    <div>
      <div className="overflow-y-scroll h-[calc(100vh-470px)] bg-gray-100 rounded-t">
        {chat?.map((item, index) => (
          <div
            key={item.id}
            className={clsx([
              {
                ["text-right"]: item.role === "student",
                ["text-left"]: item.role === "company",
              },
            ])}
          >
            {index === chat.length - 1 && <p className="text-xs text-center text-red-500">- 最新のメッセージ -</p>}
            <div className="inline-block m-2 text-left">
              <div>
                <small className="text-gray-500">{item.timestamp}</small>
                <p className="text-xs">
                  {item.role === "company"
                    ? "株式会社サンプル"
                    : `${studentList[0].firstName} ${studentList[0].lastName}`}
                </p>
              </div>
              <p
                className={clsx([
                  "text-sm bg-white inline-block p-2 border rounded-2xl whitespace-pre-wrap",
                  {
                    ["border-theme-dark"]: item.role === "company",
                    ["border-theme"]: item.role === "student",
                  },
                ])}
              >
                {item.message}
              </p>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <div className="flex justify-center items-center p-2 h-20 bg-gray-100 rounded-b border-t border-gray-400">
        <textarea
          name="comment"
          id="comment"
          value={comment}
          placeholder="メッセージを入力してください"
          className="p-1 w-5/6 h-14 leading-none rounded border border-gray-300 resize-none"
          onChange={inputComment}
        />
        <button onClick={submit} className="mx-3 w-14 h-14 font-bold text-white bg-blue-500 rounded">
          送信
        </button>
      </div>
    </div>
  );
};
