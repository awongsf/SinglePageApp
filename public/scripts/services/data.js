'use strict';

angular.module('app')
.service('dataService', function($http) {

	var baseURL = 'http://localhost:5000';

	this.getRecipes = function(callback) {
		$http.get(baseURL + '/api/recipes')
		.then(callback);
	};

	this.getCategories = function(callback) {
		$http.get(baseURL + '/api/categories')
		.then(callback);
	};

	this.getFoodItems = function(callback) {
		$http.get(baseURL + '/api/fooditems')
		.then(callback);
	};

	this.getRecipesByCategory = function(callback, categoryName) {
		$http.get(baseURL + '/api/recipes?category=' + categoryName)
		.then(callback);
	};

	this.getRecipeByID = function(callback, id) {
		$http.get(baseURL + '/api/recipes/' + id)
		.then(callback);
	};

	this.updateRecipeByID = function(id, update) {
		$http.put(baseURL + '/api/recipes/' + id, update);
	};

	this.addRecipe = function(recipe) {
		$http.post(baseURL + '/api/recipes', recipe);
	};

	this.deleteRecipeByID = function(id) {
		$http.delete(baseURL + '/api/recipes/' + id);
	};

});