const Dropdown = ({ selectedXValue, options, changeHandler }) => {
    return (
        <>
            <label for="x-select">X:</label>
            <select id="x-select" onChange={e => changeHandler(e.target.value)}>
                {options.map(op => <option selected={op.value === selectedXValue} value={op.value}>{op.label}</option>)}
            </select>
        </>
    )
};

export default Dropdown