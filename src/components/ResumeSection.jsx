import { Card, Row, Col, Typography, Tag, Descriptions, Timeline, Space } from 'antd'
import { ClockCircleOutlined, TeamOutlined, ToolOutlined, StarOutlined } from '@ant-design/icons'
import { useTheme } from '../context/ThemeContext'

const { Title, Paragraph, Text } = Typography

const techCategories = [
  { cat: '前端', tags: ['Vue3', 'TypeScript', 'React', 'Element Plus', 'ECharts', 'WPF'] },
  { cat: '后端', tags: ['.NET 6/8', 'ASP.NET Core', 'WebSocket', 'RESTful API'] },
  { cat: '数据库', tags: ['MySQL', 'SQLite', 'Redis', 'Entity Framework Core'] },
  { cat: 'AI / Agent', tags: ['AI Agent', 'Claude Code', 'CCS', 'DeepSeek', 'LLM 集成'] },
  { cat: '工程化', tags: ['Docker', 'Python', 'Git', '微服务'] },
]

const workExperience = [
  {
    company: '毕马威全球商务服务 (广东) 有限公司',
    role: '全栈开发工程师',
    period: '2024.05 — 2026.02',
    color: '#1a1a1a',
    details: [
      '参与企业级中台系统及内部资源调度工具的核心开发，负责前后端架构搭建与桌面端应用落地',
      '在国际化团队中协作，熟悉英文工作环境下的开发流程及项目管理规范',
      '封装 20+ 通用业务组件，构建内部 UI 组件库，团队代码复用率提升 30%',
    ],
  },
  {
    company: '珠海金山办公有限公司',
    role: '软件测试工程师',
    period: '2023.07 — 2024.03',
    color: '#999',
    details: [
      '负责办公软件产品的全生命周期测试，保障产品质量',
      '开发 Python 自动化脚本，提升测试覆盖率与执行效率',
    ],
  },
]

const projects = [
  {
    title: '人工客服 IM 桌面应用',
    period: '2025.09 — 2026.02',
    tech: 'WPF (.NET) · WebSocket · EF Core · SQLite',
    details: [
      '基于 WPF 构建高性能桌面客户端，引入心跳检测、断线重连及 ACK 确认机制，高并发下消息到达率提升至 95%',
      '设计"服务端 + 本地"双端消息存储架构，支持离线同步与多端状态一致',
      '优化 WPF UI 线程渲染，确保高频推送下界面流畅无卡顿',
    ],
  },
  {
    title: '企业中台系统及聊天机器人',
    period: '2024.05 — 2026.02',
    tech: 'Vue3 · TypeScript · Element Plus · ECharts · .NET 6 · WebSocket',
    details: [
      '主导企业级中台前端架构设计，封装 20+ 通用业务组件，构建内部 UI 组件库，复用率提升 30%',
      '独立负责 FAQ 知识库管理与工作流引擎前端落地，通过可视化配置实现低代码业务逻辑编排',
      '开发多维度数据可视化大屏；通过路由懒加载与分页策略，首屏加载速度提升 40%',
    ],
  },
  {
    title: '企业会议室预约系统',
    period: '2024.10 — 2025.04',
    tech: 'Vue3 · .NET 6 Web API · MySQL · Redis',
    details: [
      '独立完成从需求分析到上线的全流程，前后端分离架构',
      '基于 Redis 分布式锁实现预约冲突检测，高并发下响应时间稳定在 200ms 以内',
      '构建 RBAC 多角色权限体系，实现数据级权限隔离与操作审计',
      '主导 MySQL 数据库设计与联合索引优化，高频查询性能提升 40%',
    ],
  },
]

