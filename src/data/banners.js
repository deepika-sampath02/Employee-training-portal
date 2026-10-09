// Maps the "banner key" stored on each course in the backend to the image in src/assets.
// To add a banner for a new course: import the image here and add a key for it.
// (In the Django admin, put that key in the course's "Banner key" field.)
import pythonBanner from "../assets/python_banner.png";
import reactBanner from "../assets/react_banner.png";
import sqlBanner from "../assets/sql_banner.png";
import communicationBanner from "../assets/communication_banner.png";
import excelBanner from "../assets/excel_banner.png";
import timeBanner from "../assets/time_banner.png";
import leadershipBanner from "../assets/leadership_banner.svg";
import presentationBanner from "../assets/presentation_banner.svg";

const bannerMap = {
  python: pythonBanner,
  react: reactBanner,
  sql: sqlBanner,
  communication: communicationBanner,
  excel: excelBanner,
  time: timeBanner,
  leadership: leadershipBanner,
  presentation: presentationBanner,
};

export default bannerMap;
