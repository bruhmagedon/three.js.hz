import * as THREE from "three";

import { useState, useRef, useEffect, useContext } from "react";
import { ModelContext } from "../app/App";

import "../styles/three.scss";

// * three
export const Service = () => {
    const [canvasContainer, setCanvasContainer] = useState(null);
    const saveCanvasSettings = ({ canvasContainer }) => {
        setCanvasContainer(canvasContainer);
        return true;
    };

    const drawModel = () => {
        while (canvasContainer.lastElementChild) {
            canvasContainer.removeChild(canvasContainer.lastElementChild);
        }

        const width = 600,
            height = 600;

        // камера
        const camera = new THREE.PerspectiveCamera(75, width / height);
        camera.position.z = 3;

        // сцена
        const scene = new THREE.Scene();

        const group = new THREE.Group();
        const meshes = [];
        const colors = [0xb7e8d8, 0xe86344, 0xe8ab9c];

        for (let x = -1.2; x <= 1.2; x += 1.2) {
            for (let y = -1.2; y <= 1.2; y += 1.2) {
                const geometry = new THREE.BoxGeometry(1, 1, 1);
                const material = new THREE.MeshBasicMaterial({
                    color: colors[((Math.random() * 3) | 0) + 1],
                    wireframe: true,
                });
                const mesh = new THREE.Mesh(geometry, material);
                mesh.scale.set(0.5, 0.5, 0.5);
                mesh.position.set(x, y, 0);
                meshes.push(mesh);
            }
        }
        group.add(...meshes);
        scene.add(group);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        canvasContainer.appendChild(renderer.domElement);
        renderer.setSize(width, height);

        const clock = new THREE.Clock();
        const animate = () => {
            const delta = clock.getDelta();
            meshes.forEach((item, i) => {
                const mult = i % 2 === 0 ? "1" : "-1";
                item.rotation.x += mult * delta;
                item.rotation.y += mult * delta * 0.4;
            });

            const elalpsed = clock.getElapsedTime();
            camera.position.x = Math.sin(elalpsed);
            camera.position.y = Math.cos(elalpsed);
            //фокус камеры на центре коориднат
            camera.lookAt(new THREE.Vector3(0, 0, 0));

            renderer.render(scene, camera);
            window.requestAnimationFrame(animate);
        };
        animate();
    };

    return {
        saveCanvasSettings,
        drawModel,
    };
};

export const MyCanvas = () => {
    const canvasContainerRef = useRef(null);
    const modelContext = useContext(ModelContext);
    const {
        drawModel: { matrixModel, edges },
    } = modelContext;
    const { saveCanvasSettings, drawModel } = Service();
    const [isAxis, setIsAxis] = useState(false);

    // //! канвас сохраняется при первом рендере полотна
    useEffect(() => {
        saveCanvasSettings({
            canvasContainer: canvasContainerRef.current,
        });
        setIsAxis(true);
        // eslint-disable-next-line
    }, []);

    //! обновляемая модель, которая приходит из вне, затем рисуется в сервисе
    useEffect(() => {
        if (isAxis) {
            drawModel();
        }

        // eslint-disable-next-line
    });

    return (
        <>
            <div className="canvas-container" ref={canvasContainerRef}></div>
        </>
    );
};