export default function ResumeSection() {
  const { darkMode } = useTheme()

  return (
    <section id="resume" className={`section ${darkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        <Title level={2} className={`section-title ${darkMode ? 'dark-mode' : ''}`}>
          个人简历
        </Title>

        {/* 基本信息 */}
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card className={`resume-info-card ${darkMode ? 'dark-mode' : ''}`}>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div>
                  <Text type="secondary">姓名</Text>
                  <div><Text strong className={darkMode ? 'dark-mode' : ''}>唐小宇</Text></div>
                </div>
                <div>
                  <Text type="secondary">学历</Text>
                  <div><Text strong className={darkMode ? 'dark-mode' : ''}>本科 · 信息管理与信息系统</Text></div>
                </div>
                <div>
                  <Text type="secondary">毕业院校</Text>
                  <div><Text strong className={darkMode ? 'dark-mode' : ''}>广州软件学院 (2020-2024)</Text></div>
                </div>
                <div>
                  <Text type="secondary">工作经验</Text>
                  <div><Text strong className={darkMode ? 'dark-mode' : ''}>3 年</Text></div>
                </div>
                <div>
                  <Text type="secondary">语言</Text>
                  <div><Text strong className={darkMode ? 'dark-mode' : ''}>英语 — 工作语言</Text></div>
                </div>
              </Space>
            </Card>
          </Col>

          <Col xs={24} md={16}>
            <Card className={`resume-highlight-card ${darkMode ? 'dark-mode' : ''}`}>
              <Title level={4} className={darkMode ? 'dark-mode' : ''}>
                <StarOutlined /> 优势亮点
              </Title>
              <Space direction="vertical" size="small">
                <Paragraph className={darkMode ? 'dark-mode' : ''}>
                  <strong>全栈能力：</strong>横跨 Vue3/TypeScript 前端与 .NET 后端，具备从 0 到 1 独立交付能力
                </Paragraph>
                <Paragraph className={darkMode ? 'dark-mode' : ''}>
                  <strong>AI 工程化：</strong>熟悉 AI Agent 开发范式，掌握 Claude Code 及 DeepSeek 等主流模型的集成落地
                </Paragraph>
                <Paragraph className={darkMode ? 'dark-mode' : ''}>
                  <strong>架构设计：</strong>擅长前后端分离架构、RESTful API 设计、RBAC 权限模型与数据库优化
                </Paragraph>
                <Paragraph className={darkMode ? 'dark-mode' : ''}>
                  <strong>工程效率：</strong>通过组件库建设与 Python 自动化工具链，显著提升团队交付效率
                </Paragraph>
              </Space>
            </Card>
          </Col>
        </Row>

        {/* 技术栈 */}
        <div style={{ marginTop: 24 }}>
          <Card className={`resume-card ${darkMode ? 'dark-mode' : ''}`}>
            <Title level={4} className={darkMode ? 'dark-mode' : ''}>
              <ToolOutlined /> 技术栈
            </Title>
            {techCategories.map((cat) => (
              <div key={cat.cat} className="resume-tech-row" style={{ marginBottom: 12 }}>
                <Text strong className={darkMode ? 'dark-mode' : ''} style={{ minWidth: 70, display: 'inline-block' }}>
                  {cat.cat}
                </Text>
                <Space size={[4, 4]} wrap>
                  {cat.tags.map((t) => (
                    <Tag key={t} className={darkMode ? 'dark-mode' : ''}>{t}</Tag>
                  ))}
                </Space>
              </div>
            ))}
          </Card>
        </div>

        {/* 工作经历 */}
        <div style={{ marginTop: 24 }}>
          <Card className={`resume-card ${darkMode ? 'dark-mode' : ''}`}>
            <Title level={4} className={darkMode ? 'dark-mode' : ''}>
              <TeamOutlined /> 工作经历
            </Title>
            <Timeline
              items={workExperience.map((exp) => ({
                color: exp.color,
                children: (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 4 }}>
                      <span>
                        <Text strong className={darkMode ? 'dark-mode' : ''} style={{ fontSize: 15 }}>
                          {exp.role}
                        </Text>
                        <Text type="secondary" style={{ marginLeft: 8 }}>
                          {exp.company}
                        </Text>
                      </span>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        <ClockCircleOutlined style={{ marginRight: 4 }} />{exp.period}
                      </Text>
                    </div>
                    <ul className={`resume-list ${darkMode ? 'dark-mode' : ''}`}>
                      {exp.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                ),
              }))}
            />
          </Card>
        </div>

        {/* 项目经验 */}
        <div style={{ marginTop: 24 }}>
          <Card className={`resume-card ${darkMode ? 'dark-mode' : ''}`}>
            <Title level={4} className={darkMode ? 'dark-mode' : ''}>
              项目经验
            </Title>
            <Timeline
              items={projects.map((proj, idx) => ({
                color: idx === 0 ? '#1a1a1a' : '#999',
                children: (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 4 }}>
                      <Text strong className={darkMode ? 'dark-mode' : ''} style={{ fontSize: 15 }}>
                        {proj.title}
                      </Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        <ClockCircleOutlined style={{ marginRight: 4 }} />{proj.period}
                      </Text>
                    </div>
                    <div style={{ margin: '4px 0 6px' }}>
                      <Text type="secondary" style={{ fontSize: 12 }}>{proj.tech}</Text>
                    </div>
                    <ul className={`resume-list ${darkMode ? 'dark-mode' : ''}`}>
                      {proj.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                ),
              }))}
            />
          </Card>
        </div>

        {/* AI 技能 */}
        <div style={{ marginTop: 24 }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Card className={`resume-ai-card ${darkMode ? 'dark-mode' : ''}`}>
                <Title level={5} className={darkMode ? 'dark-mode' : ''}>AI Agent 开发</Title>
                <Text type="secondary">熟悉 Agent 架构设计模式（工具调用、记忆管理、多步推理），能够将 LLM 能力集成到实际业务场景</Text>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className={`resume-ai-card ${darkMode ? 'dark-mode' : ''}`}>
                <Title level={5} className={darkMode ? 'dark-mode' : ''}>Claude Code (CCS)</Title>
                <Text type="secondary">掌握 Claude Code 的 Agent SDK，具备自定义 Agent、自动化工作流及代码智能辅助的实践经验</Text>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className={`resume-ai-card ${darkMode ? 'dark-mode' : ''}`}>
                <Title level={5} className={darkMode ? 'dark-mode' : ''}>DeepSeek (DS)</Title>
                <Text type="secondary">熟悉 DeepSeek 系列模型的 API 调用、Prompt 工程及企业级应用落地</Text>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  )
}
