
const hooksHelper = {
    handleCheckboxChange(setter) {
        return (event) => {
            setter(event.target.checked);
        };
    },

    handleInputChange(setter) {
        return (event) => {
            setter(event.target.value);
        };
    },

    handleRadioChange(setter, value) {
        return (event) => {
            setter(value);
        };
    },

    // handleEffectSelect(setter, value) {
    //     return (event) => {
    //         console.log('setter ', setter);
    //         console.log('value ', value);
    //         setter(value);
    //     };
    // },

    handleValueChange(setter) {
        return (value) => {
            setter(value);
        };
    },
};

module.exports = hooksHelper;
