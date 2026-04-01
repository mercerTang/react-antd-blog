import React, { useState } from 'react'
import { Card, Row, Col, Typography, Divider, Modal } from 'antd'

const { Title, Paragraph, Text } = Typography

// 特效数据
const effectsData = {
  button: [
    {
      title: '悬停放大',
      className: 'hover-effect',
      boxClassName: 'hover-box',
      content: '悬停我',
      code: `.hover-box {\n  width: 100px;\n  height: 60px;\n  background: #333;\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 8px;\n  transition: all 0.3s ease;\n  cursor: pointer;\n}\n\n.hover-box:hover {\n  transform: scale(1.1);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  background: #111;\n}`
    },
    {
      title: '阴影变化',
      className: 'shadow-effect',
      boxClassName: 'shadow-box',
      content: '阴影',
      code: `.shadow-box {\n  width: 100px;\n  height: 60px;\n  background: #333;\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 8px;\n  transition: all 0.3s ease;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n\n.shadow-box:hover {\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);\n  transform: translateY(-2px);\n}`
    },
    {
      title: '渐变按钮',
      className: 'gradient-button-effect',
      boxClassName: 'gradient-button',
      content: '渐变按钮',
      code: `.gradient-button {
  width: 120px;
  height: 50px;
  background: linear-gradient(135deg, #333, #666);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  font-weight: bold;
}

.gradient-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(51, 51, 51, 0.4);
  background: linear-gradient(135deg, #555, #888);
}

.gradient-button.dark-mode {
  background: linear-gradient(135deg, #555, #888);
}

.gradient-button.dark-mode:hover {
  background: linear-gradient(135deg, #777, #aaa);
}`
    },
    {
      title: '霓虹按钮',
      className: 'neon-button-effect',
      boxClassName: 'neon-button',
      content: '霓虹按钮',
      code: `.neon-button {
  width: 120px;
  height: 50px;
  background: transparent;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid #333;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(51, 51, 51, 0.5), 0 0 10px rgba(51, 51, 51, 0.3);
  box-shadow: 0 0 5px rgba(51, 51, 51, 0.3), 0 0 10px rgba(51, 51, 51, 0.2);
}

.neon-button:hover {
  color: #fff;
  background: #333;
  box-shadow: 0 0 10px rgba(51, 51, 51, 0.5), 0 0 20px rgba(51, 51, 51, 0.4), 0 0 30px rgba(51, 51, 51, 0.3);
  text-shadow: 0 0 5px #fff;
}

.neon-button.dark-mode {
  color: #fff;
  border-color: #fff;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.3), 0 0 10px rgba(255, 255, 255, 0.2);
}

.neon-button.dark-mode:hover {
  color: #333;
  background: #fff;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.3);
}`
    },
    {
      title: '玻璃拟态按钮',
      className: 'glass-button-effect',
      boxClassName: 'glass-button',
      content: '玻璃按钮',
      code: `.glass-button-effect {
  padding: 20px;
  background: transparent;
}

.glass-button {
  width: 120px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
}

.glass-button:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.glass-button.dark-mode {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.3);
}

.glass-button.dark-mode:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.5);
}`
    },
    {
      title: '打字机效果',
      className: 'typewriter-effect',
      boxClassName: 'typewriter',
      content: 'Hello CSS',
      code: `.typewriter-effect {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.typewriter {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  overflow: hidden;
  white-space: nowrap;
  border-right: 3px solid #333;
  animation: typing 3s steps(12) infinite, blink 0.75s step-end infinite;
}

.typewriter.dark-mode {
  color: #fff;
  border-right-color: #fff;
}

@keyframes typing {
  0%, 20%, 80%, 100% {
    width: 0;
  }
  40%, 60% {
    width: 100%;
  }
}

@keyframes blink {
  from, to {
    border-color: transparent;
  }
  50% {
    border-color: #333;
  }
}`
    }
  ],
  '3d': [
    {
      title: '3D旋转',
      className: 'css-3d-effect',
      boxClassName: 'css-3d-box',
      content: '3D效果',
      code: `.css-3d-effect {\n  perspective: 1000px;\n}\n\n.css-3d-box {\n  width: 100px;\n  height: 60px;\n  background: #333;\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 8px;\n  transition: all 0.3s ease;\n  transform-style: preserve-3d;\n  transform: rotateY(0deg);\n}\n\n.css-3d-box:hover {\n  transform: rotateY(180deg);\n}`
    },
    {
      title: '3D立方体',
      className: 'cube-3d-effect',
      boxClassName: 'cube-3d',
      content: '3D立方体',
      code: `.cube-3d-effect {\n  perspective: 1000px;\n  width: 100px;\n  height: 100px;\n}\n\n.cube-3d {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  transform-style: preserve-3d;\n  animation: rotate 10s infinite linear;\n}\n\n.cube-3d::before,\n.cube-3d::after,\n.cube-3d span {\n  content: '';\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  background: rgba(51, 51, 51, 0.8);\n  border: 1px solid #666;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #fff;\n  font-weight: bold;\n}\n\n.cube-3d::before {\n  transform: translateZ(50px);\n}\n\n.cube-3d::after {\n  transform: rotateY(180deg) translateZ(50px);\n}\n\n.cube-3d span:nth-child(1) {\n  transform: rotateY(90deg) translateZ(50px);\n}\n\n.cube-3d span:nth-child(2) {\n  transform: rotateY(-90deg) translateZ(50px);\n}\n\n.cube-3d span:nth-child(3) {\n  transform: rotateX(90deg) translateZ(50px);\n}\n\n.cube-3d span:nth-child(4) {\n  transform: rotateX(-90deg) translateZ(50px);\n}\n\n@keyframes rotate {\n  0% {\n    transform: rotateX(0deg) rotateY(0deg);\n  }\n  100% {\n    transform: rotateX(360deg) rotateY(360deg);\n  }\n}`
    },
    {
      title: '3D翻书效果',
      className: 'book-3d-effect',
      boxClassName: 'book-3d',
      content: '3D翻书',
      code: `.book-3d-effect {\n  perspective: 1000px;\n  width: 120px;\n  height: 160px;\n}\n\n.book-3d {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  transform-style: preserve-3d;\n  transition: transform 1s ease;\n}\n\n.book-3d:hover {\n  transform: rotateY(-30deg);\n}\n\n.book-3d::before,\n.book-3d::after {\n  content: '';\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  backface-visibility: hidden;\n  border-radius: 5px;\n}\n\n.book-3d::before {\n  background: linear-gradient(135deg, #333, #555);\n  transform: rotateY(0deg);\n}\n\n.book-3d::after {\n  background: linear-gradient(135deg, #555, #777);\n  transform: rotateY(180deg);\n}\n\n.book-3d span {\n  position: absolute;\n  left: -10px;\n  top: 0;\n  width: 10px;\n  height: 100%;\n  background: linear-gradient(90deg, #666, #333);\n  transform: rotateY(90deg);\n  transform-origin: left center;\n}`
    },
    {
      title: '3D波浪加载',
      className: 'wave-3d-effect',
      boxClassName: 'wave-3d',
      content: '3D波浪',
      code: `.wave-3d-effect {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  justify-content: center;\n  height: 100px;\n}\n\n.wave-3d div {\n  width: 16px;\n  height: 50px;\n  background: linear-gradient(180deg, #333, #555);\n  border-radius: 8px;\n  animation: wave 1.2s infinite ease-in-out;\n}\n\n.wave-3d div:nth-child(2) {\n  animation-delay: 0.1s;\n}\n\n.wave-3d div:nth-child(3) {\n  animation-delay: 0.2s;\n}\n\n.wave-3d div:nth-child(4) {\n  animation-delay: 0.3s;\n}\n\n.wave-3d div:nth-child(5) {\n  animation-delay: 0.4s;\n}\n\n.wave-3d.dark-mode div {\n  background: linear-gradient(180deg, #555, #777);\n}\n\n@keyframes wave {\n  0%, 100% {\n    transform: scaleY(0.5);\n  }\n  50% {\n    transform: scaleY(1);\n  }\n}`
    }
  ],
  animation: [
    {
      title: '脉冲动画',
      className: 'animation-effect',
      boxClassName: 'animate-box',
      content: '动画',
      code: `.animate-box {\n  width: 100px;\n  height: 60px;\n  background: #333;\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 8px;\n  animation: pulse 2s infinite;\n}\n\n@keyframes pulse {\n  0% {\n    transform: scale(1);\n    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.4);\n  }\n  70% {\n    transform: scale(1.1);\n    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);\n  }\n  100% {\n    transform: scale(1);\n    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);\n  }\n}`
    },
    {
      title: '文字流光效果',
      className: 'text-glow-effect',
      boxClassName: 'text-glow',
      content: '流光文字',
      code: `.text-glow {\n  font-size: 24px;\n  font-weight: bold;\n  background: linear-gradient(90deg, #333, #666, #999, #333, #666);\n  background-size: 400%;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  animation: text-glow 3s linear infinite;\n}\n\n.text-glow.dark-mode {\n  background: linear-gradient(90deg, #fff, #ccc, #999, #fff, #ccc);\n}\n\n@keyframes text-glow {\n  0% {\n    background-position: 0% 50%;\n  }\n  100% {\n    background-position: 100% 50%;\n  }\n}`
    },
    {
      title: '流体动画',
      className: 'fluid-animation-effect',
      boxClassName: 'fluid-animation',
      content: '流体动画',
      code: `.fluid-animation-effect {\n  position: relative;\n  width: 200px;\n  height: 100px;\n  overflow: hidden;\n  border-radius: 20px;\n  background: #333;\n}\n\n.fluid-animation::before {\n  content: '';\n  position: absolute;\n  top: -50%;\n  left: -50%;\n  width: 200%;\n  height: 200%;\n  background: linear-gradient(\n    to bottom right,\n    rgba(255, 255, 255, 0.3) 0%,\n    rgba(255, 255, 255, 0) 50%,\n    rgba(255, 255, 255, 0.3) 100%\n  );\n  animation: fluid 3s infinite linear;\n  transform: rotate(45deg);\n}\n\n.fluid-animation-effect.dark-mode {\n  background: #555;\n}\n\n@keyframes fluid {\n  0% {\n    transform: translateX(-100%) translateY(-100%) rotate(45deg);\n  }\n  100% {\n    transform: translateX(100%) translateY(100%) rotate(45deg);\n  }\n}`
    }
  ],
  loading: [
    {
      title: '小球加载',
      className: 'balls-loading-effect',
      boxClassName: 'balls-loading',
      content: <><div></div><div></div><div></div><div></div><div></div></>,
      code: `.balls-loading-effect {\n  display: flex;\n  gap: 10px;\n  align-items: flex-end;\n  justify-content: center;\n  height: 100px;\n  padding-bottom: 10px;\n}\n\n.balls-loading {\n  display: flex;\n  gap: 10px;\n  align-items: flex-end;\n  justify-content: center;\n  height: 100%;\n}\n\n.balls-loading div {\n  width: 16px;\n  height: 16px;\n  border-radius: 50%;\n  animation: balls 1.2s infinite ease-in-out;\n}\n\n.balls-loading div:nth-child(1) {\n  background: #333;\n  animation-delay: 0s;\n}\n\n.balls-loading div:nth-child(2) {\n  background: #444;\n  animation-delay: 0.1s;\n}\n\n.balls-loading div:nth-child(3) {\n  background: #555;\n  animation-delay: 0.2s;\n}\n\n.balls-loading div:nth-child(4) {\n  background: #666;\n  animation-delay: 0.3s;\n}\n\n.balls-loading div:nth-child(5) {\n  background: #777;\n  animation-delay: 0.4s;\n}\n\n.balls-loading.dark-mode div:nth-child(1) {\n  background: #555;\n}\n\n.balls-loading.dark-mode div:nth-child(2) {\n  background: #666;\n}\n\n.balls-loading.dark-mode div:nth-child(3) {\n  background: #777;\n}\n\n.balls-loading.dark-mode div:nth-child(4) {\n  background: #888;\n}\n\n.balls-loading.dark-mode div:nth-child(5) {\n  background: #999;\n}\n\n@keyframes balls {\n  0%, 100% {\n    transform: translateY(0);\n  }\n  50% {\n    transform: translateY(-15px);\n  }\n}`
    },
    {
      title: '涨水效果',
      className: 'water-loading-effect',
      boxClassName: 'water-loading',
      content: '涨水效果',
      code: `.water-loading-effect {\n  position: relative;\n  width: 100px;\n  height: 100px;\n  border-radius: 50%;\n  overflow: hidden;\n  background: #333;\n  box-shadow: 0 0 20px rgba(51, 51, 51, 0.3);\n}\n\n.water-loading::before {\n  content: '';\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 0%;\n  background: rgba(255, 255, 255, 0.3);\n  animation: water 3s infinite ease-in-out;\n}\n\n.water-loading-effect.dark-mode {\n  background: #555;\n  box-shadow: 0 0 20px rgba(85, 85, 85, 0.3);\n}`
    },
    {
      title: '旋转加载',
      className: 'spin-loading-effect',
      boxClassName: 'spin-loading',
      content: null,
      code: `.spin-loading-effect {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spin-loading {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(51, 51, 51, 0.1);
  border-top: 4px solid #333;
  border-radius: 50%;
  animation: spin 1s infinite linear;
}

.spin-loading.dark-mode {
  border-color: rgba(255, 255, 255, 0.1);
  border-top-color: #fff;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`
    },
    {
      title: '进度条动画',
      className: 'progress-loading-effect',
      boxClassName: 'progress-loading',
      content: null,
      code: `.progress-loading-effect {
  width: 180px;
  height: 20px;
  background: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
}

.progress-loading {
  width: 0%;
  height: 100%;
  background: linear-gradient(90deg, #333, #555, #777, #333);
  background-size: 300%;
  border-radius: 10px;
  animation: progress 2s infinite linear;
}

.progress-loading.dark-mode {
  background: linear-gradient(90deg, #555, #777, #999, #555);
}

@keyframes progress {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}`
    }
  ],
  interaction: [
    {
      title: '悬停反馈',
      className: 'hover-effect',
      boxClassName: 'hover-box',
      content: '点击我',
      code: `.hover-box {\n  width: 100px;\n  height: 60px;\n  background: #333;\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 8px;\n  transition: all 0.3s ease;\n  cursor: pointer;\n}\n\n.hover-box:hover {\n  transform: scale(1.1);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  background: #111;\n}`
    },
    {
      title: '平滑过渡',
      className: 'transition-effect',
      boxClassName: 'transition-box',
      content: '悬停',
      code: `.transition-box {\n  width: 100px;\n  height: 60px;\n  background: #333;\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 8px;\n  transition: all 0.5s ease;\n}\n\n.transition-box:hover {\n  width: 120px;\n  height: 70px;\n  background: #111;\n  font-size: 18px;\n}`
    },
    {
      title: '深度效果',
      className: 'shadow-effect',
      boxClassName: 'shadow-box',
      content: '阴影',
      code: `.shadow-box {\n  width: 100px;\n  height: 60px;\n  background: #333;\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 8px;\n  transition: all 0.3s ease;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n\n.shadow-box:hover {\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);\n  transform: translateY(-2px);\n}`
    },
    {
      title: '卡片翻转',
      className: 'card-flip-effect',
      boxClassName: 'card-flip',
      content: '卡片翻转',
      code: `.card-flip-effect {\n  perspective: 1000px;\n  width: 120px;\n  height: 160px;\n}\n\n.card-flip {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  transform-style: preserve-3d;\n  transition: transform 0.6s;\n}\n\n.card-flip:hover {\n  transform: rotateY(180deg);\n}\n\n.card-flip::before,\n.card-flip::after {\n  content: '';\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  backface-visibility: hidden;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #fff;\n  font-weight: bold;\n}\n\n.card-flip::before {\n  background: linear-gradient(135deg, #333, #555);\n  transform: rotateY(0deg);\n}\n\n.card-flip::after {\n  background: linear-gradient(135deg, #555, #777);\n  transform: rotateY(180deg);\n}`
    }
  ]
}

