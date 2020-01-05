import React from 'react';
import { inject, observer } from 'mobx-react';

@inject(stores => ({
  app: stores.app
}))
@observer
class Home extends React.Component {

  render() {
    return (
      <div>
        Home
      </div>
    )
  }
}

export default Home;