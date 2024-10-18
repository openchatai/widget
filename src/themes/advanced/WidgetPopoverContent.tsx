import { PopoverContent } from "@radix-ui/react-popover";
import { motion } from "framer-motion";
import styled from "styled-components";

const SizableScreenContainer = styled(motion.div)`
  height: 500px;
`

const WidgetPopoverContent = styled(PopoverContent)`
  transform-origin: bottom right;
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.foreground};
  max-width: calc(var(--radix-popper-available-width) - 30px);
  max-height: calc(var(--radix-popper-available-height) - 30px);
  background-color: transparent;
  height: fit-content;
  border-radius: ${props => props.theme.radii.lg};
`

export {
  WidgetPopoverContent,
  SizableScreenContainer
}