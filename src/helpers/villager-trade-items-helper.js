
const villagerTradeItemsHelper = {
    handleValueChange(setter) {
        return (event) => {
            setter(event.target.value);
        };
    },

    handleInputChange(setter) {
        return (event) => {
            setter(event.target.value);
        };
    },

    handleSetSelectedItem(itemList, item, itemSetter, itemCountSetter) {
        return (event) => {
            const selectedItem = itemList.filter((item) => item.value === event.target.value)[0]

            if (event.target.value === 'none') {
              itemSetter({});
              itemCountSetter(1);
            } else {
              itemSetter(
                {
                  label: selectedItem.label,
                  value: selectedItem.value,
                  image: selectedItem.image,
                  count: item.count,
                  stackSize: selectedItem.stackSize,
                }
              );
              itemCountSetter(1);
            }
        }
    },

    handleClearItem(itemSetter, itemCountSetter) {
        return () => {
            itemSetter(
          {
            "name": "- Select -",
            "namespacedId": "none",
            "image": "",
            "item": "- Select -"
          },
        );
        itemCountSetter(1);
        }
    },

    handleSetItemCount(selectedItem, itemCountSetter) {
        return (event) => {
            if (event.target.value > selectedItem.stackSize) {
            itemCountSetter(selectedItem.count = selectedItem.stackSize)
            } else if (event.target.value < 1) {
                itemCountSetter(selectedItem.count = 1)
            } else {
            itemCountSetter(selectedItem.count = event.target.value)
            }
        }
    },
};

module.exports = villagerTradeItemsHelper;
