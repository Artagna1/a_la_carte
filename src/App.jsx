import { useBrief } from './hooks/useBrief'
import Home from './pages/Home'
import Summary from './pages/Summary'

function App() {
  const { isComplete } = useBrief()
  return isComplete ? <Summary /> : <Home />
}

export default App
