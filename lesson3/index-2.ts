import {
  getGL,
  initShader,
} from '../shared/index';

const gl = getGL();
  //顶点着色器源码
  var vertexShaderSource = '' +
  //attribute声明vec4类型变量apos
  'attribute vec4 apos;'+
  'void main(){' +
  //设置几何体轴旋转角度为30度，并把角度值转化为浮点值
  'float radian = radians(30.0);'+
  //求解旋转角度余弦值
  'float cos = cos(radian);'+
  //求解旋转角度正弦值
  'float sin = sin(radian);'+
  //引用上面的计算数据，创建绕x轴旋转矩阵
  // 1      0       0    0
  // 0   cosα   sinα   0
  // 0  -sinα   cosα   0
  // 0      0        0   1
  'mat4 mx = mat4(1,0,0,0,  0,cos,-sin,0,  0,sin,cos,0,  0,0,0,1);'+
  //引用上面的计算数据，创建绕y轴旋转矩阵
  // cosβ   0   sinβ    0
  //     0   1   0        0
  //-sinβ   0   cosβ    0
  //     0   0   0        1
  'mat4 my = mat4(cos,0,-sin,0,  0,1,0,0,  sin,0,cos,0,  0,0,0,1);'+
  //两个旋转矩阵、顶点齐次坐标连乘
  '   gl_Position = mx*my*apos;' +
  '}';
  //片元着色器源码
  var fragShaderSource = '' +
  'void main(){' +
  '   gl_FragColor = vec4(1.0,0.0,0.0,1.0);' +
  '}';
  //初始化着色器
  var program = initShader(gl,vertexShaderSource,fragShaderSource);
  //获取顶点着色器的位置变量apos
  var aposLocation = gl.getAttribLocation(program,'apos');
  
  //        8个顶点坐标数组
  var data=new Float32Array([
  0.5,  0.5,  0.5,//顶点0
  -0.5,  0.5,  0.5,//顶点1
  -0.5, -0.5,  0.5,//顶点2
  0.5, -0.5,  0.5,//顶点3
  0.5,  0.5, -0.5,//顶点4
  -0.5,  0.5, -0.5,//顶点5
  -0.5, -0.5, -0.5,//顶点6
  0.5, -0.5, -0.5,//顶点7
  ]);
  //        顶点索引数组
  var indexes = new Uint8Array([
  //        前四个点
  0,1,2,3,
  //        后四个顶点
  4,5,6,7,
  //        前后对应点
  0,4,
  1,5,
  2,6,
  3,7
  ]);
  
  //创建缓冲区对象
  var indexesBuffer=gl.createBuffer();
  //绑定缓冲区对象
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexesBuffer);
  //索引数组indexes数据传入缓冲区
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indexes,gl.STATIC_DRAW);
  
  //创建缓冲区对象
  var buffer=gl.createBuffer();
  //绑定缓冲区对象
  gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
  //顶点数组data数据传入缓冲区
  gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);
  //缓冲区中的数据按照一定的规律传递给位置变量apos
  gl.vertexAttribPointer(aposLocation,3,gl.FLOAT,false,0,0);
  //允许数据传递
  gl.enableVertexAttribArray(aposLocation);
  
  
  //LINE_LOOP模式绘制前四个点
  gl.drawElements(gl.LINE_LOOP,4,gl.UNSIGNED_BYTE,0);
  //LINE_LOOP模式从第五个点开始绘制四个点
  gl.drawElements(gl.LINE_LOOP,4,gl.UNSIGNED_BYTE,4);
  //LINES模式绘制后8个点
  gl.drawElements(gl.LINES, 8, gl.UNSIGNED_BYTE, 8);
  