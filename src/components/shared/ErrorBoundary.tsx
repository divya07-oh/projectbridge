import React, { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-2xl w-full bg-destructive/10 border border-destructive rounded-xl p-8 shadow-sm">
            <div className="flex items-center gap-3 text-destructive mb-4">
              <AlertTriangle className="h-8 w-8" />
              <h1 className="text-2xl font-bold">Something went wrong.</h1>
            </div>
            
            <p className="text-foreground mb-6 font-medium">
              The application encountered a critical error and could not render this page.
            </p>

            <div className="bg-background rounded border p-4 overflow-auto max-h-[400px]">
              <h3 className="font-bold text-sm mb-2 text-destructive">Error Message:</h3>
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono mb-4">
                {this.state.error?.toString()}
              </pre>

              <h3 className="font-bold text-sm mb-2 text-destructive">Component Stack Trace:</h3>
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono">
                {this.state.errorInfo?.componentStack}
              </pre>
            </div>

            <button 
              onClick={() => {
                // Clear local storage which often causes state mismatches in dev
                localStorage.clear();
                window.location.href = '/';
              }} 
              className="mt-6 px-4 py-2 bg-destructive text-destructive-foreground rounded font-medium hover:bg-destructive/90 transition-colors"
            >
              Clear Data & Restart App
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
