import React from 'react'
import Todos from './Todos'

function App() {
  return (
    <main className="App">
      <nav>
        <section>
          <h1>Redux Fundamentals Example</h1>

          <div className="navContent">
            <div className="navLinks"></div>
          </div>
        </section>
      </nav>
      <h2>Todos</h2>
      <Todos/>
    </main>
  )
}

export default App
