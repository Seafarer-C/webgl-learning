import {
  getGL,
  initShader,
} from '../shared/index';

const gl = getGL();
//顶点着色器源码
const vertexShaderSource =
  //attribute声明vec4类型变量apos
  "attribute vec4 apos;" +
  "void main(){" +
  //设置几何体轴旋转角度为30度，并把角度值转化为浮点值
  "float radian = radians(30.0);" +
  //求解旋转角度余弦值
  "float cos = cos(radian);" +
  //求解旋转角度正弦值
  "float sin = sin(radian);" +
  //引用上面的计算数据，创建绕x轴旋转矩阵
  // 1      0      0    0
  // 0   cosα   sinα    0
  // 0  -sinα   cosα    0
  // 0      0      0    1
  "mat4 mx = mat4(1,0,0,0,  0,cos,-sin,0,  0,sin,cos,0,  0,0,0,1);" +
  //引用上面的计算数据，创建绕y轴旋转矩阵
  // cosβ   0   sinβ    0
  //    0   1      0    0
  //-sinβ   0   cosβ    0
  //    0   0      0    1
  "mat4 my = mat4(cos,0,-sin,0,  0,1,0,0,  sin,0,cos,0,  0,0,0,1);" +
  //两个旋转矩阵、顶点齐次坐标连乘
  "   gl_Position = mx*my*apos;" +
  "}";
//片元着色器源码
const fragShaderSource =
  "void main(){  gl_FragColor = vec4(1.0,0.0,1.0,1.0); }";

//初始化着色器
const program = initShader(gl, vertexShaderSource, fragShaderSource);

//获取顶点着色器的位置变量apos，即aposLocation指向apos变量。
const aposLocation = gl.getAttribLocation(program, "apos");
//9个元素构建三个顶点的xyz坐标值
const data = new Float32Array([
  //z为0.5时，xOy平面上的四个点坐标
  0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5,
  //z为-0.5时，xOy平面上的四个点坐标
  0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5,
  //上面两组坐标分别对应起来组成一一对
  0.5, 0.5, 0.5, 0.5, 0.5, -0.5,

  -0.5, 0.5, 0.5, -0.5, 0.5, -0.5,

  -0.5, -0.5, 0.5, -0.5, -0.5, -0.5,

  0.5, -0.5, 0.5, 0.5, -0.5, -0.5,
]);

//创建缓冲区对象
const buffer = gl.createBuffer();
//绑定缓冲区对象
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
//顶点数组data数据传入缓冲区
gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
//缓冲区中的数据按照一定的规律传递给位置变量apos
gl.vertexAttribPointer(aposLocation, 3, gl.FLOAT, false, 0, 0);
//允许数据传递
gl.enableVertexAttribArray(aposLocation);

//LINE_LOOP模式绘制前四个点 首尾相连
gl.drawArrays(gl.LINE_LOOP, 0, 4);
//LINE_LOOP模式从第五个点开始绘制四个点
gl.drawArrays(gl.LINE_LOOP, 4, 4);
//LINES模式绘制后8个点 离散相连
gl.drawArrays(gl.LINES, 8, 8);
