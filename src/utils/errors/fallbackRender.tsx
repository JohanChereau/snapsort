import ErrorDisplay from "@/components/errorDisplay/ErrorDisplay";
import { FallbackRenderProps } from "@/data/interfaces/FallbackRenderProps";

export function fallbackRender({
  error,
  resetErrorBoundary,
}: FallbackRenderProps) {
  return <ErrorDisplay error={error} resetErrorBoundary={resetErrorBoundary} />;
}
