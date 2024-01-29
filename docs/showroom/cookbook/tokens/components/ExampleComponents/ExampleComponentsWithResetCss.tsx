import React from 'react'
import { createUseStyles, useResetCss } from '@v-uik/base'
import { ExampleComponents } from './ExampleComponents'

const useResetBodyMargin = createUseStyles({
  '@global': {
    body: {
      margin: 0,
    },
  },
})

const _ExampleBaseHtml: React.FC = () => {
  return (
    <html>
      <body>
        <header>
          <a href="#">
            <span>logo</span>
          </a>
          <nav>
            <a href="#">link 1</a>
            <a href="#">link 2</a>
            <a href="#">link 3</a>
          </nav>
        </header>
        <hr />
        <aside>banner</aside>
        <main>
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <h5>Heading 5</h5>
          <h6>Heading 6</h6>
          <section>
            <ul>
              <li>item 1</li>
              <li>item 2</li>
              <li>item 3</li>
            </ul>
          </section>
          <article>
            <ol>
              <li>item 1</li>
              <li>item 2</li>
              <li>item 3</li>
            </ol>
          </article>
          <div>
            <p>Content</p>
            <p>
              <code>document.getElementById</code> is used select element on a
              webpage using its ID.
            </p>
            <p>
              <samp>
                Test cases failed <br /> Please improve the algorithm
              </samp>
            </p>
            <p>
              Press <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>i</kbd> to open
              developer console.
            </p>
            <pre>Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y</pre>
            <p>
              <abbr title="Hypertext markup language">HTML</abbr> is used to
              create webpages.
            </p>
            <form>
              <fieldset>
                <legend>Personal data</legend>
                <label>
                  Name: <input type="text" />
                </label>
                <label>
                  Age: <input type="number" />
                </label>
              </fieldset>
              <button type="submit">submit</button>
            </form>
            <details>
              <summary>This is the summary</summary>
              <p>This is the details content</p>
            </details>
          </div>
          <table>
            <tr>
              <th>Company</th>
              <th>Contact</th>
              <th>Country</th>
            </tr>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td>
            </tr>
            <tr>
              <td>Centro comercial Moctezuma</td>
              <td>Francisco Chang</td>
              <td>Mexico</td>
            </tr>
          </table>
        </main>
        <footer>
          <address>address</address>
        </footer>
      </body>
    </html>
  )
}

export const ExampleComponentsWithResetCss: React.FC<{
  noResetCss?: boolean
  nativeHtml?: boolean
  resetBodyMargin?: boolean
}> = ({ noResetCss, nativeHtml, resetBodyMargin }) => {
  const ResetCss = () => {
    useResetCss()

    return null
  }

  /**
   * Сброс внешних отступов у тэга body для корректного сравнения скриншотов компонентов библиотеки @v-uik.
   */
  const NoResetCss = () => {
    useResetBodyMargin()

    return null
  }

  return (
    <>
      {noResetCss ? resetBodyMargin && <NoResetCss /> : <ResetCss />}
      {nativeHtml ? <_ExampleBaseHtml /> : <ExampleComponents action={false} />}
    </>
  )
}
