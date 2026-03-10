# GitHub Pages 发布说明

这个项目已经配置好 GitHub Pages 工作流，推送到 `main` 分支后会自动构建并发布。

## 1. 初始化本地仓库

如果当前目录还不是 Git 仓库，先执行：

```bash
git init -b main
git add .
git commit -m "Initial GitHub Pages setup"
```

## 2. 在 GitHub 创建仓库

在 GitHub 新建一个公开仓库，然后把本地项目推上去：

```bash
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

## 3. 启用 GitHub Pages

进入仓库页面：

1. `Settings`
2. `Pages`
3. `Build and deployment` 选择 `GitHub Actions`

之后每次推送到 `main`，GitHub 都会自动发布。

## 4. 页面地址

- 如果仓库名是 `<你的用户名>.github.io`
  页面地址是 `https://<你的用户名>.github.io/`
- 如果仓库名是普通仓库，例如 `world-scenic-3d-map`
  页面地址是 `https://<你的用户名>.github.io/world-scenic-3d-map/`

## 5. 自定义基路径

当前项目已经自动兼容 GitHub Pages：

- 本地开发使用 `/`
- GitHub Actions 构建时，会自动根据仓库名生成正确的子路径

如果你需要手动指定部署路径，可以在构建前设置：

```bash
$env:VITE_BASE_PATH = "/你的路径/"
npm run build
```
