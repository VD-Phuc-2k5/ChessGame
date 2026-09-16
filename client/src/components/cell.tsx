import { JSX, memo } from 'react';

interface CellComponentProps {
  color: string;
  coordinate: string;
}

function CellComponent(props: CellComponentProps): JSX.Element {
  return (
    <div
      style={{ backgroundColor: props.color }}
      className="grid h-full w-full place-items-center"
    ></div>
  );
}

export default memo(CellComponent);
