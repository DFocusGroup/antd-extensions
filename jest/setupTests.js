import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

global.$ = function(classNames) {
  return document.querySelectorAll(classNames)
}

configure({ adapter: new Adapter() })
