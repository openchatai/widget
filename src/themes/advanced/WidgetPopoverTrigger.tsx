import { SrOnly } from "@components/sr-only";
import { cn } from "@lib/utils/cn";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { MessageCircleMoreIcon, XIcon } from "lucide-react";
import { ComponentProps, ComponentRef, forwardRef } from "react";
import { flexCenter, size } from "src/design-helpers";
import styled from "styled-components";

const WidgetPopoverTriggerStyled = styled(PopoverPrimitive.PopoverTrigger)`
    transition: all 0.3s ease-in-out;
    --offset: 10px;
    bottom: var(--offset);
    right: var(--offset);
    
    position: fixed;
    font-weight: bold;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.foreground};
    border: none;
    
    ${size("50px")}
    ${flexCenter()}
    
    &:hover {
        transform: scale(1.05);
    }
    
    &:active {
        transform: scale(1.1);
    }

    & [data-content] {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    &[data-state="closed"] {
        [data-close-icon] {
            transform:translate(-50%, -50%)  scale(1);
        }
    }

    &[data-state="open"]{
        [data-message-circle-icon] { 
            transform:translate(-50%, -50%)  scale(1);
        }
    }
    
    :active {
        transform: scale(0.9);
    }

    & [data-trigger-icon] {
        position: absolute;
        top: 50%;
        left: 50%;
        ${size("30px")}
        transform: translate(-50%, -50%) scale(0);
        transition: transform 0.2s;
        pointer-events: none;
    }
`;

const WidgetPopoverTrigger = forwardRef<ComponentRef<typeof PopoverPrimitive.PopoverTrigger>, ComponentProps<typeof PopoverPrimitive.PopoverTrigger>>((props, _ref) => {
    return (
        <WidgetPopoverTriggerStyled
            ref={_ref}
            {...props}
        >
            <div data-content>
                <XIcon data-trigger-icon data-close-icon />
                <MessageCircleMoreIcon data-trigger-icon data-message-circle-icon />
            </div>
            <SrOnly className="sr-only">
                open the widget
            </SrOnly>
        </WidgetPopoverTriggerStyled>
    );
});

export {
    WidgetPopoverTrigger,
};
