export default function handleUpdateItem(prevState, item) {
    const selectedItem = prevState.find(
        (itemObj) => itemObj.name === item?.name
    );

    const selectedItemIndex = prevState.findIndex(
        (itemObj) => itemObj.name === item?.name
    );

    const beforeItemsArray = prevState.slice(0, selectedItemIndex);

    const afterItemsArray = prevState.slice(selectedItemIndex + 1);

    return { selectedItem, beforeItemsArray, afterItemsArray };
}
