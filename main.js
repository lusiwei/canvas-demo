var getDom=function(id){
    return document.getElementById(id)
}
var canvas=getDom('canvas')
var ctx=canvas.getContext('2d')
var eraser=getDom('eraser')
var pen=getDom('pen')
var pen_w=getDom('pen_w')
var download=getDom('download')
canvas.width=document.documentElement.clientWidth
canvas.height=document.documentElement.clientHeight
window.onresize=function(){
    canvas.width=document.documentElement.clientWidth
    canvas.height=document.documentElement.clientHeight
}

var r=pen_w.value
pen_w.onchange=function (xx) {
    r=pen_w.value
    pen_w.nextElementSibling.textContent=pen_w.value+'px'
    pen_w.nextElementSibling.style.color="green"
}
var down=false
var er=false
var touch=false
//laststep.onclick=function(){
//    ctx.putImageData(lastImg,  0,  0)
//}
//nextstep.onclick=function(){
//    ctx.putImageData(nextImg,  0,  0)
//    
//}
var pushArr=[]
var step=-1
var nullImg=ctx.getImageData(0,0,canvas.width,canvas.height)
//PC端
canvas.onmousedown=function(xx){
    // lastImg = ctx.getImageData(0,  0,  canvas.width,  canvas.height)
  

    
    x1=xx.clientX
    y1 =xx.clientY
    lastP={
        x:x1,
        y:y1
    }
    down=true
    if (down){
        if(er){
            ctx.clearRect(x1,y1,r*4,r*4)
        }else {
            ctx.fillStyle=color.value
            ctx.beginPath()
            ctx.arc(x1-r,y1-r,r,0,Math.PI*2)
            ctx.fill()
        }
    }
}
canvas.onmousemove=function(xx){
    //判断鼠标是否按下
    if (down){
        var x2=xx.clientX
        var y2 =xx.clientY
        var newP={
            x:x2,
            y:y2
        }
        //判断橡皮擦是否开启
        if(er){
            ctx.clearRect(x2-r,y2-r,r*4,r*4)
        }else {
            ctx.fillStyle=color.value
            ctx.beginPath()
            ctx.arc(x2-r,y2-r,r,0,Math.PI*2)
            ctx.fill()
            ctx.closePath()
            // 画两点间连线
            ctx.beginPath()
            ctx.lineWidth=r*2
            ctx.moveTo(lastP.x-r,lastP.y-r)
            ctx.lineTo(newP.x-r,newP.y-r)
            ctx.closePath()
            ctx.strokeStyle=color.value
            ctx.stroke()
            lastP=newP
        }
    }

}

canvas.onmouseup=function(xx){
    down=false
    step++;
    var nextImg = ctx.getImageData(0,  0,  canvas.width,  canvas.height)
    console.log(nextImg)
    pushArr.push(nextImg)
    console.log(pushArr)
}
laststep.onclick=function(){
    if(step>0){
        step--;
        ctx.putImageData(pushArr[step],0,0)
    }else{
        ctx.putImageData(nullImg,0,0)
    }
}
nextstep.onclick=function(){
    if(step<=pushArr.length-1){
        ctx.putImageData(pushArr[step],0,0)
        step++
    } 
}

eraser.onclick=function(xx){
    er=!er
    if(er){
        eraser.classList.add('active')
        pen.classList.remove('active')
    }else {
        eraser.classList.remove('active')
    }

}
pen.onclick=function (xx) {
    er=false
    var using=false
    using=!using
    if(using){
        pen.classList.add('active')
        eraser.classList.remove('active')
    }else {
        pen.classList.remove('active')
    }
}
download.onclick=function (xx) {
    var url = canvas.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的画儿'
    a.target = '_blank'
    a.click()
}
var clear=document.getElementById('clear')
clear.onclick=function () {
    ctx.clearRect(0,0,canvas.width,canvas.height)
}



//兼容手机端,触屏
canvas.ontouchstart=function (xx) {

    a1=xx.touches[0].clientX
    b1 =xx.touches[0].clientY
    lastP1={
        a:a1,
        b:b1
    }
    touch=true
    if (touch){
        if(er){
            ctx.clearRect(a1,b1,r*4,r*4)
        }else {
            ctx.fillStyle=color.value
            ctx.beginPath()
            ctx.arc(a1-r,b1-r,r,0,Math.PI*2)
            ctx.fill()
        }
    }

}
canvas.ontouchmove=function (xx) {
    console.log(xx)
    if (touch){
        var a2=xx.touches[0].clientX
        var b2=xx.touches[0].clientY
        var newP={
            a:a2,
            b:b2
        }
        //判断橡皮擦是否开启
        if(er){
            ctx.clearRect(a2-r,b2-r,r*4,r*4)
        }else {
            ctx.fillStyle=color.value
            ctx.beginPath()
            ctx.arc(a2-r,b2-r,r,0,Math.PI*2)
            ctx.fill()
            ctx.closePath()
            // 画两点间连线
            ctx.beginPath()
            ctx.lineWidth=r*2
            ctx.moveTo(lastP1.a-r,lastP1.b-r)
            ctx.lineTo(newP.a-r,newP.b-r)
            ctx.closePath()
            ctx.strokeStyle=color.value
            ctx.stroke()
            lastP1=newP
        }
    }
}
canvas.ontouchend=function () {
    touch=true
} 
var hide=getDom('hide')
var bar=getDom('bar')
hide.onclick=function () {
    if (bar.className=="active"){
        bar.classList.remove('active')
    }else {
        bar.classList.add('active')
    }
}

