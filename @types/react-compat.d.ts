// @types/react 19 removed onPointerEnterCapture / onPointerLeaveCapture from
// DOMAttributes, but @ya.praktikum UI library pre-compiled .d.ts still references them.
import 'react';

declare module 'react' {
    interface DOMAttributes<T> {
        onPointerEnterCapture?: React.PointerEventHandler<T>;
        onPointerLeaveCapture?: React.PointerEventHandler<T>;
    }
}
