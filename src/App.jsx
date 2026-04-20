import { Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';

// Placeholder for screens built in sessions 2–5
function ComingSoon({ name }) {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center pb-24 px-6">
      <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
        <span className="text-2xl">🚧</span>
      </div>
      <h2 className="text-lg font-bold text-primary mb-1">{name}</h2>
      <p className="text-sm text-gray-400 text-center">This screen is coming in the next build session.</p>
    </div>
  );
}

// Screens for session 2
const MapScreen = () => <ComingSoon name="Knowledge Map" />;
const TopicDetailScreen = () => <ComingSoon name="Topic Detail" />;

// Screens for session 3
const PracticeSetupScreen = () => <ComingSoon name="Practice Setup" />;
const PracticeSessionScreen = () => <ComingSoon name="Practice Session" />;
const PracticeSummaryScreen = () => <ComingSoon name="Practice Summary" />;

// Screens for session 4
const ExamSetupScreen = () => <ComingSoon name="Exam Setup" />;
const ExamSessionScreen = () => <ComingSoon name="Exam Session" />;
const ExamResultsScreen = () => <ComingSoon name="Exam Results" />;

// Screen for session 5
const StatsScreen = () => <ComingSoon name="Stats" />;

export default function App() {
  return (
    <div className="w-full max-w-[420px] mx-auto min-h-screen relative bg-surface">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
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
