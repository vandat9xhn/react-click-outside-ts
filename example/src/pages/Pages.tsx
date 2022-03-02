import * as React from 'react';

//
export interface PagesProps {}

//
function Pages({}: PagesProps) {
    //
    const [page, setPage] = React.useState('page_1');

    //
    if (page == 'page_1') {
        return (
            <div
                style={{
                    width: '250px',
                    height: '250px',
                    backgroundColor: 'red'
                }}
            >
                <div
                    onClick={() => {
                        setPage('page_2');
                    }}
                >
                    xyz
                </div>
            </div>
        );
    }

    if (page == 'page_2') {
        return (
            <div
                style={{
                    width: '150px',
                    height: '450px',
                    backgroundColor: 'green'
                }}
            >
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div
                    onClick={() => {
                        setPage('page_1');
                    }}
                >
                    abc
                </div>
            </div>
        );
    }

    //
    return <div></div>;
}

export default Pages;
