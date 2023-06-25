package MacroTrackerSpring;

import com.fasterxml.jackson.annotation.JsonProperty;

public class FoodItem {
    // import com.fasterxml.jackson.databind.ObjectMapper; // version 2.11.1
    // import com.fasterxml.jackson.annotation.JsonProperty; // version 2.11.1
    /*
     * ObjectMapper om = new ObjectMapper();
     * Root[] root = om.readValue(myJsonString, Root[].class);
     */

    public String name;
    public String usda_id;
    public int fat;
    public double calories;
    public int proteins;
    public int carbohydrates;
    public double serving;
    public Nutrients nutrients;
    public int fibers;

    public FoodItem() {
    }

    public String getUsda_id() {
        return usda_id;
    }

    public double getCalories() {
        return calories;
    }

    public int getCarbohydrates() {
        return carbohydrates;
    }

    public int getFat() {
        return fat;
    }

    public int getFibers() {
        return fibers;
    }

    public String getName() {
        return name;
    }

    public Nutrients getNutrients() {
        return nutrients;
    }

    public int getProteins() {
        return proteins;
    }

    public double getServing() {
        return serving;
    }

    public void setCalories(double calories) {
        this.calories = calories;
    }

    public void setCarbohydrates(int carbohydrates) {
        this.carbohydrates = carbohydrates;
    }

    public void setFat(int fat) {
        this.fat = fat;
    }

    public void setFibers(int fibers) {
        this.fibers = fibers;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setNutrients(Nutrients nutrients) {
        this.nutrients = nutrients;
    }

    public void setProteins(int proteins) {
        this.proteins = proteins;
    }

    public void setServing(double serving) {
        this.serving = serving;
    }

    public void setUsda_id(String usda_id) {
        this.usda_id = usda_id;
    }

    public static class Nutrients {

        public Nutrients() {
            // Add a default (no-argument) constructor
        }

        @JsonProperty("Calcium")
        public int calcium;
        @JsonProperty("Iron")
        public int iron;
        @JsonProperty("Potassium")
        public int potassium;
        @JsonProperty("Magnesium")
        public int magnesium;
        @JsonProperty("Phosphorus")
        public int phosphorus;
        @JsonProperty("Sodium")
        public int sodium;
        @JsonProperty("Zinc")
        public double zinc;
        @JsonProperty("Copper")
        public double copper;
        @JsonProperty("Manganese")
        public double manganese;
        @JsonProperty("Selenium")
        public double selenium;
        @JsonProperty("Vitamin C")
        public int vitaminC;
        @JsonProperty("Vitamin B12")
        public double vitaminB12;
        @JsonProperty("Vitamin B1")
        public double vitaminB1;
        @JsonProperty("Vitamin B2")
        public double vitaminB2;
        @JsonProperty("Vitamin B3")
        public int vitaminB3;
        @JsonProperty("Vitamin B5")
        public int vitaminB5;
        @JsonProperty("Vitamin B6")
        public double vitaminB6;
        @JsonProperty("Vitamin B7")
        public double vitaminB7;
        @JsonProperty("Vitamin B9")
        public double vitaminB9;
        @JsonProperty("Choline")
        public int choline;
        @JsonProperty("Vitamin A")
        public double vitaminA;
        @JsonProperty("Vitamin E")
        public double vitaminE;
        @JsonProperty("Vitamin K")
        public double vitaminK;
        @JsonProperty("Linoleic acid")
        public int linoleicAcid;
        public int αLinolenicAcid;
        @JsonProperty("Tryptophan")
        public int tryptophan;
        @JsonProperty("Threonine")
        public int threonine;
        @JsonProperty("Isoleucine")
        public int isoleucine;
        @JsonProperty("Leucine")
        public int leucine;
        @JsonProperty("Lysine")
        public int lysine;
        @JsonProperty("Methionine")
        public int methionine;
        @JsonProperty("Phenylalanine")
        public int phenylalanine;
        @JsonProperty("Valine")
        public int valine;
        @JsonProperty("Histidine")
        public int histidine;
        @JsonProperty("Iodine")
        public double iodine;
        @JsonProperty("Molybdenum")
        public double molybdenum;
        @JsonProperty("Chromium")
        public double chromium;
        @JsonProperty("Chloride")
        public int chloride;

        public int getCalcium() {
            return calcium;
        }

        public int getChloride() {
            return chloride;
        }

        public int getCholine() {
            return choline;
        }

        public double getChromium() {
            return chromium;
        }

        public double getCopper() {
            return copper;
        }

        public int getHistidine() {
            return histidine;
        }

        public double getIodine() {
            return iodine;
        }

        public int getIron() {
            return iron;
        }

        public int getIsoleucine() {
            return isoleucine;
        }

        public int getLeucine() {
            return leucine;
        }

        public int getLinoleicAcid() {
            return linoleicAcid;
        }

        public int getLysine() {
            return lysine;
        }

        public int getMagnesium() {
            return magnesium;
        }

        public double getManganese() {
            return manganese;
        }

        public int getMethionine() {
            return methionine;
        }

        public double getMolybdenum() {
            return molybdenum;
        }

        public int getPhenylalanine() {
            return phenylalanine;
        }

        public int getPhosphorus() {
            return phosphorus;
        }

        public int getPotassium() {
            return potassium;
        }

        public double getSelenium() {
            return selenium;
        }

        public int getSodium() {
            return sodium;
        }

        public int getThreonine() {
            return threonine;
        }

        public int getTryptophan() {
            return tryptophan;
        }

        public int getValine() {
            return valine;
        }

        public double getVitaminA() {
            return vitaminA;
        }

        public double getVitaminB1() {
            return vitaminB1;
        }

        public double getVitaminB12() {
            return vitaminB12;
        }

        public double getVitaminB2() {
            return vitaminB2;
        }

        public int getVitaminB3() {
            return vitaminB3;
        }

        public int getVitaminB5() {
            return vitaminB5;
        }

        public double getVitaminB6() {
            return vitaminB6;
        }

        public double getVitaminB7() {
            return vitaminB7;
        }

        public double getVitaminB9() {
            return vitaminB9;
        }

        public int getVitaminC() {
            return vitaminC;
        }

        public double getVitaminE() {
            return vitaminE;
        }

        public double getVitaminK() {
            return vitaminK;
        }

        public double getZinc() {
            return zinc;
        }

        public int getαLinolenicAcid() {
            return αLinolenicAcid;
        }
    }

}
