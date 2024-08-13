# 敏捷看板

## 1 运行方式

### 1.1 后端运行方式

后端使用PM2进行打包

确保系统中已经安装了Node.js和npm. 然后, 通过npm全局安装PM2：

```bash
npm install pm2 -g
```

在`backend`目录下输入以下指令以启动后端服务

```bash
pm2 start ./bootstrap.js --name [backend]
```

### 1.2 前端运行方式

确保系统中已经安装了Node.js和npm. 然后, 通过npm全局安装服务器环境: 

```bash
npm install -g serve
```

接着在`frontend`目录下输入以下指令以启动前端服务：

```bash
serve -s dist
```

访问`http://localhost:3000/`即可打开前端页面

### 1.3 开发模式下运行

分别在`bakcend`和`frontend`目录下运行以下指令:

```bash
npm install
npm run dev
```

## 2 功能介绍

### 2.1 登录/注册

在首页点击`Register`即可跳转至注册页面.

在登录页面输入注册好的账号密码, 点击`Login`即可登录.

也可以选择测试账号: 用户名-`Maple` 密码-`123456`进行登录.

### 2.2 项目创建

点击`New Project`, 填写相应信息, 再点击`Create`即可创建新项目.

### 2.3 项目添加任务

在`Project List`界面点击`View Details`即可进入项目详情界面, 点击`New Task`即可添加新任务.

### 2.4 任务查看

在`Tasks`界面点击`View Details`即可进入任务详情界面.

### 2.5 任务评论/添加附件

在任务详情界面选择`Comments`标签即可添加/查看评论.

在任务详情界面选择`Attachments`标签即可添加/查看附件.

### 2.6 其他功能

1. **项目创建者**可以编辑或删除项目/任务, 在项目某一成员被移出项目后, 其所负责的任务将由项目创建者负责.
2. **任务负责人**可以设置任务状态: 从`NOT-StART`到`PROCESSING`到`COMPLETED`, 而**项目创建者**则可以对已完成的任务进行审核, 将其状态从`COMPLETED`设为`REVIEWED`
3. 在**任务列表**界面可以进行任务筛选: `My Tasks` `Unfinished`.

## 3 相关技术栈

### 3.1 前端技术栈

使用基于React+Vite的前端脚手架进行开发, 使用Tailwind进行样式控制,使用Redux Store对前端数据/状态进行管理, 使用axios库向后端发送请求.

### 3.2 后端技术栈

使用MidwayJS作为后端脚手架进行开发, 使用json文件存储服务器数据.

### 3.3 其他

使用Github Actions进行持续集成.