<template>
  <canvas class="draw-panel" id="cvs">您浏览器不支持canvas，建议使用google浏览器</canvas>
</template>

<script>
/**
 * 弹幕组件
 * */
/* eslint-disable */
import {
  DanmakuPool,
  DanmaTrack,
  Danmaku,
  TextMessage,
  ImgMessage,
  VideoMessage
} from "danmaku-plus"

export default {
  name: "Danmaku",
  data() {
    return {
      danmaku: {},
      danmakuPool: {
        msg: {},
        img: {},
        video: {}
      },
      width: 0,
      height: 0
    };
  },
  computed: {
    canvas() {
      const canvas = document.getElementById("cvs");
      return canvas;
    },
    fontSize() {
      const fontSize = document.documentElement.style.fontSize
      return parseFloat(fontSize)
    },
    autoHeight() {
      const height = 231 / 192 * this.fontSize
      return height
    }
  },
  methods: {
    resize() {
      this.init()
    },
    init() {
      const canvas = this.canvas;
      //初始化弹幕组件
      this.danmaku = new Danmaku(canvas, {
        width: this.width,
        height: this.height
      });

      // 创建消息弹幕池
      this.createDanmakuPool();
      // 创建图片弹幕池
      this.createImgDanmakuPool();
      // 创建视频弹幕池
      this.createVideoDanmakuPool();
      // 开始播放弹幕
      this.danmaku.start();
    },
    createDanmakuPool() {
      //创建一个消息池子，池子得大小能容纳300条消息
      const danmakuPool = new DanmakuPool(300);

      for (let i = 0; i < 6; i++) {
        //创建多个弹幕轨道，每个轨道应该定义距离弹幕舞台（canvas）顶部得top以及弹幕轨道得高度
        const danmakuTrack = new DanmaTrack(danmakuPool, {
          top: (10 + 30) * i + 10,
          height: 30
        });
        //在弹幕舞台中添加该轨道
        this.danmaku.addDanmuTrack(danmakuTrack);
        this.danmakuPool.msg = danmakuPool;
      }
    },
    createImgDanmakuPool() {
      const imgDanmuPool = new DanmakuPool(10);
      const imgDanmuTrack = new DanmaTrack(imgDanmuPool, {
        top: 20,
        height: 40
      });
      this.danmaku.addDanmuTrack(imgDanmuTrack);
      this.danmakuPool.img = imgDanmuPool;
    },
    createVideoDanmakuPool() {
      const videoDanmuPool = new DanmakuPool(10);
      const videoDanmuTrack = new DanmaTrack(videoDanmuPool, {
        top: 200,
        height: 200
      });
      this.danmaku.addDanmuTrack(videoDanmuTrack);
      this.danmakuPool.video = videoDanmuPool;
    },
    sendDanmaku(options) {
      this.danmakuPool.msg.addMessage(
        new TextMessage({
          mMsg: options.msg,
          color: options.color || "#FFF",
          strokeColor: options.strokeColor || "#000",
          fontSize: options.fontSize || 20,
          fontFamily: options.fontFamily || "PingFang SC"
        })
      );
    },
    sendImgDanmaku(options) {
      const imgDanmu = new ImgMessage({
        url:
          options.url ||
          "https://github.wdapp.top/github/res/images/icon/CC_144_144.png",
        width: options.width || 70,
        height: options.height || 70
      });
      this.danmakuPool.img.addMessage(imgDanmu);
    },
    sendVideoDanmaku(options) {
      const videoDanmu = new VideoMessage({
        url: options.url || "https://vjs.zencdn.net/v/oceans.mp4",
        width: options.width || 300,
        height: options.height || 200
      });
      this.danmakuPool.video.addMessage(videoDanmu);
    },
    handlePause() {
      this.danmaku.pause();
    },
    handleStart() {
      this.danmaku.start();
    },
    onSizeSensor() {
      this.bus.$on("size-sensor", (element) => {
        this.width = element.clientWidth;
        this.height = this.autoHeight;
        this.resize();
      });
    },
  },
  mounted() {
    this.init();
    this.onSizeSensor();
  }
};
</script>

<style lang="stylus" scoped>
.draw-panel
  width 100%
  height 231px
</style>
