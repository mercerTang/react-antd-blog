import logger from './logger';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

async function request(url, options = {}) {
  const startTime = Date.now();
  const fullUrl = `${API_BASE_URL}${url}`;

  logger.logApiCall(url, options.method || 'GET', options.body);

  try {
    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const duration = Date.now() - startTime;

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      logger.error(`API 错误: ${url}`, { status: response.status, error });
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    const data = await response.json();

    logger.logApiResponse(url, data, duration);

    return data;
  } catch (error) {
    logger.error(`API 请求失败: ${url}`, { error: error.message });
    throw error;
  }
}

export const postsApi = {
  getAll: () => request('/posts'),
  getById: (id) => request(`/posts/${id}`),
  create: (post) => request('/posts', {
    method: 'POST',
    body: JSON.stringify(post),
  }),
  update: (id, post) => request(`/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(post),
  }),
  delete: (id) => request(`/posts/${id}`, {
    method: 'DELETE',
  }),
};

export default postsApi;
