import Index from "./Super Over League/Index";
import { Route, Routes } from "react-router-dom";
import Content from "./Content/Content";
import CongratsCard from "./Congrats Card/CongratsCard";
import SocialButtons from "./Social Buttons/SocialButtons";
import Notifications from "./Notifications/Notifications";
import Boxes from "./Boxes/Boxes";
import ReusableBanner from "./Reusable Banners";
import TechnologyCards from "./Technology Cards";
import Speedometer from "./Speedometer";
import FruitsCounter from "./Fruits Counter";
import WelcomeApp from "./Welcome App";
import LightDarkMode from "./Light Dark Mode";
import ShowHideApp from "./Show or Hide App";
import EvenOddApp from "./Even Odd App";
import DestinationSearch from "./Destination Search";
import SimpleTodos from "./Simple Todos";
import CashWithdrawal from "./Cash Withdrawal";
import GoogleSearchSuggestion from "./Google Search Suggestions";
import LettersCalculator from "./Letters Calculator";
import BrowserHistory from "./Browser History";
import FeedBackApp from "./Feedback App";
import TabExample from "./Tab Example";
import GalleryApp from "./Gallery App";
import CapitalsApp from "./Capitals App";
import AppStore from "./App Store";
import CoinTossGame from "./Coin Toss Game";
import ReviewsApp from "./Reviews App";
import ContactsApp from "./Contacts App";
import CommentsApp from "./Comments App";
import AppointmentsApp from "./Appointments App";
import MoneyManager from "./Money Manager";
import ShowHideClockExample from "./Show Hide Clock";
import DigitalTimerApp from "./Digital Timer App";
import Stopwatch from "./Stopwatch";
import FaqsApp from "./Faqs App";
import PasswordManager from "./Password Manager";
import MatchGame from "./Match Game";
import EmojiGame from "./Emoji Game";
import RoutingExample from "./Routing Example";
import RouterHome from "./Routing Example/Router Home";
import RouterAbout from "./Routing Example/Router About";
import RouterContact from "./Routing Example/Router Contact";
import CryptoCurrencyTracker from "./Crypto Currency Tracker";
import IPLDashboard from "./IPL Dashboard";
import TeamMatchDetails from "./IPL Dashboard/Team Match Details";
import NotFound from "./IPL Dashboard/IPL Not Found";
import IntroHome from "./Authentication Intro/Intro Home";
import IntroProducts from "./Authentication Intro/Intro Products";
import IntroCart from "./Authentication Intro/Intro Cart";
import IntroLogin from "./Authentication Intro/Intro Login";
import Events from "./Events";
import PopularGithubRepos from "./Popular Github Repos";
import VideoPlayer from "./Video Player";
import Recharts from "./Recharts";
import CoWINDashboard from "./CoWIN Dashboard";
import ReactChrono from "./React Chrono";
import CCBPTimeline from "./CCBP Timeline";
import ReactSlick from "./React Slick";
import PlanetsApp from "./Planets App";
import ReactPopup from "./React Popup";
import HamburgerMenu from "./Hamburger Menu";
import PrimeVideo from "./Prime Video";
import JobbyAppLogin from "./Jobby App/Jobby App Login";
import JobbyAppHome from "./Jobby App/Jobby App Home";
import JobbyAppJobs from "./Jobby App/Jobby App Jobs";
import AboutJobItem from "./Jobby App/About Job Item";

import ExtraAppointment from "./extra Appointment/index";
import ExtraEvents from "./Extra events";
import ExtraGithubRepos from "./Extra Github repos";
import LayoutBuilder from "./Layout Builder";
import Generator from "./Gradient Generator";
// import ProtectedRoute from "./Authentication Intro/Protected Route";

