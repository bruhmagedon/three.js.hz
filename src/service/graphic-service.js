import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { useState, useRef, useEffect, useContext } from "react";
import { ModelContext } from "../app/App";
import { useModel } from "../action/model/model";
import { re } from "mathjs";

// * three
export const Service = () => {
    const { light } = useContext(ModelContext);
    const [canvasContainer, setCanvasContainer] = useState(null);
    const [rotateStatus, setRotateStatus] = useState(null);
    const saveCanvasSettings = ({ canvasContainer }) => {
        setCanvasContainer(canvasContainer);
        return true;
    };
    const { dwarfModel } = useModel();

    const drawModel = () => {
        // очистка сцены
        while (canvasContainer.lastElementChild) {
            canvasContainer.removeChild(canvasContainer.lastElementChild);
        }

        const width = window.innerWidth,
            height = window.innerHeight;
        // сцена
        const scene = new THREE.Scene();
        scene.background = "white";

        console.log(light);
        const localLight = !light
            ? new THREE.DirectionalLight(0xffffff, 4)
            : new THREE.PointLight(0xffffff, 4);
        localLight.position.set(rotateStatus.x, rotateStatus.y, rotateStatus.z);
        scene.add(localLight);

        // камера
        const camera = new THREE.PerspectiveCamera(75, width / height);
        camera.position.z = 4;

        // моделька
        const group = new THREE.Group();
        group.add(...dwarfModel());
        scene.add(group);
        group.position.y -= 0.5;

        // рендерер
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setClearColor(new THREE.Color("#AAB7B8"));
        renderer.setSize(width, height);
        canvasContainer.appendChild(renderer.domElement);

        // управляемая камера
        let controls = new OrbitControls(camera, renderer.domElement);
        const loop = () => {
            requestAnimationFrame(loop);
            renderer.render(scene, camera);
        };
        loop();
    };

    return {
        saveCanvasSettings,
        drawModel,
        setRotateStatus,
    };
};

export const Canvas = () => {
    const canvasContainerRef = useRef(null);
    const { rotate, range, scale } = useContext(ModelContext);
    const { saveCanvasSettings, drawModel, setRotateStatus } = Service();
    const [isAxis, setIsAxis] = useState(false);

    useEffect(() => {
        saveCanvasSettings({
            canvasContainer: canvasContainerRef.current,
        });
        setIsAxis(true);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (isAxis) {
            drawModel();
        }
    });

    useEffect(() => {
        setRotateStatus(rotate);
    }, [rotate]);

    return (
        <>
            <div className="canvas-container" ref={canvasContainerRef}></div>
        </>
    );
};
