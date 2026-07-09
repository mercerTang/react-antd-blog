import { useEffect, useRef, useState, useCallback } from 'react'
import { PageAgent } from 'page-agent'
import logger from '../utils/logger'

// ===== 平台定义（后续可扩展） =====
const PLATFORMS = {
  deepseek: {
    name: 'DeepSeek',
    baseURL: 'https://api.deepseek.com/v1',
    models: ['deepseek-chat', 'deepseek-reasoner'],
  },
}

const DEFAULT_PLATFORM = 'deepseek'
const STORAGE_KEY = 'page_agent_config'

// ===== localStorage 读写 =====
function getStoredConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveStoredConfig(config) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  } catch { /* ignore */ }
}

// ===== 获取初始配置 =====
function resolveInitialConfig() {
  // 1. 环境变量优先
  const envKey = import.meta.env.VITE_AGENT_API_KEY
  if (envKey) {
    return {
      platform: DEFAULT_PLATFORM,
      apiKey: envKey,
      model: import.meta.env.VITE_AGENT_MODEL || PLATFORMS[DEFAULT_PLATFORM].models[0],
      fromEnv: true,
    }
  }
  // 2. localStorage
  const stored = getStoredConfig()
  if (stored?.apiKey) {
    return { ...stored, fromEnv: false }
  }
  // 3. 需要用户输入
  return null
}

const SYSTEM_PROMPT = `你是唐小宇（mercerTang）个人网站的 AI 助理。你通过操作当前网页来帮助访客。

关于本网站：
- 这是一个个人博客/作品集网站，使用 React + Ant Design 构建
- 页面包含以下区块：首页 Hero、关于我、技能专长、个人简历、博客文章、联系我
- 网站支持深色/浅色模式切换（右上角开关）

关于唐小宇：
- 全栈开发工程师，3 年经验，曾就职于毕马威（KPMG）和金山办公
- 技术栈：Vue3/TypeScript/React/Element Plus, .NET 6-8/ASP.NET Core, MySQL/Redis
- AI 技能：AI Agent 开发、Claude Code (CCS)、DeepSeek (DS)
- 联系方式：1253701123@qq.com，微信 MercerTTT

行为准则：
- 用中文与访客交流
- 如果访客让你导航到某个区块，使用滚动功能定位到对应区块
- 可以帮访客了解唐小宇的技能、项目经验、联系方式等
- 保持友好、专业的语气`

function createAgent(config) {
  const platform = PLATFORMS[config.platform] || PLATFORMS[DEFAULT_PLATFORM]
  return new PageAgent({
    baseURL: platform.baseURL,
    model: config.model || platform.models[0],
    apiKey: config.apiKey,
    language: 'zh-CN',
    maxSteps: 30,
    stepDelay: 0.5,
    instructions: { system: SYSTEM_PROMPT },
  })
}

