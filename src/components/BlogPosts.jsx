import { useState, useEffect } from 'react'
import { Card, List, Typography, Space, Tag, Spin, Alert, Button } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'
import { useTheme } from '../context/ThemeContext'
import logger from '../utils/logger'
import postsApi from '../utils/api'

const { Title, Paragraph, Text } = Typography

export default function BlogPosts() {
  const { darkMode } = useTheme()
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
      const data = await postsApi.getAll()
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
          博客文章
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
                    <ClockCircleOutlined />
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
