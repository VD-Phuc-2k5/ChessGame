# ChessGame

A full-stack chess application built with Next.js + React in a pnpm monorepo. It implements standard FIDE chess rules, supports both two-player mode and play-against-computer mode (Stockfish), and provides a fully interactive board UI.

This project is the result of a ground-up **refactor** undertaken after studying **Design Patterns** and **SOLID Principles**. The goal was to turn a stateful, hard-to-extend codebase into a system with a clear architecture that is easy to read, easy to test, and easy to extend with new features.

---

## Table of Contents

- [Monorepo Structure](#monorepo-structure)
- [SOLID Principles in Practice](#solid-principles-in-practice)
- [Design Patterns Applied](#design-patterns-applied)
- [Game Flow](#game-flow)
- [Playing Against Stockfish](#playing-against-stockfish)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [What Has Been Accomplished](#what-has-been-accomplished)
- [Architecture Notes](#architecture-notes)

---

## Monorepo Structure

| Package | Role |
| --- | --- |
| `@chess/core` | Interfaces, constants, types, enums. Declares contracts only; contains no implementation logic. |
| `@chess/domain` | All chess domain logic: board, pieces, moves, history, notation. |
| `client` | Next.js 15 + React 19 UI: interactive board, clock, move history, play vs Stockfish. |

```
ChessGame/
├── packages/
│   ├── core/        # @chess/core - contracts / abstractions
│   └── domain/      # @chess/domain - chess domain logic
├── client/          # Next.js 15 + React 19 + Tailwind 4
└── pnpm-workspace.yaml
```

---

## SOLID Principles in Practice

| Principle | Application in this project |
| --- | --- |
| **S** - Single Responsibility | Each class has one job: `MoveGenerator` only generates candidate moves, `MoveValidator` only validates legality, `MoveNotationBuilder` only builds notation, `MoveExecutor` only executes a move. |
| **O** - Open/Closed | Adding a new piece type requires only a new `XxxMovement` class plus a `PieceFactory` entry. Adding a new move type requires only a new `XxxMoveExecutor`. Existing code is not modified. |
| **L** - Liskov Substitution | All pieces extend `Piece` / `Movement`; every executor extends `MoveExecutor`. They are interchangeable through the `IPiece`, `IMovement`, and executor interfaces. |
| **I** - Interface Segregation | `@chess/core` splits small interfaces: `IBoard`, `ICell`, `IPiece`, `IMove`, etc. Each consumer depends only on the part it needs. |
| **D** - Dependency Inversion | `domain` and `client` depend only on **interfaces** from `core`, never on concrete implementation classes. |

---

## Design Patterns Applied

### Factory Pattern

- **`PieceFactory`** - creates all piece types (Pawn, Rook, Knight, Bishop, Queen, King) for either color.
- **`ColorFactory`** - creates color objects (white / black).
- **`MoveExecutorFactory`** - selects the right executor by move type (`NORMAL`, `CASTLING`, `EN_PASSANT`, `PROMOTION`) via a registry map.

### Strategy Pattern

- **`IPlayerStrategy`** with `HumanPlayer` / `EnginePlayer` - the strategy for who moves next. `GameController` does not need to know who is playing.
- **`Movement`** hierarchy (`PawnMovement`, `SlidingMovement` extending to `BishopMovement`, `RookMovement`, `QueenMovement`) - different movement strategies per piece type.

### Template Method Pattern

- **`MoveExecutor`** - defines the shared `movePiece()` scaffold; subclasses (`NormalMoveExecutor`, `CastlingMoveExecutor`, `PromotionMoveExecutor`, `EnPassantMoveExecutor`) only override `execute()`.
- **`SlidingMovement`** - provides the shared `getSlidingMoves()` used by all sliding pieces (Queen, Rook, Bishop).

### Singleton Pattern

- **`Board.getBoardInstance()`** - a single shared board across the application.
- **`GameState.getInstance()`** - a single shared game state.
- **`MoveValidator.getInstance()`** - a single shared validator.
- **`PawnMovement.of(side)`** - cached per color to avoid wasteful re-creation.

### Iterator Pattern

- **`BoardIterator`** plus `Board implements Iterable<ICell>` - iterate the board with a standard `for...of` loop.

### Observer / Publish-Subscribe Pattern

- **`GameController.subscribe()`** + `notify()` - React components subscribe and re-render when the snapshot changes.
- **`GameClock.setOnTick()`** - the clock notifies on every update.

---

## Game Flow

1. The player selects or drags a piece; `GameController.tryMove(from, to)` is called.
2. `Game.getLegalMoves()` -> `MoveGenerator.generate(piece)` produces candidates; `MoveValidator.isValidMove()` validates legality (check, checkmate, castling, en passant, promotion).
3. If the move is a promotion, the `PromotionOverlay` is shown and the player picks a piece.
4. `MoveExecutorFactory` creates the correct executor, which applies the move to the board.
5. `MoveNotationBuilder` and `PgnBuilder` record the notation; `MoveHistory` stores the history.
6. `GameClock` swaps the turn; `GameController.notify()` updates the UI.
7. In computer mode, when it is the engine's turn, `EnginePlayer.computeMove()` calls the `/api/engine` UCI endpoint, and `uciToMove()` feeds the move back into the game.

---

## Playing Against Stockfish

- **`client/src/game/stockfishEngine.ts`** - fetch wrapper around the engine API with cancellation support (`AbortController`).
- **`client/src/app/api/engine/route.ts`** - a Next.js Route Handler that spawns the Stockfish binary (UCI protocol), reads `bestmove`, with a safety timeout.
- **`client/src/game/uci.ts`** - converts between UCI strings (for example `e2e4`) and `IPosition`.

Note: only the binary `client/public/stockfish-engine/stockfish-linux-x86-64-universal` is tracked by git; the rest of the Stockfish source tree is ignored via `.gitignore`. The route handler runs on the Node.js runtime.

---

## Getting Started

Requirements: **Node.js 20+**, **pnpm 11+**.

```bash
# 1. Install dependencies
pnpm install

# 2. Build core & domain (client imports from dist)
pnpm build

# 3. Run the dev server
pnpm dev:client
```

Open `http://localhost:3000`.

---

## Scripts

| Command | Description |
| --- | --- |
| `pnpm build` | Builds core + domain + client |
| `pnpm dev:client` | Builds core/domain, then starts the Next.js dev server |
| `pnpm typecheck` | Builds core/domain + typechecks client |
| `pnpm test` | Runs tests across all three packages |
| `pnpm format` | Formats code (Prettier) |
| `pnpm format:check` | Checks formatting |
| `pnpm prepare` | Installs Husky (pre-commit hook) |

The Husky `pre-commit` hook automatically runs: `format:check`, then `typecheck`, then `test`, then `lint`.

---

## What Has Been Accomplished

- **Clean monorepo separation** - `core` (contracts), `domain` (logic), `client` (UI); each package builds and tests independently.
- **Complete chess rule engine** - move generation, legality validation, castling, en passant, promotion, check and checkmate detection.
- **Flexible piece movement** - one `Movement` strategy class per piece type with sliding movement shared by Queen, Rook, and Bishop.
- **Pluggable move execution** - each move type has its own executor selected through a factory.
- **Configurable promotion** - the promoted piece is selectable (Queen, Rook, Bishop, Knight) instead of always promoting to Queen.
- **Computer opponent** - Stockfish integration via a UCI endpoint, with player-mode and engine move-time controls.
- **Interactive board UI** - drag-and-drop and click-to-move, legal-move highlights, move history, game clock, and game-over overlay.
- **Quality gates** - Husky pre-commit hook enforces formatting, typechecking, tests, and linting on every commit.

---

## Architecture Notes

- `@chess/core` contains **contracts only** - separating interfaces from implementations keeps `domain` independent of concrete details and makes the client easy to mock.
- `domain` has no React dependency - all logic is plain TypeScript, which is easy to unit test.
- The client uses a **Compound Component + Context** pattern (`Board`, `Board.Files`, `useBoard()`) to compose the board flexibly.