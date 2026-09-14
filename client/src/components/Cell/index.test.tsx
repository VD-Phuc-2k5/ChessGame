import { render, screen } from '@testing-library/react';

import Cell from './index';

jest.mock(
  '@chess/domain',
  () => ({
    CBoard: {
      getColumnIndex: (position: number) => position % 8,
      getRowIndex: (position: number) => Math.floor(position / 8),
    },
  }),
  { virtual: true }
);

describe('Cell', () => {
  it('renders a piece notation', () => {
    render(<Cell position={0} pieceNotation="wK" />);

    expect(screen.getByAltText('wK')).toBeInTheDocument();
  });
});
