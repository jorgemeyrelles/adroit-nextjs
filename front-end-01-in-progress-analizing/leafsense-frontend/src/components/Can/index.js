export function Can({ children, isRenderable }) {
  if (!isRenderable) {
    return null
  }

  return <>{children}</>
}
