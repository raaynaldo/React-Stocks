import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

const url = "http://localhost:3000/stocks";

class MainContainer extends Component {
  constructor() {
    super();

    this.state = {
      filter: "All",
      sort: "",
      stocks: [],
      portfolios: [],
    };
  }

  componentDidMount() {
    fetch(url)
      .then((res) => res.json())
      .then((stocks) => this.setState({ stocks: stocks }))
      .catch((err) => console.log(err));
  }

  sortFilterHandler = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  buyStockHandler = (id) => {

    if (!this.state.portfolios.some((portfolio) => portfolio.id === id)) {
      const porto = this.state.stocks.find((stock) => stock.id === id);
      this.setState({
        portfolios: [...this.state.portfolios, porto],
      });
    }
  };

  sellStockHandler = (id) => {
    this.setState({
      portfolios: [
        ...this.state.portfolios.filter(
          (portofolio) => portofolio.id !== id
        ),
      ],
    });
  };

  renderStocks = () => {
    const { sort, filter } = this.state;
    let renderStocks = [...this.state.stocks];

    //filter
    if (filter != "All") {
      renderStocks = renderStocks.filter((stock) => stock.type === filter);
    }

    //sort
    switch (sort) {
      case "Alphabetically":
        renderStocks = renderStocks.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        );
        break;
      case "Price":
        renderStocks.sort((a, b) => (a.price > b.price ? 1 : -1));
        break;
    }

    return renderStocks;
  };

  render() {
    return (
      <div>
        <SearchBar sortFilterHandler={this.sortFilterHandler} />

        <div className="row">
          <div className="col-8">
            <StockContainer
              stocks={this.renderStocks()}
              buyStockHandler={this.buyStockHandler}
            />
          </div>
          <div className="col-4">
            <PortfolioContainer
              portfolios={this.state.portfolios}
              sellStockHandler={this.sellStockHandler}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
