const resolveItemSelection = ({ id, label, items }, selectedId) => {
  const itemId = id ?? label;

  // Treat item as selected if it or any nested child matches the selected id
  const selected = Boolean(
    selectedId === itemId ||
      items?.some((item) => resolveItemSelection(item, selectedId).selected)
  );
  return { itemId, selected };
};

export default resolveItemSelection;
