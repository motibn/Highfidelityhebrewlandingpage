import sharp from 'sharp'
import { join } from 'node:path'

const W = 1200
const H = 630
const PUB = 'public'

const family = join(
  PUB,
  'young-family-with-two-small-children-walking-on-me-2026-03-10-02-01-47-utc.jpg'
)
const logoSrc = join(PUB, 'og-logo-source.png')
const out = join(PUB, 'og-image.png')

const bg = await sharp(family)
  .resize(W, H, { fit: 'cover', position: 'attention' })
  .toBuffer()

const gradient = Buffer.from(
  `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
     <defs>
       <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
         <stop offset="0%" stop-color="black" stop-opacity="0"/>
         <stop offset="55%" stop-color="black" stop-opacity="0.35"/>
         <stop offset="100%" stop-color="black" stop-opacity="0.7"/>
       </linearGradient>
     </defs>
     <rect width="100%" height="100%" fill="url(#g)"/>
   </svg>`
)

const logoW = 720
const logo = await sharp(logoSrc).resize({ width: logoW }).toBuffer()
const logoMeta = await sharp(logo).metadata()
const top = Math.round((H - logoMeta.height) / 2 + 30)
const left = Math.round((W - logoW) / 2)

await sharp(bg)
  .composite([
    { input: gradient, top: 0, left: 0 },
    { input: logo, top, left },
  ])
  .png({ quality: 92, compressionLevel: 9 })
  .toFile(out)

console.log(`Wrote ${out} (${W}x${H}) with logo at (${left}, ${top}) ${logoW}x${logoMeta.height}`)
