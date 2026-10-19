/** Public URL of a file in public/images/. Uses Vite's base path, so it also works under /secure_visa_v2/ on GitHub Pages. */
export const imageUrl = (name: string) => `${import.meta.env.BASE_URL}images/${name}`
