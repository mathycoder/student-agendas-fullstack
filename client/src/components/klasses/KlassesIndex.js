import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addKlass } from '../../actions/klassActions'
import { NavLink } from 'react-router-dom';

class KlassesIndex extends Component {

  renderKlasses = () => {
    const { klasses } = this.props
    return (
      <div className="klass-rows">
        {klasses.allIds.map((klassId, index) => {
          const klass = klasses.byId[klassId]
          return (
            <div key={index} className="klass-row">
              <div>
                <NavLink to={`/classes/${klass.id}`}>
                  Class {klass.name}
                </NavLink>
              </div>
              <div><button>Edit</button></div>
              <div><button>Delete</button></div>
            </div>

          )
        })}
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

  render(){
    return (
      <div className="klass-index-container">
        <div className="klass-index-title">
          <div>Student Agendas</div>
          <div>{this.displayColors()}</div>
        </div>
        <div className="klass-index-klasses">
          {this.renderKlasses()}
        </div>
      </div>
    )
  }
}


function mapDispatchToProps(dispatch){
  return {
    addKlass: (klass) => dispatch(addKlass(klass))
  }
}

function mapStateToProps(state){
  return {klasses: state.klasses}
}

export default connect(mapStateToProps, mapDispatchToProps)(KlassesIndex)
