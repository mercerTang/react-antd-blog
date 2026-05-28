import { useState, useEffect } from 'react'
import { Layout, Menu, Button, Card, Row, Col, Typography, Avatar, Space, Divider, Switch, List, Tag, Spin, Alert } from 'antd'
import { HomeOutlined, UserOutlined, CodeOutlined, MailOutlined, GithubOutlined, AppstoreOutlined, MoonOutlined, SunOutlined, ReadOutlined, ClockOutlined } from '@ant-design/icons'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import logger from './utils/logger'
import api from './utils/api'
import './App.css'

const { Header, Content, Footer } = Layout
const { Title, Paragraph, Text } = Typography

// 博客文章组件
function BlogPosts({ darkMode }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    logger.logPageView('博客文章列表')
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      setLoading(true)
      const data = await api.posts.getAll()
      setPosts(data)
      logger.info('博客文章加载成功', { count: data.length })
    } catch (err) {
      setError(err.message)
      logger.error('博客文章加载失败', { error: err.message })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
        <p>加载文章中...</p>
      </div>
    )
  }

  if (error) {
    return (
      <Alert
        message="加载失败"
        description={error}
        type="error"
        showIcon
        action={
          <Button size="small" danger onClick={loadPosts}>
            重试
          </Button>
        }
      />
    )
  }

  return (
    <section id="blog" className={`section ${darkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        <Title level={2} className={`section-title ${darkMode ? 'dark-mode' : ''}`}>
          <ReadOutlined /> 博客文章
        </Title>
        <List
          grid={{ gutter: 24, xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}
          dataSource={posts}
          renderItem={(post) => (
            <List.Item>
              <Card
                hoverable
                className={`blog-card ${darkMode ? 'dark-mode' : ''}`}
                title={post.title}
                extra={<Tag color="blue">{post.author}</Tag>}
              >
                <Paragraph className={darkMode ? 'dark-mode' : ''} ellipsis={{ rows: 3 }}>
                  {post.content}
                </Paragraph>
                <div style={{ marginTop: '16px' }}>
                  <Space>
                    <ClockOutlined />
                    <Text type="secondary" className={darkMode ? 'dark-mode' : ''}>
                      {new Date(post.createdAt).toLocaleDateString('zh-CN')}
                    </Text>
                  </Space>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </section>
  )
}

// 日志查看器组件
function LogViewer({ darkMode }) {
  const [logs, setLogs] = useState([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (visible) {
      setLogs(logger.getLogs())
    }
  }, [visible])

  const handleDownload = () => {
    logger.downloadLogs()
    logger.logUserAction('下载日志文件')
  }

  const handleClear = () => {
    logger.clearLogs()
    setLogs([])
    logger.logUserAction('清空日志')
  }

  if (!visible) {
    return (
      <Button
        type="primary"
        onClick={() => {
          setVisible(true)
          logger.logUserAction('打开日志查看器')
        }}
        style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}
      >
        查看日志
      </Button>
    )
  }

  return (
    <Card
      title="访问日志"
      className={`log-viewer ${darkMode ? 'dark-mode' : ''}`}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '500px',
        maxHeight: '400px',
        overflow: 'auto',
        zIndex: 1000,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}
      extra={
        <Space>
          <Button size="small" onClick={handleDownload}>下载</Button>
          <Button size="small" danger onClick={handleClear}>清空</Button>
          <Button size="small" onClick={() => {
            setVisible(false)
            logger.logUserAction('关闭日志查看器')
          }}>关闭</Button>
        </Space>
      }
    >
      <List
        size="small"
        dataSource={logs.slice(-20).reverse()}
        renderItem={(log) => (
          <List.Item>
            <div style={{ fontSize: '12px' }}>
              <Tag color={
                log.level === 'ERROR' ? 'red' :
                log.level === 'WARN' ? 'orange' :
                log.level === 'DEBUG' ? 'blue' : 'green'
              }>
                {log.level}
              </Tag>
              <Text type="secondary" style={{ fontSize: '11px' }}>
                {new Date(log.timestamp).toLocaleTimeString()}
              </Text>
              <div style={{ marginTop: '4px' }}>{log.message}</div>
            </div>
          </List.Item>
        )}
      />
    </Card>
  )
}

// 主页面组件
function HomePage({ darkMode, toggleDarkMode }) {
  const navigate = useNavigate()
  const [current, setCurrent] = useState('home')

  const menuItems = [
    { key: 'home', label: '首页' },
    { key: 'about', label: '关于我' },
    { key: 'skills', label: '技能' },
    { key: 'blog', label: '博客' },
    { key: 'contact', label: '联系我' },
  ]

  const skills = [
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'Vue.js', level: 70 },
  ]

  useEffect(() => {
    logger.logPageView('首页')
  }, [])

  const handleMenuClick = (e) => {
    setCurrent(e.key)
    logger.logUserAction('导航菜单点击', { menu: e.key })
    const element = document.getElementById(e.key)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleThemeToggle = () => {
    toggleDarkMode()
    logger.logUserAction('切换主题', { darkMode: !darkMode })
  }

  return (
    <Layout className={`layout ${darkMode ? 'dark-mode' : ''}`}>
      <Header className={`header ${darkMode ? 'dark-mode' : ''}`}>
        <div className={`logo ${darkMode ? 'dark-mode' : ''}`}>mercerTang</div>
        <Menu
          theme={darkMode ? 'dark' : 'light'}
          mode="horizontal"
          selectedKeys={[current]}
          items={menuItems}
          onClick={handleMenuClick}
          className={`menu ${darkMode ? 'dark-mode' : ''}`}
          style={{
            backgroundColor: 'transparent',
            borderBottom: 'none'
          }}
        />
        <div className="theme-switch">
          <Switch
            checked={darkMode}
            onChange={handleThemeToggle}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
          />
        </div>
      </Header>

      <Content className="content">
        <section id="home" className={`hero-section ${darkMode ? 'dark-mode' : ''}`}>
          <div className="hero-content">
            <Avatar size={100} src="https://github.com/mercerTang.png" style={{ marginBottom: '24px' }} />
            <Title level={1} className={`hero-title ${darkMode ? 'dark-mode' : ''}`}>你好，我是 mercerTang</Title>
            <Paragraph className={`hero-description ${darkMode ? 'dark-mode' : ''}`}>
              前端开发工程师 | 热爱技术 | 持续学习
            </Paragraph>
            <Space size="large">
              <Button type="primary" size="large" className={darkMode ? 'dark-mode' : ''} onClick={() => {
                handleMenuClick({ key: 'contact' })
              }}>
                联系我
              </Button>
              <Button size="large" className={darkMode ? 'dark-mode' : ''} href="https://github.com/mercerTang" target="_blank" onClick={() => {
                logger.logUserAction('点击GitHub链接')
              }}>
                GitHub
              </Button>
            </Space>
          </div>
        </section>

        <section id="about" className={`section ${darkMode ? 'dark-mode' : ''}`}>
          <div className="container">
            <Title level={2} className={`section-title ${darkMode ? 'dark-mode' : ''}`}>关于我</Title>
            <Card className={`about-card ${darkMode ? 'dark-mode' : ''}`}>
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <Paragraph className={darkMode ? 'dark-mode' : ''}>
                    我是一名拥有 3 年经验的全栈开发工程师，专注于构建高性能、可扩展的 Web 应用程序。
                    热爱开源社区，积极参与技术分享和项目贡献。
                  </Paragraph>
                  <Paragraph className={darkMode ? 'dark-mode' : ''}>
                    在工作中，我注重代码质量和用户体验，善于解决复杂的技术问题。
                    相信技术的力量可以改变世界，致力于通过代码创造价值。
                  </Paragraph>
                </Col>
                <Col xs={24} md={12}>
                  <Title level={4} className={darkMode ? 'dark-mode' : ''}>联系方式</Title>
                  <Space orientation="vertical" size="middle">
                    <Space>
                      <MailOutlined />
                      <Text className={darkMode ? 'dark-mode' : ''}>1253701123@qq.com</Text>
                    </Space>
                    <Space>
                      <GithubOutlined />
                      <Text className={darkMode ? 'dark-mode' : ''}>github.com/mercerTang</Text>
                    </Space>
                  </Space>
                </Col>
              </Row>
            </Card>
          </div>
        </section>

        <section id="skills" className={`section ${darkMode ? 'dark-mode' : ''}`}>
          <div className="container">
            <Title level={2} className={`section-title ${darkMode ? 'dark-mode' : ''}`}>技能专长</Title>
            <Row gutter={[24, 24]}>
              {skills.map((skill) => (
                <Col xs={24} sm={12} md={8} key={skill.name}>
                  <Card hoverable className={`skill-card ${darkMode ? 'dark-mode' : ''}`}>
                    <Title level={4} className={darkMode ? 'dark-mode' : ''}>{skill.name}</Title>
                    <div className={`skill-bar ${darkMode ? 'dark-mode' : ''}`}>
                      <div
                        className={`skill-progress ${darkMode ? 'dark-mode' : ''}`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <Text type="secondary" className={darkMode ? 'dark-mode' : ''}>{skill.level}%</Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        {/* 博客文章部分 */}
        <BlogPosts darkMode={darkMode} />

        <section id="contact" className={`section ${darkMode ? 'dark-mode' : ''}`}>
          <div className="container">
            <Title level={2} className={`section-title ${darkMode ? 'dark-mode' : ''}`}>联系我</Title>
            <Card className={`contact-card ${darkMode ? 'dark-mode' : ''}`}>
              <Row justify="center">
                <Col xs={24} md={8}>
                  <Title level={4} className={darkMode ? 'dark-mode' : ''}>联系方式</Title>
                  <Paragraph className={darkMode ? 'dark-mode' : ''}>
                    如果您有项目合作意向或技术交流需求，欢迎通过以下方式联系我。
                  </Paragraph>
                  <Space orientation="vertical" size="large">
                    <div>
                      <Text strong className={darkMode ? 'dark-mode' : ''}>邮箱：</Text>
                      <Text className={darkMode ? 'dark-mode' : ''}>1253701123@qq.com</Text>
                    </div>
                    <div>
                      <Text strong className={darkMode ? 'dark-mode' : ''}>微信：</Text>
                      <Text className={darkMode ? 'dark-mode' : ''}>MercerTTT</Text>
                    </div>
                    <div>
                      <Text strong className={darkMode ? 'dark-mode' : ''}>工作时间：</Text>
                      <Text className={darkMode ? 'dark-mode' : ''}>周一至周五 9:00 - 18:00</Text>
                    </div>
                  </Space>
                </Col>
              </Row>
            </Card>
          </div>
        </section>
      </Content>

      <Footer className={`footer ${darkMode ? 'dark-mode' : ''}`}>
        <Text>© 2026 My Portfolio. All rights reserved.</Text>
      </Footer>

      {/* 日志查看器 */}
      <LogViewer darkMode={darkMode} />
    </Layout>
  )
}

// 主应用组件
function App() {
  const [darkMode, setDarkMode] = useState(false)

  // 切换主题
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // 应用主题
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  // 监听全局错误
  useEffect(() => {
    const handleError = (error) => {
      logger.error('全局错误捕获', {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      })
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', (event) => {
      logger.error('未处理的Promise拒绝', {
        reason: event.reason,
        timestamp: new Date().toISOString()
      })
    })

    return () => {
      window.removeEventListener('error', handleError)
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
      </Routes>
    </Router>
  )
}

export default App
