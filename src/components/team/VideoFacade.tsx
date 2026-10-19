import { useEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'
import { teamVideo } from '../../content/team'
import { Img } from '../Img'

const VIDEO_ID = 'XHOmBV4js_E'

/** Nothing is requested from YouTube until the visitor presses play. */
export function VideoFacade() {
  const [playing, setPlaying] = useState(false)
  const frameRef = useRef<HTMLIFrameElement>(null)
  const started = useRef(false)

  // The play button unmounts on press; hand focus to the player.
  useEffect(() => {
    if (playing && started.current) frameRef.current?.focus()
  }, [playing])
  return (
    <div className="relative aspect-video overflow-hidden rounded-photo bg-kauri-2">
      {playing ? (
        <iframe
          ref={frameRef}
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
          title={teamVideo.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            started.current = true
            setPlaying(true)
          }}
          aria-label={`Play video: ${teamVideo.title}`}
          className="group absolute inset-0 block size-full"
        >
          <Img name={teamVideo.thumbnail} alt="" className="size-full object-cover" sizes="(min-width: 1024px) 720px, 100vw" />
          <span className="absolute inset-0 bg-kauri/25 transition-colors group-hover:bg-kauri/10" />
          <span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-signal text-kauri transition-transform group-hover:scale-105 sm:size-24">
            <Play aria-hidden="true" className="ml-1 size-9 fill-current" />
          </span>
        </button>
      )}
    </div>
  )
}
