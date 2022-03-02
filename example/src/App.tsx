import React, { useRef, useState } from 'react';
//
import { ClickingOutSide, ClickingOutSideFull } from 'react-click-outside-ts';
import 'react-click-outside-ts/dist/index.css';
import Pages from './pages/Pages';

//
const App = () => {
    //
    const [is_show, setIsShow] = useState(false);
    const [is_show2, setIsShow2] = useState(false);

    //
    const ref_child = useRef<HTMLDivElement>(null);
    const ref_child2 = useRef<HTMLDivElement>(null);
    const ref_btn = useRef<HTMLButtonElement>(null);
    const ref_btn2 = useRef<HTMLButtonElement>(null);

    const ref_click_outside = useRef(true);

    // -----

    //
    function handleClickOutSide() {
        setIsShow(false);
    }

    //
    function handleClickOutSide2() {
        setIsShow2(false);
    }

    //
    function handleClick() {
        ref_click_outside.current = false;
    }

    //
    function toggleShow() {
        setIsShow((is_show) => {
            if (is_show) {
                ref_click_outside.current = false;
            }

            return !is_show;
        });
    }

    //
    function toggleShow2() {
        setIsShow2((is_show2) => !is_show2);
    }

    //
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh'
            }}
        >
            <button
                ref={ref_btn}
                type='button'
                style={{ marginRight: '50px', cursor: 'pointer' }}
                onClick={toggleShow}
            >
                Toggle show
            </button>

            <ClickingOutSide
                ref_click_outside={ref_click_outside}
                is_show={is_show}
                handleClickOutSide={handleClickOutSide}
            >
                <div
                    style={{
                        display: is_show ? 'block' : 'none'
                    }}
                    ref={ref_child}
                    onClick={handleClick}
                >
                    <Pages />
                </div>
            </ClickingOutSide>

            <button
                ref={ref_btn2}
                type='button'
                style={{
                    marginRight: '50px',
                    marginLeft: '50px',
                    cursor: 'pointer'
                }}
                onClick={toggleShow2}
            >
                Toggle show 2
            </button>

            {is_show2 && (
                <ClickingOutSideFull
                    ref_child={ref_child2}
                    refs_target={[ref_btn2]}
                    is_show={is_show2}
                    handleClickOutSide={handleClickOutSide2}
                >
                    <div ref={ref_child2}>
                        <Pages />
                    </div>
                </ClickingOutSideFull>
            )}
        </div>
    );
};

export default App;
