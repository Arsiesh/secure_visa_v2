/** The bar is a separate chunk. Starting to load it on hover or focus of a play button hides most of the delay. */
export const loadPlayerBar = () => import('./PlayerBar')

/** Fire-and-forget warm-up for hover and focus. A failure is ignored here; the real load in PlayerProvider has a fallback. */
export const preloadPlayerBar = () => {
  loadPlayerBar().catch(() => {})
}
