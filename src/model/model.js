export const useModel = () => {
    const dwarfModel = {
        BF: {
            type: "BF",
            points: [
                { x: -3, y: 0 },
                { x: -3, y: 4 },
                { x: 3, y: 4 },
                { x: 3, y: 0 },
            ],
        },
        LHF: {
            type: "LHF",
            points: [
                { x: -6, y: 0 },
                { x: -6, y: 2 },
                { x: -3, y: 2 },
                { x: -3, y: 0 },
            ],
        },
        RHF: {
            type: "RHF",
            points: [
                { x: 6, y: 0 },
                { x: 6, y: 2 },
                { x: 3, y: 2 },
                { x: 3, y: 0 },
            ],
        },
        FF: {
            type: "FF",
            points: [
                { x: -3, y: -4 },
                { x: -3, y: 0 },
                { x: 3, y: 0 },
                { x: 3, y: -4 },
            ],
        },
        HF: {
            type: "HF",
            points: [
                { x: -3, y: -4 },
                { x: 3, y: -4 },
                { x: 0, y: -10 },
            ],
        },
        LLF: {
            type: "LLF",
            points: [
                { x: -3, y: 4 },
                { x: -3, y: 8 },
                { x: -1, y: 8 },
                { x: -1, y: 4 },
            ],
        },
        RLF: {
            type: "RLF",
            points: [
                { x: 1, y: 4 },
                { x: 1, y: 8 },
                { x: 3, y: 8 },
                { x: 3, y: 4 },
            ],
        },
        E1: {
            type: "E1",
            points: [
                { x: -2, y: -3 },
                { x: -2, y: -2 },
                { x: -1, y: -2 },
                { x: -1, y: -3 },
            ],
        },
        E2: {
            type: "E2",
            points: [
                { x: 1, y: -3 },
                { x: 1, y: -2 },
                { x: 2, y: -2 },
                { x: 2, y: -3 },
            ],
        },
        M: {
            type: "M",
            points: [
                { x: -2, y: -1 },
                { x: -2, y: 0 },
                { x: 2, y: 0 },
                { x: 2, y: -1 },
            ],
        },
    };

    return { dwarfModel };
};
