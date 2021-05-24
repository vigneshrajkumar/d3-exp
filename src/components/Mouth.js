import { arc } from 'd3'
const mouthWidth = 20
const mouthRadius = 140

const mouthArc = arc()
  .innerRadius(mouthRadius)
  .outerRadius(mouthRadius + mouthWidth)
  .startAngle(Math.PI / 2)
  .endAngle(Math.PI * 3 / 2 )
  
function Mouth(){
    return(
        <path d={mouthArc()} />
    )
}

export default Mouth