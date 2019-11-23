import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import './navbar.css'

class NavBar extends Component{
  constructor(props){
    super(props)
    this.myRefKlassButton = React.createRef()
    this.myRefProgressionButton = React.createRef()
    this.klassDropdownRef = React.createRef()
    this.progressionDropdownRef = React.createRef()
  }

  state = {
    klassDropdown: false,
    progressionDropdown: false
  }

  componentDidMount(){
    document.addEventListener('mousedown', this.handleClick)
  }

  componentWillUnmount(){
    document.removeEventListener('mousedown', this.handleClick)
  }

  handleClick = (e) => {
    if (this.state.klassDropdown){
      if (this.myRefKlassButton.current.contains(e.target) || this.klassDropdownRef.current.contains(e.target)) { return }
      this.handleKlassDropdownClick()
    }
    if (this.state.progressionDropdown){
      if (this.myRefProgressionButton.current.contains(e.target) || this.progressionDropdownRef.current.contains(e.target)) { return }
      this.handleProgressionDropdownClick()
    }
  }

  handleKlassDropdownClick = () => {
    this.setState({
      ...this.state,
      klassDropdown: !this.state.klassDropdown
    })
  }

  handleProgressionDropdownClick = () => {
    this.setState({
      ...this.state,
      progressionDropdown: !this.state.progressionDropdown
    })
  }

  renderKlassDropdown = () => {
    const { klasses } = this.props
    const { klassDropdown } = this.state
    return (
      <div className={`dropdown-menu klass-dropdown ${klassDropdown ? 'opened': 'closed'}`} ref={this.myRefKlassButton}>
        {klasses.allIds.map((klassId, index) => {
          const klass = klasses.byId[klassId]
          return (
            <NavLink
              to={`/classes/${klass.id}`}
              onClick={this.handleKlassDropdownClick}
              key={index}
              >
              Class {klass.name}
            </NavLink>
            )
        })}
        <NavLink
          to={`/classes/new`}
          onClick={this.handleKlassDropdownClick}
          >
          Create New
        </NavLink>
      </div>
    )
  }

  renderProgressionDropdown = () => {
    const { progressionDropdown } = this.state
    return (
      <div className={`dropdown-menu progression-dropdown ${progressionDropdown ? 'opened' : 'closed'}`} ref={this.myRefProgressionButton}>
        <NavLink
          to={`/progressions/new`}
          onClick={this.handleProgressionDropdownClick}
          >
          Create New
        </NavLink>
        <NavLink
          to={`/progressions`}
          onClick={this.handleProgressionDropdownClick}
          >
          All Progressions
        </NavLink>
      </div>
    )
  }

  render(){
    return (
      <div>
        <div className="navbar">
          <NavLink to="/classes">Home</NavLink>
          <div className="klass-dropdown" ref={this.klassDropdownRef} onClick={this.handleKlassDropdownClick}>
            Classes
          </div>
          <div className="klass-dropdown" ref={this.progressionDropdownRef} onClick={this.handleProgressionDropdownClick}>
            Progressions
          </div>
        </div>
        <div className="navbar-dropdowns">
          {this.renderKlassDropdown()}
          {this.renderProgressionDropdown()}
        </div>
      </div>
    )
  }

}

export default NavBar
