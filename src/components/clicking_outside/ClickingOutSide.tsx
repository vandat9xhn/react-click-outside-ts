import React, { useEffect, useRef } from 'react';

//
interface ClickingOutSideProps {
    ref_click_outside: { current: boolean };
    is_show: boolean;
    children: React.ReactElement;
    handleClickOutSide: () => void;
    beforeDetectOutside?: (event: MouseEvent) => void;
}

//
function ClickingOutSide({
    ref_click_outside,
    is_show,
    children,

    beforeDetectOutside = () => {},
    handleClickOutSide
}: ClickingOutSideProps) {
    //
    const ref_handle_click = useRef<((event: MouseEvent) => void) | null>(null);

    //
    useEffect(() => {
        if (!ref_handle_click.current) {
            ref_handle_click.current = handleClick;
        }

        if (is_show) {
            window.addEventListener('click', ref_handle_click.current);
        } else {
            window.removeEventListener('click', ref_handle_click.current);
        }

        return () => {
            ref_handle_click.current &&
                window.removeEventListener('click', ref_handle_click.current);
        };
    }, [is_show]);

    // ----

    //
    function handleClick(event: MouseEvent) {
        beforeDetectOutside(event);

        if (!ref_click_outside.current) {
            ref_click_outside.current = true;
            return;
        }

        handleClickOutSide();
    }

    //
    return children;
}

export default ClickingOutSide;
