# dayu-frontend-manager-system

> 大鱼财富-后台管理系统

## 步骤

``` bash
# 1. 安装依赖
npm install

# 2. 本地启动工程
npm run dev

# 3. 启动本地mock服务
npm run mock

# 4. 生产打包
## 开发服务器
npm run build
或者
ENV_BUILD_TYPE=dev npm run build

## 测试服务器
ENV_BUILD_TYPE=test npm run build

## 线上服务器
ENV_BUILD_TYPE=online npm run build


# 5. 生产打包并生成分析报告
npm run build --report

# 6. 单元测试
npm run unit
```