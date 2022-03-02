import React, { useEffect, useRef } from 'react';

//
interface ClickingOutSideFullProps {
    ref_child: { current: Element | null };
    refs_target: { current: Element | null }[];
    is_show: boolean;
    children: React.ReactElement;
    handleClickOutSide: () => void;
}

//
function ClickingOutSideFull({
    ref_child,
    refs_target,
    is_show,
    children,
    handleClickOutSide
}: ClickingOutSideFullProps) {
    //
    const ref_handle_click = useRef<((event: MouseEvent) => void) | null>(null);
    const ref_handle_click_inside = useRef<
        ((event: MouseEvent) => void) | null
    >(null);
    const ref_click_outside = useRef(true);

    //
    useEffect(() => {
        handleAddFunc();

        if (is_show) {
            handleAddEvent();
        } else {
            handleRemoveEvent();
        }

        return () => {
            handleRemoveEvent();
        };
    }, [is_show]);

    // ----

    //
    function handleAddFunc() {
        if (!ref_handle_click.current) {
            ref_handle_click.current = handleClick;
        }

        if (!ref_handle_click_inside.current) {
            ref_handle_click_inside.current = handleClickInside;
        }
    }

    //
    function handleAddEvent() {
        ref_handle_click.current &&
            window.addEventListener('click', ref_handle_click.current);
        [ref_child, ...refs_target].forEach((item) => {
            ref_handle_click_inside.current &&
                item.current?.addEventListener(
                    'click',
                    ref_handle_click_inside.current
                );
        });
    }

    //
    function handleRemoveEvent() {
        ref_handle_click.current &&
            window.removeEventListener('click', ref_handle_click.current);
        [ref_child, ...refs_target].forEach((item) => {
            ref_handle_click_inside.current &&
                item.current?.removeEventListener(
                    'click',
                    ref_handle_click_inside.current
                );
        });
    }

    // ----

    //
    function handleClickInside() {
        ref_click_outside.current = false;
    }

    //
    function handleClick() {
        if (!ref_click_outside.current) {
            ref_click_outside.current = true;
            return;
        }

        handleClickOutSide();
    }

    //
    return children;
}

export default ClickingOutSideFull;
