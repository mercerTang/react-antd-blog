import logger from './logger';

// API 基础配置
const API_BASE_URL = 'http://localhost:8080/api';

// 通用请求函数
async function request(url, options = {}) {
  const startTime = Date.now();
  const fullUrl = `${API_BASE_URL}${url}`;

  // 记录 API 调用
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

    // 记录 API 响应
    logger.logApiResponse(url, data, duration);

    return data;
  } catch (error) {
    logger.error(`API 请求失败: ${url}`, { error: error.message });
    throw error;
  }
}

// 文章 API
export const postsApi = {
  // 获取所有文章
  getAll: () => request('/posts'),

  // 获取单篇文章
  getById: (id) => request(`/posts/${id}`),

  // 创建文章
  create: (post) => request('/posts', {
    method: 'POST',
    body: JSON.stringify(post),
  }),

  // 更新文章
  update: (id, post) => request(`/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(post),
  }),

  // 删除文章
  delete: (id) => request(`/posts/${id}`, {
    method: 'DELETE',
  }),
};

// 用户 API
export const usersApi = {
  // 获取所有用户
  getAll: () => request('/users'),

  // 获取单个用户
  getById: (id) => request(`/users/${id}`),

  // 创建用户
  create: (user) => request('/users', {
    method: 'POST',
    body: JSON.stringify(user),
  }),

  // 更新用户
  update: (id, user) => request(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(user),
  }),

  // 删除用户
  delete: (id) => request(`/users/${id}`, {
    method: 'DELETE',
  }),
};

// 健康检查
export const healthApi = {
  check: () => request('/health'),
};

export default {
  posts: postsApi,
  users: usersApi,
  health: healthApi,
};
