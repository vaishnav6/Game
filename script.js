const engine = Matter.Engine.create();

const render = Matter.Render.create({
  element: document.querySelector(".main"),
  engine: engine,
  options: {
    width: 800 ,
    height: 600,
    wireframes: false,
    hasBounds: true,
    background: 'black'
    }
});
const bottomb = Matter.Bodies.rectangle(400, 600, 800, 20, { isStatic: true });

let circle = Matter.Bodies.circle(200, 400, 24,{ restitution: 0.6,
    render:{ fillStyle: 'dodgerblue'}});
    
const bar = Matter.Bodies.rectangle(600, 400, 200, 20, { isStatic: true, render:{ fillStyle: 'lavender'},});

let sling = Matter.Constraint.create({
    pointA:{x: 200,y:400},
    bodyB:circle,
    stiffness:0.05,
})

let mouse = Matter.Mouse.create(render.canvas); 
let mouseConstraint =
Matter.MouseConstraint.create(engine, { mouse: mouse, constraint: { render: {visible: false} } }); 
render.mouse = mouse; 

let stack = Matter.Composites.stack(500,200,4,4,0,0, function(x,y){
    return Matter.Bodies.rectangle(x,y,50,50);
});
let firing = false;
Matter.Events.on(mouseConstraint,'enddrag',function(e){
    if(e.body === circle){firing=true;}
});

Matter.Events.on(engine,'afterUpdate', function(e) {

  if(firing && Math.abs(circle.position.x-200) < 20 && Math.abs(circle.position.y-400) < 20) {
      circle = Matter.Bodies.circle(200, 400,
          25,{ restitution: 0.6});
      Matter.World.add(engine.world, circle);
    
      sling.bodyB = circle;
      firing = false;
  }
});


Matter.World.add(engine.world, [circle,bottomb,mouseConstraint,stack,bar,sling]);

Matter.Runner.run(engine);
Matter.Render.run(render);
const reb = document.querySelector(".re");

reb.addEventListener("click", function(){
    window.location.reload();
});
 