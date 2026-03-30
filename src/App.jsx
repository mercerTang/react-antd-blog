import { useState } from 'react'
import { Layout, Menu, Button, Card, Row, Col, Typography, Avatar, Space, Divider } from 'antd'
import { HomeOutlined, UserOutlined, CodeOutlined, MailOutlined, GithubOutlined } from '@ant-design/icons'
import './App.css'

const { Header, Content, Footer } = Layout
const { Title, Paragraph, Text } = Typography

function App() {
  const [current, setCurrent] = useState('home')

  const menuItems = [
    { key: 'home', label: '首页' },
    { key: 'about', label: '关于我' },
    { key: 'skills', label: '技能' },
    { key: 'contact', label: '联系我' },
  ]

  const skills = [
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'Vue.js', level: 70 },
  ]

  const projects = [
    {
      title: '个人博客系统',
      description: '基于 React 和 Node.js 的全栈博客系统，支持 Markdown 编辑和评论功能',
      tags: ['React', 'Node.js', 'MongoDB'],
    },
    {
      title: '电商平台',
      description: '完整的电商解决方案，包含商品管理、购物车、支付集成等功能',
      tags: ['Vue.js', 'Express', 'MySQL'],
    },
    {
      title: '数据可视化大屏',
      description: '企业级数据可视化平台，支持实时数据监控和多维度分析',
      tags: ['React', 'ECharts', 'WebSocket'],
    },
  ]

  const handleMenuClick = (e) => {
    setCurrent(e.key)
    const element = document.getElementById(e.key)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }



  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo">mercerTang</div>
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[current]}
          items={menuItems}
          onClick={handleMenuClick}
          className="menu"
          style={{ 
            backgroundColor: 'transparent',
            borderBottom: 'none'
          }}
        />
      </Header>

      <Content className="content">
        <section id="home" className="hero-section">
          <div className="hero-content">
            <Avatar size={100} src="https://github.com/mercerTang.png" style={{ marginBottom: '24px' }} />
            <Title level={1} className="hero-title">你好，我是 mercerTang</Title>
            <Paragraph className="hero-description">
              前端开发工程师 | 热爱技术 | 持续学习
            </Paragraph>
            <Space size="large">
              <Button type="primary" size="large" onClick={() => handleMenuClick({ key: 'contact' })}>
                联系我
              </Button>
              <Button size="large" href="https://github.com/mercerTang" target="_blank">
                GitHub
              </Button>
            </Space>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container">
            <Title level={2} className="section-title">关于我</Title>
            <Card className="about-card">
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <Paragraph>
                    我是一名拥有 5 年经验的全栈开发工程师，专注于构建高性能、可扩展的 Web 应用程序。
                    热爱开源社区，积极参与技术分享和项目贡献。
                  </Paragraph>
                  <Paragraph>
                    在工作中，我注重代码质量和用户体验，善于解决复杂的技术问题。
                    相信技术的力量可以改变世界，致力于通过代码创造价值。
                  </Paragraph>
                </Col>
                <Col xs={24} md={12}>
                  <Title level={4}>联系方式</Title>
                  <Space orientation="vertical" size="middle">
                    <Space>
                      <MailOutlined />
                      <Text>1253701123@qq.com</Text>
                    </Space>
                    <Space>
                      <GithubOutlined />
                      <Text>github.com/mercerTang</Text>
                    </Space>
                  </Space>
                </Col>
              </Row>
            </Card>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="container">
            <Title level={2} className="section-title">技能专长</Title>
            <Row gutter={[24, 24]}>
              {skills.map((skill) => (
                <Col xs={24} sm={12} md={8} key={skill.name}>
                  <Card hoverable className="skill-card">
                    <Title level={4}>{skill.name}</Title>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <Text type="secondary">{skill.level}%</Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </section>



        <section id="contact" className="section">
          <div className="container">
            <Title level={2} className="section-title">联系我</Title>
            <Card className="contact-card">
              <Row justify="center">
                <Col xs={24} md={8}>
                  <Title level={4}>联系方式</Title>
                  <Paragraph>
                    如果您有项目合作意向或技术交流需求，欢迎通过以下方式联系我。
                  </Paragraph>
                  <Space orientation="vertical" size="large">
                    <div>
                      <Text strong>邮箱：</Text>
                      <Text>1253701123@qq.com</Text>
                    </div>
                    <div>
                      <Text strong>微信：</Text>
                      <Text>MercerTTT</Text>
                    </div>
                    <div>
                      <Text strong>工作时间：</Text>
                      <Text>周一至周五 9:00 - 18:00</Text>
                    </div>
                  </Space>
                </Col>
              </Row>
            </Card>
          </div>
        </section>
      </Content>

      <Footer className="footer">
        <Text>© 2026 My Portfolio. All rights reserved.</Text>
      </Footer>
    </Layout>
  )
}

export default App
