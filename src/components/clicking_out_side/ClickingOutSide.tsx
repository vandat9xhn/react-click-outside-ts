import { Component } from 'react';

//
interface ClickingOutSideProps {
    refs_target?: { current: null | Element }[];
    ref_child: { current: null | Element };
    handleClickOutSide: () => void;
}

//
class ClickingOutSide extends Component<ClickingOutSideProps> {
    //
    componentDidMount() {
        window.addEventListener('click', this.handleClick);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleClick);
    }

    //
    handleClick = (event: MouseEvent) => {
        if (!this.props.ref_child.current) {
            return;
        }

        if (this.props.ref_child.current.contains(event.target as Node)) {
            return;
        }

        if (this.props.refs_target) {
            for (const ref_target of this.props.refs_target) {
                if (ref_target.current?.contains(event.target as Node)) {
                    return;
                }
            }
        }

        this.props.handleClickOutSide();
    };

    //
    render() {
        return this.props.children;
    }
}

export default ClickingOutSide;
