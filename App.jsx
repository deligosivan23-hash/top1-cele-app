import { Routes, Route, Navigate } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import TopicDetailScreen from './screens/TopicDetailScreen';

// ─── Session 3–5 placeholders ────────────────────────────────────────────────
function ComingSoon({ name }) {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center gap-2 text-center px-8 pb-24">
      <p className="text-xl font-bold text-gray-800">{name}</p>
      <p className="text-sm text-gray-400">Coming soon</p>
    </div>
  );
}

const PracticeSetupScreen = () => <ComingSoon name="Practice Setup" />;
const PracticeSessionScreen = () => <ComingSoon name="Practice Session" />;
const PracticeSummaryScreen = () => <ComingSoon name="Practice Summary" />;
const ExamSetupScreen = () => <ComingSoon name="Exam Setup" />;
const ExamSessionScreen = () => <ComingSoon name="Exam Session" />;
const ExamResultsScreen = () => <ComingSoon name="Exam Results" />;
const StatsScreen = () => <ComingSoon name="Stats" />;

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="max-w-[420px] mx-auto min-h-screen relative bg-surface">
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/map" element={<MapScreen />} />
        <Route path="/topic/:id" element={<TopicDetailScreen />} />
        <Route path="/practice" element={<PracticeSetupScreen />} />
        <Route path="/practice/session" element={<PracticeSessionScreen />} />
        <Route path="/practice/summary" element={<PracticeSummaryScreen />} />
        <Route path="/exam" element={<ExamSetupScreen />} />
        <Route path="/exam/session" element={<ExamSessionScreen />} />
        <Route path="/exam/results" element={<ExamResultsScreen />} />
        <Route path="/stats" element={<StatsScreen />} />
      </Routes>
      <BottomNav />
    </div>
  );
}
