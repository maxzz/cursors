import React from "react";
import { a, useTransition } from "@react-spring/web";

export const animationScaleY = {
    from: { opacity: 0, scaleY: 0 },
    enter: { opacity: 1, scaleY: 1 },
    leave: { opacity: 0, scaleY: 0 },
};

export const animationConfig = {
    config: { mass: 0.2, tension: 692, clamp: true },
};

export function UIListTransition({ open, children }: { open: boolean; children: React.ReactNode; }) {
    const transition = useTransition(open, { ...animationScaleY, ...animationConfig });
    return transition((styles, item) => (
        item && <a.div style={styles}>
            {children}
        </a.div>
    ));
}
