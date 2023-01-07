import { getGL, initShader } from "../shared/index";

const gl = getGL();
/**
 * 立方体着色器程序
 **/
//立方体：顶点着色器程序
var cubeVertexShaderSource =
  "" +
  //attribute声明vec4类型变量a_Position
  "attribute vec4 a_Position;" +
  "attribute vec4 a_color;" + //attribute声明顶点颜色变量
  /**用于光照计算的变量a_normal、u_lightColor**/
  "attribute vec4 a_normal;" + //法向量变量
  "uniform vec3 u_lightColor;" + //uniform声明平行光颜色变量
  "uniform vec3 u_lightDirection;" + //平行光方向
  /**uniform声明旋转矩阵变量mx、my**/
  "uniform mat4 mx;" + //绕x轴旋转矩阵
  "uniform mat4 my;" + //绕y轴旋转矩阵
  "varying vec4 v_color;" + //varying声明顶点颜色插值后变量
  "void main(){" +
  // 平移矩阵Tx、旋转矩阵mx、旋转矩阵my连乘
  "   gl_Position = mx*my*a_Position;" +
  // 顶点法向量归一化
  "  vec3 normal = normalize((mx*my*a_normal).xyz);" +
  // 计算平行光方向向量和顶点法向量的点积
  "  float dot = max(dot(u_lightDirection, normal), 0.0);" +
  // 计算平行光方向向量和顶点法向量的点积
  "  vec3 reflectedLight = u_lightColor * a_color.rgb * dot;" +
  //颜色插值计算
  "  v_color = vec4(reflectedLight, a_color.a);" +
  "}";
//立方体：片元着色器程序
var cubeFragShaderSource =
  "" +
  "precision lowp float;" + //所有float类型数据的精度是lowp
  "varying vec4 v_color;" + //接收顶点着色器中v_color数据
  "void main(){" +
  "   gl_FragColor = v_color;" +
  "}";
/**
 * 纹理贴图着色器程序
 **/
//纹理贴图：顶点着色器程序
var textureVertexShaderSource =
  "" +
  "attribute vec4 a_Position;" + //顶点位置坐标
  "attribute vec2 a_TexCoord;" + //纹理坐标
  "varying vec2 v_TexCoord;" + //插值后纹理坐标
  "uniform mat4 mx;" + //绕x轴旋转矩阵
  "uniform mat4 my;" + //绕y轴旋转矩阵
  "void main(){" +
  "gl_Position = mx*my*a_Position;" + //逐顶点处理
  "v_TexCoord = a_TexCoord;" + //纹理坐标插值计算
  "}";
//纹理贴图：片元着色器程序
var textureFragShaderSource =
  "" +
  "precision highp float;" + //所有float类型数据的精度是lowp
  "varying vec2 v_TexCoord;" + //接收插值后的纹理坐标
  "uniform sampler2D u_Sampler;" + //纹理图片像素数据
  "void main(){" +
  //采集纹素，逐片元赋值像素值
  "gl_FragColor = texture2D(u_Sampler,v_TexCoord);" +
  "}";
/**
 * 渲染管线功能配置
 **/
gl.enable(gl.DEPTH_TEST); //开启深度测试
/**
 * 初始化着色器
 **/
//执行初始化函数initShader()，立方体着色器程序作为参数
var textureProgram = initShader(
  gl,
  textureVertexShaderSource,
  textureFragShaderSource
);
//执行初始化函数initShader()，纹理映射着色器程序作为参数
var cubeProgram = initShader(gl, cubeVertexShaderSource, cubeFragShaderSource);
/**
 * 从program对象获取相关的变量
 **/
