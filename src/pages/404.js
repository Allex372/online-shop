import * as React from "react"
import { Link } from "gatsby"
import Seo from "../components/Seo/seo"

const pageStyles = {
    color: "#232129",
    padding: "96px",
    fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
    marginTop: 0,
    marginBottom: 64,
    maxWidth: 320,
}

const paragraphStyles = {
    marginBottom: 48,
}
const codeStyles = {
    color: "#8A6534",
    padding: 4,
    backgroundColor: "#FFF4DB",
    fontSize: "1.25rem",
    borderRadius: 4,
}

const NotFoundPage = () => {
    return (
        <main style={pageStyles}>
            <h1 style={headingStyles}>Сторінку не знайдено</h1>
            <p style={paragraphStyles}>
                На жаль, такої сторінки немає.
                <br />
                {process.env.NODE_ENV === "development" ? (
                    <>
                        <br />
                        Спробуйте створити сторінку в <code style={codeStyles}>src/pages/</code>.
                        <br />
                    </>
                ) : null}
                <br />
                <Link to="/">На головну</Link>.
            </p>
        </main>
    )
}

export default NotFoundPage

export const Head = () => (
  <Seo
    title="Сторінку не знайдено | Вікторія Захід Трейд"
    description="Запитана сторінка не існує. Перейдіть до каталогу засобів захисту рослин."
    noindex
  />
)
