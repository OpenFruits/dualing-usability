import Vimeo from "@u-wave/react-vimeo";
import type { NextPage } from "next";
import { useState } from "react";
import { Footer } from "src/component/Footer";
import { Header } from "src/component/Header";
import { Inform } from "src/component/student/Inform";
import { MatchingList } from "src/component/student/MatchingList";
import { Profile } from "src/component/student/Profile";
import { ScoutList } from "src/component/student/ScoutList";
import { studentList } from "src/constants/data/studentList";

const Mypage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const loaded = () => setIsLoading(false);

  return (
    <div className="box-border relative pb-[140px] min-h-screen">
      <Header pageTitle="マイページ" />
      <div className="m-auto sm:w-2/3">
        <Inform />
        <Profile />
        <div>
          {isLoading && (
            <div className="aspect-video grid place-items-center m-2 text-2xl text-gray-800 bg-gray-400">
              Loading...
            </div>
          )}
          <Vimeo
            video={studentList[0].vimeoUrl}
            responsive
            onLoaded={loaded}
            className={isLoading ? "hidden" : "m-2"}
          />
          <ScoutList />
          <MatchingList />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Mypage;
