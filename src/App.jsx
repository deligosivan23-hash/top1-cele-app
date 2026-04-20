import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BottomNav from './components/BottomNav';

// Screens
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import TopicDetailScreen from './screens/TopicDetailScreen';
import PracticeSetupScreen from './screens/PracticeSetupScreen';
import PracticeSessionScreen from './screens/PracticeSessionScreen';
import PracticeSummaryScreen from './screens/PracticeSummaryScreen';

// Coming Soon placeholder (still used for exam + stats routes)
function ComingSoon({ label }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-6">
      <p className="text-2xl font-black text-primary mb-2">{label}</p>
      <p className="text-sm text-gray-400">Coming in a future session.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative mx-auto max-w-[420px] min-h-screen bg-gray-50 overflow-hidden">
        <Routes>
          {/* Core */}
          <Route path="/" element={<HomeScreen />} />
          <Route path="/map" element={<MapScreen />} />
          <Route path="/topic/:topicId" element={<TopicDetailScreen />} />

          {/* Practice flow */}
          <Route path="/practice" element={<PracticeSetupScreen />} />
          <Route path="/practice/session" element={<PracticeSessionScreen />} />
          <Route path="/practice/summary" element={<PracticeSummaryScreen />} />

          {/* Exam flow (session 4) */}
          <Route path="/exam" element={<ComingSoon label="Exam Setup" />} />
          <Route path="/exam/session" element={<ComingSoon label="Exam Session" />} />
          <Route path="/exam/results" element={<ComingSoon label="Exam Results" />} />

          {/* Stats (session 5) */}
          <Route path="/stats" element={<ComingSoon label="Stats" />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Global bottom nav — hidden during active session */}
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
