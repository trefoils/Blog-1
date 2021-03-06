# 性能调优初探

::: tip 思考 🤔
主要分几个方向？
:::
什么是PV

PV 即页面浏览量或点击量，是衡量一个网站或网页用户访问量。具体的说，PV 值就是所有访问者在 24 小时（0 点到 24 点）内看了某个网站多少个页面或某个网页多少次。PV 是指页面刷新的次数，每一次页面刷新，就算做一次 PV 流量。度量方法就是从浏览器发出一个对网络服务器的请求（Request），网络服务器接到这个请求后，会将该请求对应的一个网页（Page）发送给浏览器，从而产生了一个 PV

## 为什么需要性能优化

1. 57%的⽤户更在乎⽹⻚在3秒内是否完成加载

2. 52%的在线⽤户认为⽹⻚打开速度影响 到他们对⽹站的忠实度

3. 每慢1秒造成⻚⾯ PV 降低11%，⽤户满意度也随之降低降低16%

4. 近半数移动⽤户因为在10秒内仍未打开⻚⾯从⽽放弃

[Google Developers 优化性能指导](https://developers.google.cn/web/fundamentals/performance/get-started)

## 性能优化学徒工

- 雅虎军规
- 缓存策略(缓存为王)
- 网站协议
- 小字为先

### 雅虎军规践行

![雅虎军规](/performance/yahoo_rules.png)

- 浏览器正常并发请求5个左右,大小100kb左右,压缩后 30kb
- 使用CND,CDN不会携带多余的 cookie,使用多个CDN，解决浏览器对同一个域名的并发
- Http2 多路复用 Keep-Alives

更详细阅读，[参考 雅虎军规35条](https://www.jianshu.com/p/4cbcd202a591)

### 缓存策略

分为协商缓存、强缓存。

详情请移步 [http缓存机制](/blog/http/http_1.md#http缓存机制)

### ⽹站协议

通过升级http 协议

[HTTP2 多路复用](/blog/http/http_2.md#多路复用)

浏览器请求//xx.cn/a.js-->解析域名—>HTTP连接—>服务器处理⽂件—>返回数据-->浏览器解析、渲染⽂件。

Keep-Alive解决的核⼼问题就在此，⼀定时间内，同⼀域名多次请求数据，只建⽴⼀次HTTP请求，其他请求可复⽤每⼀次建⽴的连接通道，以达到提⾼请求效率的问题，⼀定时间是可以配置的。

HTTP1.1还是存在效率问题

- 第⼀个：串⾏的⽂件传输
- 第⼆个：连接数过多。

HTTP/2对同⼀域名下所有请求都是基于流，也就是说同⼀域名不管访问多少⽂件，也只建⽴⼀路连接。同样Apache的最⼤连接数为300，因为有了这个新特性，最⼤的并发就可以提升到300，⽐原来提升了60倍

### 小字为先

通过分析工具，哪里大, 对那块进行压缩优化调优，尽量小

哪大削哪 请求合并 压缩合并 缓存优先

## 渲染加载

详细流程参考 [DOM 渲染过程](/blog/performance/rendering_process.md)

资料参考参考 [现代浏览器渲染过程](/blog/performance/browser_rendering_process.md)

::: tip 结论

尽量避免 DOM 大量的 重绘/重排

:::

### CSS阻塞问题

详细流程参考 [CSS I/O 阻塞优化](/blog/css/css_io.md)

::: tip 结论

1. CSS 会堵塞 DOM 渲染<但不会影响 DOM 的解析>

2. CSS 加载会阻塞后⾯的 js 语句的执⾏<已⾃⼰实际看到的为准>

3. CSS 会堵塞 DOMContentLoaded<同时存在css和js的时候>

:::

## 页面加载

各项指标信息，移步至 [页面性能指标](/blog/performance/page_performance_index)

根据不同的情况做调优

### 白屏原因

![why_white_screen](/performance/why_white_screen.png)

主要分为

- css & js 文件获取 阻塞
- js 文件解析
- dom 生成
- cssom 生成

优化调优

- 包含基本 dom
- 基本的 css
- 骨架屏

### vue 中的各个阶段

![vue_schedule](/performance/vue_schedule.png)

created 阶段 为 FP 阶段，只有空节点

mounted 节点 为 FCP 节点，包含基本的空节点，没有数据

update 阶段 为 FMP 阶段 挂载数据，视图更新

优化调优

在 FP 阶段，创建简单的骨架片，基本的 dom 结构

## 结论

主要由一下几点出发

::: tip 总结 🍺

1. [雅虎军规](/blog/performance/performance.md#雅虎军规践行)
2. [渲染加载](/blog/performance/performance.md#渲染加载)
3. [页面加载](/blog/performance/performance.md#页面加载)
4. Node加载
5. [慎用缓存](/blog/performance/performance.md#缓存策略)

一个 **小** 字走天下，一个性能监控啥也不怕

:::

几种对比

<ClientOnly>
  <PerformanceResult />
</ClientOnly>
