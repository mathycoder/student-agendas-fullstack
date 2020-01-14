import React, { Component } from 'react'

class NewKlassForm extends Component {
  state = {
    klass: {
      id: undefined,
      name: ""
    }
  }

  componentDidMount(){
    const { klass } = this.props
    if (klass){
      this.setState({
        klass: {
          id: klass.id,
          name: klass.name
        }
      })
    }
  }

  handleNameChange = event => {
    this.setState({
      ...this.state,
      klass: {
        ...this.state.klass,
        name: event.target.value
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleSubmitAddKlass(e, this.state)
    window.setTimeout(() => (
      this.setState({
        klass: {
          id: undefined,
          name: ""
        }
      })
    ), 100)

  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          Class <input
            type="text"
            value={this.state.klass.name}
            onChange={this.handleNameChange}
            placeholder="Enter Name"/>
          <input type="submit" value={this.state.klass.id ? 'Edit Class' : 'Add Class'} />
        </form>
      </div>
    )
  }

}

export default NewKlassForm
