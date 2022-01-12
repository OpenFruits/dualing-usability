import Image from "next/image";
import { useRouter } from "next/router";
import type { VFC } from "react";
import { Button } from "src/component/Button";

type Props = {
  pageTitle: string;
  href: string;
};

export const Header: VFC<Props> = (props) => {
  const router = useRouter();
  return (
    <div className="pb-14">
      <header className="fixed top-0 z-30 w-full h-14 bg-white border-b">
        <div className="flex justify-between items-center px-2">
          <Image
            src="/dualing_logo.webp"
            alt="logo"
            loading="eager"
            width={185}
            height={56}
            onClick={() => router.push(props.href)}
            className="cursor-pointer"
          />
          {props.pageTitle ? (
            <div className="mr-2 text-lg font-bold">{props.pageTitle}</div>
          ) : (
            <div className="mx-4">
              <Button className="rounded" onClick={() => router.push("/mypage")}>
                学生版デモ
              </Button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};
