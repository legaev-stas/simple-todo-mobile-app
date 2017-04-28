import {createSimpleSelector, createSelector} from '../../helpers/selector';
import {getState} from '../../helpers/store';

const state = (state = getState()) => state;

const uiState = createSimpleSelector(state, 'uiState');
const category = createSimpleSelector(state, 'category');
const getActiveId = (state, props) => props.params.activeCategoryId;


export const categoryForm = createSelector(uiState, uiState => ({addCategoryTitle: uiState.get('addCategoryTitle')}));
export const categoryList = createSelector([category, getActiveId], (category, getActiveId) => {
    let collection = category.get('collection').toJS();
    collection = collection.map(item => {
        item.active = item.id === getActiveId;

        return item;
    });

    return {collection};
});