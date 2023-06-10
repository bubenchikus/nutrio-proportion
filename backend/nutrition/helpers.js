export const calculateProportions = (
  cals = 0,
  carb = 0,
  protein = 0,
  fat = 0,
  fiber = 0
) => {
  const byWeight = {};
  const byCalories = {};

  const weight = carb + protein + fat;

  if (weight > 0) {
    byWeight.protein = ((protein / weight) * 100).toFixed(2);
    byWeight.fat = ((fat / weight) * 100).toFixed(2);
    byWeight.fiber = ((fiber / weight) * 100).toFixed(2);
    byWeight.carb = (100 - byWeight.protein - byWeight.fat).toFixed(2);
  }

  if (cals > 0) {
    byCalories.protein = (((protein * 4) / cals) * 100).toFixed(2);
    byCalories.fat = (((fat * 9) / cals) * 100).toFixed(2);
    byCalories.fiber = (((fat * 2) / cals) * 100).toFixed(2);
    byCalories.carbs = (100 - byCalories.protein - byCalories.fat).toFixed(2);
  }

  return [byWeight, byCalories];
};
