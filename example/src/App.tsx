import React, { useRef, useState } from 'react';
//
import { ClickingOutSide } from 'react-click-outside-ts';
import 'react-click-outside-ts/dist/index.css';

//
const App = () => {
    //
    const [is_show, setIsShow] = useState(true);

    //
    const ref_child = useRef<HTMLDivElement>(null);
    const ref_btn = useRef<HTMLButtonElement>(null);

    // -----

    //
    function handleClickOutSide() {
        console.log(1);

        is_show && setIsShow(false);
    }

    //
    function toggleShow() {
        setIsShow((is_show) => !is_show);
    }

    console.log(is_show);

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

            {is_show ? (
                <ClickingOutSide
                    ref_child={ref_child}
                    refs_target={[ref_btn]}
                    handleClickOutSide={handleClickOutSide}
                >
                    <div
                        ref={ref_child}
                        style={{
                            width: '50%',
                            height: '50%',
                            backgroundColor: 'green'
                        }}
                    ></div>
                </ClickingOutSide>
            ) : null}
        </div>
    );
};

export default App;
