import * as React from 'react'

interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath =
  'M14.1274 5.52808L12.0001 3.40074L19.7454 0L21.8726 2.12726L21.8726 2.12714L24 4.25448L20.5993 11.9998L18.4719 9.87244L21.8725 2.1274L14.1274 5.52808ZM11.9999 3.4008L9.87255 5.52814L2.12742 2.12745L5.52805 9.87254L3.40072 11.9998L0 4.25457L2.12732 2.12723L2.12737 2.12734L4.25464 6.58035e-05L11.9999 3.4008ZM18.4718 14.1275L20.5991 12.0002L23.9998 19.7455L21.8725 21.8729L21.8724 21.8728L19.7451 24L11.9999 20.5993L14.1273 18.4719L21.8724 21.8727L18.4718 14.1275ZM3.40094 11.9998L5.52826 14.1271L2.12764 21.8722L9.87283 18.4715L12.0001 20.5988L4.25487 23.9996L2.12759 21.8723L2.12754 21.8725L0.000213106 19.7451L3.40094 11.9998Z' // eslint-disable-line max-len

// TODO: replace with new icon later
export const LogoPlatformVCropped: React.FC<Props> = (props) => {
  return (
    <svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d={svgPath} />
    </svg>
  )
}

LogoPlatformVCropped.displayName = 'LogoPlatformVCropped'
LogoPlatformVCropped.defaultProps = {
  width: 24,
  height: 24,
  fill: 'currentColor',
}
