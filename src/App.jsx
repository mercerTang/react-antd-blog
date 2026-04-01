import { useState, useEffect } from 'react'
import { Layout, Menu, Button, Card, Row, Col, Typography, Avatar, Space, Divider, Switch } from 'antd'
import { HomeOutlined, UserOutlined, CodeOutlined, MailOutlined, GithubOutlined, AppstoreOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import CssEffects from './pages/CssEffects'

const { Header, Content, Footer } = Layout
const { Title, Paragraph, Text } = Typography

// 主页面组件
function HomePage() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState('home')
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

  const menuItems = [
    { key: 'home', label: '首页' },
    { key: 'about', label: '关于我' },
    { key: 'skills', label: '技能' },
    { key: 'css', label: 'CSS特效' },
    { key: 'contact', label: '联系我' },
  ]

  const skills = [
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'Vue.js', level: 70 },
  ]

  const handleMenuClick = (e) => {
    setCurrent(e.key)
    if (e.key === 'css') {
      navigate('/css')
    } else {
      const element = document.getElementById(e.key)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
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
            onChange={toggleDarkMode}
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
              <Button type="primary" size="large" className={darkMode ? 'dark-mode' : ''} onClick={() => handleMenuClick({ key: 'contact' })}>
                联系我
              </Button>
              <Button size="large" className={darkMode ? 'dark-mode' : ''} href="https://github.com/mercerTang" target="_blank">
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
                    我是一名拥有 5 年经验的全栈开发工程师，专注于构建高性能、可扩展的 Web 应用程序。
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
    </Layout>
  )
}

// CSS特效页面组件
function CssPage() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState('css')
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

  const menuItems = [
    { key: 'home', label: '首页' },
    { key: 'about', label: '关于我' },
    { key: 'skills', label: '技能' },
    { key: 'css', label: 'CSS特效' },
    { key: 'contact', label: '联系我' },
  ]

  const handleMenuClick = (e) => {
    setCurrent(e.key)
    if (e.key === 'css') {
      // 已经在CSS页面
    } else if (e.key === 'home') {
      navigate('/')
    } else {
      navigate('/')
      // 延迟执行滚动，等待页面加载完成
      setTimeout(() => {
        const element = document.getElementById(e.key)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }

  return (
    <Layout className={`layout ${darkMode ? 'dark-mode' : ''}`}>
      <Header className={`header ${darkMode ? 'dark-mode' : ''}`}>
        <div className={`logo ${darkMode ? 'dark-mode' : ''}`} onClick={() => navigate('/')}>mercerTang</div>
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
            onChange={toggleDarkMode}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
          />
        </div>
      </Header>

      <Content className="content">
        <section className={`section ${darkMode ? 'dark-mode' : ''}`}>
          <CssEffects darkMode={darkMode} />
        </section>
      </Content>

      <Footer className={`footer ${darkMode ? 'dark-mode' : ''}`}>
        <Text>© 2026 My Portfolio. All rights reserved.</Text>
      </Footer>
    </Layout>
  )
}

// 主应用组件
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/css" element={<CssPage />} />
      </Routes>
    </Router>
  )
}

export default App
