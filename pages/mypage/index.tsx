import Vimeo from "@u-wave/react-vimeo";
import type { NextPage } from "next";
import { Footer } from "src/component/Footer";
import { Header } from "src/component/Header";
import { Inform } from "src/component/student/Inform";
import { MatchingList } from "src/component/student/MatchingList";
import { Profile } from "src/component/student/Profile";
import { ScoutList } from "src/component/student/ScoutList";
import { studentList } from "src/data/studentList";

const Mypage: NextPage = () => {
  return (
    <div className="box-border relative pb-[140px] min-h-screen">
      <Header pageTitle="マイページ" href={`/`} />
      <div className="m-auto sm:w-2/3">
        <Inform />
        <Profile />
        {/* {condition === "reserved" && <Booking />} */}
        {/* {condition === "shooting" && <Booking />} */}
        {/* {condition === "waiting" && <GrayBox />} */}
        <div>
          <Vimeo video={studentList[0].vimeoUrl} responsive className="m-2" />
          <ScoutList />
          <MatchingList />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Mypage;