/**纹理映射顶点、片元着色器的变量地址**/
var texturePosition = gl.getAttribLocation(textureProgram, "a_Position");
var a_TexCoord = gl.getAttribLocation(textureProgram, "a_TexCoord");
var u_Sampler = gl.getUniformLocation(textureProgram, "u_Sampler");
var textureMx = gl.getUniformLocation(textureProgram, "mx"); //旋转矩阵mx
var textureMy = gl.getUniformLocation(textureProgram, "my"); //旋转矩阵my
/**立方体顶点、片元着色器的变量地址**/
var cubePosition = gl.getAttribLocation(cubeProgram, "a_Position");
var a_color = gl.getAttribLocation(cubeProgram, "a_color");
var a_normal = gl.getAttribLocation(cubeProgram, "a_normal");
var u_lightColor = gl.getUniformLocation(cubeProgram, "u_lightColor");
var u_lightDirection = gl.getUniformLocation(cubeProgram, "u_lightDirection");
var cubeMx = gl.getUniformLocation(cubeProgram, "mx");
var cubeMy = gl.getUniformLocation(cubeProgram, "my");
/**
 * 纹理映射、立方体共用的旋转矩阵数据
 **/
var angle = Math.PI / 6; //起始角度
var sin = Math.sin(angle); //旋转角度正弦值
var cos = Math.cos(angle); //旋转角度余弦值
/**绕x轴旋转30度**/
var mxArr = new Float32Array([
  1,
  0,
  0,
  0,
  0,
  cos,
  -sin,
  0,
  0,
  sin,
  cos,
  0,
  0,
  0,
  0,
  1,
]);
/**绕y轴旋转30度**/
var myArr = new Float32Array([
  cos,
  0,
  -sin,
  0,
  0,
  1,
  0,
  0,
  sin,
  0,
  cos,
  0,
  0,
  0,
  0,
  1,
]);
/**立方体顶点位置数据数组data**/
var cubeData = new Float32Array([
  0.5,
  0.5,
  0.5,
  -0.5,
  0.5,
  0.5,
  -0.5,
  -0.5,
  0.5,
  0.5,
  0.5,
  0.5,
  -0.5,
  -0.5,
  0.5,
  0.5,
  -0.5,
  0.5, //面1
  0.5,
  0.5,
  0.5,
  0.5,
  -0.5,
  0.5,
  0.5,
  -0.5,
  -0.5,
  0.5,
  0.5,
  0.5,
  0.5,
  -0.5,
  -0.5,
  0.5,
  0.5,
  -0.5, //面2
  0.5,
  0.5,
  0.5,
  0.5,
  0.5,
  -0.5,
  -0.5,
  0.5,
  -0.5,
  0.5,
  0.5,
  0.5,
  -0.5,
  0.5,
  -0.5,
  -0.5,
  0.5,
  0.5, //面3
  -0.5,
  0.5,
  0.5,
  -0.5,
  0.5,
  -0.5,
  -0.5,
  -0.5,
  -0.5,
  -0.5,
  0.5,
  0.5,
  -0.5,
  -0.5,
  -0.5,
  -0.5,
  -0.5,
  0.5, //面4
  -0.5,
  -0.5,
  -0.5,
  0.5,
  -0.5,
  -0.5,
  0.5,
  -0.5,
  0.5,
  -0.5,
  -0.5,
  -0.5,
  0.5,
  -0.5,
  0.5,
  -0.5,
  -0.5,
  0.5, //面5
  0.5,
  -0.5,
  -0.5,
  -0.5,
  -0.5,
  -0.5,
  -0.5,
  0.5,
  -0.5,
  0.5,
  -0.5,
  -0.5,
  -0.5,
  0.5,
  -0.5,
  0.5,
  0.5,
  -0.5, //面6
]);
/**立方体顶点颜色数组colorData**/
var colorData = new Float32Array([
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0, //红色——面1
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0, //红色——面2
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0, //红色——面3
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0, //红色——面4
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0, //红色——面5
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0, //红色——面6
]);
/**立方体顶点法向量数组normalData**/
var normalData = new Float32Array([
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1, //z轴正方向——面1
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0, //x轴正方向——面2
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0, //y轴正方向——面3
  -1,
  0,
  0,
  -1,
  0,
  0,
  -1,
  0,
  0,
  -1,
  0,
  0,
  -1,
  0,
  0,
  -1,
  0,
  0, //x轴负方向——面4
  0,
  -1,
  0,
  0,
  -1,
  0,
  0,
  -1,
  0,
  0,
  -1,
  0,
  0,
  -1,
  0,
  0,
  -1,
  0, //y轴负方向——面5
  0,
  0,
  -1,
  0,
  0,
  -1,
  0,
  0,
  -1,
  0,
  0,
  -1,
  0,
  0,
  -1,
  0,
  0,
  -1, //z轴负方向——面6
]);
/**纹理映射顶点数据**/
var data = new Float32Array([
  -0.4,
  0.2,
  -0.51, //左上角——v0
  -0.4,
  -0.2,
  -0.51, //左下角——v1
  0.4,
  0.2,
  -0.51, //右上角——v2
  0.4,
  -0.2,
  -0.51, //右下角——v3
]);
/**UV纹理坐标数据textureData**/
var textureData = new Float32Array([
  0,
  1, //左上角——uv0
  0,
  0, //左下角——uv1
  1,
  1, //右上角——uv2
  1,
  0, //右下角——uv3
]);
/**加载纹理图像像素数据**/
var image = new Image();
image.onload = texture;
image.src = "glb.jpg";
/**
     创建缓冲区textureBuffer，传入图片纹理数据，然后执行绘制方法drawArrays()
     **/
