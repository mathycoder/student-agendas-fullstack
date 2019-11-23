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

  render() {
    return (
      <div>
        <form onSubmit={e => this.props.handleSubmitAddKlass(e, this.state)}>
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
