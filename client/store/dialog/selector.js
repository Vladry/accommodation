export const getDialogState = state => JSON.parse(JSON.stringify(state.dialogData));
export const getDialogComponent = state => state.dialogData.Component;
