import clsx from "clsx";
import type { VFC } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Message } from "src/constants/data/chatList";
import { chatList } from "src/constants/data/chatList";

type Props = {
  studentName: string;
};

export const Chat: VFC<Props> = (props) => {
  const [comment, setComment] = useState("");
  const [chat, setChat] = useState<Message[]>(chatList[0]?.messages);
  const currentUser = { name: "株式会社サンプル" };

  const inputComment = useCallback(
    (event) => {
      setComment(event.target.value);
    },
    [setComment]
  );

  const submit = async () => {
    const newMessage: Message = {
      id: chat.length + 1,
      role: "company",
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
      <div className="overflow-y-scroll w-[600px] h-80 bg-gray-100 xl:w-[800px]" id="chat">
        {chat.length === 0 && <p className="p-4 m-2 bg-white rounded">学生が最初のメッセージを待っています！</p>}
        {chat.map((item, index) => (
          <div
            key={item.timestamp}
            className={clsx([
              {
                ["text-right"]: item.role === "company",
                ["text-left"]: item.role === "student",
              },
            ])}
          >
            {index === chat.length - 1 && <p className="text-xs text-center text-red-500">- 最新のメッセージ -</p>}
            <div className="inline-block m-2 text-left">
              <div>
                <small className="text-gray-500">{item.timestamp}</small>
                <p className="text-xs">{item.role === "company" ? currentUser?.name : props.studentName}</p>
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
      <div className="flex justify-center items-center p-2 w-[600px] h-20 bg-gray-100 border-t border-gray-400 xl:w-[800px]">
        <textarea
          name="comment"
          id="comment"
          value={comment}
          placeholder="メッセージを入力してください"
          className="p-1 w-5/6 h-14 leading-none rounded border border-gray-300 resize-none"
          onChange={inputComment}
        />
        <button
          onClick={submit}
          disabled={!comment}
          className="mx-3 w-14 h-14 font-bold text-white bg-blue-500 rounded"
        >
          送信
        </button>
      </div>
    </div>
  );
};
