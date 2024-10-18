"use client";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { size } from "src/design-helpers";
import styled from "styled-components";

// Styled components
const Avatar = styled(AvatarPrimitive.Root)`
  position: relative;
  display: flex;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.foreground};
  ${size("24px")};
`;

const AvatarImage = styled(AvatarPrimitive.Image)`
  ${size("100%")};
  object-fit: cover;
`;

const AvatarFallback = styled(AvatarPrimitive.Fallback)`
  display: flex;
  font-size:${({ theme }) => theme.fs.xs};
  align-items: center;
  justify-content: center;
  font-weight: 500;
  ${size("100%")};
`;
export { Avatar, AvatarImage, AvatarFallback };
