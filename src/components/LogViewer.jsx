import { useState } from 'react'
import { Card, List, Tag, Typography, Space, Button } from 'antd'
import { useTheme } from '../context/ThemeContext'
import logger from '../utils/logger'

const { Text } = Typography

export default function LogViewer() {
  const { darkMode } = useTheme()
  const [logs, setLogs] = useState([])
  const [visible, setVisible] = useState(false)

  const showViewer = () => {
    setLogs(logger.getLogs())
    setVisible(true)
    logger.logUserAction('打开日志查看器')
  }

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
        onClick={showViewer}
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
