import home from "./home";
import subject from "./subject";
import exam from "./exam";
import packages from "./packages";
import practice from "./practice";
import liveLessons from "./live-lessons";
import courses from "./courses";
import profile from "./profile";
import section from "./section";
import competition from "./competition";

export default ($axios) => {
  return {
    subject: subject($axios),
    home: home($axios),
    exam: exam($axios),
    packages: packages($axios),
    practice: practice($axios),
    liveLessons: liveLessons($axios),
    courses: courses($axios),
    profile: profile($axios),
    section: section($axios),
    competition: competition($axios),
  };
};
