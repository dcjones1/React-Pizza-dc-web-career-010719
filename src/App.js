import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  state = {
    pizzas: [],
    editPizza: {}
  }

  componentDidMount() {
    this.fetchPizzas()
  }

  fetchPizzas = () => {
    let pizzas = []
    fetch('http://localhost:3000/pizzas')
    .then(res => res.json())
    .then(list => {
      list.forEach((pizza) => {
        pizzas.push(pizza)
      })
      this.setState({pizzas})
    })
  }

  postPizza = (pizza, id) => {
    let curPizzas = [...this.state.pizzas]
    let index = (id - 1)
    console.log(pizza.vegetarian)
    let data = {
      topping: pizza.topping,
      size: pizza.size,
      vegetarian: pizza.vegetarian
    }
    console.log(data)
    fetch(`http://localhost:3000/pizzas/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
    .then(res => res.json())
    .then(editedPiz => {
      curPizzas[index] = editedPiz
      this.setState({
        pizzas: curPizzas,
        editPizza: {}
      })
    })
  }

  handleEditClick = (pizza) => {
    this.setState({
      editPizza: pizza
    })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm editPizza={this.state.editPizza} postPizza={this.postPizza} />
        <PizzaList pizzas={this.state.pizzas} handleEditClick={this.handleEditClick} />
      </Fragment>
    );
  }
}

export default App;
