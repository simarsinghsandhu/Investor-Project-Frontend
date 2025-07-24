import { Adb } from "@mui/icons-material"
import { renderToStaticMarkup } from "react-dom/server"

export const setFaviconFromAdbIcon = () => {
  const icon = renderToStaticMarkup(
    <svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' fill='#fff'>
      <Adb />
    </svg>
  )

  const blob = new Blob([icon], { type: "image/svg+xml" })
  const url = URL.createObjectURL(blob)

  const link =
    document.querySelector("link[rel~='icon']") ||
    document.createElement("link")
  link.rel = "icon"
  link.href = url
  document.head.appendChild(link)
}
