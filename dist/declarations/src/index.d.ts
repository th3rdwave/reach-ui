/**
 * Welcome to @reach/popover!
 */
import * as React from "react";
import { PRect } from "@reach/rect";
import type * as Polymorphic from "@reach/utils/polymorphic";
/**
 * Popover
 */
declare const Popover: Polymorphic.ForwardRefComponent<"div", PopoverProps>;
interface PopoverProps {
    children: React.ReactNode;
    targetRef: React.RefObject<PossibleNode>;
    position?: Position;
    /**
     * Render the popover markup, but hide it – used by MenuButton so that it
     * can have an `aria-controls` attribute even when its menu isn't open, and
     * used inside `Popover` as a hint that we can tell `useRect` to stop
     * observing for better performance.
     */
    hidden?: boolean;
    /**
     * Testing this API so we might accept additional nodes that apps can use to
     * determine the position of the popover. One example where it may be useful
     * is for positioning the popover of a listbox where the cursor rests on top
     * of the selected option. Pretty sure this will change so don't use it
     * anywhere in public yet!
     */
    unstable_observableRefs?: React.RefObject<PossibleNode>[];
}
declare const positionDefault: Position;
declare const positionRight: Position;
declare const positionMatchWidth: Position;
declare function getCollisions(targetRect: PRect, popoverRect: PRect, offsetLeft?: number, offsetBottom?: number): {
    directionRight: boolean;
    directionLeft: boolean;
    directionUp: boolean;
    directionDown: boolean;
};
declare type Position = (targetRect?: PRect | null, popoverRect?: PRect | null, ...unstable_observableNodes: PossibleNode[]) => React.CSSProperties;
declare type PossibleNode = null | undefined | HTMLElement | SVGElement;
export default Popover;
export type { PopoverProps, Position };
export { getCollisions, Popover, positionDefault, positionMatchWidth, positionRight, };