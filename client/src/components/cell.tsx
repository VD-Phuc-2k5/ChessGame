import { JSX } from 'react';

interface CellComponentProps {
  color: string;
}

function CellComponent(props: CellComponentProps): JSX.Element {
  return <div style={{ backgroundColor: props.color }} className="h-full w-full"></div>;
}

export default CellComponent;
