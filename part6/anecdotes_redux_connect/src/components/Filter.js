import { connect } from 'react-redux'
import {setFilterAction } from '../reducers/filterReducer'

const Filter = (props) => {

    const handleChange = (event) => {
         // input-field value is in variable event.target.value
        props.setFilterAction(event.target.value)
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
        filter <input onChange={handleChange} />
        </div>
    )
}


const mapDispatchToProps = {
    setFilterAction
}



export default connect(null, mapDispatchToProps)(Filter)