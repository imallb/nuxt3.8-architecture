# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

## 注意

本项目使用了nuxt-img作为图片处理，请在上线提交到linux系统前，在/.output/server文件目录下运行命令：

```bash
# /.output/server
npm install --arch=x64 --platform=linux --libc=glibc sharp
```

把sharp构建的二进制文件修改为适合linux系统的文件，详情查看[sharp安装文档](https://sharp.pixelplumbing.com/install#cross-platform)。

nuxt3中使用了nitro作为服务端处理接口路由缓存等代码和数据，其中提供了链接redis数据库存储数据缓存，在windows下创建[redis](https://github.com/tporadowski/redis/releases)服务可以在这个网站下下载。

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
