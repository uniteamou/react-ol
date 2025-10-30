import React, {
  createContext,
  forwardRef,
  type Ref,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Overlay } from 'ol'

import { useOlMap } from './ol-map'

type OverlayOptions = ConstructorParameters<typeof Overlay>[0]

type OlOverlayProps = OverlayOptions &
  React.PropsWithChildren<{
    className?: Required<React.HTMLAttributes<HTMLDivElement>['className']>
    wrapperDivElementProps?: React.HTMLAttributes<HTMLDivElement>
  }>

export const OlOverlay = forwardRef<Overlay | null, OlOverlayProps>(
  OlOverlayComponent
)

const OlOverlayComponentContext = createContext<Overlay | null>(null)

function OlOverlayComponent(
  {
    children,
    className,
    wrapperDivElementProps,
    ...initialOptions
  }: OlOverlayProps,
  forwardedRef: Ref<Overlay | null>
) {
  const map = useOlMap()
  const [overlay] = useState(() => new Overlay(initialOptions))
  const overlayDivRef = useRef<HTMLDivElement | null>(null)

  useImperativeHandle(forwardedRef, () => overlay, [overlay])

  useEffect(() => {
    map.addOverlay(overlay)
    return () => {
      map.removeOverlay(overlay)
    }
  }, [map, overlay])

  useEffect(() => {
    if (overlay && initialOptions.position) {
      overlay.setPosition(initialOptions.position)
    }
  }, [overlay, initialOptions.position])

  useEffect(() => {
    if (overlay && overlayDivRef.current) {
      overlay.setElement(overlayDivRef.current)
    }
  }, [overlay, overlayDivRef.current])

  return (
    <OlOverlayComponentContext.Provider value={overlay}>
      <div
        ref={overlayDivRef}
        className={className}
        {...wrapperDivElementProps}
      >
        {children}
      </div>
    </OlOverlayComponentContext.Provider>
  )
}

export function useOlOverlayComponent() {
  const context = useContext(OlOverlayComponentContext)
  if (context === null) {
    throw new Error(
      'No context provided: useOlOverlayComponent() can only be used in a descendant of <OlOverlayComponent>'
    )
  }
  return context
}
