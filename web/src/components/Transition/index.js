
import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';



export default class Slide extends React.Component {

    static props = {
        duration: PropTypes.number.isRequired,
        started: PropTypes.bool.isRequired,
        from: PropTypes.number.isRequired,
        to: PropTypes.number.isRequired,
        property: PropTypes.string.isRequired,
        className: PropTypes.string.isRequired
    };

    static defaultProps = {
        duration: 300,
        started: false,
        from: 0,
        to: 0,
        property: '',
        className: ''
    };

    constructor(props) {
        super(props);

        const { from, to, property, duration } = props;

        this.defaultStyle = {
            transition: `${property} ${duration}ms ease-in-out`,
        };
        this.defaultStyle[property] = from;


        this.transitionStyle = { entering: {}, entered: {}, exiting: {}, exited: {} };
        this.transitionStyle.entering[property] = to;
        this.transitionStyle.entered[property] = to;
        this.transitionStyle.exiting[property] = from;
        this.transitionStyle.exited[property] = from;
    }

    render() {

        const { started, duration, className } = this.props;
        return (
            <Transition in={started} timeout={duration}>
                {
                    state => (
                        <div className={className} style={{...this.defaultStyle, ...this.transitionStyle[state]}}>
                            {this.props.children}
                        </div>
                    )
                }
            </Transition>
        )
    }
}