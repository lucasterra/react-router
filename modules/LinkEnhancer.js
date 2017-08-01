import React, { Component, PureComponent } from 'react'
import { bool, object, string, func, oneOfType } from 'prop-types'
import invariant from 'invariant'
import { routerShape } from './PropTypes'
import { ContextSubscriberEnhancer } from './ContextUtils'

function isLeftClickEvent(event) {
  return event.button === 0
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
}

function resolveToLocation(to, router) {
  return typeof to === 'function' ? to(router.location) : to
}

function isRouteActive(router, to, onlyActiveOnIndex) {
  let href = null
  let isActive = false
  if (router && to) {
    const toLocation = resolveToLocation(to, router)
    href = router.createHref(toLocation)
    isActive = router.isActive(toLocation, onlyActiveOnIndex)
  }

  return { isActive, href }
}

function LinkEnhancer(WrappedComponent) {
  class EnhancedLink extends Component {
    static contextTypes = {
      router: routerShape
    }

    static displayName = `EnhancedLink(${WrappedComponent.displayName})`

    static propTypes = {
      to: oneOfType([ string, object, func ]),
      onlyActiveOnIndex: bool.isRequired,
      onClick: func,
      onNavigate: func,
      target: string
    }

    static defaultProps = {
      onlyActiveOnIndex: false
    }

    constructor(props, context) {
      super(props, context)

      const { router } = context
      const { to, onlyActiveOnIndex } = props
      this.state = isRouteActive(router, to, onlyActiveOnIndex)

      // No autobind in classes
      this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
      const { onNavigate } = this.props
      if (this.state.isActive && onNavigate) {
        onNavigate()
      }
    }

    componentWillReceiveProps(nextProps, nextContext) {
      const { router } = nextContext
      const { to, onlyActiveOnIndex } = nextProps

      this.setState(isRouteActive(router, to, onlyActiveOnIndex))
    }

    handleClick(event) {
      const { onClick, onNavigate, to, target } = this.props

      if (onClick)
        onClick(event)

      if (event.defaultPrevented)
        return

      const { router } = this.context
      invariant(
        router,
        '<Link>s rendered outside of a router context cannot navigate.'
      )

      if (isModifiedEvent(event) || !isLeftClickEvent(event))
        return

      // If target prop is set (e.g. to "_blank"), let browser handle link.
      /* istanbul ignore if: untestable with Karma */
      if (target)
        return

      event.preventDefault()

      if (onNavigate)
        onNavigate(event)

      router.push(resolveToLocation(to, router))
    }

    render() {
      /*eslint no-unused-vars: ["error", { "ignoreRestSiblings": true }]*/
      const { to, onlyActiveOnIndex, withRef, onClick, onNavigate, ...props } = this.props
      const { isActive, href } = this.state
      props.active = isActive

      if (!href) {
        return <WrappedComponent {...props}/>
      }
      
      props.href = href

      if (withRef) {
        props.ref = (c) => withRef(c)
      }

      return <WrappedComponent onClick={this.handleClick} {...props}/>
    }
  }

  return ContextSubscriberEnhancer(EnhancedLink, 'router', { withRef: false })
}

export default LinkEnhancer
