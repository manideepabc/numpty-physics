<!DOCTYPE html>
<html>
<head>
        <script src='C:Users/gaga/Desktop/box2d/box2d.js-master/box2d.js'></script>
		<script type="text/javascript" src="C:Users/gaga/Desktop/box2d/box2d.js-master/html5canvas_demo/embox2d-helpers.js"></script>
</head>
<body>
<canvas id='canvas' width='1325px' height='650px' style='background-color : rgba(128,100,200,0.5)'></canvas>
</body>
<script>
window.onload=function()
{
  using(Box2D,'b2.+');
element=document.getElementById('canvas');
ctx=element.getContext('2d');
SCALE=30;
CANVAS_WIDTH=element.width;
CANVAS_HEIGHT=element.height;
	     var gravity=new b2Vec2(0,10);
		 var world=new b2World(gravity,false);
		      //console.log(world.GetBodyList());
		 var bodyDef=new b2BodyDef();
			 bodyDef.set_type(b2_staticBody);
			 bodyDef.set_position(new b2Vec2(CANVAS_WIDTH/(5*SCALE),CANVAS_HEIGHT/(5*SCALE)));
		 var staticBody=world.CreateBody(bodyDef);
		 var shape=new b2PolygonShape();
		     shape.SetAsBox(2.5,2.5);
				 var fixtureDef=new b2FixtureDef();
				     fixtureDef.set_shape(shape);
					 fixtureDef.set_restitution(1/Math.sqrt(2));
				 staticBody=staticBody.CreateFixture(fixtureDef);
				  //console.log(staticBody.GetBody().GetWorldCenter());
element.onclick=function()
                {
				  position=new b2Vec2(event.pageX,event.pageY);
				  bodyDef=new b2BodyDef();
					 bodyDef.set_type(b2_dynamicBody);
					 bodyDef.set_position(position);
				  var circleShape=new b2CircleShape();
				      circleShape.set_m_radius(4);
				   fixtureDef=new b2FixtureDef();
				   fixtureDef.set_shape(circleShape);
				   fixtureDef.set_restitution(1/Math.sqrt(2));
				   world.CreateBody(bodyDef).CreateFixture(fixtureDef);
				   setInterval(update,1000/60);
				   //changeTest();
				   //animate();
				}


function drawing()
{
 var debugDraw=new b2Draw();
 console.log(1);
 Box2D.customizeVTable(debugDraw,[{ 
                               original:Box2D.b2Draw.prototype.DrawSegment,
							   replacement:function(thsPtr,vert1Ptr,vert2Ptr,colorPtr){
												setColorFromDebugDrawCallback(colorPtr);
												drawSegment(vert1Ptr,vert2Ptr);
												 }
								}]);
world.SetDebugDraw(debugDraw);
}
function setColorFromDebugDrawCallback(colorPtr)
	{console.log(2);
	 var color=Box2D.wrapPointer(color,b2Color);
	 var red=color.get_r()*255 |0;
	 var green=color.get_g()*255 |0;
	 var blue=color.get_b()*255 |0;
	 var colorStr=red+','+green+','+blue;
	 ctx.strokestyle="rgba(" +colorStr+ ")"
	 ctx.fillStyle="rgb(" +colorStr+ ")";
	}
function drawSegment(vert1Ptr,vert2Ptr)
    { console.log('3');
	  var vert1=Box2D.wrapPointer(ver1Ptr,b2Vec2);
	  var vert2=Box2D.wrapPointer(vert2Ptr,b2Vec2);
      ctx.beginPath();
	  ctx.moveTo(vert1.get_x(),vert.get_y());
	  ctx.lineTo(vert2.get_x(),vert2.get_y());
	  ctx.stroke();
	}
	drawing();
}
	  </script>
</html>