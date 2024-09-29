type Props = {
    options: string[];
    onKeyboardClick: (option: string) => void;
}

function Keyboard({
    options,
    onKeyboardClick
}: Props) {
    return (
        <div className='grid grid-cols-2 gap-2'>
            {options.map((option, index) => (
                <button
                    onClick={() => onKeyboardClick(option)}
                    className='text-dark hover:border-secondary border-transparent border bg-white rounded-md p-2 w-full'
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