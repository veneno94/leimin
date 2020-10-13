;(function (window) {
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

  const FRAME_RATE = 60
  const PARTICLE_NUM = 2000
  const RADIUS = Math.PI * 2
  const CANVASWIDTH = window.width
  const CANVASHEIGHT = 300
  const CANVASID = 'canvas'

  let texts = ['雷宝宝我是敏宝宝', '时光荏苒', '  转眼间', '已是两年的时光', '从厚通的相遇相识相知',"到现在的相爱",
   '我也相信是',"上天给的特别的缘分", '我也一直在等一个人', '彼此都喜欢的人', '我是一个外表看来是自来熟', '但其实比较慢热'," 性格也很倔强",
    '脾气又不好', '还很强势', '我们有很多相同的爱好', '不过好像你什么都很厉害', '不过我会努力的', '不是超越而是想和你肩并肩',
    '华星天台的承诺和相拥', '我会竭尽我所能去做好', '宋城的佛窟', "你居然偷偷许愿了","竟然不告诉我",'你抽空悄悄的告诉我哈', '宝石山 嗯 是的', "不知道我们什么时候能照婚纱照", 
    '不然哼哼哼', '看着你', '想要做一千件事', '让你开心对你好', '每天想让你吃好睡好休息好', '一起做什么都是开心的', 
    '偶尔也有独立的时间空间', '因为距离产生美',"适当的做点自己的小事情哦", '并不是不想和你一起', '可能是性格的原因吧', '不过和你一起', '一吻不悔', 
    '两相凝望', '等一生一世永不言弃', '用以后的时光去做我们想做的事', '坐看云卷云舒', '静听花开花落', '任凭潮起潮落', '风雨同舟',
     '相伴到老', '望向星空', '嘿', '雷宝宝', '我们能成为', '彼此的星星吗', '小小的星光', '不过分炙热', 
     '不会灼伤你我', '一起耍赖', '互相依赖', '给你我幸福', '等待着你我', 'Always']

  let canvas,
    ctx,
    particles = [],
    quiver = true,
    text = texts[0],
    textIndex = 0,
    textSize = 70

  function draw () {
    ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT)
    ctx.fillStyle = 'rgb(255, 255, 255)'
    ctx.textBaseline = 'middle'
    ctx.fontWeight = 'bold'
    ctx.font = textSize + 'px \'SimHei\', \'Avenir\', \'Helvetica Neue\', \'Arial\', \'sans-serif\''
    ctx.fillText(text, (CANVASWIDTH - ctx.measureText(text).width) * 0.5, CANVASHEIGHT * 0.5)

    let imgData = ctx.getImageData(0, 0, CANVASWIDTH, CANVASHEIGHT)

    ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT)

    for (let i = 0, l = particles.length; i < l; i++) {
      let p = particles[i]
      p.inText = false
    }
    particleText(imgData)

    window.requestAnimationFrame(draw)
  }

  function particleText (imgData) {
    // 点坐标获取
    var pxls = []
    for (var w = CANVASWIDTH; w > 0; w -= 3) {
      for (var h = 0; h < CANVASHEIGHT; h += 3) {
        var index = (w + h * (CANVASWIDTH)) * 4
        if (imgData.data[index] > 1) {
          pxls.push([w, h])
        }
      }
    }

    var count = pxls.length
    var j = parseInt((particles.length - pxls.length) / 2, 10)
    j = j < 0 ? 0 : j

    for (var i = 0; i < pxls.length && j < particles.length; i++, j++) {
      try {
        var p = particles[j],
          X,
          Y

        if (quiver) {
          X = (pxls[i - 1][0]) - (p.px + Math.random() * 10)
          Y = (pxls[i - 1][1]) - (p.py + Math.random() * 10)
        } else {
          X = (pxls[i - 1][0]) - p.px
          Y = (pxls[i - 1][1]) - p.py
        }
        var T = Math.sqrt(X * X + Y * Y)
        var A = Math.atan2(Y, X)
        var C = Math.cos(A)
        var S = Math.sin(A)
        p.x = p.px + C * T * p.delta
        p.y = p.py + S * T * p.delta
        p.px = p.x
        p.py = p.y
        p.inText = true
        p.fadeIn()
        p.draw(ctx)
      } catch (e) {}
    }
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i]
      if (!p.inText) {
        p.fadeOut()

        var X = p.mx - p.px
        var Y = p.my - p.py
        var T = Math.sqrt(X * X + Y * Y)
        var A = Math.atan2(Y, X)
        var C = Math.cos(A)
        var S = Math.sin(A)

        p.x = p.px + C * T * p.delta / 2
        p.y = p.py + S * T * p.delta / 2
        p.px = p.x
        p.py = p.y

        p.draw(ctx)
      }
    }
  }

  function setDimensions () {
    canvas.width = CANVASWIDTH
    canvas.height = CANVASHEIGHT
    canvas.style.position = 'absolute'
    canvas.style.left = '0px'
    canvas.style.top = '0px'
    canvas.style.bottom = '0px'
    canvas.style.right = '0px'
    canvas.style.marginTop = window.innerHeight * .15 + 'px'
  }

  function event () {
    //点击鼠标的触发绘制事件
    // document.addEventListener('click', function (e) {
    //   textIndex++
    //   if (textIndex >= texts.length) {
    //     textIndex--
    //     return
    //   }
    //   text = texts[textIndex]
    //   console.log(textIndex)
    // }, false)

    // document.addEventListener('touchstart', function (e) {
    //   textIndex++
    //   if (textIndex >= texts.length) {
    //     textIndex--
    //     return
    //   }
    //   text = texts[textIndex]
    //   console.log(textIndex)
    // }, false)

      //定时器循环播放文字
      setInterval(() => {
          textIndex++
          if (textIndex >= texts.length) {
            textIndex--
            return
          }
          text = texts[textIndex]
          console.log(textIndex)
      
        }, 4000);
  }

  function init () {
    canvas = document.getElementById(CANVASID)
    if (canvas === null || !canvas.getContext) {
      return
    }
    ctx = canvas.getContext('2d')
    setDimensions()
    event()

    for (var i = 0; i < PARTICLE_NUM; i++) {
      particles[i] = new Particle(canvas)
    }
   
    draw()
  }

  class Particle {
    constructor (canvas) {
      let spread = canvas.height
      let size = Math.random() * 2.0
      // 速度
      this.delta = 0.06
      // 现在的位置
      this.x = 0
      this.y = 0
      // 上次的位置
      this.px = Math.random() * canvas.width
      this.py = (canvas.height * 0.5) + ((Math.random() - 0.5) * spread)
      // 记录点最初的位置
      this.mx = this.px
      this.my = this.py
      // 点的大小
      this.size = size
      // this.origSize = size
      // 是否用来显示字
      this.inText = false
      // 透明度相关
      this.opacity = 0
      this.fadeInRate = 0.005
      this.fadeOutRate = 0.03
      this.opacityTresh = 0.98
      this.fadingOut = true
      this.fadingIn = true
    }
    fadeIn () {
      this.fadingIn = this.opacity > this.opacityTresh ? false : true
      if (this.fadingIn) {
        this.opacity += this.fadeInRate
      }else {
        this.opacity = 1
      }
    }
    fadeOut () {
      this.fadingOut = this.opacity < 0 ? false : true
      if (this.fadingOut) {
        this.opacity -= this.fadeOutRate
        if (this.opacity < 0) {
          this.opacity = 0
        }
      }else {
        this.opacity = 0
      }
    }
    draw (ctx) {
      ctx.fillStyle = 'rgba(255,215,0, ' + this.opacity + ')'
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, RADIUS, true)
      ctx.closePath()
      ctx.fill()
    }
  }

  // setTimeout(() => {
    init()  
  // }, 4000);
  // mp3.play()
})(window)
