import CookieBanner from "./component/Cookie/Cookie";
import Main from "./component/Section/Main/Main";
import AboutUs from "./component/Section/AboutUs/AboutUs";
import FirstTime from "./component/Section/FirstTime/FirstTime";
import Sermons from "./component/Section/Sermons/Sermons";
import Needs from "./component/Section/Needs/Needs";
import Questions from "./component/Section/Questions/Questions";
import Question from "./component/Section/Question/Question";
import Quote from "./component/Section/Quote/Quote";
import News from "./component/Section/News/News";
import MapPage from "./component/Section/Map/Map";
import CalendarPage from "./component/Section/Kalendar/Kalendar";


export default function Home() {
  return (
    <div>
      <CookieBanner />
      <Main/>
      <AboutUs/>
      <FirstTime/>
      <Sermons/>
      <CalendarPage/>
      <Needs/>
      <Question/>
      <Questions/>
      <Quote/>
      <News/>
      <MapPage/>
    </div>
  );
}
