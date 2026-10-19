const trim = (path: string) => (path.length > 1 ? path.replace(/\/+$/, '') : path)

/** True when `pathname` is `href`, ignoring trailing slashes. */
export function isCurrentPath(pathname: string, href: string): boolean {
  return trim(pathname) === trim(href)
}
