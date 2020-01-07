import React from 'react';
import { inject, observer } from 'mobx-react';
import dayjs from 'dayjs';
import { Button } from 'element-react';



@inject(stores => ({
    config: stores.config
}))
@observer
class Config extends React.Component {

    render() {

        return (
            <div>
                Config
            </div>
        )
    }
}

export default Config;