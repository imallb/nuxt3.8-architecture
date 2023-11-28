/**
 * pm2启动文件，把这个文件粘贴复制到项目根目录下启动
 * 启动 pm2 start ecosystem.config.js
 */
module.exports = {
  apps: [
    {
      name: 'bytoken-nuxt3.8-cn',
      port: '6734',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
