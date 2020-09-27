import React, { Fragment } from 'react';

import './styles.scss';

const TheaterTab = ({ theater }) => {
    const formatTheaterName = (name) => {
        const indexOfHyphen = name.indexOf('-');
        const firstName = name.slice(0, indexOfHyphen);
        const lastName = name.slice(indexOfHyphen);
        return (
            <div>
                <span className="firstName">{firstName}</span>
                <span className="lastName">{lastName}</span>
            </div>
        )
    }

    return (
        <Fragment>
            {formatTheaterName(theater.tenCumRap)}
            <p>[Detail]</p>
        </Fragment>
    )
}

export default TheaterTab;