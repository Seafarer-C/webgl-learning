import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as OBJL from "three/examples/jsm/loaders/OBJLoader.js";
import { canvas } from "./canvas.ts";

/**
 * 创建场景对象
 */
const scene = new THREE.Scene();
var OBJLoader = new OBJL.OBJLoader(); //obj加载器

const texture = new THREE.CanvasTexture(canvas);
texture.needsUpdate = true;

OBJLoader.load("football/model2.obj", function (obj) {
  // 直接使用 texture 进行贴图
  obj.children[0].material.forEach((element) => {
    element.map = texture;
  });

  console.log("物体", obj, obj.children[0].material[0]);
  obj.scale.set(0.2, 0.2, 0.2); //放大obj组对象
  obj.rotation.set(0, 0, 0);
  scene.add(obj); //返回的组对象插入场景中

  render();
});

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
let ambient2 = new THREE.AmbientLight(0x999999);
scene.add(ambient2);
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
  antialias: true,
});
renderer.setSize(width, height);
renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色

function render() {
  renderer.render(scene, camera); //执行渲染操作
}
var controls = new OrbitControls(camera, renderer.domElement); //创建控件对象
controls.addEventListener("change", render); //监听鼠标、键盘事件
