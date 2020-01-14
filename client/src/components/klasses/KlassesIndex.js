import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addKlass, removeKlass, editKlass } from '../../actions/klassActions'
import { NavLink } from 'react-router-dom';
import NewKlassForm from './NewKlassForm'
import DisplayColors from '../helpers/DisplayColors'

class KlassesIndex extends Component {

  state = {
    klassForm: false,
    editForm: false,
    klId: '',
    pauseTransition: false,
    deleteId: '',
    deleteConfirm: false
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
    const { editForm, klId, klassForm } = this.state
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
              <div key={index} className={`klass-row ${this.state.deleteConfirm && this.state.deleteId === klass.id ? 'slide-close' : ''}`}>
                <div>
                  <NavLink to={`/classes/${klass.id}`}>Class {klass.name}</NavLink>
                </div>
                <div className={`post-it-icon`}><p>{klass.count}</p></div>
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
        <div className={`add-klass-form ${klassForm ? 'slide-open' : 'slide-close'} ${this.state.pauseTransition ? 'pause-transition' : ''}`}>
          <NewKlassForm handleSubmitAddKlass={this.handleSubmitAddKlass}/>
        </div>

      </div>
    )
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
      klId: '',
      pauseTransition: true
    })

    window.setTimeout(() => {
      this.setState({
        ...this.state,
        pauseTransition: false
      })
    }, 500)

  }

  handleDeleteKlassClick = (klassId) => {
    const deleteKlass = window.confirm("Are you sure you want to delete this class?");
    if (deleteKlass) {
      this.setState({
        ...this.state,
        deleteConfirm: true,
        deleteId: klassId
      })

      window.setTimeout(() => {
        this.setState({
          ...this.state,
          deleteConfirm: false,
          deleteId: ''
        })
        this.props.removeKlass(klassId)
      }, 800)

    }
  }

  render(){
    return (
      <div className="home-page-wrapper">
        <div className="klass-index-container">
          <div className="klass-index-title">
            <div>{`${this.props.currentUser.name}'s Classes`}</div>
            <DisplayColors header={true}/>
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
  return {
    klasses: state.klasses,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KlassesIndex)
