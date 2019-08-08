import React from 'react'
import { AutoCompleteCache } from 'antd-extensions'

import Highlight from '../../../Components/Highlight'
import withAPIDoc from '../../../Components/APIDoc'
import PropsDoc from '../../../Components/PropsDoc'

class AutoCompleteCacheDoc extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h3>用法</h3>

        <Highlight language="jsx">
          {`// jsx组件使用
<AutoCompleteCache
placeholder={placeholder}
onSearch={onSearch}
localStorageKey={localStorageKey}
/>`}
        </Highlight>

        <br />

        <PropsDoc
          data={[
            {
              prop: 'localStorageKey',
              type: 'String',
              description: <React.Fragment>本地缓存搜索的key值,必须有的属性</React.Fragment>
            },
            {
              prop: 'cacheLength',
              type: 'Number',
              description: `缓存最近最新搜索的条数，默认十条`
            },
            {
              prop: 'placeholder',
              type: 'String',
              description: '输入框提示语,默认无值undefined'
            },
            {
              prop: 'onSearch',
              type: 'Function',
              description: (
                <React.Fragment>
                  获取选中记录或点击enter，返回输入值:
                  <code className="codeRef">Function(value)</code>
                </React.Fragment>
              )
            },
            {
              prop: 'size',
              type: 'String',
              description: "'small','middle','large',默认为'large'"
            },
            {
              prop: 'allowClear',
              type: '	Boolean',
              description: '清除输入框，默认为true'
            },
            {
              prop: 'defaultActiveFirstOption',
              type: 'Boolean',
              description: '是否默认高亮第一个选项,默认不高亮false'
            },
            {
              prop: 'style',
              type: 'Object',
              description: (
                <React.Fragment>
                  react dom的style样式语法，默认值：
                  <code className="codeRef">&#123; width: '430px' &#125;</code>
                </React.Fragment>
              )
            }
          ]}
        />

        <br />

        <div className="mapExample">
          <h3>示例</h3>
          <AutoCompleteCache
            placeholder="提示语"
            onSearch={val => {
              console.log(val)
            }}
            localStorageKey="localStorageKey"
          />

          <br />
          <br />

          <Highlight language="jsx">
            {`import React from 'react'
import { AutoCompleteCache } from 'antd-extensions'

export default class Example extends React.Component {
  render() {
    return (
      <div>
      <AutoCompleteCache
      placeholder="提示语"
      onSearch={val => {
        console.log(val)
      }}
      localStorageKey="localStorageKey"
    />
      </div>
    )
  }
}
`}
          </Highlight>
        </div>
      </React.Fragment>
    )
  }
}

export default withAPIDoc(AutoCompleteCacheDoc)
