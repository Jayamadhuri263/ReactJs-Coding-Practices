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
import MultilingualGreeting from "./MultilingualGreeting";
import MyTasks from "./MyTasks";
import ShowHideClockExample from "./Show Hide Clock";
import DigitalTimerApp from "./Digital Timer App";
import EditableText from "./EditableText";
import Stopwatch from "./Stopwatch";
import FaqsApp from "./Faqs App";
import PasswordManager from "./Password Manager";
import MatchGame from "./Match Game";
import MusicPlaylist from "./MusicPlaylist";
import EmojiGame from "./Emoji Game";
import RoutingExample from "./Routing Example";
import RouterHome from "./Routing Example/Router Home";
import RouterAbout from "./Routing Example/Router About";
import RouterContact from "./Routing Example/Router Contact";
import CryptoCurrencyTracker from "./Crypto Currency Tracker";
import IPLDashboard from "./IPL Dashboard";
import TeamMatchDetails from "./IPL Dashboard/Team Match Details";
import NotFound from "./NotFound/NotFound";
import IntroHome from "./Authentication Intro/Intro Home";
import IntroProducts from "./Authentication Intro/Intro Products";
import IntroCart from "./Authentication Intro/Intro Cart";
import IntroLogin from "./Authentication Intro/Intro Login";
import Events from "./Events";
import PopularGithubRepos from "./Popular Github Repos";
import VideoPlayer from "./Video Player";
import WordCounter from "./WordCounter";
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

import ExtraEvents from "./Extra events";
import ExtraGithubRepos from "./Extra Github repos";
import LayoutBuilder from "./Layout Builder";
import Generator from "./Gradient Generator";
import RockPaperScissors from "./Rock Paper Scissors";
import TechEra from "./TechEra";
import TechEraCourseDetails from "./TechEra/CourseDetails";
import VisitCountries from "./VisitCountries";
import WeatherApp from "./WeatherApp";
import Portfolio from "./Portfolio";
import UserLogin from "./FinanceMobility/user-login/UserLogin";
import UserRegistration from "./FinanceMobility/user-registration/UserRegistration";
import SelfTransactionPayment from "./FinanceMobility/self-transaction-payment/SelfTransactionPayment";
import PreConfirmPage from "./FinanceMobility/self-transaction-payment/pre-confirm-page/PreConfirmPage";
import ConfirmPage from "./FinanceMobility/self-transaction-payment/confirm-page/ConfirmPage";
import MobilityPayment from "./FinanceMobility/mobility-payment/MobilityPayment";
import MobilityForgotPassword from "./FinanceMobility/mobility-forgot-password/MobilityForgotPassword";
import MobilityHome from "./FinanceMobility/mobility-home/MobilityHome";
import AuthorizePreConfirm from "./FinanceMobility/mobility-home/authorize-pre-confirm/AuthorizePreConfirm";
import RejectPreConfirm from "./FinanceMobility/mobility-home/reject-pre-confirm/RejectPreConfirm";
import AuthorizeConfirm from "./FinanceMobility/mobility-home/authorize-confirm/AuthorizeConfirm";
import RejectConfirm from "./FinanceMobility/mobility-home/reject-confirm/RejectConfirm";
import FileUpload from "./FinanceMobility/mobility-home/file-upload/FileUpload";
import FileVerify from "./FinanceMobility/mobility-home/file-verify/FileVerify";
import FileRejectPreconfirm from "./FinanceMobility/mobility-home/file-reject-preconfirm/FileRejectPreconfirm";
import FileVerifyConfirm from "./FinanceMobility/mobility-home/file-verify-confirm/FileVerifyConfirm";
import FileRejectConfirm from "./FinanceMobility/mobility-home/file-reject-confirm/FileRejectConfirm";
import QrCodeDetails from "./FinanceMobility/mobility-home/qr-code-details/QrCodeDetails";
import UserProfile from "./FinanceMobility/mobility-home/mobility-header/user-profile/UserProfile";
import FinanceMobilityRoot from "./FinanceMobility/FinanceMobilityRoot";
import OAuthComponent from "./Oauth-react-js";
import HabitsApp from "./Habits App/index.js";
import ReduxPractice from "./Redux Practice/index.js";
// import ProtectedRoute from "./Authentication Intro/Protected Route";

