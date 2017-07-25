import im from 'immutable';

export const createNewContainer = data =>
  im.fromJS({
    size: 0,
    data,
    children: [],
  });

export const getRootState = () =>
  im.fromJS({
    id: 'root',
    children: [],
  });

const createCell = (state, parentPath, data) =>
  state.updateIn(parentPath, children =>
    children.push(createNewContainer(data && data)),
  );

export const deSerializePayloadToState = payload =>
  payload.reduce((state, item, index) => {
    let updatedState = state;
    const rowPath = ['children', item.y];
    const cellPath = ['children', item.y, 'children', item.x];

    const isUniqRow = payload.filter(({ y }) => y === item.y).length === 1;
    const isUniqCell =
      payload.filter(({ y, x }) => y === item.y && x === item.x).length === 1;

    const isRowCreated = updatedState.getIn(rowPath);
    const isCellCreated = updatedState.getIn(cellPath);

    if (!isRowCreated) {
      updatedState = createCell(
        updatedState,
        ['children'],
        isUniqRow && item.data,
      );
      if (isUniqRow) return updatedState;
    }

    if (!isCellCreated) {
      updatedState = createCell(
        updatedState,
        [...rowPath, 'children'],
        isUniqCell && item.data,
      );

      if (isUniqCell) return updatedState;
    }

    return createCell(updatedState, [...cellPath, 'children'], item.data);
  }, getRootState());

export const serializeStateToPayload = state => {
  const payload = [];

  state.children.forEach(({ data, children }, rowIndex) => {
    if (data) {
      payload.push({ x: 0, y: rowIndex, w: null, data });
      return;
    }

    children.forEach((cell, cellIndex) => {
      if (cell.data) {
        payload.push({ x: cellIndex, y: rowIndex, w: null, data: cell.data });
        return;
      }

      cell.children.forEach(container =>
        payload.push({
          x: cellIndex,
          y: rowIndex,
          w: null,
          data: container.data,
        }),
      );
    });
  });

  return payload;
};
