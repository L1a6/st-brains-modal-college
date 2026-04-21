export async function safeJsonFetch<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);
  const contentType = response.headers.get('content-type') || '';

  if (!contentType.includes('application/json')) {
    const bodyPreview = (await response.text()).slice(0, 120);
    throw new Error(
      `Expected JSON but received ${contentType || 'unknown content type'} (status ${response.status}). Preview: ${bodyPreview}`
    );
  }

  return response.json() as Promise<T>;
}
