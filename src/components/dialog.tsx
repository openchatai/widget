import { createSafeContext } from "@react/utils/create-safe-context";
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
  isAlert: boolean;
}>();

const noop = () => {
  //
};

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
  ElementRef<typeof motion.div>,
  ComponentProps<typeof motion.div>
>((props, ref) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { delay: 0.1 } }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 z-[24] from-gray-100/30 to-gray-50/30 bg-gradient-to-t backdrop-blur-sm"
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
  ElementRef<typeof motion.div>,
  ComponentProps<typeof motion.div>
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
  }, [open, setOpen]);

  useEffect(() => {
    if (open) {
      contentRef.current?.focus();
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            data-alert={isAlert}
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-background rounded-xl grid grid-cols-1 gap-2 border max-w-[90%] bottom-2 w-full absolute left-1/2 p-3 z-[25]"
            ref={_ref}
            {...props}
          >
            {children}
          </motion.div>
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
