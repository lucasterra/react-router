import React, { PureComponent } from 'react'
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

function LinkEnhancer(WrappedComponent, options = {}) {
  class EnhancedLink extends PureComponent {
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

    constructor(props) {
      super(props)

      // No autobind in classes
      this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
      const { onClick, onNavigate, to, target } = this.props

      if (onClick)
        onClick(event)

      if (this.options.onClick)
        this.options.onClick(event)

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

      if (this.options.onNavigate)
        this.options.onNavigate(event)

      router.push(resolveToLocation(to, router))
    }

    render() {
      /*eslint no-unused-vars: ["error", { "ignoreRestSiblings": true }]*/
      const { to, onlyActiveOnIndex, withRef, onClick, onNavigate, ...props } = this.props

      // Ignore if rendered outside the context of router to simplify unit testing.
      const { router } = this.context
      props.active = false

      if (router) {
        // If user does not specify a `to` prop, return an empty anchor tag.
        if (!to) {
          return <WrappedComponent {...props}/>
        }

        const toLocation = resolveToLocation(to, router)
        props.href = router.createHref(toLocation)

        if (withRef) {
          props.ref = (c) => withRef(c)
        }

        props.active = router.isActive(toLocation, onlyActiveOnIndex)
      }

      return <WrappedComponent onClick={this.handleClick} {...props}/>
    }
  }

  return ContextSubscriberEnhancer(EnhancedLink, 'router', { withRef: true })
}

export default LinkEnhancer
