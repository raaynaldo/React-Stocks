import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
        {this.props.portfolios.map((portfolio) => (
          <Stock key={portfolio.id} stock={portfolio} clickHandler={this.props.sellStockHandler}/>
        ))}
      </div>
    );
  }

}

export default PortfolioContainer;
