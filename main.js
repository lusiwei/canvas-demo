var canvas=document.getElementById('canvas')
var ctx=canvas.getContext('2d')
var eraser=document.getElementById('eraser')
var pen=document.getElementById('pen')
var pen_w=document.getElementById('pen_w')
var download=document.getElementById('download')
canvas.width=document.documentElement.clientWidth
canvas.height=document.documentElement.clientHeight

pen_w.onchange=function (xx) {
    r=pen_w.value
}


var r=pen_w.value
var down=false
var er=false
canvas.onmousedown=function(xx){
    x1=xx.clientX
    y1 =xx.clientY
    // console.log(x1,y1)
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
            // ctx.closePath()
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
    // ctx.save()
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