// 特效卡片组件
function EffectCard({ effect, darkMode }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Card 
        hoverable 
        className={`css-card ${darkMode ? 'dark-mode' : ''}`}
        onClick={showModal}
      >
        <Title level={4} className={darkMode ? 'dark-mode' : ''}>{effect.title}</Title>
        <div className={`css-effect ${effect.className}`}>
          <div className={`${effect.boxClassName} ${darkMode ? 'dark-mode' : ''}`}>{effect.content}</div>
        </div>
      </Card>
      <Modal
        title={effect.title}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className={darkMode ? 'dark-mode' : ''}
        contentClassName={darkMode ? 'dark-mode' : ''}
        headerClassName={darkMode ? 'dark-mode' : ''}
      >
        <div className={`code-block ${darkMode ? 'dark-mode' : ''}`}>
          <div className={`code-header ${darkMode ? 'dark-mode' : ''}`}>
            <span className={`code-language ${darkMode ? 'dark-mode' : ''}`}>CSS</span>
          </div>
          <pre className={`code-content ${darkMode ? 'dark-mode' : ''}`}>{effect.code}</pre>
        </div>
      </Modal>
    </>
  )
}

function CssEffects({ darkMode }) {
  const [expandedCategories, setExpandedCategories] = useState({
    button: true,
    '3d': true,
    animation: true,
    loading: true,
    interaction: true
  })

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  const scrollToCategory = (categoryId) => {
    const element = document.getElementById(categoryId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      // 自动展开该分类
      setExpandedCategories(prev => ({
        ...prev,
        [categoryId]: true
      }))
    }
  }

  return (
    <div className={`css-effects-page ${darkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        <Title level={2} className={`section-title ${darkMode ? 'dark-mode' : ''}`}>CSS特效</Title>
        <Paragraph className={`section-description ${darkMode ? 'dark-mode' : ''}`}>
          按应用场景分类的CSS特效集合，可直接应用到项目中。点击卡片查看代码。
        </Paragraph>

        {/* 快速定位导航 */}
        <div className={`quick-nav ${darkMode ? 'dark-mode' : ''}`}>
          <span className={`quick-nav-text ${darkMode ? 'dark-mode' : ''}`}>快速定位：</span>
          <button 
            className={`nav-btn ${darkMode ? 'dark-mode' : ''}`}
            onClick={() => scrollToCategory('button')}
          >
            按钮特效
          </button>
          <button 
            className={`nav-btn ${darkMode ? 'dark-mode' : ''}`}
            onClick={() => scrollToCategory('3d')}
          >
            3D效果
          </button>
          <button 
            className={`nav-btn ${darkMode ? 'dark-mode' : ''}`}
            onClick={() => scrollToCategory('animation')}
          >
            动画效果
          </button>
          <button 
            className={`nav-btn ${darkMode ? 'dark-mode' : ''}`}
            onClick={() => scrollToCategory('loading')}
          >
            加载效果
          </button>
          <button 
            className={`nav-btn ${darkMode ? 'dark-mode' : ''}`}
            onClick={() => scrollToCategory('interaction')}
          >
            交互特效
          </button>
        </div>

        <Divider />

        {/* 按钮特效 */}
        <div className="category-section" id="button">
          <div 
            className="category-header"
            onClick={() => toggleCategory('button')}
          >
            <Title level={3} className={`category-title ${darkMode ? 'dark-mode' : ''}`}>
              按钮特效
            </Title>
            <div className={`toggle-icon ${darkMode ? 'dark-mode' : ''}`}>
              {expandedCategories.button ? '▼' : '▶'}
            </div>
          </div>
          {expandedCategories.button && (
            <Row gutter={[24, 24]}>
              {effectsData.button.map((effect, index) => (
                <Col xs={24} md={8} key={index}>
                  <EffectCard effect={effect} darkMode={darkMode} />
                </Col>
              ))}
            </Row>
          )}
        </div>

        <Divider />

        {/* 3D效果 */}
        <div className="category-section" id="3d">
          <div 
            className="category-header"
            onClick={() => toggleCategory('3d')}
          >
            <Title level={3} className={`category-title ${darkMode ? 'dark-mode' : ''}`}>
              3D效果
            </Title>
            <div className={`toggle-icon ${darkMode ? 'dark-mode' : ''}`}>
              {expandedCategories['3d'] ? '▼' : '▶'}
            </div>
          </div>
          {expandedCategories['3d'] && (
            <Row gutter={[24, 24]}>
              {effectsData['3d'].map((effect, index) => (
                <Col xs={24} md={8} key={index}>
                  <EffectCard effect={effect} darkMode={darkMode} />
                </Col>
              ))}
            </Row>
          )}
        </div>

        <Divider />

        {/* 动画效果 */}
        <div className="category-section" id="animation">
          <div 
            className="category-header"
            onClick={() => toggleCategory('animation')}
          >
            <Title level={3} className={`category-title ${darkMode ? 'dark-mode' : ''}`}>
              动画效果
            </Title>
            <div className={`toggle-icon ${darkMode ? 'dark-mode' : ''}`}>
              {expandedCategories.animation ? '▼' : '▶'}
            </div>
          </div>
          {expandedCategories.animation && (
            <Row gutter={[24, 24]}>
              {effectsData.animation.map((effect, index) => (
                <Col xs={24} md={8} key={index}>
                  <EffectCard effect={effect} darkMode={darkMode} />
                </Col>
              ))}
            </Row>
          )}
        </div>

        <Divider />

        {/* 加载效果 */}
        <div className="category-section" id="loading">
          <div 
            className="category-header"
            onClick={() => toggleCategory('loading')}
          >
            <Title level={3} className={`category-title ${darkMode ? 'dark-mode' : ''}`}>
              加载效果
            </Title>
            <div className={`toggle-icon ${darkMode ? 'dark-mode' : ''}`}>
              {expandedCategories.loading ? '▼' : '▶'}
            </div>
          </div>
          {expandedCategories.loading && (
            <Row gutter={[24, 24]}>
              {effectsData.loading.map((effect, index) => (
                <Col xs={24} md={8} key={index}>
                  <EffectCard effect={effect} darkMode={darkMode} />
                </Col>
              ))}
            </Row>
          )}
        </div>

        <Divider />

        {/* 交互特效 */}
        <div className="category-section" id="interaction">
          <div 
            className="category-header"
            onClick={() => toggleCategory('interaction')}
          >
            <Title level={3} className={`category-title ${darkMode ? 'dark-mode' : ''}`}>
              交互特效
            </Title>
            <div className={`toggle-icon ${darkMode ? 'dark-mode' : ''}`}>
              {expandedCategories.interaction ? '▼' : '▶'}
            </div>
          </div>
          {expandedCategories.interaction && (
            <Row gutter={[24, 24]}>
              {effectsData.interaction.map((effect, index) => (
                <Col xs={24} md={8} key={index}>
                  <EffectCard effect={effect} darkMode={darkMode} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    </div>
  )
}

export default CssEffects