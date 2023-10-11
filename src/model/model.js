export const useModel = () => {
    const dwarfModelFront = {
        BF: {
            type: "BF",
            points: [
                { x: -3, y: 0, z: 0 },
                { x: -3, y: 4, z: 0 },
                { x: 3, y: 4, z: 0 },
                { x: 3, y: 0, z: 0 },
            ],
        },
        // LHF: {
        //     type: "LHF",
        //     points: [
        //         { x: -6, y: 0, z: 0 },
        //         { x: -6, y: 2, z: 0 },
        //         { x: -3, y: 2, z: 0 },
        //         { x: -3, y: 0, z: 0 },
        //     ],
        // },
        // RHF: {
        //     type: "RHF",
        //     points: [
        //         { x: 6, y: 0, z: 0 },
        //         { x: 6, y: 2, z: 0 },
        //         { x: 3, y: 2, z: 0 },
        //         { x: 3, y: 0, z: 0 },
        //     ],
        // },
        // FF: {
        //     type: "FF",
        //     points: [
        //         { x: -3, y: -4, z: 0 },
        //         { x: -3, y: 0, z: 0 },
        //         { x: 3, y: 0, z: 0 },
        //         { x: 3, y: -4, z: 0 },
        //     ],
        // },
        // HF: {
        //     type: "HF",
        //     points: [
        //         { x: -3, y: -4, z: 0 },
        //         { x: 3, y: -4, z: 0 },
        //         { x: 0, y: -10, z: 0 },
        //     ],
        // },
        // LLF: {
        //     type: "LLF",
        //     points: [
        //         { x: -3, y: 4, z: 0 },
        //         { x: -3, y: 8, z: 0 },
        //         { x: -1, y: 8, z: 0 },
        //         { x: -1, y: 4, z: 0 },
        //     ],
        // },
        // RLF: {
        //     type: "RLF",
        //     points: [
        //         { x: 1, y: 4, z: 0 },
        //         { x: 1, y: 8, z: 0 },
        //         { x: 3, y: 8, z: 0 },
        //         { x: 3, y: 4, z: 0 },
        //     ],
        // },
        // E1: {
        //     type: "E1",
        //     points: [
        //         { x: -2, y: -3, z: 0 },
        //         { x: -2, y: -2, z: 0 },
        //         { x: -1, y: -2, z: 0 },
        //         { x: -1, y: -3, z: 0 },
        //     ],
        // },
        // E2: {
        //     type: "E2",
        //     points: [
        //         { x: 1, y: -3, z: 0 },
        //         { x: 1, y: -2, z: 0 },
        //         { x: 2, y: -2, z: 0 },
        //         { x: 2, y: -3, z: 0 },
        //     ],
        // },
        // M: {
        //     type: "M",
        //     points: [
        //         { x: -2, y: -1, z: 0 },
        //         { x: -2, y: 0, z: 0 },
        //         { x: 2, y: 0, z: 0 },
        //         { x: 2, y: -1, z: 0 },
        //     ],
        // },
    };

    const dwarfModelBack = {
        BF: {
            type: "BF",
            points: [
                { x: -5, y: 2, z: 3 },
                { x: -5, y: 6, z: 3 },
                { x: 1, y: 6, z: 3 },
                { x: 1, y: 2, z: 3 },
            ],
        },
        // LHF: {
        //     type: "LHF",
        //     points: [
        //         { x: -6, y: 0, z: 3 },
        //         { x: -6, y: 2, z: 3 },
        //         { x: -3, y: 2, z: 3 },
        //         { x: -3, y: 0, z: 3 },
        //     ],
        // },
        // RHF: {
        //     type: "RHF",
        //     points: [
        //         { x: 6, y: 0, z: 3 },
        //         { x: 6, y: 2, z: 3 },
        //         { x: 3, y: 2, z: 3 },
        //         { x: 3, y: 0, z: 3 },
        //     ],
        // },
        // FF: {
        //     type: "FF",
        //     points: [
        //         { x: -3, y: -4, z: 3 },
        //         { x: -3, y: 0, z: 3 },
        //         { x: 3, y: 0, z: 3 },
        //         { x: 3, y: -4, z: 3 },
        //     ],
        // },
        // HF: {
        //     type: "HF",
        //     points: [
        //         { x: -3, y: -4, z: 3 },
        //         { x: 3, y: -4, z: 3 },
        //         { x: 0, y: -10, z: 3 },
        //     ],
        // },
        // LLF: {
        //     type: "LLF",
        //     points: [
        //         { x: -3, y: 4, z: 3 },
        //         { x: -3, y: 8, z: 3 },
        //         { x: -1, y: 8, z: 3 },
        //         { x: -1, y: 4, z: 3 },
        //     ],
        // },
        // RLF: {
        //     type: "RLF",
        //     points: [
        //         { x: 1, y: 4, z: 3 },
        //         { x: 1, y: 8, z: 3 },
        //         { x: 3, y: 8, z: 3 },
        //         { x: 3, y: 4, z: 3 },
        //     ],
        // },
    };

    // const matrixConfigurity = [[]];

    return { dwarfModelFront, dwarfModelBack };
};
