import axios from 'axios';

const MEALDB_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';


class MealService {

    foundMeals = [];

    randomMeal() {
        return axios.get(MEALDB_BASE_URL + '/random.php')
    }

    findByName(name) {
        const config = {
            params: {
                s: name
            }
        };
        return axios.get(MEALDB_BASE_URL + '/search.php', config);
    }

    findById(id) {
        const config = {
            params: {
                i: id
            }
        };
        return axios.get(MEALDB_BASE_URL + '/lookup.php', config);
    }

    findByCategory(category) {
        const config = {
            params: {
                c: category
            }
        };
        return axios.get(MEALDB_BASE_URL + '/filter.php', config);
    }

    findByCountry(country) {
        const config = {
            params: {
                a: country
            }
        };
        return axios.get(MEALDB_BASE_URL + '/filter.php', config);
    }


    setFoundMeals(meals) {
        this.foundMeals = meals;
    }

    getIngredients(meal) {
        const allIngredients = [];
        for (let i = 1; i <= 20; i++) {
            allIngredients.push(meal['strIngredient'+i]);
        }
        const ingredients = allIngredients.filter(ingr => ingr);
        return ingredients;
    }

    getMeasures(meal) {
        const allMeasures = [];
        for (let i = 1; i <= 20; i++) {
            allMeasures.push(meal['strMeasure'+i]);
        }
        const measures = allMeasures.filter(mes => mes);
        return measures;
    }

    getIngMes(meal) {
        const ingredients = this.getIngredients(meal);
        const measures = this.getMeasures(meal);
        const ingMes = {};
        ingredients.forEach((ing, idx) => ingMes[ing] = measures[idx]);
        return ingMes;
    }

    getCategories() {
        return axios.get(MEALDB_BASE_URL + '/categories.php');
    }

    getCountries() {
        const config = {
            params: {
                a: 'list'
            }
        };
        return axios.get(MEALDB_BASE_URL + '/list.php', config);
    }

}

export default new MealService();