const App = () => (
  <>
    <Routes>
      <Route path="/" element={<Content />} exact />
      <Route path="/superOver" element={<Index />} exact />
      <Route path="/congratsCard" element={<CongratsCard />} exact />
      <Route path="/socialButtons" element={<SocialButtons />} exact />
      <Route path="/notifications" element={<Notifications />} exact />
      <Route path="/boxes" element={<Boxes />} exact />
      <Route path="/reusableBanners" element={<ReusableBanner />} exact />
      <Route path="/technologyCards" element={<TechnologyCards />} exact />
      <Route path="/speedometer" element={<Speedometer />} exact />
      <Route path="/fruitsCounter" element={<FruitsCounter />} exact />
      <Route path="/welcomeApp" element={<WelcomeApp />} exact />
      <Route path="/lightDarkMode" element={<LightDarkMode />} exact />
      <Route path="/hideShowApp" element={<ShowHideApp />} exact />
      <Route path="/evenOddApp" element={<EvenOddApp />} exact />
      <Route path="/destinationSearch" element={<DestinationSearch />} exact />
      <Route path="/simpleTodos" element={<SimpleTodos />} exact />
      <Route path="/cashWithdrawal" element={<CashWithdrawal />} exact />
      <Route
        path="/googleSearchSuggestion"
        element={<GoogleSearchSuggestion />}
        exact
      />
      <Route path="/lettersCalculator" element={<LettersCalculator />} exact />
      <Route path="/browserHistory" element={<BrowserHistory />} exact />
      <Route path="/feedbackApp" element={<FeedBackApp />} exact />
      <Route path="/tabExample" element={<TabExample />} exact />
      <Route path="/galleryApp" element={<GalleryApp />} exact />
      <Route path="/capitalsApp" element={<CapitalsApp />} exact />
      <Route path="/appStore" element={<AppStore />} exact />
      <Route path="/coinTossGame" element={<CoinTossGame />} exact />
      <Route path="/reviewsApp" element={<ReviewsApp />} exact />
      <Route path="/contactsApp" element={<ContactsApp />} exact />
      <Route path="/commentsApp" element={<CommentsApp />} exact />
      <Route path="/appointmentsApp" element={<AppointmentsApp />} exact />
      <Route path="/moneyManager" element={<MoneyManager />} exact />
      <Route path="/showHideClock" element={<ShowHideClockExample />} exact />
      <Route path="/digitalTimerApp" element={<DigitalTimerApp />} exact />
      <Route path="/stopwatch" element={<Stopwatch />} exact />
      <Route path="/faqsApp" element={<FaqsApp />} exact />
      <Route path="/passwordManager" element={<PasswordManager />} exact />
      <Route path="/matchGame" element={<MatchGame />} exact />
      <Route path="/emojiGame" element={<EmojiGame />} exact />
      <Route path="/events" element={<Events />} exact />

      <Route path="/routingExample" element={<RoutingExample />} exact />
      <Route path="/routerHome" element={<RouterHome />} exact />
      <Route path="/about" element={<RouterAbout />} exact />
      <Route path="/contact" element={<RouterContact />} exact />
      <Route
        path="/cryptoCurrencyTracker"
        element={<CryptoCurrencyTracker />}
        exact
      />
      <Route path="/iplDashboard" element={<IPLDashboard />} exact />
      <Route
        path="/iplDashboard/team-matches/:id"
        element={<TeamMatchDetails />}
        exact
      />
      <Route path="*" element={<NotFound />} />
      <Route path="/authenticationLogin" element={<IntroLogin />} exact />
      <Route path="/authenticationHome" element={<IntroHome />} exact />
      <Route path="/authenticationProducts" element={<IntroProducts />} exact />
      <Route path="/authenticationCart" element={<IntroCart />} exact />

      <Route
        path="/popularGithubRepos"
        element={<PopularGithubRepos />}
        exact
      />
      <Route path="/videoPlayer" element={<VideoPlayer />} exact />
      <Route path="/recharts" element={<Recharts />} exact />
      <Route path="/coWINDashboard" element={<CoWINDashboard />} exact />
      <Route path="/react-chrono" element={<ReactChrono />} exact />
      <Route path="/ccbp-timeline" element={<CCBPTimeline />} exact />
      <Route path="/react-slick" element={<ReactSlick />} exact />
      <Route path="/planets-app" element={<PlanetsApp />} exact />
      <Route path="/react-popup" element={<ReactPopup />} exact />
      <Route path="/hamburger-menu" element={<HamburgerMenu />} exact />
      <Route path="/prime-video" element={<PrimeVideo />} exact />

      <Route path="/jobbyApp-login" element={<JobbyAppLogin />} exact />
      <Route path="/jobbyApp-home" element={<JobbyAppHome />} exact />
      <Route path="/jobbyApp-jobs" element={<JobbyAppJobs />} exact />
      <Route path="/jobs/:id" element={<AboutJobItem />} exact />

      <Route path="/ExtraEvents" element={<ExtraEvents />} exact />
      <Route path="/ExtraGithub" element={<ExtraGithubRepos />} exact />
      <Route path="/LayoutBuilder" element={<LayoutBuilder />} exact />
      <Route path="/Generator" element={<Generator />} exact />
    </Routes>
  </>
);

export default App;
