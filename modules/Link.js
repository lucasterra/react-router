import React, { PureComponent } from 'react'
import { bool, object, string } from 'prop-types'
import LinkEnhancer from './LinkEnhancer'

/**
 * A <Link> is used to create an <a> element that links to a route.
 * When that route is active, the link gets the value of its
 * activeClassName prop.
 *
 * For example, assuming you have the following route:
 *
 *   <Route path="/posts/:postID" component={Post} />
 *
 * You could use the following component to link to that route:
 *
 *   <Link to={`/posts/${post.id}`} />
 */
class Link extends PureComponent {
  render() {
    const { active, activeStyle, activeClassName, ...props } = this.props

    if (active) {
      if (activeClassName) {
        if (props.className) {
          props.className += ` ${activeClassName}`
        } else {
          props.className = activeClassName
        }
      }

      if (activeStyle) {
        props.style = { ... props.style, ...activeStyle }
      }
    }

    return <a {...props}/>
  }
}

Link.propTypes = {
  active: bool.isRequired, // passed by enhancer
  className: string,
  style: object,
  activeStyle: object,
  activeClassName: string
}

Link.defaultProps = {
  style: {}
}

Link.displayName = 'Link'

export default LinkEnhancer(Link)