function texture() {
  var texture = gl.createTexture(); //创建纹理图像缓冲区
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); //纹理图片上下反转
  gl.activeTexture(gl.TEXTURE0); //激活0号纹理单元TEXTURE0
  gl.bindTexture(gl.TEXTURE_2D, texture); //绑定纹理缓冲区
  //设置纹理贴图填充方式(纹理贴图像素尺寸大于顶点绘制区域像素尺寸)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  //设置纹理贴图填充方式(纹理贴图像素尺寸小于顶点绘制区域像素尺寸)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  //设置纹素格式，png格式对应gl.RGBA
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  /**
         执行useProgram()方法，GPU执行纹理映射着色器程序
         **/
  gl.useProgram(textureProgram);
  /**调用函数vertexBuffer()，配置顶点数据**/
  vertexBuffer(data, texturePosition, 3);
  vertexBuffer(textureData, a_TexCoord, 2);
  /**传入纹理图片旋转矩阵数据**/
  gl.uniformMatrix4fv(textureMy, false, myArr);
  gl.uniformMatrix4fv(textureMx, false, mxArr);
  gl.uniform1i(u_Sampler, 0); //纹理缓冲区单元TEXTURE0中的颜色数据传入片元着色器
  /**执行绘制，纹理映射像素值存入颜色缓冲区**/
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  /**
         执行useProgram()方法，切换着色器程序，重新配置GPU执行立方体着色器程序
         **/
  gl.useProgram(cubeProgram);
  /**调用函数vertexBuffer()，配置顶点数据**/
  vertexBuffer(cubeData, cubePosition, 3);
  vertexBuffer(colorData, a_color, 3);
  vertexBuffer(normalData, a_normal, 3);
  /**传入立方体旋转矩阵数据**/
  gl.uniformMatrix4fv(cubeMx, false, mxArr);
  gl.uniformMatrix4fv(cubeMy, false, myArr);
  /**传入光的颜色和方向数据**/
  gl.uniform3f(u_lightColor, 1.0, 1.0, 1.0);
  //保证向量(x,y,z)的长度为1，即单位向量
  var x = 1 / Math.sqrt(15),
    y = 2 / Math.sqrt(15),
    z = 3 / Math.sqrt(15);
  gl.uniform3f(u_lightDirection, x, y, -z);
  /**执行绘制，立方体像素值存入颜色缓冲区**/
  gl.drawArrays(gl.TRIANGLES, 0, 36);
}
/**
 * 顶点数据配置函数vertexBuffer()
 * 顶点数据data
 * 顶点位置position
 * 间隔数量n
 **/
function vertexBuffer(data, position, n) {
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  gl.vertexAttribPointer(position, n, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(position);
}
