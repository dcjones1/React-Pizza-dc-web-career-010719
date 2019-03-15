import React from "react"

class PizzaForm extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props)
    this.state = {
      topping: this.props.editPizza.topping,
      size: this.props.editPizza.size,
      vegetarian: this.props.editPizza.vegetarian
    }
  }

  componentDidUpdate(prevProps) {
    const nextProps = this.props
    if (prevProps !== nextProps) {
      this.setState({
        topping: nextProps.editPizza.topping,
        size: nextProps.editPizza.size,
        vegetarian: nextProps.editPizza.vegetarian
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleVegChange = () => {
    this.setState({vegetarian: !this.state.vegetarian})
  }

  handleSubmit = () => {
    this.props.postPizza(this.state, this.props.editPizza.id)
  }

  render() {
    return(
      <div className="form-row">
        <div className="col-5">
          <input type="text" name="topping" className="form-control" placeholder="Pizza Topping" onChange={this.handleChange} value={this.state.topping ? this.state.topping : ''}/>
        </div>
        <div className="col">
          <select value={this.state.size} name="size" className="form-control" onChange={this.handleChange}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Vegetarian" name="vegetarian" checked={this.state.vegetarian === true}
              onChange={this.handleVegChange} />
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" name="vegetarian" type="radio" value="Not Vegetarian" checked={this.state.vegetarian === false} onChange={this.handleVegChange} />
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    )
  }
}

export default PizzaForm
