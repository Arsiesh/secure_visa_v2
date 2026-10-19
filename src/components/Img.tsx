import type { CSSProperties, ImgHTMLAttributes } from 'react'
import { imageMeta } from '../content/imageMeta'
import { imageUrl } from '../lib/imageUrl'

type ImgProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'width' | 'height'> & {
  /** Filename inside /images/, for example "about-image.webp". */
  name: string
  /** Use alt="" for decorative images. */
  alt: string
  className?: string
  /** Above-the-fold image: skips lazy loading and asks for high fetch priority. */
  priority?: boolean
  sizes?: string
  style?: CSSProperties
}

/** Thin <img> wrapper that always sets intrinsic width/height from imageMeta, so layout never shifts. */
export function Img({ name, alt, className, priority = false, sizes, style, ...rest }: ImgProps) {
  const meta = imageMeta[name]
  if (!meta && import.meta.env.DEV) {
    console.warn(`Img: "${name}" is not in imageMeta. Add the file to public/images and regenerate imageMeta.`)
  }

  return (
    <img
      {...rest}
      src={imageUrl(name)}
      alt={alt}
      width={meta?.w}
      height={meta?.h}
      className={className}
      sizes={sizes}
      style={style}
      loading={priority ? undefined : 'lazy'}
      decoding={priority ? undefined : 'async'}
      fetchPriority={priority ? 'high' : undefined}
    />
  )
}
