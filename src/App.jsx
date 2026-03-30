import { useState } from 'react'
import { Layout, Menu, Button, Card, Row, Col, Typography, Avatar, Space, Divider, message } from 'antd'
import { HomeOutlined, UserOutlined, CodeOutlined, MailOutlined, GithubOutlined, LinkedinOutlined, TwitterOutlined } from '@ant-design/icons'
import './App.css'

const { Header, Content, Footer } = Layout
const { Title, Paragraph, Text } = Typography

function App() {
  const [current, setCurrent] = useState('home')

  const menuItems = [
    { key: 'home', icon: <HomeOutlined />, label: '首页' },
    { key: 'about', icon: <UserOutlined />, label: '关于我' },
    { key: 'skills', icon: <CodeOutlined />, label: '技能' },
    { key: 'projects', icon: <CodeOutlined />, label: '项目' },
    { key: 'contact', icon: <MailOutlined />, label: '联系我' },
  ]

  const skills = [
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'Vue.js', level: 70 },
    { name: 'Docker', level: 65 },
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

  const handleContact = () => {
    message.success('感谢您的留言，我会尽快回复！')
  }

  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo">My Portfolio</div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[current]}
          items={menuItems}
          onClick={handleMenuClick}
          className="menu"
        />
      </Header>

      <Content className="content">
        <section id="home" className="hero-section">
          <div className="hero-content">
            <Avatar size={120} src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
            <Title level={1} className="hero-title">你好，我是开发者</Title>
            <Paragraph className="hero-description">
              全栈开发工程师 | 热爱技术 | 持续学习
            </Paragraph>
            <Space size="large">
              <Button type="primary" size="large" onClick={() => handleMenuClick({ key: 'contact' })}>
                联系我
              </Button>
              <Button size="large" onClick={() => handleMenuClick({ key: 'projects' })}>
                查看项目
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
                      <Text>developer@example.com</Text>
                    </Space>
                    <Space>
                      <GithubOutlined />
                      <Text>github.com/developer</Text>
                    </Space>
                    <Space>
                      <LinkedinOutlined />
                      <Text>linkedin.com/in/developer</Text>
                    </Space>
                    <Space>
                      <TwitterOutlined />
                      <Text>@developer</Text>
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

        <section id="projects" className="section">
          <div className="container">
            <Title level={2} className="section-title">项目展示</Title>
            <Row gutter={[24, 24]}>
              {projects.map((project, index) => (
                <Col xs={24} md={8} key={index}>
                  <Card
                    hoverable
                    className="project-card"
                    cover={
                      <div className="project-cover">
                        <CodeOutlined style={{ fontSize: 48, color: '#1890ff' }} />
                      </div>
                    }
                  >
                    <Title level={4}>{project.title}</Title>
                    <Paragraph>{project.description}</Paragraph>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
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
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <Title level={4}>发送消息</Title>
                  <Space orientation="vertical" style={{ width: '100%' }} size="large">
                    <div>
                      <Text>您的姓名</Text>
                      <input type="text" placeholder="请输入您的姓名" className="input-field" />
                    </div>
                    <div>
                      <Text>邮箱地址</Text>
                      <input type="email" placeholder="请输入您的邮箱" className="input-field" />
                    </div>
                    <div>
                      <Text>消息内容</Text>
                      <textarea placeholder="请输入您的消息" className="textarea-field" rows={4} />
                    </div>
                    <Button type="primary" size="large" onClick={handleContact}>
                      发送消息
                    </Button>
                  </Space>
                </Col>
                <Col xs={24} md={12}>
                  <Title level={4}>其他联系方式</Title>
                  <Paragraph>
                    如果您有项目合作意向或技术交流需求，欢迎通过以下方式联系我。
                  </Paragraph>
                  <Space direction="vertical" size="large">
                    <div>
                      <Text strong>邮箱：</Text>
                      <Text>developer@example.com</Text>
                    </div>
                    <div>
                      <Text strong>微信：</Text>
                      <Text>developer_wx</Text>
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
        <Text>© 2024 My Portfolio. All rights reserved.</Text>
      </Footer>
    </Layout>
  )
}

export default App
