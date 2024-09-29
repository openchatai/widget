type Props = {
    options: string[];
    onKeyboardClick: (option: string) => void;
}

function Keyboard({
    options,
    onKeyboardClick
}: Props) {
    return (
        <div className='flex items-center gap-2 p-1'>
            {options.map((option, index) => (
                <button
                    onClick={() => onKeyboardClick(option)}
                    className='text-dark hover:border-secondary border-transparent border bg-white rounded-md p-1 text-sm w-full'
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