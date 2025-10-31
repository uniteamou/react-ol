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

/**
 * OpenLayers Overlay component for displaying HTML elements anchored to map coordinates.
 * Useful for popups, tooltips, and custom markers.
 *
 * @param props - All OpenLayers OverlayOptions plus React-specific props
 * @param props.children - React elements to render inside the overlay
 * @param props.className - CSS class name for the overlay wrapper div
 * @param props.wrapperDivElementProps - Additional HTML attributes for the wrapper div
 * @param props.position - Map coordinates [x, y] where the overlay should be positioned (reactive)
 * @param ref - Forwarded ref to expose the Overlay instance
 *
 * @example
 * ```tsx
 * <OlMap>
 *   <OlOverlay position={[0, 0]} className="popup">
 *     <div>Popup content</div>
 *   </OlOverlay>
 * </OlMap>
 * ```
 */
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

/**
 * Hook to access the OpenLayers Overlay instance from the nearest parent OlOverlay component.
 * Must be used within a descendant of OlOverlay.
 *
 * @returns The OpenLayers Overlay instance
 * @throws {Error} If called outside of an OlOverlay component
 *
 * @example
 * ```tsx
 * function OverlayContent() {
 *   const overlay = useOlOverlayComponent()
 *   // Use overlay instance
 *   return <div>Content</div>
 * }
 * ```
 */
export function useOlOverlayComponent() {
  const context = useContext(OlOverlayComponentContext)
  if (context === null) {
    throw new Error(
      'No context provided: useOlOverlayComponent() can only be used in a descendant of <OlOverlayComponent>'
    )
  }
  return context
}
