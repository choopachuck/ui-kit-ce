// *** Заготовка для теста. Переименовать в useOutsideClick.test.tsx ***

// import { mount, ReactWrapper, ShallowWrapper } from 'enzyme'
// import * as React from 'react'

// import { useOutsideClick } from './useOutsideClick'
// interface IProps {
//   flag: number
// }
// const Content = (props: IProps): React.ReactElement => {
//   const contentRef = React.useRef(null)
//   const subContentRef = React.useRef(null)

//   useOutsideClick([subContentRef], () => {
//     props.flag = 5
//   })

//   return (
//     <div ref={contentRef} className="content">
//       <div ref={subContentRef} className="subContent"></div>
//     </div>
//   )
// }

// describe('Тесты хука useOutsideClick', () => {
//   let wrapper: ReactWrapper | ShallowWrapper
//   beforeEach(() => {
//     wrapper = mount(<Content flag={0} />)
//   })

//   afterEach(() => {
//     wrapper.unmount()
//   })

//   it('клик по элементу внутри заданного в useOutsideClick', () => {
//     wrapper.find('.subContent').simulate('click')
//     expect(wrapper.prop('flag')).toBe(0)
//   })

//   it('клик по элементу внe заданного в useOutsideClick', () => {
//     wrapper.find('.content').simulate('click')
//     expect(wrapper.prop('flag')).toBe(5)
//   })
// })
