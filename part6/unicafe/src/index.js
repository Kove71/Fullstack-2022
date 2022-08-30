import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'
import Feedback from './components/Feedback';
import Statistics from './components/Statistics';
const store = createStore(reducer)

const App = () => {
    const good = () => {
        store.dispatch({
            type: 'GOOD'
        })
    }

    const ok = () => {
        store.dispatch({
            type: 'OK'
        })
    }

    const bad = () => {
        store.dispatch({
            type: 'BAD'
        })
    }

    const reset = () => {
        store.dispatch({
            type: 'ZERO'
        })
    }

    return (
        <div>
            <h1>give feedback</h1>
            <Feedback
                increaseGood={good}
                increaseNeutral={ok}
                increaseBad={bad}
                reset={reset}
                textGood="good"
                textNeutral="ok"
                textBad="bad"
                textReset='reset'
            />
            <h1>statistics</h1>
            <Statistics
                good={store.getState().good}
                neutral={store.getState().ok}
                bad={store.getState().bad}
            />
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
    root.render(<App />)
}

renderApp()
store.subscribe(renderApp)