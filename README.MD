# 收集客户端信息以及统计用户行为

## 使用

1. 将 `dist` 下的 `statistic.js` 的文件下载到本地引入。
2. 搜索 `{{appId}}` 需动态替换成你需要的 `appId`(用于标志应用的唯一 `ID`)。
3. 搜索 `{{domList}}` 需动态替换成你需要的 `domList` （用 `;` 分割的域名列表，用于表示同一应用的不同服务）。
4. 搜索 `{{namespaces}}` 需动态替换成你需要的 `namespaces` 。（存储在 storage 中键值的前缀，防止命名冲突）
5. 搜索 `{{version}}` 需动态替换成你需要的 `version` 。（版本号）
6. 替换好后引入该 `js`。
7. 引入后会得到 `Statistic` 对象，接着操作可以看 `DEMO`

## DEMO

```javascript
  var statistic = new Statistic();
  // 需要监听的事件
  statistic.$on('windowLoad', function (data) {
    console.log('windowLoad', data)
  })
  statistic.$on('browserTiming', function (data) {
    console.log('browserTiming', data)
  })
  statistic.$on('clientInfo', function (data) {
    console.log('clientInfo', data)
  })
  statistic.$on('windowUnload', function (data) {
    console.log('windowUnload', data)
  })
  statistic.$on('pageStart', function (data) {
    console.log('pageStart', data)
  })
  statistic.$on('pageClose', function (data) {
    console.log('pageClose', data)
  })
  statistic.$on('userEvent', function (data) {
    console.log('userEvent', data)
  })
  // 暴露的方法
  statistic.pageStart()
  // 假设页面 3 秒回进行了一次路由跳转
  setTimeout(function(){
    statistic.pageClose()
  }, 3000)
  statistic.userEvent({a:1})
```

## 事件返回的数据

`windowLoad`: 页面加载完成后触发，触发一个相当于浏览开始（`pv start`）。

事件返回的参数:
```
  {
    referrer: String,                       // 上一页面的地址
    href: String,                           // 本页地址
    pageId: String,                         // 页面唯一 ID
    parentPageId: String,                   // 父页面 ID
    title: String,                          // 页面标题
    channelType: 0/1/2,                     // 页面进入类型，0 直接访问 1 站内跳转 2 外部链接
    pageViewedCount: Number                 // 当前页面之前访问的页面数量
  }
```

`browserTiming`: 延迟 `3` 秒后触发，统计客户端的网络情况。

事件返回的参数:
```
  {
    requestWait: Number,                    // 第一个 HTTP 请求开始前的等待时间
    dnsReady: Number,                       // dns 域名解析时间
    tcpReady: Number,                       // tcp 连接时间
    request: Number,                        // html 请求时间
    domParse: Number,                       // 准备好 http 到 dom 树生成时间
    eventLoaded: Number                     // 页面资源加载完成耗时
  }
```

`clientInfo`: 页面加载完成后触发，用于统计客户端信息。

事件返回的参数:
```
{
  isIE: Boolean,                            // 是否在 IE 浏览器下
  IEVersion: String,                        // IE 版本号
  cookieEnabled: Boolean,                   // 是否支持 cookie
  javaEnabled: Boolean,                     // 是否支持 java
  language: String,                         // 页面使用语言
  screenSize: String,                       // 屏幕尺寸 eg: 1440x900
  colorDepth: Number,                       // 屏幕色域
  orientation: Number                       // 页面呈现的方向
}
```

`windowUnload`: 页面销毁时触发，相当于一次 `pv` 结束（`pv end`）。

事件返回的参数:
```
{
  scroll: Number,                           // 页面滚动的次数
  keyup: Number,                            // 用户在页面上键盘的点击次数
  click: Number,                            // 用户在页面上上点击的次数
  pageId: String,                           // 页面 ID
  pageViewedTime: Number,                   // 页面存在的总时长
  pageFocusTime: Number                     // 页面获取焦点的总时长
}
```

`pageStart`: 自主开启一次 `pv` 统计，参数与 `windowLoad` 一致
`pageClose`: 自主关闭一次 `pv` 统计，参数与 `windowUnload` 一致
上述 `API` 用于单页面应用，由于单页应用不进行页面跳转，当路由切换的时候需要自己手动统计 `pv`，确保统计的正确性。

`userEvent`: 用户事件提交，主要用于收集用户主动触发的事件，需要将代码嵌入相关事件中。

事件返回的参数即为调用 `userEvent` 方法时传入的参数。
```
statistic.$on('userEvent', function (data) {
  console.log('userEvent', data)                // {a:1}
})
statistic.userEvent({a:1})
```
