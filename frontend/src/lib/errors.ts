import axios from 'axios';

type ApiErrorPayload = { message?: unknown };

function extractApiMessage(data: unknown): string | undefined {
  if (typeof data === 'object' && data !== null && 'message' in data) {
    const msg = (data as ApiErrorPayload).message;
    if (typeof msg === 'string') return msg;
  }
  return undefined;
}

export function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    return extractApiMessage(err.response?.data) ?? err.message ?? 'Unknown error';
  }
  if (err instanceof Error) {
    return err.message;
  }
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}
