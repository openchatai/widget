import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import styled, { keyframes } from "styled-components";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;
const slideUpAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const slideRightAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateX(-2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideDownAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideLeftAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateX(2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;
const TooltipContent = styled(TooltipPrimitive.Content)`
  overflow: hidden; 
  z-index: 50000; 
  user-select: none;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  font-weight: 500;
  font-size: ${({ theme }) => theme.fs.xs};
  font-family: ${({ theme }) => theme.fontFamily.DEFAULT};
  color: ${({ theme }) => theme.colors.foreground};
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.lg};

  &[data-state='delayed-open'][data-side='top'] {
    animation-name: ${slideDownAndFade};
  }
  &[data-state='delayed-open'][data-side='right'] {
    animation-name: ${slideLeftAndFade};
  }
  &[data-state='delayed-open'][data-side='bottom'] {
    animation-name: ${slideUpAndFade};
  }
  &[data-state='delayed-open'][data-side='left'] {
    animation-name: ${slideRightAndFade};
  }
`
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
