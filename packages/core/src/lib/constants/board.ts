const FILES: Map<number, string> = new Map();
FILES.set(1, '8');
FILES.set(2, '7');
FILES.set(3, '6');
FILES.set(4, '5');
FILES.set(5, '4');
FILES.set(6, '3');
FILES.set(7, '2');
FILES.set(8, '1');

const RANKS: Map<number, string> = new Map();
RANKS.set(1, 'a');
RANKS.set(2, 'b');
RANKS.set(3, 'c');
RANKS.set(4, 'd');
RANKS.set(5, 'e');
RANKS.set(6, 'f');
RANKS.set(7, 'g');
RANKS.set(8, 'h');

const FILE_ASCII_OFFSET = 96;
const BOARD_SIZE: number = 500;

export { FILE_ASCII_OFFSET, FILES, RANKS, BOARD_SIZE };
