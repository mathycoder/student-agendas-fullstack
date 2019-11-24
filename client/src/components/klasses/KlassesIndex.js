import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addKlass, removeKlass, editKlass } from '../../actions/klassActions'
import { NavLink } from 'react-router-dom';
import NewKlassForm from './NewKlassForm'

class KlassesIndex extends Component {

  state = {
    klassForm: false,
    editForm: false,
    klId: ''
  }

  handleEditKlassClick = (id) => {
    this.setState({
      ...this.state,
      editForm: true,
      klId: `klass${id}`
    })
  }

  renderKlasses = () => {
    const { klasses } = this.props
    const { editForm, klId } = this.state
    return (
      <div className="klass-rows">
        {klasses.allIds.map((klassId, index) => {
          const klass = klasses.byId[klassId]
          if (editForm && klId === klassId){
            return (
              <NewKlassForm klass={klass} handleSubmitAddKlass={this.handleSubmitAddKlass}/>
            )
          } else {
            return (
              <div key={index} className="klass-row">
                <div>
                  <NavLink to={`/classes/${klass.id}`}>Class {klass.name}</NavLink>
                </div>
                <div>
                  <button onClick={e => this.handleEditKlassClick(klass.id)}>Edit</button>
                </div>
                <div>
                  <button onClick={e => this.handleDeleteKlassClick(klass.id)}>Delete</button>
                </div>
              </div>
            )
          }

        })}
        {this.state.klassForm ? <NewKlassForm handleSubmitAddKlass={this.handleSubmitAddKlass}/> : ''}
      </div>
    )
  }

  displayColors = () => {
    return ["red", "orange", "green", "blue", "purple"].map((color, index) => {
      return (
        <div
          key={index}
          className={`select-color ${color}-title`}>
        </div>
      )
    })
  }

  handleAddKlassClick = () => {
    this.setState({
      ...this.state,
      klassForm: !this.state.klassForm
    })
  }

  handleSubmitAddKlass = (event, klass) => {
    event.preventDefault()
    if (!klass.klass.id){
      this.props.addKlass(klass)
    } else {
      this.props.editKlass(klass)
    }
    this.setState({
      ...this.state,
      klassForm: false,
      editForm: false,
      klId: ''
    })
  }

  handleDeleteKlassClick = (klassId) => {
    this.props.removeKlass(klassId)
  }

  render(){
    return (
      <div className="home-page-wrapper">
        <div className="klass-index-container">
          <div className="klass-index-title">
            <div>Student Agendas</div>
            <div>{this.displayColors()}</div>
          </div>
          <div className="klass-index-klasses">
            {this.renderKlasses()}
          </div>
          <div className="klass-index-new-klass-button">
            <button onClick={this.handleAddKlassClick}>
                {this.state.klassForm ? 'Cancel' : 'Add Class'}
            </button>
          </div>
        </div>
      </div>
    )
  }
}


function mapDispatchToProps(dispatch){
  return {
    addKlass: (klass) => dispatch(addKlass(klass)),
    editKlass: (klass) => dispatch(editKlass(klass)),
    removeKlass: (klass) => dispatch(removeKlass(klass))
  }
}

function mapStateToProps(state){
  return {klasses: state.klasses}
}

export default connect(mapStateToProps, mapDispatchToProps)(KlassesIndex)
