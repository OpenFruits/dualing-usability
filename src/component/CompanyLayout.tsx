import { Switch } from "@headlessui/react";
import cc from "classcat";
import type { VFC } from "react";
import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { Inform } from "src/component/company/Inform";
import { Header } from "src/component/Header";
import { companyList } from "src/constants/data/companyList";
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

const currentUser = companyList[0];

export const CompanyLayout: VFC<Props> = (props) => {
  const updateResult = searchState.setResult;

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
  const [searchOptions, setSearchOptions] = useState([
    university,
    important,
    industries,
    occupations,
    locations,
    advantages,
  ]);

  const hasSearch: boolean =
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

  useEffect(() => {
    if (showOption === "bookmark") updateResult("保存済みの学生");
    if (showOption === "scout") updateResult("スカウト済みの学生");
    if (showOption === "match") updateResult("マッチしている学生");
    if (showOption === "") search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showOption, updateResult]);

  // 各オプションの選択
  const inputUniversity = useCallback((e) => setUniversity(e?.value), [setUniversity]);
  const inputImportant = useCallback((e) => setImportant(e?.value), [setImportant]);
  const inputIndustries = useCallback((e) => setIndustries(e?.value), [setIndustries]);
  const inputOccupations = useCallback((e) => setOccupations(e?.value), [setOccupations]);
  const inputLocations = useCallback((e) => setLocations(e?.value), [setLocations]);
  const inputAdvantages = useCallback((e) => setAdvantages(e?.value), [setAdvantages]);

  const search = () => {
    setSearchOptions([university, important, industries, occupations, locations, advantages]);
    const universityResult = university ? `【${university}】` : "";
    const importantResult = important ? `【${important}】` : "";
    const industriesResult = industries ? `【${industries}】` : "";
    const occupationsResult = occupations ? `【${occupations}】` : "";
    const locationsResult = locations ? `【${locations}】` : "";
    const advantagesResult = advantages ? `【${advantages}】` : "";
    const result = `${universityResult}${importantResult}${industriesResult}${occupationsResult}${locationsResult}${advantagesResult}`;
    result.length && updateResult(result);
    if (result === "" && showOption === "bookmark") updateResult("保存済みの学生");
    if (result === "" && showOption === "scout") updateResult("スカウト済みの学生");
    if (result === "" && showOption === "match") updateResult("マッチしている学生");
    if (result === "" && showOption === "") updateResult("全学生");
  };

  const SELECT_ITEMS = [
    { id: "university", ja: "大学", options: universityOptions, input: inputUniversity },
    { id: "important", ja: "会社選びの軸", options: importantOptions, input: inputImportant },
    { id: "industry", ja: "興味のある業界", options: industryOptions, input: inputIndustries },
    { id: "occupation", ja: "興味のある職種", options: occupationOptions, input: inputOccupations },
    { id: "location", ja: "希望勤務地", options: locationOptions, input: inputLocations },
    { id: "advantage", ja: "強み", options: advantageOptions, input: inputAdvantages },
  ];

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
              {SELECT_ITEMS.map((item) => (
                <Select
                  key={item.id}
                  id={item.id}
                  instanceId={item.id}
                  inputId={item.id}
                  isClearable
                  placeholder={`${item.ja}を指定`}
                  options={item.options}
                  onChange={item.input}
                  className="mb-2"
                />
              ))}
            </div>
            <div className="flex justify-end">
              <button
                disabled={!hasSearch}
                onClick={search}
                className={cc([
                  "text-white font-bold text-sm p-2 ml-2 rounded",
                  {
                    ["bg-theme hover:bg-theme-light focus:outline-none"]: hasSearch,
                    ["bg-theme-light cursor-default"]: !hasSearch,
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
