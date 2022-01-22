import React from "react";
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";

function Menu(props) {
  let links = props.links;

  return (
    links.length > 0 &&
    <nav className="menu">
      {
        links.map(link => (
          <NavLink
            className={({ isActive }) => isActive ? "menu__item menu__item-active" : "menu__item"}
            to={link.url}
            key={link.url}
          >
            {link.title}
          </NavLink>
        ))
      }
    </nav>
  )
}

Menu.propTypes = {
  links: PropTypes.arrayOf(
      PropTypes.shape({
          url: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          page: PropTypes.func
      })
  )
}

export default Menu;