import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/**
 * 创建场景对象
 */
const scene = new THREE.Scene();
/**
 * 创建网格模型
 */
const box = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象

var textureCube = new THREE.CubeTextureLoader().load([
  "2619_Diffuse.jpg",
  "2619_Diffuse.jpg",
  "2619_Diffuse.jpg",
  "2619_Diffuse.jpg",
  "2619_Diffuse.jpg",
  "2619_Diffuse.jpg",
]);

var material = new THREE.MeshPhongMaterial({
  //网格模型设置颜色，网格模型颜色和环境贴图会进行融合计算
  //   color: 0xff0000,
  envMap: textureCube, //设置环境贴图
  // 环境贴图反射率   控制环境贴图对被渲染三维模型影响程度
  //   reflectivity: 0.9,
});
const mesh = new THREE.Mesh(box, material);

scene.add(mesh); //网格模型添加到场景中
/**
 * 光源设置
 */
//点光源
const point = new THREE.PointLight(0xffffff);
point.position.set(400, 200, 300); //点光源位置
scene.add(point); //点光源添加到场景中
//环境光
const ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);
/**
 * 相机设置
 */
const width = window.innerWidth; //窗口宽度
const height = window.innerHeight; //窗口高度
const k = width / height; //窗口宽高比
const s = 100; //三维场景缩放系数
//创建相机对象
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
/**
 * 创建渲染器对象
 */
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
});
renderer.setSize(width, height);
renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色

function render() {
  renderer.render(scene, camera); //执行渲染操作
}
render();
var controls = new OrbitControls(camera, renderer.domElement); //创建控件对象
controls.addEventListener("change", render); //监听鼠标、键盘事件
