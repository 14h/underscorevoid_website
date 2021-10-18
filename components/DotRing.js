import {useMousePosition} from "../utils";

export const DotRing = () => {
    const { x, y } = useMousePosition();

    return (
        <div
            className="dot hidden lg:block"
            style={{ left: `${x}px`, top: `${y}px` }}
        />
    );
};
