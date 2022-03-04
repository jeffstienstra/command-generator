
const villagerTradeEffectsHelper = {
    handleAddEffect(effects, setter) {
        return (event) => {
            console.log('clicked', event.target.value);
            setter(effects.map(effect =>
            effect.namespacedId === event.target.value
            ? {
                name: effect.name,
                description: effect.description,
                id: effect.id,
                namespacedId: effect.namespacedId,
                isActiveEffect: true,
                amplifier: effect.amplifier,
                duration: effect.duration
                }
            : effect
        ))}
    },

    handleRemoveEffect(effect, effects, setEffects) {
        return () => {
        effect.isActiveEffect = false;
        effect.amplifier = 1;
        effect.duration = 999999;
        setEffects([...effects])
        }
    }
}

module.exports = villagerTradeEffectsHelper;
