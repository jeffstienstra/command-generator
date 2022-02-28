
const villagerPropertiesHelper = {
    handleSetInvulnerability(setter) {
        return (event) => {
            if (event.target.checked === true) {
                setter(`Invulnerable:1`);
            } else {
                setter('');
            };
        };
    },

    handleSetPersistence(setter) {
        return (event) => {
            if (event.target.checked === true) {
                setter(`PersistenceRequired:1`);
            } else {
                setter('');
            };
        };
    },

    handleSetSilent(setter) {
        return (event) => {
            if (event.target.checked === true) {
                setter(`Silent:1`);
            } else {
                setter('');
            };
        };
    },

    handleSetNoAi(setter) {
        return (event) => {
            if (event.target.checked === true) {
                setter(`NoAI:1`);
            } else {
                setter('');
            };
        };
    },

    handleSetIsRelative(setter) {
        return (event) => {
            if (event.target.value === true) {
                setter(event.target.value);
            } else {
                setter((event.target.value));
            };
        };
    },
};

module.exports = villagerPropertiesHelper;
