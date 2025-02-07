import {
    autoUpdate,
    flip,
    offset,
    shift,
    useDismiss,
    useFloating,
    useFocus,
    useHover,
    useInteractions,
    useRole,
} from "@floating-ui/react";
import { Transition } from "@headlessui/react";
import { useState } from "react";

interface TooltipProps {
    tooltip?: React.ReactNode;
    placement?: "top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end";
    spacing?: number;
    fill?: boolean;
    delay?: number;
    position?: "relative" | "fixed" | "absolute" | "sticky";
    children?: React.ReactNode;
}

const Tooltip = ({
    tooltip,
    placement = "top",
    spacing = 5,
    fill = false,
    delay = 0,
    position = "relative",
    children,
}: TooltipProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        placement,
        onOpenChange: setIsOpen,
        middleware: [offset(spacing), flip(), shift()],
        whileElementsMounted: autoUpdate,
    });

    const hover = useHover(context, {
        move: false,
        delay: {
            open: delay,
            close: 0,
        },
    });
    const focus = useFocus(context);
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: "tooltip" });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
        focus,
        dismiss,
        role,
    ]);

    return (
        <div>
            <div ref={refs.setReference} {...getReferenceProps()}>
                {children}
            </div>
            <Transition
                as={"div"}
                show={isOpen}
                className={`${position} z-10`}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <div
                    className={`absolute bg-black border border-purple-500 text-white text-sm px-3 py-1.5 shadow-lg whitespace-nowrap text-center ${fill ? "min-w-full" : "w-fit"
                        }`}
                    ref={refs.setFloating}
                    style={floatingStyles}
                    {...getFloatingProps()}
                >
                    {tooltip}
                </div>
            </Transition>
        </div>
    );
};

export default Tooltip;