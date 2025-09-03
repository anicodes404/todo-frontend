export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export interface ErrorResponse {
  message: string;
  code?: string;
  details?: any;
}

export function isErrorResponse(error: any): error is ErrorResponse {
  return error && typeof error.message === 'string';
}

export async function handleAPIError(error: unknown): Promise<never> {
  if (error instanceof APIError) {
    throw error;
  }

  if (error instanceof Response) {
    const data = await error.json().catch(() => ({ message: 'Unknown error occurred' }));
    throw new APIError(
      data.message || 'Unknown error occurred',
      error.status,
      data.code
    );
  }

  throw new APIError(
    error instanceof Error ? error.message : 'Unknown error occurred',
    500
  );
}
