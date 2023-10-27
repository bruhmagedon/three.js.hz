import * as THREE from "three";

export const useModel = () => {
    const dwarfModel = () => {
        const model = [];
        // *тело
        const bodyGeometry = new THREE.BoxGeometry(1, 1, 1);
        const bodyMaterial = new THREE.MeshPhongMaterial({ color: "#32D4F1" });
        const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
        bodyMesh.position.y -= 0.25;
        bodyMesh.scale.y += 0.5;
        model.push(bodyMesh);
        // * лицо
        const faceGeometry = new THREE.BoxGeometry(1, 1, 1);
        const faceMaterial = new THREE.MeshPhongMaterial({ color: "#FAD7A0" });
        const faceMesh = new THREE.Mesh(faceGeometry, faceMaterial);
        faceMesh.position.y += 1;
        model.push(faceMesh);

        // * руки
        const leftArmGeometry = new THREE.BoxGeometry(1, 1, 1);
        const leftArmMaterial = new THREE.MeshPhongMaterial({
            color: "#32D4F1",
        });
        const leftArmMesh = new THREE.Mesh(leftArmGeometry, leftArmMaterial);
        leftArmMesh.position.x -= 1;
        leftArmMesh.position.y += 0.25;
        leftArmMesh.scale.y -= 0.5;
        model.push(leftArmMesh);

        const rightArmMesh = new THREE.Mesh(leftArmGeometry, leftArmMaterial);
        rightArmMesh.position.x += 1;
        rightArmMesh.position.y += 0.25;
        rightArmMesh.scale.y -= 0.5;
        model.push(rightArmMesh);

        // * ноги
        const legGeometry = new THREE.BoxGeometry(1, 1, 1);
        const legMaterial = new THREE.MeshPhongMaterial({
            color: "#32D4F1",
        });
        const leftLegMesh = new THREE.Mesh(legGeometry, legMaterial);
        leftLegMesh.position.y -= 1.5;
        leftLegMesh.position.x -= 0.3;
        leftLegMesh.scale.x -= 0.55;
        model.push(leftLegMesh);

        const rightLegMesh = new THREE.Mesh(leftArmGeometry, leftArmMaterial);
        rightLegMesh.position.y -= 1.5;
        rightLegMesh.position.x += 0.3;
        rightLegMesh.scale.x -= 0.55;
        model.push(rightLegMesh);

        // * шляпа
        const hat = new THREE.ConeGeometry(0.75, 2, 26);
        const hatMaterial = new THREE.MeshPhongMaterial({
            color: "red",
        });
        const hatMesh = new THREE.Mesh(hat, hatMaterial);
        hatMesh.position.y += 2.5;

        model.push(hatMesh);
        // * глаза
        const eyeGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.1);
        const eyeMaterial = new THREE.MeshBasicMaterial({ color: "white" });
        const eyeMesh1 = new THREE.Mesh(eyeGeometry, eyeMaterial);
        const eyeMesh2 = new THREE.Mesh(eyeGeometry, eyeMaterial);
        eyeMesh1.position.set(-0.25, 1.1, 0.5);
        eyeMesh2.position.set(0.25, 1.1, 0.5);
        model.push(eyeMesh1);
        model.push(eyeMesh2);

        // * зрачки
        const pupilGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        const pupilMaterial = new THREE.MeshBasicMaterial({ color: "black" });
        const pupilMesh1 = new THREE.Mesh(pupilGeometry, pupilMaterial);
        const pupilMesh2 = new THREE.Mesh(pupilGeometry, pupilMaterial);
        pupilMesh1.position.set(-0.18, 1.03, 0.52);
        pupilMesh2.position.set(0.32, 1.03, 0.52);
        model.push(pupilMesh1);
        model.push(pupilMesh2);

        // * рот
        const mouthGeometry = new THREE.BoxGeometry(0.6, 0.2, 0.1);
        const mouthMaterial = new THREE.MeshPhongMaterial({ color: "#EC7063" });
        const mouthMesh = new THREE.Mesh(mouthGeometry, mouthMaterial);
        mouthMesh.position.set(0, 0.6, 0.5);
        model.push(mouthMesh);

        return model;
    };

    return { dwarfModel };
};
