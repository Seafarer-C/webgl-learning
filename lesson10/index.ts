import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { canvas } from "./canvas.ts";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

/**
 * 创建场景对象
 */
const scene = new THREE.Scene();

const texture = new THREE.CanvasTexture(canvas);
texture.needsUpdate = true;

function loadGlbModel() {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("node_modules/three/examples/jsm/libs/draco/");
  dracoLoader.preload();
  loader.setDRACOLoader(dracoLoader);
  loader.load(
    `cloth.glb`,
    (gltf) => {
      console.log(gltf, "gltf----->>>", gltf.scene.children[0].children[0]);
      gltf.scene.children[0].children.forEach((element) => {
        element.material.map = texture;
      });

      gltf.scene.scale.set(100, 100, 100); //  设置模型大小缩放
      gltf.scene.position.set(0, 0, 0);
      // let axis = new THREE.Vector3(0, 1, 0); //向量axis
      // gltf.scene.rotateOnAxis(axis, Math.PI / 2);
      // //绕axis轴逆旋转π/16
      // gltf.scene.rotateOnAxis(axis, Math.PI / -20);
      // gltf.scene.rotateOnAxis(axis, Math.PI / 50);
      // gltf.rotateY(Math.PI / 2);
      // this.groupBox.add(gltf);
      scene.add(gltf.scene);
      render();
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      console.error(error);
    }
  );
}

/**
 * 光源设置
 */
//点光源
// const point = new THREE.PointLight(0xffffff);
// point.position.set(400, 200, 300); //点光源位置
// scene.add(point); //点光源添加到场景中
//环境光
const ambient = new THREE.AmbientLight(0xffffff);
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
  antialias: true,
});
renderer.setSize(width, height);
renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色

function render() {
  renderer.render(scene, camera); //执行渲染操作
}
var controls = new OrbitControls(camera, renderer.domElement); //创建控件对象
controls.addEventListener("change", render); //监听鼠标、键盘事件
loadGlbModel();
