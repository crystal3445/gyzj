# 网站与 SEO — 按顺序照做

你只要从 **第 1 步** 做到 **第 5 步**。做完一步再打勾。

---

## 第 1 步：把代码推到 GitHub（你本机）

1. 打开 **Cursor**，左侧点 **源代码管理**（分支图标）。
2. 若上面有 **「Sync Changes」** 或 **「推送」**，点一下。
3. 若没有，打开终端执行：

```bash
cd /Users/tuya/Documents/investment-site
git push origin main
```

4. 成功即可（没有报错）。

---

## 第 2 步：在腾讯云服务器上更新并重启网站

在 **腾讯云网页终端** 里（已登录服务器后），**一行一行复制执行**：

```bash
cd /var/www/gyzj
```

```bash
git pull origin main
```

```bash
pnpm install
```

```bash
pnpm run build
```

```bash
pkill -f "next start" || true
```

```bash
nohup pnpm exec next start -p 3012 > /tmp/next-3012.log 2>&1 &
```

```bash
tail -n 25 /tmp/next-3012.log
```

看到日志里有 **Ready** 再继续。

---

## 第 3 步：确认网站和 SEO 文件能打开（浏览器）

用浏览器依次打开（把域名换成你的，若就是 gyzjhcxa.com 则不用改）：

1. `https://gyzjhcxa.com` — 首页正常  
2. `https://gyzjhcxa.com/sitemap.xml` — 能看到一堆 `<url>`  
3. `https://gyzjhcxa.com/robots.txt` — 里面有 `sitemap` 一行  

**有一项打不开**：回到第 2 步看日志，或把报错截图发给你同事/开发者。

---

## 第 4 步：百度搜索资源平台（让百度收录）

1. 打开：<https://ziyuan.baidu.com>  
2. 登录百度账号（没有就注册）。  
3. **用户中心 → 网站管理 → 添加网站**，输入：`https://gyzjhcxa.com`  
4. 按页面提示 **验证网站所有权**（推荐「HTML 标签验证」或「文件验证」，按它给的说明做）。  
5. 验证通过后，找到 **链接提交 / sitemap**，提交：  
   `https://gyzjhcxa.com/sitemap.xml`  
6. 等几天到几周，在 **索引量** 里看是否增长（正常不会一天就满）。

---

## 第 5 步：日常维护（长期）

- 在 **Sanity 后台** 正常发资讯；新文章会自动进 sitemap（约 1 分钟内刷新逻辑）。  
- 不要指望「一天上首页」，持续发 **和加盟、品牌、艾灸相关的真实内容** 更有用。

---

## 可选：服务器上写正式域名（换域名时再做）

若以后不是 `gyzjhcxa.com`，在服务器 `/var/www/gyzj/.env.local` 里加一行（不要末尾斜杠）：

```
NEXT_PUBLIC_SITE_URL=https://你的域名
```

保存后重新执行 **第 2 步** 里的 `build` 和 `启动` 部分。
