import { Switch } from "@headlessui/react";
import cc from "classcat";
import type { VFC } from "react";
import { useEffect } from "react";
import { useCallback, useState } from "react";
import Select from "react-select";
import { Inform } from "src/component/company/Inform";
import { Header } from "src/component/Header";
import { advantageOptions } from "src/constants/options/advantage";
import { importantOptions } from "src/constants/options/important";
import { industryOptions } from "src/constants/options/industry";
import { locationOptions } from "src/constants/options/location";
import { occupationOptions } from "src/constants/options/occupation";
import { universityOptions } from "src/constants/options/university";
import { searchState } from "src/state/search";

type Props = {
  children: React.ReactNode;
};

const currentUser = {
  name: "株式会社サンプル",
};

export const CompanyLayout: VFC<Props> = (props) => {
  const [showOption, setShowOption] = useState<string>("");
  const [isBookmark, setIsBookmark] = useState(false);
  const [isScout, setIsScout] = useState(false);
  const [isMatch, setIsMatch] = useState(false);
  const [university, setUniversity] = useState(undefined);
  const [important, setImportant] = useState(undefined);
  const [industries, setIndustries] = useState(undefined);
  const [occupations, setOccupations] = useState(undefined);
  const [locations, setLocations] = useState(undefined);
  const [advantages, setAdvantages] = useState(undefined);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchOptions, setSearchOptions] = useState([
    university,
    important,
    industries,
    occupations,
    locations,
    advantages,
  ]);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const canSearch: boolean =
    university !== searchOptions[0] ||
    important !== searchOptions[1] ||
    industries !== searchOptions[2] ||
    occupations !== searchOptions[3] ||
    locations !== searchOptions[4] ||
    advantages !== searchOptions[5];

  const OPTION_ITEMS = [
    { type: "bookmark", label: "保存済みの学生を表示" },
    { type: "scout", label: "スカウトした学生を表示" },
    { type: "match", label: "マッチした学生を表示" },
  ];

  const changeOption = (option: string) => {
    showOption === option ? setShowOption("") : setShowOption(option);
    if (option === "bookmark") setIsBookmark(!isBookmark);
    if (option === "scout") setIsScout(!isScout);
    if (option === "match") setIsMatch(!isMatch);
  };

  const updateResult = searchState.setResult;

  useEffect(() => {
    if (showOption === "bookmark") updateResult("保存済みの学生");
    if (showOption === "scout") updateResult("スカウト済みの学生");
    if (showOption === "match") updateResult("マッチしている学生");
    if (showOption === "") updateResult("全学生");
  }, [showOption, updateResult]);

  const inputUniversity = useCallback((e) => setUniversity(e?.value), [setUniversity]);

  const inputImportant = useCallback((e) => setImportant(e?.value), [setImportant]);

  const inputIndustries = useCallback((e) => setIndustries(e?.value), [setIndustries]);

  const inputOccupations = useCallback((e) => setOccupations(e?.value), [setOccupations]);

  const inputLocations = useCallback((e) => setLocations(e?.value), [setLocations]);

  const inputAdvantages = useCallback((e) => setAdvantages(e?.value), [setAdvantages]);

  const search = () => {
    const universityResult = university ? `【${university}】` : "";
    const importantResult = important ? `【${important}】` : "";
    const industriesResult = industries ? `【${industries}】` : "";
    const occupationsResult = occupations ? `【${occupations}】` : "";
    const locationsResult = locations ? `【${locations}】` : "";
    const advantagesResult = advantages ? `【${advantages}】` : "";
    const result = `${universityResult}${importantResult}${industriesResult}${occupationsResult}${locationsResult}${advantagesResult}`;
    updateResult(result === "" ? "全学生" : result);
  };

  return (
    <div>
      <Header pageTitle="" href="/" />
      <div className="flex">
        <aside className="fixed top-14 left-0 p-4 w-72 h-screen border-r">
          <h2 className="pb-2 mb-2 text-2xl border-b">{`${currentUser.name} 様`}</h2>
          <Inform />
          <div className="pb-2 mb-4 border-b">
            <div>
              <span className="text-gray-700">条件を指定して検索</span>
              <Select
                id={"university"}
                instanceId={"university"}
                inputId={"university"}
                isClearable
                placeholder="大学を指定"
                options={universityOptions}
                onChange={inputUniversity}
                className="mb-2"
              />
              <Select
                id={"important"}
                instanceId={"important"}
                inputId={"important"}
                isClearable
                placeholder="会社選びの軸を指定"
                options={importantOptions}
                onChange={inputImportant}
                className="mb-2"
              />
              <Select
                id={"industry"}
                instanceId={"industry"}
                inputId={"industry"}
                isClearable
                placeholder="興味のある業界を指定"
                options={industryOptions}
                onChange={inputIndustries}
                className="my-2"
              />
              <Select
                id={"occupation"}
                instanceId={"occupation"}
                inputId={"occupation"}
                isClearable
                placeholder="興味のある職種を指定"
                options={occupationOptions}
                onChange={inputOccupations}
                className="my-2"
              />
              <Select
                id={"locations"}
                instanceId={"locations"}
                inputId={"locations"}
                isClearable
                placeholder="希望勤務地を指定"
                options={locationOptions}
                onChange={inputLocations}
                className="my-2"
              />
              <Select
                id={"advantage"}
                instanceId={"advantage"}
                inputId={"advantage"}
                isClearable
                placeholder="強みを指定"
                options={advantageOptions}
                onChange={inputAdvantages}
                className="my-2"
              />
            </div>
            <div className="flex justify-end">
              <button
                disabled={!canSearch}
                onClick={search}
                className={cc([
                  "text-white font-bold text-sm p-2 ml-2 rounded",
                  {
                    ["bg-theme hover:bg-theme-light focus:outline-none"]: canSearch,
                    ["bg-theme-light cursor-default"]: !canSearch,
                  },
                ])}
              >
                検索
              </button>
            </div>
          </div>
          <div className="pb-2 mb-4">
            <p>表示オプション</p>
            {OPTION_ITEMS.map((option) => (
              <div
                key={option.type}
                className={cc([
                  "border p-2 mb-1",
                  {
                    ["bg-theme-light"]: showOption === option.type,
                  },
                ])}
              >
                <Switch.Group>
                  <Switch
                    checked={showOption === option.type}
                    onChange={() => changeOption(option.type)}
                    className={`${showOption === option.type ? "bg-theme" : "bg-gray-500"}
          relative translate-y-0.5 inline-flex flex-shrink-0 h-5 w-8 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span
                      className={`${showOption === option.type ? "translate-x-3" : "translate-x-0"}
                    pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-md transform ring-0 transition ease-in-out duration-200`}
                    />
                  </Switch>
                  <Switch.Label className="ml-2">{option.label}</Switch.Label>
                </Switch.Group>
              </div>
            ))}
          </div>
        </aside>
        <main className="px-14 pt-10 pb-20 ml-72 w-screen min-h-[calc(100vh-56px)] bg-theme-light bg-cover">
          {props.children}
        </main>
      </div>
    </div>
  );
};
