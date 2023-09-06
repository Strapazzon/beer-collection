type PunkBeerVolume = {
  value: number;
  unit: string;
};

type PunkBeerTemperature = {
  temp: PunkBeerVolume;
  duration?: number;
};

type PunkBeerMethod = {
  mash_temp: PunkBeerTemperature[];
  fermentation: PunkBeerTemperature;
  twist: string;
};

type PunkBeerIngredient = {
  name: string;
  amount: {
    value: number;
    unit: string;
  };
  add?: string;
  attribute?: string;
};

export type PunkBeer = {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url?: string | null;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volume: PunkBeerVolume;
  boil_volume: PunkBeerVolume;
  method: PunkBeerMethod;
  ingredients: {
    malt: PunkBeerIngredient[];
    hops: PunkBeerIngredient[];
    yeast: string;
  };
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
};
