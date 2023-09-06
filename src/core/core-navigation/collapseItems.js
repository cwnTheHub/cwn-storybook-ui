export const getBottomItems = (items) => {
  if (!items?.length) return items;

  let rootLabel = items[0].label;
  let bottomItems = items.filter((item) => {
    return item?.isDisplayedInBottomBar === true;
  });
  return [
    { id: "navigation-bottom-bar-root", label: rootLabel, items: bottomItems },
  ];
};

export const collapseFromMdItems= (items, selectedId) => {
  if (!items?.length) return items;

  // Give the root item the label of the current active link
  // (or the first item if for some reason there's no match on the selectedId)
  let rootLabel = items[0].label;
  const isSelected = ({ label, id }) => selectedId === id ?? label;

  // Linter doesn't like for loops, simulate loop that breaks
  items.some((item) => {
    if (isSelected(item)) {
      rootLabel = item.label;
      return true; // break
    }
    const nestedMatch = item.items?.find(isSelected);
    if (nestedMatch) {
      rootLabel = nestedMatch.label;
      return true; // break
    }
    return false; // continue
  });

  return [{ id: "navigation-bar-from-md-root", label: rootLabel, items }];
};



/**
 * Make a list of items into a one-item list where all items are nested under the first item
 */
const collapseItems = (items, selectedId) => {
  if (!items?.length) return items;

  // Give the root item the label of the current active link
  // (or the first item if for some reason there's no match on the selectedId)
  //let rootLabel = items[0].label;
  let rootLabel = "Menu";
  const isSelected = ({ label, id }) => selectedId === id ?? label;

  // Linter doesn't like for loops, simulate loop that breaks
  items.some((item) => {
    if (isSelected(item)) {
      //rootLabel = item.label;
      return true; // break
    }
    const nestedMatch = item.items?.find(isSelected);
    if (nestedMatch) {
      // rootLabel = nestedMatch.label;
      return true; // break
    }
    return false; // continue
  });

  return [{ id: "navigation-bar-root", label: rootLabel, items }];
};

export default collapseItems;
