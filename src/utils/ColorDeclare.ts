export default function ColorDeclare(cell: number) {
    switch (cell) {
        case 0:
            return "#d1d1d1";
        case 2:
            return "#fbbf24";
        case 4:
            return "#fb923c";
        case 8:
            return "#f87171";
        case 16:
            return "#f44336";
        case 32:
            return "#e91e63";
        case 64:
            return "#9c27b0";
        case 128:
            return "#673ab7";
        case 256:
            return "#3f51b5";
        case 512:
            return "#2196f3";
        case 1024:
            return "#03a9f4";
        case 2048:
            return "#00bcd4";
    }
}

