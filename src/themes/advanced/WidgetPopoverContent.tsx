import { PopoverContent } from "@radix-ui/react-popover";
import { motion } from "framer-motion";
import styled from "styled-components";

const SizableScreenContainer = styled(motion.div)`
  height: 500px;
  max-height: 100%;
`

const WidgetPopoverContent = styled(PopoverContent)`
  transform-origin: bottom right;
  
  max-width: calc(var(--radix-popper-available-width) - 30px);
  max-height: calc(var(--radix-popper-available-height) - 30px);

  background-color: transparent;
  border-radius: ${props => props.theme.radii.lg};
  outline: none;
`

export {
  WidgetPopoverContent,
  SizableScreenContainer
}