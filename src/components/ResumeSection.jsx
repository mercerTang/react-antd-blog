import { Card, Row, Col, Typography, Tag, Descriptions, Timeline, Space } from 'antd'
import { ClockCircleOutlined, TeamOutlined, ToolOutlined, StarOutlined } from '@ant-design/icons'
import { useTheme } from '../context/ThemeContext'

const { Title, Paragraph, Text } = Typography

const techCategories = [
  { cat: '前端', tags: ['Vue3', 'TypeScript', 'React', 'Element Plus', 'Pinia', 'Vue Router', 'Vite', 'ECharts', 'Axios'] },
  { cat: '桌面端', tags: ['WPF (.NET)', 'XAML', 'MVVM'] },
  { cat: '后端', tags: ['.NET 6/8', 'ASP.NET Core', 'Node.js（学习中）', 'WebSocket', 'RESTful API', 'SignalR'] },
  { cat: '数据库', tags: ['MySQL', 'SQLite', 'Redis', 'Entity Framework Core'] },
  { cat: '知识库平台', tags: ['MaxKB', 'RAG 知识库', '向量检索', '工作流编排'] },
  { cat: '工程化', tags: ['Docker', 'Git', 'CI/CD', 'Nginx', 'Python', 'Jira'] },
]

const workExperience = [
  {
    company: '毕马威全球商务服务 (广东) 有限公司',
    role: '全栈开发工程师',
    period: '2024.05 — 至今',
    color: '#1a1a1a',
    details: [
      '负责企业级智能聊天机器人与知识库系统的前端架构及核心功能开发，基于知识切片与向量检索技术，将 FAQ 召回准确率从 72% 提升至 89%',
      '设计并落地 Agent 任务编排引擎，构建"知识检索 → 工具调用 → 结果验证"闭环流程，关键业务流程处理效率提升 60%，减少人工介入 45%',
      '作为前端核心成员参与企业级中台系统建设，封装含动态表单、权限指令在内的 20+ 通用业务组件，覆盖 6 个领域模块，团队代码复用率提升 30%、开发效率提升 25%',
      '基于 ECharts 实现多维度数据可视化看板，覆盖实时监控、业务趋势与决策分析场景',
      '在国际化团队中以英文作为工作语言，深度参与敏捷迭代、Code Review 及技术方案评审，沉淀可复用的技术组件与最佳实践',
    ],
  },
  {
    company: '珠海金山办公有限公司',
    role: '软件测试工程师',
    period: '2023.07 — 2024.03',
    color: '#999',
    details: [
      '负责办公软件全生命周期测试流程，编写 Python 自动化测试脚本，回归测试效率提升 40%',
      '构建质量保障体系，推动可测试性设计与缺陷预防方案落地，保障产品发版质量',
    ],
  },
]

