import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import BottomNav from './components/BottomNav';

import HomeScreen           from './screens/HomeScreen';
import MapScreen            from './screens/MapScreen';
import TopicDetailScreen    from './screens/TopicDetailScreen';
import SubjectMappingScreen from './screens/SubjectMappingScreen';
import PracticeSetupScreen  from './screens/PracticeSetupScreen';
import PracticeSessionScreen from './screens/PracticeSessionScreen';
import PracticeSummaryScreen from './screens/PracticeSummaryScreen';
import ExamSetupScreen      from './screens/ExamSetupScreen';
import ExamSessionScreen    from './screens/ExamSessionScreen';
import ExamResultsScreen    from './screens/ExamResultsScreen';
import StatsScreen          from './screens/StatsScreen';

const HIDE_NAV_PATHS = ['/exam/session'];

function Layout() {
  const { pathname } = useLocation();
  const hideNav = HIDE_NAV_PATHS.includes(pathname);

  return (
    <div className="relative mx-auto max-w-[420px] min-h-screen bg-gray-50 overflow-hidden">
      <Routes>
        <Route path="/"                  element={<HomeScreen />} />
        <Route path="/map"               element={<MapScreen />} />
        <Route path="/topic/:topicId"    element={<TopicDetailScreen />} />
        <Route path="/subjects"          element={<SubjectMappingScreen />} />
        <Route path="/practice"          element={<PracticeSetupScreen />} />
        <Route path="/practice/session"  element={<PracticeSessionScreen />} />
        <Route path="/practice/summary"  element={<PracticeSummaryScreen />} />
        <Route path="/exam"              element={<ExamSetupScreen />} />
        <Route path="/exam/session"      element={<ExamSessionScreen />} />
        <Route path="/exam/results"      element={<ExamResultsScreen />} />
        <Route path="/stats"             element={<StatsScreen />} />
        <Route path="*"                  element={<Navigate to="/" replace />} />
      </Routes>

      {!hideNav && <BottomNav />}
    </div>
  );
}

export default function App() {
  return <Layout />;
}
