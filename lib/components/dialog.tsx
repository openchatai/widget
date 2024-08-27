import { createSafeContext } from "@lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, {
  ComponentProps,
  ElementRef,
  useEffect,
  useRef,
  useState,
} from "react";

const [useDialogState, SafeProvider] = createSafeContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
  onOpenChange: (open: boolean) => void;
}>();

const noop = () => {
  // 
};

function Dialog({
  defaultOpen,
  onOpenChange,
  open,
  children,
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
  onOpenChange?: (open: boolean) => void; // controlled
}) {
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const isOpen = open ?? uncontrolled ?? false;
  const setOpen = onOpenChange ?? setUncontrolled;
  return (
    <SafeProvider
      value={{ open: isOpen, setOpen, onOpenChange: onOpenChange ?? noop }}
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
  ElementRef<"div">,
  ComponentProps<"div">
>((props, ref) => {
  return (
    <div
      className="absolute inset-0 z-[24] flex items-center justify-center bg-black/10 backdrop-blur-sm"
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
  ElementRef<"div">,
  ComponentProps<typeof motion.div>
>((props, ref) => {
  const { open, setOpen } = useDialogState();
  const contentRef = useRef<HTMLDivElement>(null);
  const backdfropRef = useRef<HTMLDivElement>(null);
  const _ref = mergeRefs(ref, contentRef);

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("keydown", close);
    };
  }, []);

  useEffect(() => {
    if (open) {
      contentRef.current?.focus();
    }
  }, [open]);

  return (
    open && (
      <DialogBackDrop
        onClick={(ev) => {
          if (ev.target === backdfropRef.current) {
            setOpen(false);
          }
        }}
        ref={backdfropRef}
      >
        <AnimatePresence>
          {open && (
            <motion.div
              {...props}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-background animate rounded-lg max-w-[80%] w-full"
              ref={_ref}
            />
          )}
        </AnimatePresence>
      </DialogBackDrop>
    )
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
