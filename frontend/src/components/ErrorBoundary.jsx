import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen flex items-center justify-center text-red-600 text-xl">
          Something went wrong. Please refresh the page.
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
