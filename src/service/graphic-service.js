import { useState, useRef, useEffect, useContext } from "react";
import { multiply } from "mathjs";
import { ModelContext } from "../app/App";

import * as THREE from "three";

import { Sky } from "@react-three/drei";

// * three

export const Service = () => {
    const x = 0,
        y = 1;
    // состояние полотна и контекст
    const [canvasContainer, setCanvasContainer] = useState(null);
    const saveCanvasSettings = ({ canvasContainer }) => {
        setCanvasContainer(canvasContainer);
    };

    const drawModel = () => {
        // console.dir(canvasContainer.style);
        const width = 800,
            height = 600;

        // init

        const camera = new THREE.PerspectiveCamera(
            70,
            width / height,
            0.01,
            10
        );
        camera.position.z = 1;

        const scene = new THREE.Scene();

        const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        const material = new THREE.MeshNormalMaterial();

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        renderer.setAnimationLoop(animation);
        canvasContainer.appendChild(renderer.domElement);

        // animation

        function animation(time) {
            mesh.rotation.x = time / 2000;
            mesh.rotation.y = time / 1000;

            renderer.render(scene, camera);
        }
    };

    return {
        saveCanvasSettings,
        drawModel,
    };
};

export const MyCanvas = () => {
    // const canvasContainerRef = useRef(null);
    // const modelContext = useContext(ModelContext);
    // const {
    //     drawModel: { matrixModel, edges },
    // } = modelContext;
    // const { saveCanvasSettings, drawModel } = Service();

    // //! канвас сохраняется при первом рендере полотна
    // useEffect(() => {
    //     saveCanvasSettings({
    //         canvasContainer: canvasContainerRef.current,
    //     });
    //     // eslint-disable-next-line
    // }, []);

    // //! обновляемая модель, которая приходит из вне, затем рисуется в сервисе
    // useEffect(() => {
    //     if (matrixModel) {
    //         drawModel();
    //     }
    //     // eslint-disable-next-line
    // }, [matrixModel]);

    return (
        <>
            {/* <div className="canvas-container" ref={canvasContainerRef}></div> */}
            <Sky sunPosition={[100, 20, 100]} />
        </>
    );
};
