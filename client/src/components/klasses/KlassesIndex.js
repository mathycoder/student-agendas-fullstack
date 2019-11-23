import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addKlass } from '../../actions/klassActions'

class KlassesIndex extends Component {

  renderKlasses = () => {
    const { klasses } = this.props
    return (
      <div className="klass-rows">
        {klasses.allIds.map((klassId, index) => {
          const klass = klasses.byId[klassId]
          return (
            <div key={index} className="klass-row">
              <div>Class {klass.name}</div>
              <div><button>Edit</button></div>
              <div><button>Delete</button></div>
            </div>

          )
        })}
      </div>
    )
  }

  render(){
    return (
      <div className="klass-index-page">
        {this.renderKlasses()}
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
