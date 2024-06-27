import React, {useEffect} from "react";
import "@/main.css"
import * as THREE from 'three';

import Stats from 'stats-gl';
import {GUI} from 'three/addons/libs/lil-gui.module.min.js';

import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {radixSort} from 'three/addons/utils/SortUtils.js';
import WebGPURenderer from 'three/addons/renderers/webgpu/WebGPURenderer.js';
import {MeshNormalNodeMaterial} from 'three/nodes';
import $ from 'jquery';

type GeometryType = THREE.ConeGeometry | THREE.BoxGeometry | THREE.SphereGeometry;
const BackGround: React.FC = () => {
    useEffect(() => {
        let camera: THREE.PerspectiveCamera | null, scene: THREE.Scene | null, renderer: WebGPURenderer | null;
        let controls: OrbitControls, stats: Stats;
        let gui;
        let geometries: GeometryType [], mesh: THREE.BatchedMesh | null, material: MeshNormalNodeMaterial;
        const ids: number[] = [];

        const matrix = new THREE.Matrix4();

        //

        const position = new THREE.Vector3();
        const rotation = new THREE.Euler();
        const quaternion = new THREE.Quaternion();
        const scale = new THREE.Vector3();

        //
        const MAX_GEOMETRY_COUNT = 20000;
        const api = {
            webgpu: true,
            count: 1512,
            dynamic: 1000,
            sortObjects: true,
            perObjectFrustumCulled: true,
            opacity: 1,
            useCustomSort: true,
        };
        //
        init();

        //
        function randomizeMatrix(matrix: THREE.Matrix4) {
            // 随机生成矩阵的位置、旋转和缩放
            position.x = Math.random() * 40 - 20;
            position.y = Math.random() * 40 - 20;
            position.z = Math.random() * 40 - 20;

            rotation.x = Math.random() * 2 * Math.PI;
            rotation.y = Math.random() * 2 * Math.PI;
            rotation.z = Math.random() * 2 * Math.PI;

            quaternion.setFromEuler(rotation);

            scale.x = scale.y = scale.z = 0.5 + (Math.random() * 0.5);

            return matrix.compose(position, quaternion, scale);

        }

        function randomizeRotationSpeed(rotation: THREE.Euler) {
            // 随机生成旋转速度
            rotation.x = Math.random() * 0.01;
            rotation.y = Math.random() * 0.01;
            rotation.z = Math.random() * 0.01;
            return rotation;

        }

        function initGeometries() {
            // 初始化几何体类型，如圆锥体、立方体和球体
            geometries = [
                new THREE.ConeGeometry(1.0, 2.0),
                new THREE.BoxGeometry(2.0, 2.0, 2.0),
                new THREE.SphereGeometry(1.0, 16, 8),
            ];

        }

        function createMaterial() {
            // 创建材质，这里使用了节点材质
            if (!material) {

                material = new MeshNormalNodeMaterial();

            }

            return material;

        }

        function cleanup() {
            // 清理函数，用于移除网格对象并释放资源
            if (mesh) {
                if (mesh.parent)
                    mesh.parent.remove(mesh);
                if (mesh.dispose) {
                    mesh.dispose();
                }
            }

        }

        function initMesh() {
            // 初始化网格，包括设置批量网格和对应的几何体、材质等
            cleanup();
            initBatchedMesh();

        }

        function initBatchedMesh() {
            // 初始化批量网格，设置网格数量、顶点数、索引数，并随机生成每个网格的矩阵和旋转速度
            const geometryCount = api.count;
            const vertexCount = api.count * 512;
            const indexCount = api.count * 1024;

            const euler = new THREE.Euler();
            const matrix = new THREE.Matrix4();
            mesh = new THREE.BatchedMesh(geometryCount, vertexCount, indexCount, createMaterial());
            mesh.userData.rotationSpeeds = [];

            // disable full-object frustum culling since all of the objects can be dynamic.
            mesh.frustumCulled = false;

            ids.length = 0;

            for (let i = 0; i < api.count; i++) {

                const id = mesh.addGeometry(geometries[i % geometries.length]);
                mesh.setMatrixAt(id, randomizeMatrix(matrix));

                const rotationMatrix = new THREE.Matrix4();
                rotationMatrix.makeRotationFromEuler(randomizeRotationSpeed(euler));
                mesh.userData.rotationSpeeds.push(rotationMatrix);

                ids.push(id);

            }
            if (scene)
                scene.add(mesh);

        }


        function init(forceWebGL = false) {

            if (renderer) {

                renderer.dispose();
                controls.dispose();
                document.body.removeChild(stats.dom);
                document.body.removeChild(renderer.domElement);

            }
            const backend = $("backend")
            backend.text('Active Backend: ' + (forceWebGL ? 'WebGL' : 'WebGPU'))
            // camera

            const aspect = window.innerWidth / window.innerHeight;

            camera = new THREE.PerspectiveCamera(70, aspect, 1, 100);
            camera.position.z = 50;

            // renderer

            renderer = new WebGPURenderer({antialias: true, forceWebGL});
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);

            renderer.setAnimationLoop(animate);

            // scene

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xffffff);


            if (forceWebGL) {

                scene.background = new THREE.Color(0xf10000);

            } else {

                scene.background = new THREE.Color(0xdcfce7);

            }

            document.body.appendChild(renderer.domElement);


            initGeometries();
            initMesh();

            // controls

            controls = new OrbitControls(camera, renderer.domElement);
            controls.autoRotate = true;
            controls.autoRotateSpeed = 1.0;

            // stats

            stats = new Stats({
                precision: 3,
                horizontal: false
            });
            stats.init(renderer);
            $("#gua").add(stats.dom);
            stats.dom.style.position = 'absolute';

            // gui

            gui = new GUI();
            gui.add(api, 'webgpu').onChange(() => {

                init(!api.webgpu);

            });
            gui.add(api, 'count', 1, MAX_GEOMETRY_COUNT).step(1).onChange(initMesh);
            gui.add(api, 'dynamic', 0, MAX_GEOMETRY_COUNT).step(1);

            gui.add(api, 'opacity', 0, 1).onChange(v => {

                if (v < 1) {

                    material.transparent = true;
                    material.depthWrite = false;

                } else {

                    material.transparent = false;
                    material.depthWrite = true;

                }

                material.opacity = v;
                material.needsUpdate = true;

            });
            gui.add(api, 'sortObjects');
            gui.add(api, 'perObjectFrustumCulled');
            gui.add(api, 'useCustomSort');


            // listeners

            window.addEventListener('resize', onWindowResize);


            function onWindowResize() {
                const width = window.innerWidth;
                const height = window.innerHeight;
                if (camera) {
                    camera.aspect = width / height
                    camera.updateProjectionMatrix();
                }
                if (renderer)
                    renderer.setSize(width, height);
            }


            async function animate() {

                animateMeshes();

                controls.update();


                if (mesh && mesh.isBatchedMesh) {
                    mesh.sortObjects = api.sortObjects;
                    mesh.perObjectFrustumCulled = api.perObjectFrustumCulled;
                    mesh.setCustomSort(api.useCustomSort ? sortFunction : null);
                }
                // 类型断言不判null
                renderer = renderer as WebGPURenderer
                scene = scene as THREE.Scene;
                camera = camera as THREE.PerspectiveCamera;
                await renderer.renderAsync(scene, camera);
                stats.update();
            }

            function animateMeshes() {
                // 自定义排序函数，用于根据深度对网格进行排序
                const loopNum = Math.min(api.count, api.dynamic);


                for (let i = 0; i < loopNum; i++) {

                    const rotationMatrix = mesh ? mesh.userData.rotationSpeeds[i] : null;
                    const id = ids[i];
                    if (mesh) {
                        mesh.getMatrixAt(id, matrix);
                        matrix.multiply(rotationMatrix);
                        mesh.setMatrixAt(id, matrix);
                    }

                }

            }

        }

        //

        function sortFunction(this: THREE.BatchedMesh<number>, list: {
            start: number,
            count: number,
            z: number
        }[], camera: THREE.Camera) {
            // 自定义排序函数，用于根据深度对网格进行排序
            // initialize options
            this._options = this._options || {
                get: el => el,
                aux: new Array<number>(this.maxInstanceCount)
            };

            const options = this._options;
            options.reversed = this.material.transparent;

            // convert depth to unsigned 32 bit range
            const factor = (2 ** 32 - 1) / camera.far; // UINT32_MAX / max_depth
            for (let i = 0, l = list.length; i < l; i++) {
                list[i].z *= factor;
            }
            // perform a fast-sort using the hybrid radix sort function
            radixSort(list.map(item => item.z), options);
        }

    })
    return (
        <>
            <div id="backend"
                 style={{
                     position: "absolute",
                     top: "200px",
                     left: 0,
                     color: "#fff",
                     backgroundColor: "rgba(0,0,0,0.75)",
                     padding: "5px"
                 }}
            >
    Active Backend: WebGPU
           </div>
            <div id="gua" className={"h-full w-full"}>
            </div>
            <div className={"h-full w-full"}></div>
        </>
    )
}
export default BackGround;
