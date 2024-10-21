"use client";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { size } from "src/design-helpers";
import styled from "styled-components";

// Styled components
const Avatar = styled(AvatarPrimitive.Root) <{ size?: string }>`
  position: relative;
  display: flex;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.foreground};
  ${props => props.size ? size(props.size) : size("28px")};
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

function AvatarComponent({ src, fallback, alt }: { src?: string; fallback: string, alt?: string }) {
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarComponent };
