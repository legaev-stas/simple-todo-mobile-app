import React, {Component} from 'react';
import Input from '../forms/input';
import Button from '../forms/button';
import Category from '../category';
import uuid from 'uuid/v4';
import globalState from '../../state';

class CategoryContainer extends Component {
    constructor(props) {
        super(props);

        this.state = globalState.get();

        this.editHandler = this.editHandler.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.addInCategoryHandler = this.addInCategoryHandler.bind(this);
        this.addHandler = this.addHandler.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.setActive = this.setActive.bind(this);
    }

    componentDidMount(){
        globalState.onChange(this.setState.bind(this));
    }

    setActive(id){
        globalState.set('state.activeCategoryId', id);
    }

    addHandler() {
        var clonedState = this._cloneState();

        clonedState.data.categoryList.push({
            id: uuid(),
            name: clonedState.state.addCategoryInput,
            parent: null
        });
        clonedState.state.addCategoryInput = '';

        globalState.set(clonedState);
    }

    inputChange(e) {
        globalState.set('state.addCategoryInput', e.target.value);
    }

    addInCategoryHandler(categoryId) {
        const name = prompt('Please enter category title');
        if (!name) {
            return;
        }

        var clonedState = this._cloneState();

        clonedState.data.categoryList.push({
            id: uuid(),
            name: name,
            parent: categoryId
        });

        globalState.set('data.categoryList', clonedState.data.categoryList);
    }

    editHandler(categoryId) {
        const name = prompt('Please enter category title');
        if (!name) {
            return;
        }

        var clonedState = this._cloneState();

        clonedState.data.categoryList.filter(category => category.id === categoryId)[0].name = name;
        globalState.set('data.categoryList', clonedState.data.categoryList);
    }

    deleteHandler(categoryId) {
        if (!confirm('Are you sure you want to delete item?')) {
            return;
        }

        var clonedState = this._cloneState();
        var categoriesIdToDelete = clonedState.data.categoryList.filter(category => category.id === categoryId);

        function findAllCategoriesIdToDelete(category) {
            var parentId = category.parentId;
            let nestedCategories = clonedState.data.categoryList.filter(category => category.parent === parentId);

            nestedCategories.forEach(function (category) {
                categoriesIdToDelete.push(category);
                findAllCategoriesIdToDelete(category);
            });
        }

        findAllCategoriesIdToDelete(categoriesIdToDelete[0]);

        categoriesIdToDelete.forEach(function(category){
            clonedState.data.categoryList.splice(clonedState.data.categoryList.indexOf(category), 1);
        });

        globalState.set('data.categoryList', clonedState.data.categoryList);
    }

    _cloneState() {
        return JSON.parse(JSON.stringify(this.state));
    }

    render() {
        return (
            <div>
                <Input
                    type="text"
                    placeholder="Enter category title"
                    value={this.state.state.addCategoryInput}
                    onChange={this.inputChange}
                />

                <Button onClick={this.addHandler}>Add</Button>

                {this.state.data.categoryList.filter(category => category.parent === null).map((props) =>
                    <Category
                        key={props.id}
                        {...props}
                        categoryList={this.state.data.categoryList}
                        activeCategoryId={this.state.state.activeCategoryId}
                        editHandler={this.editHandler}
                        deleteHandler={this.deleteHandler}
                        addHandler={this.addInCategoryHandler}
                        setActive={this.setActive}
                    />
                )}
            </div>
        );
    }
}

export default CategoryContainer;