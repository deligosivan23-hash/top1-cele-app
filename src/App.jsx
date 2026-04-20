import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import BottomNav from './components/BottomNav';

// Screens
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import TopicDetailScreen from './screens/TopicDetailScreen';
import PracticeSetupScreen from './screens/PracticeSetupScreen';
import PracticeSessionScreen from './screens/PracticeSessionScreen';
import PracticeSummaryScreen from './screens/PracticeSummaryScreen';
import ExamSetupScreen from './screens/ExamSetupScreen';
import ExamSessionScreen from './screens/ExamSessionScreen';
import ExamResultsScreen from './screens/ExamResultsScreen';

// Coming Soon placeholder (stats only)
function ComingSoon({ label }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-6">
      <p className="text-2xl font-black text-primary mb-2">{label}</p>
      <p className="text-sm text-gray-400">Coming in the next session.</p>
    </div>
  );
}

// BottomNav hidden during active exam session (full-screen)
const HIDE_NAV_PATHS = ['/exam/session'];

function Layout() {
  const { pathname } = useLocation();
  const hideNav = HIDE_NAV_PATHS.includes(pathname);

  return (
    <div className="relative mx-auto max-w-[420px] min-h-screen bg-gray-50 overflow-hidden">
      <Routes>
        {/* Core */}
        <Route path="/"          element={<HomeScreen />} />
        <Route path="/map"       element={<MapScreen />} />
        <Route path="/topic/:topicId" element={<TopicDetailScreen />} />

        {/* Practice flow */}
        <Route path="/practice"          element={<PracticeSetupScreen />} />
        <Route path="/practice/session"  element={<PracticeSessionScreen />} />
        <Route path="/practice/summary"  element={<PracticeSummaryScreen />} />

        {/* Exam flow */}
        <Route path="/exam"          element={<ExamSetupScreen />} />
        <Route path="/exam/session"  element={<ExamSessionScreen />} />
        <Route path="/exam/results"  element={<ExamResultsScreen />} />

        {/* Stats (session 5) */}
        <Route path="/stats" element={<ComingSoon label="Stats" />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!hideNav && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
