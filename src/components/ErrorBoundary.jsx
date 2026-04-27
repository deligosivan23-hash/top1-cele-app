import React from 'react';
import { useStore } from '../store/useStore';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[CELE ErrorBoundary]', error, info.componentStack);
  }

  handleReset = () => {
    useStore.getState().resetAll();
    window.location.href = '/';
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-danger/10 flex items-center justify-center mb-5">
          <span className="text-danger text-3xl font-black">!</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h1>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          The app encountered an unexpected error. This can happen if your saved data
          is incompatible with the current version. Resetting will clear your progress
          and return you to onboarding.
        </p>
        <button
          onClick={this.handleReset}
          className="w-full max-w-xs py-3.5 rounded-2xl bg-danger text-white font-bold text-sm mb-3"
        >
          Reset App Data
        </button>
        <button
          onClick={() => window.location.reload()}
          className="w-full max-w-xs py-3.5 rounded-2xl bg-gray-100 text-gray-700 font-semibold text-sm"
        >
          Try Again
        </button>
        {import.meta.env.DEV && (
          <pre className="mt-8 text-left text-xs text-gray-400 bg-gray-100 rounded-xl p-4 w-full max-w-xs overflow-x-auto">
            {this.state.error?.toString()}
          </pre>
        )}
      </div>
    );
  }
}
