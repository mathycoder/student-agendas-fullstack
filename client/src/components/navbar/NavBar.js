import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import './navbar.css'

class NavBar extends Component{
  constructor(props){
    super(props)
    this.myRef = React.createRef()
    this.klassDropdownRef = React.createRef()
  }

  state = {
    klassDropdown: false
  }

  componentDidMount(){
    document.addEventListener('mousedown', this.handleClick)
  }

  componentWillUnmount(){
    document.removeEventListener('mousedown', this.handleClick)
  }

  handleClick = (e) => {
    if (this.state.klassDropdown){
      if (this.myRef.current.contains(e.target) || this.klassDropdownRef.current.contains(e.target)) { return }
      this.setState({
        ...this.state,
        klassDropdown: !this.state.klassDropdown
      })
    }
  }

  handleKlassDropdownClick = () => {
    this.setState({
      ...this.state,
      klassDropdown: !this.state.klassDropdown
    })
  }

  renderKlassDropdown = () => {
    const { klasses } = this.props
    return (
      <div className="klass-dropdown-menu" ref={this.myRef}>
        {klasses.allIds.map(klassId => {
          const klass = klasses.byId[klassId]
          return (
            <NavLink
              to={`/classes/${klass.id}`}
              onClick={this.handleKlassDropdownClick}
              >
              Class {klass.name}
            </NavLink>
            )
        })}
      </div>
    )
  }

  render(){
    return (
      <div>
        <div className="navbar">
          <NavLink to="/">Home</NavLink>
          <div className="klass-dropdown" ref={this.klassDropdownRef} onClick={this.handleKlassDropdownClick}>
            Classes
          </div>
          <NavLink to="/progressions/new">New Progression</NavLink>
          <NavLink to="/progressions">All Progressions</NavLink>
        </div>
        <div className="navbar-dropdowns">
          {this.state.klassDropdown ? this.renderKlassDropdown() : ''}
        </div>
      </div>
    )
  }

}

export default NavBar
