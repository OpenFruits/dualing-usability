import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/solid";
import type { VFC } from "react";
import { ScoutedCompany } from "src/component/student/ScoutedCompany";
import { companyList } from "src/constants/data/companyList";
import type { Company } from "src/constants/types";

export const ScoutList: VFC = () => {
  const companies: Company[] = companyList;

  return (
    <div className="my-2 mx-1">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between p-3 w-full text-lg font-bold text-left text-theme-dark bg-gray-100 hover:bg-gray-200 rounded-lg focus:outline-none focus-visible:ring">
              <span>スカウト一覧</span>
              {!open && <PlusIcon className="w-6 h-6 text-theme-dark" />}
              {open && <MinusIcon className="w-6 h-6 text-theme-dark" />}
            </Disclosure.Button>
            <Disclosure.Panel className="py-2 px-1 text-sm text-theme-dark">
              {companies.length ? (
                companies.map((company) => (
                  <div key={company.id} className="py-1 border-t">
                    <ScoutedCompany company={company} />
                  </div>
                ))
              ) : (
                <div>スカウトがありません</div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};
