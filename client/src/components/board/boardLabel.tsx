import { JSX } from 'react';

function BoardLabel({ value }: { value: string }): JSX.Element {
  return (
    <div className="grid h-full w-full place-items-center">
      <span className="text-center text-lg leading-none font-bold">{value}</span>
    </div>
  );
}

export default BoardLabel;
