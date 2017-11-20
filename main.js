var ctx=ca.getContext('2d')

var r=3
var down=false
ca.onmousedown=function(xx){
   var x1=xx.clientX
   var y1 =xx.clientY
   console.log(x1,y1)
  down=true
  if (down){
  ctx.fillStyle='blue'
  ctx.beginPath()
  ctx.arc(x1-r,y1-r,r,0,Math.PI*2)
  ctx.closePath()
  ctx.fill()
  lastP={
    x:x1
    y:y1
  }
  }


}
ca.onmousemove=function(xx){


  if (down){
  var x2=xx.clientX
  var y2 =xx.clientY
  var newP={
    x:x2
    y:y2
  }
//   console.log(x2,y2)
  ctx.fillStyle='blue'
  ctx.beginPath()
  ctx.arc(x2-r,y2-r,r,0,Math.PI*2)

  花两点间连线
  ctx.moveTo(lastP.x,lastP.y)
  ctx.lineTo(newP.x,newP.y)
  ctx.closePath()
  ctx.fill()
  lastP=newP

  }

}
ca.onmouseup=function(xx){
  down=false

}
