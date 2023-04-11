// Resets items position if the new position of the item is too close (< 0.01) to neighbouring items
const recalcItemsPos = async (parentId, Model) => {
  try {
    const items = await Model.find(parentId).sort({ position: 1 });
    let pos = 32768;
    // Give new position incrementing each by 32768
    for (const item of items) {
      await Model.findByIdAndUpdate(item._id, { position: pos }, { new: true });
      pos += 32768;
    }
  } catch (error) {
    return error;
  }
};

export default recalcItemsPos;