// ===== Settings 面板 =====
function SettingsPanel({ config, onSave, onCancel }) {
  const platform = PLATFORMS[config?.platform || DEFAULT_PLATFORM]
  const [apiKey, setApiKey] = useState(config?.apiKey || '')
  const [model, setModel] = useState(config?.model || platform.models[0])
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    if (!apiKey.trim()) return
    setSaving(true)
    const newConfig = {
      platform: DEFAULT_PLATFORM,
      apiKey: apiKey.trim(),
      model,
    }
    saveStoredConfig(newConfig)
    onSave(newConfig)
  }

  return (
    <div className="agent-settings-overlay">
      <div className="agent-settings-card">
        <h3>配置 AI 助理</h3>
        <p className="agent-settings-desc">
          使用你的 API Key 激活页面智能助理，支持 OpenAI 兼容接口
        </p>

        <div className="agent-settings-field">
          <label>平台</label>
          <div className="agent-platform-badge">{platform.name}</div>
        </div>

        <div className="agent-settings-field">
          <label>模型</label>
          <select value={model} onChange={(e) => setModel(e.target.value)}>
            {platform.models.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="agent-settings-field">
          <label>API Key</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            autoFocus
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
          <span className="agent-settings-hint">
            密钥仅保存在浏览器本地，不会上传到任何服务器
          </span>
        </div>

        <div className="agent-settings-actions">
          {onCancel && (
            <button className="agent-btn-cancel" onClick={onCancel}>取消</button>
          )}
          <button
            className="agent-btn-save"
            onClick={handleSave}
            disabled={!apiKey.trim() || saving}
          >
            {saving ? '启动中...' : config ? '保存并重新连接' : '启动 AI 助理'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ===== 主组件 =====
export default function PageAgentWidget() {
  const agentRef = useRef(null)
  const configRef = useRef(null)

  // 在 render 阶段计算初始状态（避免 effect 中 setState）
  const [initialConfig] = useState(() => resolveInitialConfig())
  const [ready, setReady] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [hintVisible, setHintVisible] = useState(true)
  const [showSettings, setShowSettings] = useState(() => !initialConfig)
  const [currentConfig, setCurrentConfig] = useState(null)

  // 设置面板打开时锁定背景滚动
  useEffect(() => {
    if (showSettings) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [showSettings])

  // 初始化 Agent（仅副作用）
  const initAgent = useCallback((config) => {
    if (agentRef.current) {
      agentRef.current.dispose()
      agentRef.current = null
    }

    try {
      const agent = createAgent(config)
      agentRef.current = agent
      configRef.current = config

      requestAnimationFrame(() => {
        if (agent.panel?.wrapper) {
          agent.panel.hide()
        }
      })

      setReady(true)
      setCurrentConfig(config)
      logger.info('Page-Agent 就绪', { model: config.model })
    } catch (err) {
      logger.error('Page-Agent 初始化失败', { error: err.message })
    }
  }, [])

  // 组件挂载 → 仅执行副作用
  useEffect(() => {
    if (!initialConfig) return

    initAgent(initialConfig)

    return () => {
      if (agentRef.current) {
        agentRef.current.dispose()
        agentRef.current = null
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 用户保存设置
  const handleSettingsSave = useCallback((config) => {
    setShowSettings(false)
    initAgent(config)
  }, [initAgent])

  const handleSettingsCancel = useCallback(() => {
    // 仅在已有配置时允许取消
    if (currentConfig) {
      setShowSettings(false)
    }
  }, [currentConfig])

  // 切换面板
  const handleToggle = () => {
    const agent = agentRef.current
    if (!agent) return

    if (panelOpen) {
      agent.panel.hide()
      setPanelOpen(false)
    } else {
      agent.panel.show()
      setPanelOpen(true)
      setHintVisible(false)
      logger.logUserAction('打开 Page-Agent 面板')
    }
  }

  // 未就绪且未显示设置 → Loading
  if (!ready && !showSettings) return null

  return (
    <>
      {/* 设置面板 */}
      {showSettings && (
        <SettingsPanel
          config={currentConfig}
          onSave={handleSettingsSave}
          onCancel={handleSettingsCancel}
        />
      )}

      {/* Hero 提示 */}
      {ready && hintVisible && (
        <div className="agent-hero-hint">
          <span className="agent-hint-dot" />
          <span>AI 助理已就绪，点击右下角按钮试试</span>
          <button className="agent-hint-close" onClick={() => setHintVisible(false)}>✕</button>
        </div>
      )}

      {/* FAB 按钮组 */}
      {ready && (
        <div className="agent-fab-group">
          <button
            className="agent-gear-btn"
            onClick={() => setShowSettings(true)}
            title="API 设置"
          >
            ⚙
          </button>
          <button
            className={`agent-trigger ${panelOpen ? 'active' : ''}`}
            onClick={handleToggle}
            title={panelOpen ? '关闭 AI 助理' : '打开 AI 助理'}
          >
            <span className="agent-trigger-icon">
              {panelOpen ? '✕' : '🤖'}
            </span>
            <span className="agent-trigger-label">
              {panelOpen ? '关闭' : 'AI 助理'}
            </span>
          </button>
        </div>
      )}
    </>
  )
}
