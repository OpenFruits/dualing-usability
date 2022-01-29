import { ExternalLinkIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "src/component/Button";
import { Header } from "src/component/Header";
import { Layout } from "src/component/Layout";
import { Chat } from "src/component/student/Chat";
import { companyList } from "src/constants/data/companyList";

const CompanyId: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as unknown as number;
  const company = companyList[id - 1];

  return (
    <>
      <Header pageTitle="チャット" href="/mypage" />
      <Layout>
        <div className="m-auto w-full sm:w-[600px] lg:w-[800px]">
          <div className="sm:flex sm:flex-row-reverse sm:justify-between">
            <div className="flex justify-end my-2 mx-2">
              <Button className="h-10 rounded" onClick={() => router.push("/mypage")}>
                戻る
              </Button>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{company?.name}</h1>
              <p className="text-sm font-normal">{company?.industry}</p>
            </div>
          </div>
          <div className="py-2 my-2 border-t-2">
            <p>【求める職種】</p>
            <p>{company?.occupations.join(", ")}</p>
            <div className="py-1.5" />
            <p>【企業サイト】</p>
            <div className="inline-block">
              <Link href={company?.corporateUrl || ""}>
                <a className="flex items-center hover:text-gray-500">
                  <p className="mr-1">{company?.corporateUrl}</p>
                  <ExternalLinkIcon className="w-5 h-5" />
                </a>
              </Link>
            </div>
            <div className="py-1.5" />
            <p>【採用サイト】</p>
            <div className="inline-block">
              <Link href={company?.recruitUrl || ""}>
                <a className="flex items-center hover:text-gray-500">
                  <p className="mr-1">{company?.recruitUrl}</p>
                  <ExternalLinkIcon className="w-5 h-5" />
                </a>
              </Link>
            </div>
          </div>
          <Chat chatId={String(id)} />
        </div>
      </Layout>
    </>
  );
};

export default CompanyId;
