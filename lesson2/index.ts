import { getGL, initShader } from "../shared/index";

const gl = getGL();

//顶点着色器源码
const vertexShaderSource =
  //attribute声明vec4类型变量apos
  "attribute vec4 apos;" +
  "void main(){" +
  //顶点坐标apos赋值给内置变量gl_Position
  "   gl_Position = apos;" +
  "}";

//片元着色器源码
const fragShaderSource =
  "void main(){" + "   gl_FragColor = vec4(1.0,0.0,0.0,1.0);" + "}";

//初始化着色器
const program = initShader(gl, vertexShaderSource, fragShaderSource);
//获取顶点着色器的位置变量apos，即aposLocation指向apos变量。
const aposLocation = gl.getAttribLocation(program, "apos");
//类型数组构造函数Float32Array创建顶点数组
const data = new Float32Array([0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5]);

//创建缓冲区对象
var buffer = gl.createBuffer();
//绑定缓冲区对象
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
//顶点数组data数据传入缓冲区
gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
//缓冲区中的数据按照一定的规律传递给位置变量apos
gl.vertexAttribPointer(aposLocation, 2, gl.FLOAT, false, 0, 0);
//允许数据传递
gl.enableVertexAttribArray(aposLocation);

//开始绘制，显示器显示结果
gl.drawArrays(gl.LINE_LOOP, 0, 4);
