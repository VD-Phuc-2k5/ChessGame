const RANKS: Map<number, string> = new Map();
RANKS.set(1, '8');
RANKS.set(2, '7');
RANKS.set(3, '6');
RANKS.set(4, '5');
RANKS.set(5, '4');
RANKS.set(6, '3');
RANKS.set(7, '2');
RANKS.set(8, '1');

const FILES: Map<number, string> = new Map();
FILES.set(1, 'a');
FILES.set(2, 'b');
FILES.set(3, 'c');
FILES.set(4, 'd');
FILES.set(5, 'e');
FILES.set(6, 'f');
FILES.set(7, 'g');
FILES.set(8, 'h');

export { FILES, RANKS };
