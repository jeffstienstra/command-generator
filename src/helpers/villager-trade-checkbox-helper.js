
const villagerTradeCheckboxHelper = {
    handleSetProperty(setter, value) {
        return (event) => {
            if (event.target.checked === true) {
                setter(value);
            } else {
                setter('');
            };
        };
    },

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

    handleSetXpRewardsEnabled(setter) {
        return (event) => {
            setter(event.target.checked);
        };
    },
};

module.exports = villagerTradeCheckboxHelper;