const projects = [
  {
    title: '智能客服知识库系统',
    period: '2025.09 — 至今',
    tech: '.NET 8 · Vue3 · Element Plus · MaxKB · MySQL · Docker · Python',
    details: [
      '背景：企业知识散落于技术文档、员工手册及工单系统，客服检索效率低、重复咨询率高。调用 MaxKB API 集成 RAG 能力，设计差异化分段策略——技术文档按标题层级拆分、员工手册及内部知识文档通过正则匹配关键段落——将知识召回准确率从 72% 提升至 89%',
      '利用 MaxKB 的向量检索与全文检索混合搜索能力，动态调整相似度阈值与 TOP-K 参数，无效引用率降低 40%',
      '基于 MaxKB 工作流引擎构建"知识检索 → 工具调用 → 结果验证"三阶段 Agent 闭环，封装数据库查询等自定义工具为 MCP 服务，实现跨系统数据联动，关键业务流程处理效率提升 60%',
      '结合 MaxKB 逻辑判断节点与条件分支，通过可视化编排工具调用链，非技术人员可自助搭建定制化智能问答场景，减少人工介入 45%',
    ],
  },
  {
    title: '企业智能聊天机器人',
    period: '2024.10 — 至今',
    tech: 'Vue3 · TypeScript · Element Plus · Pinia · .NET 6 · WebSocket · SignalR',
    details: [
      '背景：业务线依赖人工处理高频重复咨询，响应慢且人力成本高。负责聊天机器人前端架构设计，搭建基于 Pinia 的状态管理方案，实现多会话并发、消息实时同步与历史记录回溯',
      '构建可配置的 Agent 任务编排引擎，支持拖拽式工具链组合与条件分支，业务人员无需编码即可搭建定制化智能问答场景',
      '基于 WebSocket + SignalR 实现消息实时推送，引入消息确认与重试机制，保障高并发下消息可靠投递',
    ],
  },
  {
    title: '企业中台系统',
    period: '2024.05 — 至今',
    tech: 'Vue3 · TypeScript · Element Plus · ECharts · .NET 6 · RESTful API',
    details: [
      '背景：多业务线各自维护独立前端项目，技术栈分裂、重复造轮子严重。参与统一中台前端架构建设，基于 Vue3 + TypeScript 搭建工程化脚手架，统一 ESLint/Prettier 规范与 Git 工作流',
      '封装 20+ 通用业务组件（动态表单、权限指令、搜索面板等），覆盖 6 个领域模块，代码复用率提升 30%，开发效率提升 25%',
      '设计低代码工作流引擎前端，通过可视化节点编排实现业务流程配置时间从 2 小时/流程 降至 10 分钟/流程',
      '整合 ECharts 图表库开发多维度数据可视化看板，实现实时监控、趋势分析与业务报表一站式展示',
      '通过路由懒加载、组件异步加载与滚动虚拟化，首屏加载时间优化 40%',
    ],
  },
  {
    title: '人工客服 IM 桌面应用',
    period: '2025.09 — 至今',
    tech: 'WPF (.NET) · WebSocket · EF Core · SQLite',
    details: [
      '基于 WPF 原生控件构建桌面端即时通讯客户端，采用 MVVM 模式实现业务模块与模块化设计',
      '设计高可用通信架构：心跳检测 + 断线重连 + 消息 ACK 确认，高并发下消息到达率提升至 99.9%',
      '设计"服务端 + 本地 SQLite"双端消息存储架构，支持离线消息同步与毫秒级全文检索，客服响应时长缩短 20%',
      '使用 VirtualizingStackPanel 优化长列表渲染，确保高频消息推送下界面流畅不卡顿',
    ],
  },
  {
    title: '企业会议室预约系统',
    period: '2024.10 — 2025.04',
    tech: 'Vue3 · .NET 6 Web API · MySQL · Redis · Ant Design Vue',
    details: [
      '背景：原会议室管理依赖线下协调，资源利用率仅 65%，冲突频发。独立完成从需求分析、数据库设计到上线全流程，支持千人级并发预约',
      '设计基于 Redis 分布式锁的冲突检测算法，资源利用率从 65% 提升至 90%，预约成功率从 82% 提升至 95%',
      '构建 RBAC 多角色权限体系，实现数据级权限隔离、操作审计日志与审批流程追踪',
      '主导 MySQL 数据库规范设计，针对高频查询场景进行联合索引优化，查询性能提升 40%',
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

        {/* 专业摘要 */}
        <Card className={`resume-card ${darkMode ? 'dark-mode' : ''}`} style={{ marginBottom: 24 }}>
          <Paragraph className={darkMode ? 'dark-mode' : ''} style={{ fontSize: 15, marginBottom: 0, textAlign: 'center' }}>
            2 年+ 全栈开发经验，前端以 Vue3/TypeScript 为主并具备 React 个人项目实践，后端以 .NET 为主并向 Node.js 生态扩展。
            参与并负责企业级中台、RAG 知识库系统及桌面端 IM 应用的前后端交付。
            擅长 RAG 知识库系统构建与 Agent 工作流编排，追求技术深度与业务价值的高效统一。
          </Paragraph>
        </Card>

        {/* 基本信息 */}
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card
              className={`resume-info-card ${darkMode ? 'dark-mode' : ''}`}
              style={{ height: '100%' }}
              styles={{ body: { height: '100%' } }}
            >
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div>
                  <Text type="secondary">姓名 · 求职意向</Text>
                  <div><Text strong className={darkMode ? 'dark-mode' : ''}>唐小宇 · 全栈开发工程师</Text></div>
                </div>
                <div>
                  <Text type="secondary">电话 · 邮箱</Text>
                  <div><Text strong className={darkMode ? 'dark-mode' : ''}>13047091249 · 1253701123@qq.com</Text></div>
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
                  <Text type="secondary">个人网站</Text>
                  <div><a href="https://www.mercertang.top" target="_blank" rel="noopener"><Text strong className={darkMode ? 'dark-mode' : ''}>www.mercertang.top</Text></a></div>
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
            <Card
              className={`resume-highlight-card ${darkMode ? 'dark-mode' : ''}`}
              style={{ height: '100%' }}
              styles={{ body: { height: '100%', display: 'flex', flexDirection: 'column' } }}
            >
              <Title level={4} className={darkMode ? 'dark-mode' : ''}>
                <StarOutlined /> 优势亮点
              </Title>
              <Space direction="vertical" size="small" style={{ width: '100%', textAlign: 'left' }}>
                <Paragraph className={darkMode ? 'dark-mode' : ''} style={{ marginBottom: 0, textAlign: 'left' }}>
                  <strong>全栈交付：</strong>擅长 Vue3/TypeScript 前端生态与 .NET 后端技术栈，有个人 React 作品 mercertang.top；熟悉 TypeScript 类型系统，正系统学习 Node.js 运行时与生态
                </Paragraph>
                <Paragraph className={darkMode ? 'dark-mode' : ''} style={{ marginBottom: 0, textAlign: 'left' }}>
                  <strong>知识库系统：</strong>基于 RAG 构建企业级知识库，精通知识切片策略、混合检索、Agent 工作流编排与 MCP 工具集成
                </Paragraph>
                <Paragraph className={darkMode ? 'dark-mode' : ''} style={{ marginBottom: 0, textAlign: 'left' }}>
                  <strong>工程化架构：</strong>擅长大型前端工程化治理，涵盖脚手架搭建、ESLint/Prettier 规范、CI/CD 流水线及 Monorepo 设计
                </Paragraph>
                <Paragraph className={darkMode ? 'dark-mode' : ''} style={{ marginBottom: 0, textAlign: 'left' }}>
                  <strong>性能优化：</strong>通过路由懒加载、虚拟滚动、联合索引优化等手段，首屏加载速度提升 40%，高并发响应稳定在 200ms 以内
                </Paragraph>
                <Paragraph className={darkMode ? 'dark-mode' : ''} style={{ marginBottom: 0, textAlign: 'left' }}>
                  <strong>团队效能：</strong>主导内部 UI 组件库从零搭建，沉淀 20+ 通用组件；结合 Python 自动化工具链，测试效率提升 40%
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
                    <ul className={`resume-list ${darkMode ? 'dark-mode' : ''}`} style={{ textAlign: 'left' }}>
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
                    <ul className={`resume-list ${darkMode ? 'dark-mode' : ''}`} style={{ textAlign: 'left' }}>
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

        {/* 核心能力 */}
        <div style={{ marginTop: 24 }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Card className={`resume-ai-card ${darkMode ? 'dark-mode' : ''}`}>
                <Title level={5} className={darkMode ? 'dark-mode' : ''}>前端工程化</Title>
                <Text type="secondary">擅长 Vue3 生态大型项目架构，熟悉 Pinia 状态管理、Vue Router 路由设计、Vite 构建优化及 ESLint/Prettier 规范落地</Text>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className={`resume-ai-card ${darkMode ? 'dark-mode' : ''}`}>
                <Title level={5} className={darkMode ? 'dark-mode' : ''}>知识库与智能系统</Title>
                <Text type="secondary">精通 RAG 知识库构建、知识切片策略设计与 Agent 工作流编排，具备 MCP 工具集成与跨系统联动经验</Text>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className={`resume-ai-card ${darkMode ? 'dark-mode' : ''}`}>
                <Title level={5} className={darkMode ? 'dark-mode' : ''}>性能与质量</Title>
                <Text type="secondary">丰富的首屏优化、虚拟滚动及数据库索引调优经验，熟练使用 ECharts 构建高性能数据可视化方案</Text>
              </Card>
            </Col>
          </Row>
        </div>

      </div>
    </section>
  )
}
