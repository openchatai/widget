import { createSafeContext } from "@lib/utils/create-safe-context";
import { AnimatePresence, motion } from "framer-motion";
import React, {
  ComponentProps,
  ElementRef,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

const [useDialogState, SafeProvider] = createSafeContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
  onOpenChange: (open: boolean) => void;
  isAlert: boolean;
}>();

const noop = () => {
  //
};

// Styled components
const StyledBackdrop = styled(motion.div)`
  position: absolute;
  inset: 0;
  z-index: 200;
  background: linear-gradient(to top, rgba(237, 237, 237, 0.3), rgba(255, 255, 255, 0.3));
  backdrop-filter: blur(4px);
`;

const StyledDialogContent = styled(motion.div) <{ isAlert: boolean }>`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 0.75rem; /* Adjust for rounded corners */
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  max-width: 90%;
  bottom: 0.5rem;
  width: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem;
  z-index: 205;
  color: ${({ theme }) => theme.colors.secondary};
  
  &[data-alert="true"] {
    /* Additional styles for alert dialog */
  }
`;

function Dialog({
  defaultOpen,
  onOpenChange,
  open,
  children,
  isAlert,
}: {
  children:
  | React.ReactNode
  | (({
    open,
    setOpen,
  }: {
    open: boolean;
    setOpen: (open: boolean) => void;
  }) => React.ReactNode);
  defaultOpen?: boolean;
  open?: boolean; // controlled
  isAlert?: boolean;
  onOpenChange?: (open: boolean) => void; // controlled
}) {
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const isOpen = open ?? uncontrolled ?? false;
  const setOpen = onOpenChange ?? setUncontrolled;

  return (
    <SafeProvider
      value={{
        open: isOpen,
        setOpen,
        onOpenChange: onOpenChange ?? noop,
        isAlert: isAlert ? isAlert : false,
      }}
    >
      {typeof children === "function"
        ? children({ open: isOpen, setOpen })
        : children}
    </SafeProvider>
  );
}

const DialogTrigger = React.forwardRef<
  ElementRef<"button">,
  ComponentProps<"button">
>((props, ref) => {
  const { setOpen, open } = useDialogState();
  return (
    <button
      {...props}
      data-open={open}
      onClick={() => setOpen(true)}
      ref={ref}
    />
  );
});

const DialogBackDrop = React.forwardRef<
  ElementRef<typeof StyledBackdrop>,
  ComponentProps<typeof StyledBackdrop>
>((props, ref) => {
  return (
    <StyledBackdrop
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { delay: 0.1 } }}
      transition={{ duration: 0.2 }}
      {...props}
      ref={ref}
    />
  );
});

function mergeRefs<T>(...refs: Array<React.Ref<T>>) {
  return (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}

const DialogContent = React.forwardRef<
  ElementRef<typeof StyledDialogContent>,
  ComponentProps<typeof StyledDialogContent>
>(({ children, ...props }, ref) => {
  const { open, setOpen, isAlert } = useDialogState();
  const contentRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const _ref = mergeRefs(ref, contentRef);

  useEffect(() => {
    if (!open || isAlert) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("keydown", close);
    };
  }, [open, setOpen, isAlert]);

  useEffect(() => {
    if (open) {
      contentRef.current?.focus();
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <StyledDialogContent
            {...props}
            data-alert={isAlert}
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            ref={_ref}
            isAlert={isAlert}
          >
            {children}
          </StyledDialogContent>
          <DialogBackDrop
            onClick={(ev) => {
              if (isAlert) return;
              if (ev.target === backdropRef.current) {
                setOpen(false);
              }
            }}
            ref={backdropRef}
          />
        </>
      )}
    </AnimatePresence>
  );
});

const DialogClose = React.forwardRef<
  ElementRef<"button">,
  ComponentProps<"button">
>((props, ref) => {
  const { setOpen, open } = useDialogState();
  return (
    <button
      {...props}
      data-open={open}
      onClick={() => {
        setOpen(false);
      }}
      ref={ref}
    />
  );
});

export { DialogContent, DialogTrigger, Dialog, DialogClose };
