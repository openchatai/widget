import React from 'react';
type Props = {
    options: string[];
    onKeyboardClick: (option: string) => void;
}

function Keyboard({
    options,
    onKeyboardClick
}: Props) {
    return (
        <div className='flex items-center gap-2 p-1.5'>
            {options.map((option, index) => (
                <button
                    onClick={() => onKeyboardClick(option)}
                    className='hover:shadow font-semibold transition-all hover:border-secondary border-transparent border text-white bg-primary rounded-md p-1.5 text-sm w-full'
                    key={index}>
                    {option}
                </button>
            ))}
        </div>
    )
}
export {
    Keyboard
}