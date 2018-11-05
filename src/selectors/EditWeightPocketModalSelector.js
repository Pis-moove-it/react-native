export const getPocket = state => state.editWeightPocketModal.pocket;

export const getPocketWeight = state => state.editWeightPocketModal.weight;

export const getPocketState = state => state.editWeightPocketModal.hasWeight;

export const getIsModalVisible = state => state.editWeightPocketModal.editWeightPocketModalIsOpen;

export const isLoading = state => state.editWeightPocketModal.isLoading;
