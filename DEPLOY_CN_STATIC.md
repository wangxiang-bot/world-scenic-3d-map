# 国内部署说明

## 结论

`Vercel` 适合海外访问和快速演示，但不适合作为“中国大陆免翻墙稳定访问”的唯一正式站点。  
这个项目是纯静态前端，最稳的方案是：

- 保留 `Vercel` 作为海外镜像
- 同时把 `dist` 部署到国内静态托管

## 推荐方案

优先级建议：

1. 腾讯云 `COS` 静态网站 + 自定义域名
2. 阿里云 `OSS` 静态网站 + 自定义域名

## 为什么换国内静态托管

- 当前站点没有后端依赖
- 构建产物就是纯静态文件
- 静态资源非常适合对象存储 + CDN
- 这类方案比 `vercel.app` 更适合中国大陆访问

## 一键打包

项目根目录执行：

```bash
npm run package:release
```

打包完成后会生成：

```text
release/world-heritage-3d-earth-static.zip
```

## 腾讯云 COS 部署

官方文档：

- [静态网站功能概述](https://cloud.tencent.com/document/product/436/14984)
- [通过静态网站功能搭建前端单页应用](https://cloud.tencent.com/document/product/436/43937)

基本步骤：

1. 开通对象存储 `COS`
2. 创建存储桶
3. 开启静态网站功能
4. 上传 `dist` 目录中的全部文件，或者上传 `release/world-heritage-3d-earth-static.zip` 解压后的内容
5. 把默认首页设为 `index.html`
6. 绑定你自己的域名
7. 如果要用中国大陆加速节点，按平台要求完成备案

## 阿里云 OSS 部署

官方文档：

- [设置静态网站托管](https://www.alibabacloud.com/help/zh/oss/user-guide/set-static-page)
- [绑定自定义域名](https://www.alibabacloud.com/help/zh/oss/user-guide/map-custom-domain-names-4)

基本步骤：

1. 开通 `OSS`
2. 创建 Bucket
3. 启用静态网站托管
4. 上传 `dist` 目录全部文件
5. 首页设为 `index.html`
6. 绑定自定义域名
7. 如果资源放在中国大陆地域并对外正式提供服务，按平台要求完成备案

## 现实建议

- 如果你只是先让国内朋友能打开：先上腾讯云或阿里云对象存储
- 如果你要长期正式对外：一定加自定义域名
- 如果你要中国大陆更稳：不要只用 `vercel.app`