const App = () => (
  
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
      <Route
        path="/multilingualGreeting"
        element={<MultilingualGreeting />}
        exact
      />
      <Route path="/myTasks" element={<MyTasks />} exact />
      <Route path="/showHideApp" element={<ShowHideApp />} exact />
      <Route path="/showHideClock" element={<ShowHideClockExample />} exact />
      <Route path="/digitalTimerApp" element={<DigitalTimerApp />} exact />
      <Route path="/editableText" element={<EditableText />} exact />
      <Route path="/stopwatch" element={<Stopwatch />} exact />
      <Route path="/faqsApp" element={<FaqsApp />} exact />
      <Route path="/passwordManager" element={<PasswordManager />} exact />
      <Route path="/matchGame" element={<MatchGame />} exact />
      <Route path="/emojiGame" element={<EmojiGame />} exact />
      <Route path="/events" element={<Events />} exact />
      <Route path="/rock-paper-scissors" element={<RockPaperScissors />} exact />
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
      <Route path="/musicPlaylist" element={<MusicPlaylist />} exact />
      <Route path="/visitCountries" element={<VisitCountries />} exact />
      <Route path="/tech-era" element={<TechEra />} exact />
      <Route
        path="/tech-era/courses/:id"
        element={<TechEraCourseDetails />}
        exact
      />
      <Route path="/weatherApp" element={<WeatherApp />} exact />
      <Route path="/portfolio" element={<Portfolio />} exact />
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
      <Route path="/wordCounter" element={<WordCounter />} exact />
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
      <Route path="/OAuth-example" element={<OAuthComponent />} exact />
      <Route path="/habitsApp" element={<HabitsApp />} exact />
      <Route path="/redux-practice" element={<ReduxPractice/>} />      

      {/* <SelfPaymentProvider> */}
        <Route
          path="/mobility-login"
          element={
            <FinanceMobilityRoot>
              <UserLogin />
            </FinanceMobilityRoot>
          }
          exact
        />
        <Route
          path="/mobility-user-registration"
          element={
            <FinanceMobilityRoot>
              <UserRegistration />
            </FinanceMobilityRoot>
          }
          exact
        />
        <Route
          path="/mobility-self-initiation"
          element={
            <FinanceMobilityRoot>
              <SelfTransactionPayment />
            </FinanceMobilityRoot>
          }
          exact
        />
        <Route
          path="/mobility-self-pre-confirm"
          element={
            <FinanceMobilityRoot>
              <PreConfirmPage />
            </FinanceMobilityRoot>
          }
          exact
        />
        <Route
          path="/mobility-self-confirm"
          element={
            <FinanceMobilityRoot>
              <ConfirmPage />
            </FinanceMobilityRoot>
          }
          exact
        />
        <Route
          path="/mobility-payment"
          element={
            <FinanceMobilityRoot>
              <MobilityPayment />
            </FinanceMobilityRoot>
          }
          exact
        />
        <Route
          path="/mobility-forgot-password"
          element={
            <FinanceMobilityRoot>
              <MobilityForgotPassword />
            </FinanceMobilityRoot>
          }
          exact
        />
        <Route
          path="/mobility-home"
          element={
            <FinanceMobilityRoot>
              <MobilityHome />
            </FinanceMobilityRoot>
          }
          exact
        />
        <Route
          path="/mobility-payments"
          element={
            <FinanceMobilityRoot>
              <MobilityHome />
            </FinanceMobilityRoot>
          }
          exact
        />
        <Route
          path="/mobility-user-profile"
          element={
            <FinanceMobilityRoot>
              <UserProfile />
            </FinanceMobilityRoot>
          }
          exact
        />
        <Route
          path="/mobility-authorize-pre-confirm/:referenceNo"
          element={
            <FinanceMobilityRoot>
              <AuthorizePreConfirm />
            </FinanceMobilityRoot>
          }
          exact
        />
        <Route
          path="/mobility-reject-pre-confirm/:referenceNo"
          element={
            <FinanceMobilityRoot>
              <RejectPreConfirm />
            </FinanceMobilityRoot>
          }
          exact
        />
        <Route
          path="/mobility-file-upload"
          element={
            <FinanceMobilityRoot>
              <FileUpload />
            </FinanceMobilityRoot>
          }
          exact
        />
        <Route
          path="/mobility-file-verify/:referenceNo"
          element={
            <FinanceMobilityRoot>
              <FileVerify />
            </FinanceMobilityRoot>
          }
          exact
        />
        <Route
          path="/mobility-file-reject-pre-confirm/:referenceNo"
          element={
            <FinanceMobilityRoot>
              <FileRejectPreconfirm />
            </FinanceMobilityRoot>
          }
          exact
        />
        <Route
          path="/mobility-authorize-confirmation/:referenceNo"
          element={
            <FinanceMobilityRoot>
              <AuthorizeConfirm />
            </FinanceMobilityRoot>
          }
          exact
        />
        <Route
          path="/mobility-reject-confirmation/:referenceNo"
          element={
            <FinanceMobilityRoot>
              <RejectConfirm />
            </FinanceMobilityRoot>
          }
          exact
        />
        <Route
          path="/mobility-file-verify-confirmation/:referenceNo"
          element={
            <FinanceMobilityRoot>
              <FileVerifyConfirm />
            </FinanceMobilityRoot>
          }
          exact
        />
        <Route
          path="/mobility-file-verify-reject-confirmation/:referenceNo"
          element={
            <FinanceMobilityRoot>
              <FileRejectConfirm />
            </FinanceMobilityRoot>
          }
          exact
        />
        <Route
          path="/mobility-qr-code/:referenceNo"
          element={
            <FinanceMobilityRoot>
              <QrCodeDetails />
            </FinanceMobilityRoot>
          }
          exact
        />

        <Route path="*" element={<NotFound />} />
      {/* </SelfPaymentProvider> */}
    </Routes>
  
);

export default App;
