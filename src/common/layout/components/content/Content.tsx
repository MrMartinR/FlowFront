import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'

//  TODO: added type any on Content children
export function Content({ children }: any) {
  // TODO: added type any on match
  const match: any = useRouteMatch() || {}
  const animationEndClass = 'grid-animateContent-finished'
  const [cssClassesState, setCssClassesState] = useState([
    'grid-animateContent',
    animationEndClass,
  ])

  useEffect(() => {
    // for animation start should toggle 'grid-animateContent-finished' css class
    // TODO: change useMemo
    const fullClasses = [...cssClassesState]
    const startAnimation = fullClasses.filter((el) => el !== animationEndClass)
    setCssClassesState(startAnimation)
    const timeOutId = setTimeout(() => {
      setCssClassesState(fullClasses)
    }, 200)

    return () => {
      clearTimeout(timeOutId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.url])

  return <>{children}</>
}

export default Content
