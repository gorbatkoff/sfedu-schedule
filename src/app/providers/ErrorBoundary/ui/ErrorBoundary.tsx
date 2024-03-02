import React, { ErrorInfo, ReactNode, Suspense } from "react";

import { ErrorPage } from "/src/pages/ErrorPage";

import Loader from "/src/shared/ui/Loader/Loader";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: string | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { hasError: true, error: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
    sessionStorage.setItem("ERROR", JSON.stringify(errorInfo.componentStack));
  }

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (hasError) {
      // Можно отрендерить запасной UI произвольного вида
      return (
        <Suspense fallback={<Loader />}>
          <ErrorPage />
        </Suspense>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
