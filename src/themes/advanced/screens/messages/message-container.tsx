import styled from "styled-components"

const MessageContainer = styled.div<{
    direction: "right" | "left";
}>`
    display: flex;
    padding: 0.5rem;
    gap: 5px;
    
    width: 100%;

    ${props => props.direction === "right" ? `
        justify-content: flex-end;
        flex-direction: row-reverse;
        ` : `
        justify-content: flex-start;
        flex-direction: row;
    `}

    .message-body {
        display: flex;
        flex-direction: column;
        align-items: ${props => props.direction === 'right' ? 'flex-end' : 'flex-start'};
        flex: 1;
        gap: 4px;

        [data-messages-header] {
            display: flex;
            gap: 0.5rem;
        }

        [data-author-name]{
            font-weight: 600;
            font-size: ${props => props.theme.fs.xs};
            line-height: 1.1;
            color: ${props => props.theme.colors.secondary};
        }

        [data-messages-stack] {
            display: flex;
            flex-direction: column;
            gap: 2px;
            align-content: flex-start;
        }

        [data-message-text]{
            font-size: ${props => props.theme.fs.xs};
            line-height: 1.5;
            padding: 0.5rem;
            font-weight: 500;
            border-radius: ${props => props.theme.radii.md};
            background: ${props => props.theme.colors.foreground};
            color: ${props => props.theme.colors.secondary};
            width: fit-content;
            
            &:is(:first-child) {
                border-top-${props => props.direction === 'right' ? 'right' : 'left'}-radius: 0;
            }

            &:hover {
                filter: brightness(.98);
            }
        }
    }
`
export {
    MessageContainer
}