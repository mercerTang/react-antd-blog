// 访问日志工具
class Logger {
  constructor() {
    this.logs = [];
    this.maxLogs = 1000; // 最多保留1000条日志
  }

  // 添加日志
  addLog(level, message, data = null) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    this.logs.push(logEntry);

    // 限制日志数量
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // 控制台输出
    console.log(`[${level}] ${message}`, data || '');

    // 保存到 localStorage
    this.saveToStorage();

    return logEntry;
  }

  // 信息日志
  info(message, data) {
    return this.addLog('INFO', message, data);
  }

  // 警告日志
  warn(message, data) {
    return this.addLog('WARN', message, data);
  }

  // 错误日志
  error(message, data) {
    return this.addLog('ERROR', message, data);
  }

  // 调试日志
  debug(message, data) {
    return this.addLog('DEBUG', message, data);
  }

  // 记录页面访问
  logPageView(pageName) {
    return this.info(`页面访问: ${pageName}`, {
      page: pageName,
      referrer: document.referrer,
      timestamp: new Date().toISOString()
    });
  }

  // 记录用户操作
  logUserAction(action, details = {}) {
    return this.info(`用户操作: ${action}`, {
      action,
      ...details,
      timestamp: new Date().toISOString()
    });
  }

  // 记录 API 调用
  logApiCall(apiName, method, data = null) {
    return this.info(`API 调用: ${apiName}`, {
      api: apiName,
      method,
      data,
      timestamp: new Date().toISOString()
    });
  }

  // 记录 API 响应
  logApiResponse(apiName, response, duration) {
    return this.info(`API 响应: ${apiName}`, {
      api: apiName,
      response,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString()
    });
  }

  // 保存到 localStorage
  saveToStorage() {
    try {
      localStorage.setItem('app_logs', JSON.stringify(this.logs));
    } catch (e) {
      console.warn('无法保存日志到 localStorage', e);
    }
  }

  // 从 localStorage 加载
  loadFromStorage() {
    try {
      const stored = localStorage.getItem('app_logs');
      if (stored) {
        this.logs = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('无法从 localStorage 加载日志', e);
    }
  }

  // 获取所有日志
  getLogs() {
    return this.logs;
  }

  // 清空日志
  clearLogs() {
    this.logs = [];
    localStorage.removeItem('app_logs');
  }

  // 导出日志为 JSON
  exportLogs() {
    return JSON.stringify(this.logs, null, 2);
  }

  // 下载日志文件
  downloadLogs() {
    const dataStr = this.exportLogs();
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `app-logs-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

// 创建单例
const logger = new Logger();
logger.loadFromStorage();

export default logger;
