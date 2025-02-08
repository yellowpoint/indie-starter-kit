# 独立开发启动器

48 小时从 0 到 1 启动你的独立开发之旅。一个帮助独立开发者快速启动项目的工具集。

## 项目定位

- **目标用户**: 迷茫期的独立开发者,需快速获取心态调整、策略指南、灵感工具
- **核心价值**: 将碎片化建议整合为可操作的「行动清单」,降低启动门槛
- **形态**: 单页 Web 应用(优先移动端适配),无需登录,极简交互

## 功能模块

### 1. 心态指南 (Mindset Hub)

- 核心心法展示
- 每日自我提问
- 真实案例分享

### 2. 策略库 (Strategy Lab)

- 三步验证法
- 差异化策略选择器
- 外部工具链接

### 3. 项目灵感库 (Idea Generator)

- 工具类项目
- 内容变现
- 垂直 SaaS

### 4. 工具包 (Dev Toolkit)

- 开发工具推荐
- 设计资源整合
- 营销渠道指南

### 5. 进度追踪 (Progress Tracker)

- 48 小时任务清单
- 进度可视化
- 成就系统

## 项目结构

src/app/indie-starter/
├── page.jsx # 主页面
├── mindset/ # 心态指南模块
│ └── page.jsx
├── strategy/ # 策略库模块
│ └── page.jsx
├── ideas/ # 项目灵感库模块
│ └── page.jsx
├── toolkit/ # 工具包模块
│ └── page.jsx
└── progress/ # 进度追踪模块
└── page.jsx

## 技术栈

- **框架**: Next.js 13+ (App Router)
- **样式**: TailwindCSS
- **组件**: shadcn/ui
- **动画**: Framer Motion
- **图标**: Lucide Icons

## 特点

- 响应式设计
- 深色模式支持
- 动画过渡
- 成就系统
- 进度追踪

## 本地开发

```bash
# 克隆项目
git clone https://github.com/your-username/indie-starter-kit.git

# 进入项目目录
cd indie-starter-kit

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

## 使用指南

1. 从心态指南开始,调整心理预期
2. 浏览项目灵感库,选择适合的方向
3. 使用策略库验证想法
4. 通过工具包快速启动开发
5. 用进度追踪保持动力

## 后续规划

- [ ] 添加用户系统
- [ ] 数据持久化
- [ ] 社区功能
- [ ] 更多项目模板
- [ ] AI 辅助功能

## 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 致谢

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情
