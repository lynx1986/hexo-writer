import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

export default class Float extends React.Component {

    static props = {
        autoHide: PropTypes.bool.isRequired,
        zIndex: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
        right: PropTypes.number.isRequired,
        top: PropTypes.number.isRequired,
        bottom: PropTypes.number.isRequired,
        showThreshold: PropTypes.number.isRequired
    };

    static defaultProps = {
        autoHide: false,
        zIndex: 999,
        left: -1,
        right: 10,
        top: 200,
        bottom: -1,
        showThreshold: 10
    };

    render() {

        const { autoHide, zIndex, left, right, top, bottom, showThreshold } = this.props;

        const style = {
            zIndex: zIndex,
            left: left >= 0 ? left : null,
            right: right >= 0 ? right : null,
            top: top >= 0 ? top : null,
            bottom: bottom >= 0 ? bottom : null,
        };

        return (
            <div className={styles.wrapper} style={style}>
                {this.props.children}
            </div>
        )
    }
}