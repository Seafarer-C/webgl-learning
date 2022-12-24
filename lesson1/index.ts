import { getGL, initShader } from "../shared/index";

const gl = getGL();

/**
 *  gl_PointSize	点渲染模式，方形点区域渲染像素大小  float
    gl_Position	    顶点位置坐标	                vec4
    gl_FragColor	片元颜色值	                    vec4
    gl_FragCoord	片元坐标，单位像素	             vec2
    gl_PointCoord	点渲染模式对应点像素坐标	      vec2
 */
//顶点着色器源码
const vertexShaderSource =
  "attribute vec4 apos;" +
  "void main() {" +
  //给内置变量gl_PointSize赋值像素大小
  "   gl_PointSize=30.0;" +
  //顶点位置，位于坐标原点
  "   gl_Position = apos;" +
  "}";

//片元着色器源码
const fragShaderSource =
  "void main(){" +
  //定义片元颜色
  "   gl_FragColor = vec4(1.0,0.0,1.0,1.0);" +
  "}";

//初始化着色器
const program = initShader(gl, vertexShaderSource, fragShaderSource);

//获取顶点着色器的位置变量apos，即aposLocation指向apos变量。
const aposLocation = gl.getAttribLocation(program, "apos");
//类型数组构造函数Float32Array创建顶点数组
const data = new Float32Array([0, 0.5, 0, 1]);

//创建缓冲区对象
var buffer = gl.createBuffer();
//绑定缓冲区对象
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
//顶点数组data数据传入缓冲区
gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
//缓冲区中的数据按照一定的规律传递给位置变量apos
gl.vertexAttribPointer(aposLocation, 3, gl.FLOAT, false, 0, 0);
//允许数据传递
gl.enableVertexAttribArray(aposLocation);

//开始绘制，显示器显示结果
gl.drawArrays(gl.POINTS, 0, 1);
